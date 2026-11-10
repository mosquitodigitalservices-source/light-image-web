import { crc32 } from './metadata.js';

const STRINGS = {
  es: {
    lead: 'Prepara entregas optimizadas sin alterar dimensiones ni archivos originales. Todo se procesa en tu navegador.',
    addImages: 'Añadir imágenes', addFolder: 'Añadir carpeta',
    aboutTool: 'Información sobre Compressor', aboutImport: 'Información sobre cómo añadir imágenes',
    dropHint: 'También puedes soltar imágenes o una carpeta en cualquier parte de la página. JPG, PNG, WebP, HEIC y HEIF.',
    dropOverlay: 'Suelta las imágenes', close: 'Cerrar',
    compTitle: 'Compresión', compSub: 'Calidad y conservación', preset: 'Preset',
    keepMeta: 'Conservar metadatos', keepIcc: 'Conservar perfil de color',
    qualityAria: 'Calidad del encoder', qualityLabel: q => `Calidad: ${q}`,
    sum_lossless: 'Lossless', sum_highQuality: 'Alta calidad visual', sum_balanced: 'Equilibrio recomendado', sum_smallFile: 'Archivo más pequeño', sum_custom: q => `Custom — Quality ${q}`,
    det_lossless: 'Los píxeles se conservan cuando el formato admite compresión sin pérdida.',
    det_highQuality: 'Pensado para fotografía, portfolios y entregas de alta calidad.',
    det_balanced: 'Buen equilibrio entre calidad visual y tamaño de archivo.',
    det_smallFile: 'Mayor reducción de tamaño sin utilizar valores extremadamente destructivos.',
    det_custom: 'La calidad se ha seleccionado manualmente.',
    formatTitle: 'Formato', formatSub: 'Salida y dimensiones', outputFormat: 'Formato de salida', keepFormat: 'Mantener formato original',
    noResize: 'Sin redimensionado.', noResizeDetail: 'Se conservarán la anchura, la altura y la relación de aspecto originales.',
    heicNote: 'La escritura HEIC no está disponible en esta versión.',
    destTitle: 'Destino', destSub: 'Carpeta de salida',
    chooseDest: 'Seleccionar carpeta', changeDest: 'Cambiar carpeta', grantDest: 'Dar acceso', removeDest: 'Quitar',
    destNone: 'Sin carpeta: los resultados se descargarán en un ZIP.',
    destZipOnly: 'Este navegador no puede guardar en una carpeta: los resultados se descargarán en un ZIP.',
    destLabel: 'Destino', destNeedsAccess: 'Pulsa «Dar acceso» para volver a usar esta carpeta.',
    destHint: 'Elige una carpeta para guardar ahí las imágenes comprimidas, o déjalo sin carpeta para descargarlas en un ZIP. Chrome no deja usar directamente el Escritorio, Documentos, Descargas, tu carpeta de usuario ni la raíz de un disco: elige o crea una carpeta dentro de ellos.',
    destHintCancelled: 'Si Chrome ha dicho que «la carpeta no se puede abrir», es porque es una carpeta del sistema. Elige o crea una carpeta dentro de ella (por ejemplo, Escritorio › Comprimidas), o sigue sin carpeta y descarga un ZIP.',
    progTitle: 'Progreso', progSub: 'Procesamiento general', progressAria: 'Progreso general',
    ofTotal: (a, b) => `${a} de ${b}`,
    sumCompleted: 'Comprimidas', sumOriginal: 'Original', sumResult: 'Resultado', sumSaved: 'Ahorro',
    compress: 'Comprimir', compressing: 'Comprimiendo…', downloadZip: 'Descargar ZIP', clearList: 'Limpiar lista',
    originalsSafe: 'Los archivos originales no se modificarán.',
    filesTitle: 'Archivos', filesSub: 'Cola de procesamiento', added: n => `${n} añadidos`,
    colName: 'Nombre', colOriginal: 'Original', colResult: 'Resultado', colReduction: 'Reducción', colStatus: 'Estado',
    emptyTitle: 'Sin imágenes', emptyDetail: 'Añade imágenes o arrástralas aquí para comenzar.',
    st_waiting: 'En espera', st_processing: 'Procesando', st_completed: 'Completado', st_failed: 'Error',
    iccKept: 'Perfil ICC conservado', iccDropped: 'Perfil ICC descartado',
    savedAs: name => `Guardado como ${name}`,
    msgUnsupported: n => `${n} archivo(s) no compatible(s) se ignoraron.`,
    msgDuplicates: n => `${n} archivo(s) ya estaban en la lista.`,
    msgFailed: n => `El procesamiento terminó, pero ${n} archivo(s) no pudieron comprimirse. Consulta su estado en la lista.`,
    msgDone: n => `Se comprimieron correctamente ${n} archivo(s).`,
    msgZip: n => `Se comprimieron correctamente ${n} archivo(s). El ZIP se ha descargado.`,
    msgAccess: 'No se pudo acceder a la carpeta de destino. Vuelve a seleccionarla.',
    err_heicUnavailable: () => 'La escritura en formato HEIC no está disponible.',
    err_losslessJpeg: () => 'El modo Lossless no está disponible para JPEG.',
    err_transparencyJpeg: () => 'El formato JPEG no admite transparencia.',
    err_noReduction: () => 'No se consiguió reducir el tamaño.',
    err_unreadable: () => 'No se pudo leer la imagen.',
    err_unsupportedInBrowser: () => 'Este navegador no puede abrir este formato (HEIC solo funciona en Safari).',
    err_exists: name => `El archivo ${name} ya existe.`,
    err_writeFailed: name => `No se pudo guardar ${name}.`,
    err_failed: m => `No se pudo comprimir: ${m}`
  },
  en: {
    lead: 'Prepare optimized deliveries without changing dimensions or original files. Everything runs in your browser.',
    addImages: 'Add images', addFolder: 'Add folder',
    aboutTool: 'About Compressor', aboutImport: 'About adding images',
    dropHint: 'You can also drop images or a folder anywhere on the page. JPG, PNG, WebP, HEIC and HEIF.',
    dropOverlay: 'Drop the images', close: 'Close',
    compTitle: 'Compression', compSub: 'Quality and preservation', preset: 'Preset',
    keepMeta: 'Keep metadata', keepIcc: 'Keep color profile',
    qualityAria: 'Encoder quality', qualityLabel: q => `Quality: ${q}`,
    sum_lossless: 'Lossless', sum_highQuality: 'High visual quality', sum_balanced: 'Recommended balance', sum_smallFile: 'Smaller file', sum_custom: q => `Custom — Quality ${q}`,
    det_lossless: 'Pixels are kept when the format supports lossless compression.',
    det_highQuality: 'Made for photography, portfolios and high-quality deliveries.',
    det_balanced: 'A good balance between visual quality and file size.',
    det_smallFile: 'A bigger size reduction without extremely destructive values.',
    det_custom: 'The quality was set manually.',
    formatTitle: 'Format', formatSub: 'Output and dimensions', outputFormat: 'Output format', keepFormat: 'Keep original format',
    noResize: 'No resizing.', noResizeDetail: 'The original width, height and aspect ratio are kept.',
    heicNote: 'Writing HEIC isn’t available in this version.',
    destTitle: 'Destination', destSub: 'Output folder',
    chooseDest: 'Choose folder', changeDest: 'Change folder', grantDest: 'Grant access', removeDest: 'Remove',
    destNone: 'No folder: results will download as a ZIP.',
    destZipOnly: 'This browser can’t save into a folder: results will download as a ZIP.',
    destLabel: 'Destination', destNeedsAccess: 'Click “Grant access” to use this folder again.',
    destHint: 'Choose a folder to save the compressed images there, or leave it empty to download them as a ZIP. Chrome doesn’t allow your Desktop, Documents, Downloads, home folder or a drive’s root: pick or create a folder inside them.',
    destHintCancelled: 'If Chrome said the folder “can’t be opened”, it’s a system folder. Pick or create a folder inside it (for example, Desktop › Compressed), or carry on without a folder and download a ZIP.',
    progTitle: 'Progress', progSub: 'Overall processing', progressAria: 'Overall progress',
    ofTotal: (a, b) => `${a} of ${b}`,
    sumCompleted: 'Compressed', sumOriginal: 'Original', sumResult: 'Result', sumSaved: 'Saved',
    compress: 'Compress', compressing: 'Compressing…', downloadZip: 'Download ZIP', clearList: 'Clear list',
    originalsSafe: 'Original files aren’t modified.',
    filesTitle: 'Files', filesSub: 'Processing queue', added: n => `${n} added`,
    colName: 'Name', colOriginal: 'Original', colResult: 'Result', colReduction: 'Reduction', colStatus: 'Status',
    emptyTitle: 'No images', emptyDetail: 'Add images or drag them here to start.',
    st_waiting: 'Waiting', st_processing: 'Processing', st_completed: 'Done', st_failed: 'Error',
    iccKept: 'ICC profile kept', iccDropped: 'ICC profile removed',
    savedAs: name => `Saved as ${name}`,
    msgUnsupported: n => `${n} unsupported file(s) were skipped.`,
    msgDuplicates: n => `${n} file(s) were already in the list.`,
    msgFailed: n => `Processing finished, but ${n} file(s) couldn’t be compressed. Check their status in the list.`,
    msgDone: n => `${n} file(s) compressed.`,
    msgZip: n => `${n} file(s) compressed. The ZIP has been downloaded.`,
    msgAccess: 'Couldn’t access the destination folder. Choose it again.',
    err_heicUnavailable: () => 'Writing HEIC isn’t available.',
    err_losslessJpeg: () => 'Lossless mode isn’t available for JPEG.',
    err_transparencyJpeg: () => 'JPEG doesn’t support transparency.',
    err_noReduction: () => 'No size reduction achieved.',
    err_unreadable: () => 'The image couldn’t be read.',
    err_unsupportedInBrowser: () => 'This browser can’t open this format (HEIC only works in Safari).',
    err_exists: name => `${name} already exists.`,
    err_writeFailed: name => `Couldn’t save ${name}.`,
    err_failed: m => `Couldn’t compress: ${m}`
  }
};

