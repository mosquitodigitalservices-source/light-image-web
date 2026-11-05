// Compresses one image per message, off the main thread.
import { detectFormat, readMetadata, selectMetadata, writeMetadata } from './metadata.js';

const V = './vendor';
const lazy = load => { let p; return () => (p ??= load()); };
const codecs = {
  jpegDecode: lazy(() => import(`${V}/jpeg/decode.js`).then(m => m.default)),
  jpegEncode: lazy(() => import(`${V}/jpeg/encode.js`).then(m => m.default)),
  webpDecode: lazy(() => import(`${V}/webp/decode.js`).then(m => m.default)),
  webpEncode: lazy(() => import(`${V}/webp/encode.js`).then(m => m.default)),
  pngDecode: lazy(() => import(`${V}/png/decode.js`).then(m => m.decode)),
  pngEncode: lazy(() => import(`${V}/png/encode.js`).then(m => m.default)),
  oxipng: lazy(async () => {
    const m = await import(`${V}/oxipng/codec/pkg/squoosh_oxipng.js`);
    await m.default();
    return m;
  })
};

class CompressError extends Error {
  constructor(key, ...args) {
    super(key);
    this.key = key;
    this.args = args;
  }
}

async function decodeBrowser(blob) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch {
    throw new CompressError('unsupportedInBrowser');
  }
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

async function decode(buffer, blob, format, bitDepth) {
  try {
    if (format === 'jpeg') return await (await codecs.jpegDecode())(buffer);
    if (format === 'png') return await (await codecs.pngDecode())(buffer, { bitDepth });
    if (format === 'webp') return await (await codecs.webpDecode())(buffer);
  } catch {
    throw new CompressError('unreadable');
  }
  return decodeBrowser(blob);
}

const hasTransparency = data => {
  for (let i = 3; i < data.length; i += 4) if (data[i] !== 255) return true;
  return false;
};

async function encode(image, format, { quality, lossless }) {
  if (format === 'jpeg') return new Uint8Array(await (await codecs.jpegEncode())(image, { quality }));
  if (format === 'webp') {
    const options = lossless ? { lossless: 1, quality: 75, exact: 1 } : { quality, alpha_quality: 100 };
    return new Uint8Array(await (await codecs.webpEncode())(image, options));
  }
  const ox = await codecs.oxipng();
  if (image.data instanceof Uint16Array) {
    const png = new Uint8Array(await (await codecs.pngEncode())(image, { bitDepth: 16 }));
    return ox.optimise(png, 2, false, false);
  }
  return ox.optimise_raw(new Uint8Array(image.data.buffer, image.data.byteOffset, image.data.byteLength), image.width, image.height, 2, false, false);
}

async function compress({ file, sourceFormat, outputFormat, settings }) {
  if (outputFormat === 'heic') throw new CompressError('heicUnavailable');
  if (settings.lossless && outputFormat === 'jpeg') throw new CompressError('losslessJpeg');
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const detected = detectFormat(bytes);
  if (sourceFormat !== 'heic' && detected !== sourceFormat) throw new CompressError('unreadable');
  const meta = sourceFormat === 'heic' ? { icc: null, exif: null, xmp: null, orientation: 1 } : await readMetadata(bytes, sourceFormat);
  const bitDepth = sourceFormat === 'png' && outputFormat === 'png' && meta.bitDepth === 16 ? 16 : 8;
  const image = await decode(buffer, file, sourceFormat, bitDepth);
  if (outputFormat === 'jpeg' && image.data instanceof Uint8ClampedArray && hasTransparency(image.data)) {
    throw new CompressError('transparencyJpeg');
  }
  const lossless = outputFormat === 'png' || settings.lossless;
  const encoded = await encode(image, outputFormat, { quality: settings.quality, lossless });
  const selected = selectMetadata(meta, settings);
  const output = await writeMetadata(encoded, outputFormat, selected);
  if (output.length >= file.size) throw new CompressError('noReduction');
  return {
    output,
    width: image.width,
    height: image.height,
    appliedQuality: lossless ? null : settings.quality,
    colorProfilePreserved: meta.icc ? !!selected.icc : null
  };
}

self.onmessage = async ({ data }) => {
  try {
    const result = await compress(data);
    self.postMessage({ id: data.id, ok: true, ...result }, [result.output.buffer]);
  } catch (e) {
    self.postMessage({ id: data.id, ok: false, key: e instanceof CompressError ? e.key : 'failed', args: e instanceof CompressError ? e.args : [String(e?.message || e)] });
  }
};
