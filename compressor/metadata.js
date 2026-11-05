// Reads EXIF, XMP and the ICC color profile from JPEG, PNG and WebP files and
// writes them into a freshly encoded file, like the Mac app's libvips pipeline.

const ascii = s => new TextEncoder().encode(s);
const startsWith = (bytes, prefix, at = 0) => prefix.every((b, i) => bytes[at + i] === b);
const EXIF_HEADER = [...ascii('Exif\0\0')];
const XMP_JPEG_HEADER = [...ascii('http://ns.adobe.com/xap/1.0/\0')];
const ICC_JPEG_HEADER = [...ascii('ICC_PROFILE\0')];
const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

function concat(parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
const u32be = n => new Uint8Array([n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]);
const u32le = n => new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, n >>> 24]);
const u16be = n => new Uint8Array([n >>> 8, n & 255]);
const readU32be = (b, i) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;
const readU32le = (b, i) => (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0;

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
export function crc32(bytes, crc = 0xffffffff) {
  for (let i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 255] ^ (crc >>> 8);
  return crc;
}

async function zlib(bytes, mode) {
  const stream = new Blob([bytes]).stream().pipeThrough(mode === 'inflate' ? new DecompressionStream('deflate') : new CompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export function detectFormat(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpeg';
  if (startsWith(bytes, PNG_SIGNATURE)) return 'png';
  if (startsWith(bytes, [...ascii('RIFF')]) && startsWith(bytes, [...ascii('WEBP')], 8)) return 'webp';
  return null;
}

// ---------- Reading ----------
function readJpeg(b) {
  const meta = { icc: null, exif: null, xmp: null };
  const icc = [];
  let i = 2;
  while (i + 4 <= b.length && b[i] === 0xff) {
    const marker = b[i + 1];
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) { i += 2; continue; }
    if (marker === 0xda || marker === 0xd9) break;
    const len = (b[i + 2] << 8) | b[i + 3];
    const data = b.subarray(i + 4, i + 2 + len);
    if (marker === 0xe1 && startsWith(data, EXIF_HEADER)) meta.exif ??= data.slice(EXIF_HEADER.length);
    else if (marker === 0xe1 && startsWith(data, XMP_JPEG_HEADER)) meta.xmp ??= data.slice(XMP_JPEG_HEADER.length);
    else if (marker === 0xe2 && startsWith(data, ICC_JPEG_HEADER)) icc.push({ seq: data[12], bytes: data.slice(14) });
    i += 2 + len;
  }
  if (icc.length) meta.icc = concat(icc.sort((a, b2) => a.seq - b2.seq).map(c => c.bytes));
  return meta;
}

function* pngChunks(b) {
  let i = 8;
  while (i + 12 <= b.length) {
    const len = readU32be(b, i);
    const type = String.fromCharCode(b[i + 4], b[i + 5], b[i + 6], b[i + 7]);
    yield { type, data: b.subarray(i + 8, i + 8 + len), raw: b.subarray(i, i + 12 + len) };
    if (type === 'IEND') return;
    i += 12 + len;
  }
}

async function readPng(b) {
  const meta = { icc: null, exif: null, xmp: null, colorChunks: [], bitDepth: 8 };
  for (const { type, data, raw } of pngChunks(b)) {
    if (type === 'IHDR') meta.bitDepth = data[8];
    else if (type === 'iCCP') {
      const nul = data.indexOf(0);
      try { meta.icc = await zlib(data.subarray(nul + 2), 'inflate'); } catch {}
    } else if (type === 'sRGB' || type === 'gAMA' || type === 'cHRM') meta.colorChunks.push(raw.slice());
    else if (type === 'eXIf') meta.exif = data.slice();
    else if (type === 'iTXt') {
      const nul = data.indexOf(0);
      if (new TextDecoder().decode(data.subarray(0, nul)) !== 'XML:com.adobe.xmp') continue;
      const compressed = data[nul + 1] === 1;
      let p = data.indexOf(0, nul + 3) + 1;
      p = data.indexOf(0, p) + 1;
      const text = data.subarray(p);
      try { meta.xmp = compressed ? await zlib(text, 'inflate') : text.slice(); } catch {}
    }
  }
  return meta;
}

function* webpChunks(b) {
  let i = 12;
  while (i + 8 <= b.length) {
    const fourcc = String.fromCharCode(b[i], b[i + 1], b[i + 2], b[i + 3]);
    const size = readU32le(b, i + 4);
    yield { fourcc, data: b.subarray(i + 8, i + 8 + size) };
    i += 8 + size + (size & 1);
  }
}

function readWebp(b) {
  const meta = { icc: null, exif: null, xmp: null };
  for (const { fourcc, data } of webpChunks(b)) {
    if (fourcc === 'ICCP') meta.icc = data.slice();
    else if (fourcc === 'EXIF') meta.exif = startsWith(data, EXIF_HEADER) ? data.slice(EXIF_HEADER.length) : data.slice();
    else if (fourcc === 'XMP ') meta.xmp = data.slice();
  }
  return meta;
}

export async function readMetadata(bytes, format) {
  const meta = format === 'jpeg' ? readJpeg(bytes) : format === 'png' ? await readPng(bytes) : format === 'webp' ? readWebp(bytes) : { icc: null, exif: null, xmp: null };
  meta.orientation = meta.exif ? exifOrientation(meta.exif) : 1;
  return meta;
}

// ---------- EXIF orientation ----------
export function exifOrientation(tiff) {
  if (tiff.length < 8) return 1;
  const le = tiff[0] === 0x49;
  const u16 = i => le ? tiff[i] | (tiff[i + 1] << 8) : (tiff[i] << 8) | tiff[i + 1];
  const u32 = i => le ? readU32le(tiff, i) : readU32be(tiff, i);
  const ifd = u32(4);
  if (ifd + 2 > tiff.length) return 1;
  const count = u16(ifd);
  for (let e = 0; e < count; e++) {
    const at = ifd + 2 + e * 12;
    if (at + 12 > tiff.length) break;
    if (u16(at) === 0x0112) {
      const v = u16(at + 8);
      return v >= 1 && v <= 8 ? v : 1;
    }
  }
  return 1;
}

// A minimal big-endian TIFF block holding only the Orientation tag.
function orientationOnlyExif(orientation) {
  return concat([ascii('MM'), u16be(42), u32be(8), u16be(1), u16be(0x0112), u16be(3), u32be(1), u16be(orientation), u16be(0), u32be(0)]);
}

// What to embed, given the user's choices.
export function selectMetadata(meta, { preservesMetadata, preservesColorProfile }) {
  return {
    icc: preservesColorProfile ? meta.icc : null,
    colorChunks: preservesColorProfile && !meta.icc ? meta.colorChunks || [] : [],
    exif: preservesMetadata ? meta.exif : meta.orientation !== 1 ? orientationOnlyExif(meta.orientation) : null,
    xmp: preservesMetadata ? meta.xmp : null
  };
}

// ---------- Writing ----------
function jpegSegment(marker, payload) {
  return concat([new Uint8Array([0xff, marker]), u16be(payload.length + 2), payload]);
}

function writeJpeg(b, m) {
  const segments = [];
  if (m.exif && m.exif.length + EXIF_HEADER.length <= 65533) segments.push(jpegSegment(0xe1, concat([new Uint8Array(EXIF_HEADER), m.exif])));
  if (m.xmp && m.xmp.length + XMP_JPEG_HEADER.length <= 65533) segments.push(jpegSegment(0xe1, concat([new Uint8Array(XMP_JPEG_HEADER), m.xmp])));
  if (m.icc) {
    const max = 65519, count = Math.ceil(m.icc.length / max);
    if (count <= 255) {
      for (let s = 0; s < count; s++) {
        segments.push(jpegSegment(0xe2, concat([new Uint8Array(ICC_JPEG_HEADER), new Uint8Array([s + 1, count]), m.icc.subarray(s * max, (s + 1) * max)])));
      }
    }
  }
  if (!segments.length) return b;
  // Keep the encoder's JFIF APP0 first, then our APP1/APP2 segments.
  let insertAt = 2;
  if (b[2] === 0xff && b[3] === 0xe0) insertAt = 4 + ((b[4] << 8) | b[5]);
  return concat([b.subarray(0, insertAt), ...segments, b.subarray(insertAt)]);
}

function pngChunk(type, data) {
  const typeBytes = ascii(type);
  return concat([u32be(data.length), typeBytes, data, u32be((crc32(data, crc32(typeBytes)) ^ 0xffffffff) >>> 0)]);
}

async function writePng(b, m) {
  const extra = [];
  if (m.icc) extra.push(pngChunk('iCCP', concat([ascii('ICC profile\0'), new Uint8Array([0]), await zlib(m.icc, 'deflate')])));
  else extra.push(...m.colorChunks);
  if (m.exif) extra.push(pngChunk('eXIf', m.exif));
  if (m.xmp) extra.push(pngChunk('iTXt', concat([ascii('XML:com.adobe.xmp\0'), new Uint8Array([0, 0, 0, 0]), m.xmp])));
  if (!extra.length) return b;
  const drop = new Set(['iCCP', 'sRGB', 'gAMA', 'cHRM', 'eXIf']);
  const parts = [b.subarray(0, 8)];
  for (const { type, raw } of pngChunks(b)) {
    if (drop.has(type)) continue;
    parts.push(raw);
    if (type === 'IHDR') parts.push(...extra);
  }
  return concat(parts);
}

function webpChunk(fourcc, data) {
  const parts = [ascii(fourcc), u32le(data.length), data];
  if (data.length & 1) parts.push(new Uint8Array([0]));
  return concat(parts);
}

function webpCanvas(chunks) {
  for (const { fourcc, data } of chunks) {
    if (fourcc === 'VP8X') return { w: 1 + (data[4] | (data[5] << 8) | (data[6] << 16)), h: 1 + (data[7] | (data[8] << 8) | (data[9] << 16)), alpha: (data[0] & 0x10) !== 0 };
    if (fourcc === 'VP8L') {
      const bits = readU32le(data, 1);
      return { w: (bits & 0x3fff) + 1, h: ((bits >>> 14) & 0x3fff) + 1, alpha: ((bits >>> 28) & 1) === 1 };
    }
    if (fourcc === 'VP8 ') return { w: (data[6] | (data[7] << 8)) & 0x3fff, h: (data[8] | (data[9] << 8)) & 0x3fff, alpha: chunks.some(c => c.fourcc === 'ALPH') };
  }
  return null;
}

function writeWebp(b, m) {
  if (!m.icc && !m.exif && !m.xmp) return b;
  const chunks = [...webpChunks(b)];
  const canvas = webpCanvas(chunks);
  if (!canvas) return b;
  const image = chunks.filter(c => !['VP8X', 'ICCP', 'EXIF', 'XMP '].includes(c.fourcc));
  const flags = (m.icc ? 0x20 : 0) | (canvas.alpha ? 0x10 : 0) | (m.exif ? 0x08 : 0) | (m.xmp ? 0x04 : 0);
  const w = canvas.w - 1, h = canvas.h - 1;
  const vp8x = new Uint8Array([flags, 0, 0, 0, w & 255, (w >>> 8) & 255, (w >>> 16) & 255, h & 255, (h >>> 8) & 255, (h >>> 16) & 255]);
  const body = concat([
    ascii('WEBP'),
    webpChunk('VP8X', vp8x),
    ...(m.icc ? [webpChunk('ICCP', m.icc)] : []),
    ...image.map(c => webpChunk(c.fourcc, c.data)),
    ...(m.exif ? [webpChunk('EXIF', m.exif)] : []),
    ...(m.xmp ? [webpChunk('XMP ', m.xmp)] : [])
  ]);
  return concat([ascii('RIFF'), u32le(body.length), body]);
}

export async function writeMetadata(bytes, format, selected) {
  if (format === 'jpeg') return writeJpeg(bytes, selected);
  if (format === 'png') return await writePng(bytes, selected);
  if (format === 'webp') return writeWebp(bytes, selected);
  return bytes;
}