const LANG_KEY = 'lightimage.lang';
const DEST_KEY = 'compressor.destination';
const MAX_WORKERS = 3;
const PRESET_QUALITY = { lossless: 100, highQuality: 92, balanced: 85, smallFile: 72 };
const EXTENSIONS = { jpeg: 'jpg', png: 'png', webp: 'webp', heic: 'heic' };
const FORMAT_NAMES = { jpeg: 'JPEG', png: 'PNG', webp: 'WebP', heic: 'HEIC' };
const fsSupported = typeof window.showDirectoryPicker === 'function';

const $ = id => document.getElementById(id);
let lang = 'es';
const t = (key, ...args) => {
  const v = STRINGS[lang][key];
  return typeof v === 'function' ? v(...args) : v;
};

const S = {
  items: [],
  settings: { preset: 'balanced', quality: 85, preservesMetadata: true, preservesColorProfile: true, outputFormat: 'keepOriginal' },
  dest: null,
  pickCancelled: false,
  processing: false,
  processed: 0,
  total: 0,
  message: null,
  zip: null
};
let nextId = 1;

function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  el.append(...kids.flat().filter(c => c != null && c !== false));
  return el;
}

const formatOf = name => {
  const ext = name.split('.').pop().toLowerCase();
  return ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : ext === 'png' ? 'png' : ext === 'webp' ? 'webp' : ext === 'heic' || ext === 'heif' ? 'heic' : null;
};
const outputFormatFor = item => S.settings.outputFormat === 'keepOriginal' ? item.format : S.settings.outputFormat;
const baseName = name => name.includes('.') ? name.slice(0, name.lastIndexOf('.')) : name;
function bytes(n) {
  if (n < 1000) return `${n} B`;
  const units = ['KB', 'MB', 'GB'];
  let v = n, u = -1;
  do { v /= 1000; u++; } while (v >= 1000 && u < units.length - 1);
  return `${v.toLocaleString(lang, { maximumFractionDigits: v < 10 ? 1 : 0 })} ${units[u]}`;
}
const pct = v => `${v.toLocaleString(lang, { maximumFractionDigits: 1 })} %`;
const errText = (key, args = []) => {
  const fn = STRINGS[lang][`err_${key}`];
  return fn ? fn(...args) : t('err_failed', args[0] ?? key);
};

// ---------- Settings (same rules as CompressionSettings and its view) ----------
const usesVisualQuality = () => S.settings.preset !== 'lossless' && S.settings.outputFormat !== 'png';
function applyPreset(preset) {
  S.settings.preset = preset;
  if (preset in PRESET_QUALITY) S.settings.quality = PRESET_QUALITY[preset];
}
function isPresetAvailable(preset) {
  if (preset !== 'lossless') return true;
  if (S.settings.outputFormat === 'jpeg') return false;
  if (S.settings.outputFormat === 'keepOriginal') return !S.items.some(i => i.format === 'jpeg');
  return true;
}

function renderSettings() {
  const s = S.settings, sel = $('preset');
  for (const opt of sel.options) {
    opt.disabled = !isPresetAvailable(opt.value);
    opt.hidden = opt.value === 'custom' && s.preset !== 'custom';
  }
  sel.value = s.preset;
  $('presetSummary').textContent = t(`sum_${s.preset}`, s.quality);
  $('presetDetail').textContent = t(`det_${s.preset}`);
  $('preservesMetadata').checked = s.preservesMetadata;
  $('preservesColorProfile').checked = s.preservesColorProfile;
  const visual = usesVisualQuality();
  $('quality').value = Math.min(100, Math.max(60, s.quality));
  $('quality').disabled = !visual || S.processing;
  $('quality').closest('.quality').classList.toggle('disabled', !visual);
  $('qualityLabel').textContent = visual ? t('qualityLabel', s.quality) : 'Lossless';
  $('outputFormat').value = s.outputFormat;
  $('heicNote').hidden = s.outputFormat !== 'heic';
  for (const id of ['preset', 'preservesMetadata', 'preservesColorProfile', 'outputFormat']) $(id).disabled = S.processing;
}

// ---------- Import ----------
function addFiles(files) {
  const existing = new Set(S.items.map(i => i.key));
  let unsupported = 0, duplicates = 0, added = 0;
  for (const file of files) {
    if (file.name.startsWith('.')) continue;
    const format = formatOf(file.name);
    if (!format || !file.size) { unsupported++; continue; }
    const key = `${file.webkitRelativePath || file.name}|${file.size}|${file.lastModified}`;
    if (existing.has(key)) { duplicates++; continue; }
    existing.add(key);
    S.items.push({ id: nextId++, key, file, name: file.name, size: file.size, format, status: 'waiting' });
    added++;
  }
  const parts = [];
  if (unsupported) parts.push(t('msgUnsupported', unsupported));
  if (duplicates) parts.push(t('msgDuplicates', duplicates));
  if (parts.length) setMessage('information', parts.join(' '));
  else if (added) setMessage(null);
  if (S.settings.preset === 'lossless' && !isPresetAvailable('lossless')) applyPreset('balanced');
  renderAll();
}

async function filesFromDrop(dataTransfer) {
  const entries = [...dataTransfer.items].map(i => i.webkitGetAsEntry?.()).filter(Boolean);
  if (!entries.length) return [...dataTransfer.files];
  const fileOf = entry => new Promise((resolve, reject) => entry.file(resolve, reject));
  const out = [];
  for (const entry of entries) {
    if (entry.isFile) out.push(await fileOf(entry));
    else if (entry.isDirectory) {
      // Like the app, only the folder's own files (not subfolders).
      const reader = entry.createReader();
      for (;;) {
        const batch = await new Promise((resolve, reject) => reader.readEntries(resolve, reject));
        if (!batch.length) break;
        for (const child of batch) if (child.isFile) out.push(await fileOf(child));
      }
    }
  }
  return out;
}

// ---------- Destination ----------
function idb(mode, fn) {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open('lightimage', 1);
    open.onupgradeneeded = () => open.result.createObjectStore('kv');
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      let tx, req;
      try {
        tx = db.transaction('kv', mode);
        req = fn(tx.objectStore('kv'));
      } catch (e) {
        db.close();
        reject(e);
        return;
      }
      tx.oncomplete = () => { db.close(); resolve(req.result); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    };
  });
}
async function restoreDestination() {
  try {
    const handle = await idb('readonly', s => s.get(DEST_KEY));
    if (handle) S.dest = { handle, name: handle.name, permission: await handle.queryPermission({ mode: 'readwrite' }) };
  } catch {}
}
async function selectDestination() {
  let handle;
  try {
    handle = await window.showDirectoryPicker({ id: 'compressor', mode: 'readwrite', startIn: 'desktop' });
  } catch (e) {
    // Chrome reports its blocked system folders as a plain cancel.
    if (e.name === 'AbortError') S.pickCancelled = true;
    else setMessage('error', t('msgAccess'));
    renderDest();
    return;
  }
  S.pickCancelled = false;
  S.dest = { handle, name: handle.name, permission: 'granted' };
  try { await idb('readwrite', s => s.put(handle, DEST_KEY)); } catch {}
  renderAll();
}
async function removeDestination() {
  S.dest = null;
  try { await idb('readwrite', s => s.delete(DEST_KEY)); } catch {}
  renderAll();
}
async function ensurePermission() {
  if (!S.dest) return false;
  let p = await S.dest.handle.queryPermission({ mode: 'readwrite' });
  if (p !== 'granted') p = await S.dest.handle.requestPermission({ mode: 'readwrite' });
  S.dest.permission = p;
  renderDest();
  return p === 'granted';
}

async function existsIn(dir, name) {
  try {
    await dir.getFileHandle(name);
    return true;
  } catch (e) {
    return e.name !== 'NotFoundError';
  }
}
// `name_compressed.ext`, then `name_compressed_2.ext`… skipping existing and reserved names.
async function uniqueName(item, format, reserved, dir) {
  const ext = EXTENSIONS[format], base = baseName(item.name);
  for (let n = 1; ; n++) {
    const name = `${base}_compressed${n === 1 ? '' : `_${n}`}.${ext}`;
    if (reserved.has(name.toLowerCase())) continue;
    if (dir && await existsIn(dir, name)) continue;
    reserved.add(name.toLowerCase());
    return name;
  }
}

// ---------- Compression ----------
function workerPool(size) {
  const workers = Array.from({ length: size }, () => new Worker(new URL('./worker.js', import.meta.url), { type: 'module' }));
  const pending = new Map();
  let seq = 0;
  workers.forEach(w => {
    w.onmessage = ({ data }) => { pending.get(data.id)?.(data); pending.delete(data.id); };
    w.onerror = e => {
      e.preventDefault();
      for (const [id, resolve] of pending) resolve({ id, ok: false, key: 'failed', args: [e.message || 'worker error'] });
      pending.clear();
    };
  });
  return {
    run(index, job) {
      const id = ++seq;
      return new Promise(resolve => {
        pending.set(id, resolve);
        workers[index].postMessage({ id, ...job });
      });
    },
    close() { workers.forEach(w => w.terminate()); }
  };
}

async function compressAll() {
  if (!S.items.length || S.processing) return;
  const dir = fsSupported && S.dest ? S.dest.handle : null;
  if (dir && !(await ensurePermission().catch(() => false))) {
    setMessage('error', t('msgAccess'));
    return;
  }
  S.processing = true;
  S.processed = 0;
  S.total = S.items.length;
  S.zip = null;
  setMessage(null);
  for (const item of S.items) Object.assign(item, { status: 'waiting', result: null, error: null });
  renderAll();

  const reserved = new Set(), zipEntries = [];
  const jobs = [];
  for (const item of S.items) {
    const format = outputFormatFor(item);
    jobs.push({ item, format, fileName: await uniqueName(item, format, reserved, dir) });
  }
  const settings = {
    quality: S.settings.quality,
    lossless: S.settings.preset === 'lossless',
    preservesMetadata: S.settings.preservesMetadata,
    preservesColorProfile: S.settings.preservesColorProfile
  };
  const pool = workerPool(Math.min(MAX_WORKERS, jobs.length));
  let next = 0;

  async function lane(index) {
    while (next < jobs.length) {
      const { item, format, fileName } = jobs[next++];
      item.status = 'processing';
      renderFiles();
      const res = await pool.run(index, { file: item.file, sourceFormat: item.format, outputFormat: format, settings });
      if (res.ok) {
        try {
          if (dir) {
            if (await existsIn(dir, fileName)) throw Object.assign(new Error(), { key: 'exists' });
            const handle = await dir.getFileHandle(fileName, { create: true });
            const writable = await handle.createWritable();
            await writable.write(res.output);
            await writable.close();
          } else {
            zipEntries.push({ name: fileName, data: res.output });
          }
          item.status = 'completed';
          item.result = {
            fileName, size: res.output.length, reduction: (item.size - res.output.length) / item.size * 100,
            width: res.width, height: res.height, quality: res.appliedQuality, icc: res.colorProfilePreserved
          };
        } catch (e) {
          item.status = 'failed';
          item.error = { key: e.key || 'writeFailed', args: [fileName] };
        }
      } else {
        item.status = 'failed';
        item.error = { key: res.key, args: res.args };
      }
      S.processed++;
      renderFiles();
      renderProgress();
    }
  }
  await Promise.all(Array.from({ length: Math.min(MAX_WORKERS, jobs.length) }, (_, i) => lane(i)));
  pool.close();

  S.processing = false;
  const failed = S.items.filter(i => i.status === 'failed').length;
  const done = S.items.length - failed;
  if (!dir && zipEntries.length) {
    S.zip = zipFiles(zipEntries);
    downloadZip();
  }
  if (failed) setMessage('error', t('msgFailed', failed));
  else setMessage('success', !dir ? t('msgZip', done) : t('msgDone', done));
  renderAll();
}

// Stored (uncompressed) ZIP: the images are already compressed.
function zipFiles(entries) {
  const enc = new TextEncoder(), now = new Date();
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const local = [], central = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const n = enc.encode(name), crc = (crc32(data) ^ 0xffffffff) >>> 0;
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);
    lh.setUint16(4, 20, true);
    lh.setUint16(6, 0x0800, true);
    lh.setUint16(10, time, true);
    lh.setUint16(12, date, true);
    lh.setUint32(14, crc, true);
    lh.setUint32(18, data.length, true);
    lh.setUint32(22, data.length, true);
    lh.setUint16(26, n.length, true);
    local.push(new Uint8Array(lh.buffer), n, data);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true);
    ch.setUint16(4, 0x031e, true);
    ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true);
    ch.setUint16(12, time, true);
    ch.setUint16(14, date, true);
    ch.setUint32(16, crc, true);
    ch.setUint32(20, data.length, true);
    ch.setUint32(24, data.length, true);
    ch.setUint16(28, n.length, true);
    ch.setUint32(38, ((0o100644 << 16) >>> 0), true);
    ch.setUint32(42, offset, true);
    central.push(new Uint8Array(ch.buffer), n);
    offset += 30 + n.length + data.length;
  }
  const size = central.reduce((s, a) => s + a.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, entries.length, true);
  end.setUint16(10, entries.length, true);
  end.setUint32(12, size, true);
  end.setUint32(16, offset, true);
  return new Blob([...local, ...central, new Uint8Array(end.buffer)], { type: 'application/zip' });
}
function downloadZip() {
  if (!S.zip) return;
  const a = h('a', { href: URL.createObjectURL(S.zip), download: 'compressed.zip' });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

function clearList() {
  if (S.processing) return;
  S.items = [];
  S.processed = 0;
  S.total = 0;
  S.zip = null;
  setMessage(null);
  renderAll();
}

// ---------- Rendering ----------
function setMessage(kind, text) {
  S.message = kind ? { kind, text } : null;
  renderBanner();
}
function renderBanner() {
  const b = $('banner');
  b.hidden = !S.message;
  if (!S.message) return;
  b.className = `banner ${S.message.kind}`;
  $('bannerText').textContent = S.message.text;
}

function renderDest() {
  const info = $('destInfo'), btn = $('destBtn');
  const folderIcon = () => {
    const span = document.createElement('span');
    span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>';
    return span.firstChild;
  };
  if (!fsSupported) {
    info.replaceChildren(h('span', { text: t('destZipOnly') }));
    btn.hidden = true;
    $('destHint').hidden = true;
    return;
  }
  btn.hidden = false;
  btn.disabled = S.processing;
  if (!S.dest) {
    info.replaceChildren(folderIcon(), h('span', { text: t('destNone') }));
    $('destBtnLabel').textContent = t('chooseDest');
  } else {
    const needsAccess = S.dest.permission !== 'granted';
    const remove = h('button', { type: 'button', class: 'link', text: t('removeDest') });
    remove.addEventListener('click', removeDestination);
    remove.disabled = S.processing;
    info.replaceChildren(folderIcon(), h('span', {}, `${t('destLabel')}: `, h('strong', { text: S.dest.name }), needsAccess ? ` — ${t('destNeedsAccess')}` : ''), remove);
    $('destBtnLabel').textContent = needsAccess ? t('grantDest') : t('changeDest');
  }
  const hint = $('destHint');
  hint.hidden = !!S.dest;
  hint.textContent = S.pickCancelled ? t('destHintCancelled') : t('destHint');
  hint.classList.toggle('warn', S.pickCancelled);
}

function renderProgress() {
  const total = S.total || S.items.length;
  const p = total ? S.processed / total : 0;
  $('progCount').textContent = t('ofTotal', S.processed, total);
  $('progressFill').style.width = `${p * 100}%`;
  $('progressBar').setAttribute('aria-valuenow', Math.round(p * 100));
  const done = S.items.filter(i => i.status === 'completed');
  const summary = $('summary');
  summary.hidden = !done.length;
  if (done.length) {
    const orig = done.reduce((n, i) => n + i.size, 0), out = done.reduce((n, i) => n + i.result.size, 0);
    summary.replaceChildren(
      h('dt', { text: t('sumCompleted') }), h('dd', { text: String(done.length) }),
      h('dt', { text: t('sumOriginal') }), h('dd', { text: bytes(orig) }),
      h('dt', { text: t('sumResult') }), h('dd', { text: bytes(out) }),
      h('dt', { text: t('sumSaved') }), h('dd', { text: `${bytes(Math.max(orig - out, 0))} (${pct((orig - out) / orig * 100)})` }));
  }
}

function renderFiles() {
  $('filesCount').textContent = S.items.length ? t('added', S.items.length) : '';
  $('emptyState').hidden = S.items.length > 0;
  $('files').replaceChildren(...S.items.map(item => {
    const r = item.result;
    const li = h('li', {},
      h('div', { class: 'file-row' },
        h('div', { class: 'file-name' }, h('strong', { text: item.name, title: item.name }), h('span', { text: FORMAT_NAMES[item.format] })),
        h('span', { 'data-label': t('colOriginal'), text: bytes(item.size) }),
        h('span', { 'data-label': t('colResult'), class: r ? '' : 'dim', text: r ? bytes(r.size) : '—' }),
        h('span', { 'data-label': t('colReduction'), class: r ? 'reduction' : 'dim', text: r ? pct(r.reduction) : '—' }),
        h('span', { class: `pill ${item.status}`, title: item.error ? errText(item.error.key, item.error.args) : '', text: t(`st_${item.status}`) })));
    if (r) {
      const parts = [`${r.width} × ${r.height} → ${r.width} × ${r.height}`, r.quality == null ? 'Lossless' : `Quality ${r.quality}`];
      if (r.icc != null) parts.push(r.icc ? t('iccKept') : t('iccDropped'));
      parts.push(t('savedAs', r.fileName));
      li.append(h('p', { class: 'file-detail', text: parts.join(' · ') }));
    } else if (item.error) {
      li.append(h('p', { class: 'file-detail err', text: errText(item.error.key, item.error.args) }));
    }
    return li;
  }));
}

function renderActions() {
  $('compressBtn').disabled = !S.items.length || S.processing;
  $('compressLabel').textContent = S.processing ? t('compressing') : t('compress');
  $('zipBtn').hidden = !S.zip || S.processing;
  $('clearBtn').disabled = !S.items.length || S.processing;
  $('addFilesBtn').disabled = S.processing;
  $('addFolderBtn').disabled = S.processing;
}

function renderAll() {
  renderSettings();
  renderDest();
  renderProgress();
  renderFiles();
  renderActions();
  renderBanner();
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  renderAll();
}

// ---------- Events ----------
$('addFilesBtn').addEventListener('click', () => $('fileInput').click());
$('addFolderBtn').addEventListener('click', () => $('folderInput').click());
$('fileInput').addEventListener('change', e => { addFiles([...e.target.files]); e.target.value = ''; });
$('folderInput').addEventListener('change', e => {
  // Only the folder's own files, like the app.
  addFiles([...e.target.files].filter(f => f.webkitRelativePath.split('/').length === 2));
  e.target.value = '';
});
$('bannerClose').addEventListener('click', () => setMessage(null));

$('preset').addEventListener('change', e => { applyPreset(e.target.value); renderSettings(); });
$('quality').addEventListener('input', e => {
  S.settings.quality = Math.min(100, Math.max(0, +e.target.value));
  S.settings.preset = 'custom';
  renderSettings();
});
$('preservesMetadata').addEventListener('change', e => { S.settings.preservesMetadata = e.target.checked; });
$('preservesColorProfile').addEventListener('change', e => { S.settings.preservesColorProfile = e.target.checked; });
$('outputFormat').addEventListener('change', e => {
  S.settings.outputFormat = e.target.value;
  if (e.target.value === 'png') applyPreset('lossless');
  else if (e.target.value === 'jpeg' && S.settings.preset === 'lossless') applyPreset('balanced');
  renderSettings();
});

$('destBtn').addEventListener('click', () => {
  if (S.dest && S.dest.permission !== 'granted') ensurePermission().catch(() => setMessage('error', t('msgAccess')));
  else selectDestination();
});
$('compressBtn').addEventListener('click', compressAll);
$('zipBtn').addEventListener('click', downloadZip);
$('clearBtn').addEventListener('click', clearList);

let dragDepth = 0;
const hasFiles = e => [...(e.dataTransfer?.types || [])].includes('Files');
addEventListener('dragenter', e => {
  if (!hasFiles(e) || S.processing) return;
  e.preventDefault();
  dragDepth++;
  $('dropOverlay').hidden = false;
});
addEventListener('dragleave', e => {
  if (!hasFiles(e)) return;
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) $('dropOverlay').hidden = true;
});
addEventListener('dragover', e => { if (hasFiles(e)) e.preventDefault(); });
addEventListener('drop', async e => {
  if (!hasFiles(e)) return;
  e.preventDefault();
  dragDepth = 0;
  $('dropOverlay').hidden = true;
  if (!S.processing) addFiles(await filesFromDrop(e.dataTransfer));
});

document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  applyLang();
}));

try {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved in STRINGS) lang = saved;
} catch {}
if (fsSupported) await restoreDestination();
applyLang();
