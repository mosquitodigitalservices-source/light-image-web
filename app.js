const STRINGS = {
  es: {
    lead: 'Importa imágenes y prepara paletas a partir de sus colores predominantes. Todo se procesa en tu navegador.',
    importTitle: 'Importación',
    browse: 'Examinar imágenes', folder: 'Seleccionar carpeta', clear: 'Limpiar',
    count: n => n === 1 ? '1 imagen' : `${n} imágenes`,
    colorsTitle: 'Colores de la paleta', amount: 'Cantidad de colores',
    exportTitle: 'Exportación', headerPh: 'Encabezado del PDF',
    titles: 'Títulos de imagen', exportBtn: 'Export PDF',
    bgTitle: 'Color del fondo', brightness: 'Brillo',
    resultsTitle: 'Resultados', palette: 'Paleta de colores',
    empty: 'Importa imágenes para ver sus paletas.',
    importHint: 'También puedes soltar imágenes o una carpeta en cualquier parte de la página. PNG, JPEG, WebP, TIFF y HEIC.',
    aboutTool: 'Información sobre Color Palette', aboutImport: 'Información sobre cómo añadir imágenes', aboutPreview: 'Información sobre cómo ordenar las imágenes',
    ignored: n => n === 1 ? '1 archivo no compatible se ignoró.' : `${n} archivos no compatibles se ignoraron.`,
    needImages: 'Importa al menos una imagen para exportar.',
    dropHint: 'Suelta las imágenes para importarlas',
    previewTitle: 'Vista previa del PDF',
    previewSub: 'Arrastra las imágenes o usa clic derecho para cambiar el orden.',
    cancel: 'Cancelar', exportFinal: 'Exportar PDF', exporting: 'Generando PDF…', close: 'Cerrar',
    moveForward: 'Mover adelante', moveBack: 'Mover atrás', moveFirst: 'Mover al principio', moveLast: 'Mover al final',
    page: (i, n) => `imagen ${i} de ${n}`,
    sheet: (i, n) => `Página ${i} / ${n}`,
    fileName: 'paleta'
  },
  en: {
    lead: 'Import images and build palettes from their dominant colors. Everything runs in your browser.',
    importTitle: 'Import',
    browse: 'Browse images', folder: 'Choose folder', clear: 'Clear',
    count: n => n === 1 ? '1 image' : `${n} images`,
    colorsTitle: 'Palette colors', amount: 'Number of colors',
    exportTitle: 'Export', headerPh: 'PDF header',
    titles: 'Image titles', exportBtn: 'Export PDF',
    bgTitle: 'Background color', brightness: 'Brightness',
    resultsTitle: 'Results', palette: 'Color palette',
    empty: 'Import images to see their palettes.',
    importHint: 'You can also drop images or a folder anywhere on the page. PNG, JPEG, WebP, TIFF and HEIC.',
    aboutTool: 'About Color Palette', aboutImport: 'About adding images', aboutPreview: 'About reordering images',
    ignored: n => n === 1 ? '1 unsupported file was skipped.' : `${n} unsupported files were skipped.`,
    needImages: 'Import at least one image to export.',
    dropHint: 'Drop images to import them',
    previewTitle: 'PDF preview',
    previewSub: 'Drag images or right-click to change the order.',
    cancel: 'Cancel', exportFinal: 'Export PDF', exporting: 'Creating PDF…', close: 'Close',
    moveForward: 'Move forward', moveBack: 'Move back', moveFirst: 'Move to start', moveLast: 'Move to end',
    page: (i, n) => `image ${i} of ${n}`,
    sheet: (i, n) => `Page ${i} / ${n}`,
    fileName: 'palette'
  }
};

const STORE_KEY = 'lightimage.colorpalette';
const LANG_KEY = 'lightimage.lang';
const COUNTS = [4, 8, 16, 24, 32];
const IMAGE_EXT = /\.(png|jpe?g|tiff?|heic|heif|webp)$/i;
const PAGE = { w: 297, h: 210, m: 12 };
const PT = 0.3528;

const state = { lang: 'es', count: 8, hsv: [0, 0, 1], header: '', titles: true, items: [] };
let nextId = 1;

const $ = id => document.getElementById(id);
const t = (key, ...args) => {
  const v = STRINGS[state.lang][key];
  return typeof v === 'function' ? v(...args) : v;
};

function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    if (saved.lang in STRINGS) state.lang = saved.lang;
    if (COUNTS.includes(saved.count)) state.count = saved.count;
    if (Array.isArray(saved.hsv) && saved.hsv.length === 3) state.hsv = saved.hsv;
    if (typeof saved.header === 'string') state.header = saved.header;
    if (typeof saved.titles === 'boolean') state.titles = saved.titles;
    const lang = localStorage.getItem(LANG_KEY);
    if (lang in STRINGS) state.lang = lang;
  } catch {}
}
function savePrefs() {
  try {
    const { lang, count, hsv, header, titles } = state;
    localStorage.setItem(STORE_KEY, JSON.stringify({ lang, count, hsv, header, titles }));
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

function applyLang() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === state.lang));
  $('seg').setAttribute('aria-label', t('amount'));
  updateCount();
  renderResults();
}

// ---------- Color math ----------
const hex = rgb => '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
function hsvToRgb([h, s, v]) {
  const f = n => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return [f(5), f(3), f(1)].map(x => Math.round(x * 255));
}
function rgbToHsv([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, max ? d / max : 0, max];
}
const luminance = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const bgRgb = () => hsvToRgb(state.hsv);

function mulberry32(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let x = Math.imul(seed ^ seed >>> 15, 1 | seed);
    x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
    return ((x ^ x >>> 14) >>> 0) / 4294967296;
  };
}

// k-means++ over downsampled pixels; colors sorted by how much of the image they cover.
function extractPalette(px, k) {
  const n = px.length / 3;
  if (!n) return [];
  const rnd = mulberry32(n * 31 + k);
  const cent = [];
  let first = Math.floor(rnd() * n);
  cent.push([px[first * 3], px[first * 3 + 1], px[first * 3 + 2]]);
  const dist = new Float64Array(n).fill(Infinity);
  while (cent.length < k) {
    const c = cent[cent.length - 1];
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const dr = px[i * 3] - c[0], dg = px[i * 3 + 1] - c[1], db = px[i * 3 + 2] - c[2];
      const dd = dr * dr + dg * dg + db * db;
      if (dd < dist[i]) dist[i] = dd;
      sum += dist[i];
    }
    if (!sum) break;
    let r = rnd() * sum, j = 0;
    for (; j < n - 1; j++) { r -= dist[j]; if (r <= 0) break; }
    cent.push([px[j * 3], px[j * 3 + 1], px[j * 3 + 2]]);
  }
  const K = cent.length, sums = new Float64Array(K * 3), cnt = new Uint32Array(K);
  for (let it = 0; it < 12; it++) {
    sums.fill(0); cnt.fill(0);
    for (let i = 0; i < n; i++) {
      const r = px[i * 3], g = px[i * 3 + 1], b = px[i * 3 + 2];
      let best = 0, bestD = Infinity;
      for (let c = 0; c < K; c++) {
        const dr = r - cent[c][0], dg = g - cent[c][1], db = b - cent[c][2];
        const dd = dr * dr + dg * dg + db * db;
        if (dd < bestD) { bestD = dd; best = c; }
      }
      sums[best * 3] += r; sums[best * 3 + 1] += g; sums[best * 3 + 2] += b; cnt[best]++;
    }
    let moved = 0;
    for (let c = 0; c < K; c++) {
      if (!cnt[c]) continue;
      const next = [sums[c * 3] / cnt[c], sums[c * 3 + 1] / cnt[c], sums[c * 3 + 2] / cnt[c]];
      moved += Math.abs(next[0] - cent[c][0]) + Math.abs(next[1] - cent[c][1]) + Math.abs(next[2] - cent[c][2]);
      cent[c] = next;
    }
    if (moved < 1) break;
  }
  return cent
    .map((c, i) => ({ rgb: c.map(Math.round), n: cnt[i] }))
    .filter(c => c.n)
    .sort((a, b) => b.n - a.n)
    .map(c => c.rgb);
}

// ---------- Import ----------
function samplePixels(img) {
  const s = Math.min(1, 160 / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * s)), h = Math.max(1, Math.round(img.naturalHeight * s));
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data, out = [];
  for (let i = 0; i < d.length; i += 4) if (d[i + 3] >= 128) out.push(d[i], d[i + 1], d[i + 2]);
  return new Uint8Array(out);
}

async function loadItem(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  try {
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e;
  }
  const samples = samplePixels(img);
  return { id: nextId++, name: file.name, url, img, samples, palette: extractPalette(samples, state.count) };
}

async function importFiles(list) {
  const files = [...list]
    .filter(f => !f.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  let ignored = 0;
  for (const f of files) {
    if (!IMAGE_EXT.test(f.name)) { ignored++; continue; }
    try {
      state.items.push(await loadItem(f));
    } catch {
      ignored++;
    }
  }
  updateCount();
  renderResults();
  if (ignored) showNotice(t('ignored', ignored));
}

function updateCount() {
  const n = state.items.length;
  $('count').textContent = n ? t('count', n) : '';
  $('clear').disabled = !n;
}

function showNotice(text) {
  $('noticeText').textContent = text;
  $('notice').hidden = false;
}

// ---------- Results ----------
function renderResults() {
  $('empty').hidden = state.items.length > 0;
  $('results').replaceChildren(...state.items.map(item => {
    const card = document.createElement('article');
    card.className = 'card';
    const name = document.createElement('p');
    name.className = 'fname';
    name.textContent = item.name;
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.name;
    const label = document.createElement('p');
    label.className = 'plabel';
    label.textContent = t('palette');
    const sw = document.createElement('div');
    sw.className = 'swatches';
    for (const rgb of item.palette) {
      const s = document.createElement('div');
      s.className = 'sw';
      s.innerHTML = `<span style="background:${hex(rgb)}"></span><code>${hex(rgb)}</code>`;
      sw.append(s);
    }
    card.append(name, img, label, sw);
    return card;
  }));
}

// ---------- Background wheel ----------
const wheelCanvas = $('wheelCanvas');
function drawWheel() {
  const size = wheelCanvas.width, R = size / 2, ctx = wheelCanvas.getContext('2d');
  const img = ctx.createImageData(size, size), v = state.hsv[2];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - R + 0.5, dy = y - R + 0.5, r = Math.hypot(dx, dy), p = (y * size + x) * 4;
      if (r > R) continue;
      const [cr, cg, cb] = hsvToRgb([(Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360, r / R, v]);
      img.data[p] = cr; img.data[p + 1] = cg; img.data[p + 2] = cb;
      img.data[p + 3] = Math.min(1, R - r) * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}
function updateBackground() {
  const [h, s, v] = state.hsv, rgb = bgRgb(), half = 66;
  const a = h * Math.PI / 180;
  $('knob').style.left = `${half + Math.cos(a) * s * half}px`;
  $('knob').style.top = `${half + Math.sin(a) * s * half}px`;
  $('knob').style.background = hex(rgb);
  $('bgDot').style.background = hex(rgb);
  if (document.activeElement !== $('hexIn')) $('hexIn').value = hex(rgb);
  $('value').value = Math.round(v * 100);
  $('value').style.setProperty('--track', hex(hsvToRgb([h, s, 1])));
}
function pickFromWheel(e) {
  const b = wheelCanvas.getBoundingClientRect(), half = b.width / 2;
  const dx = e.clientX - b.left - half, dy = e.clientY - b.top - half;
  state.hsv = [(Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360, Math.min(1, Math.hypot(dx, dy) / half), state.hsv[2]];
  updateBackground();
}

// ---------- Page composition (shared by preview and PDF) ----------
// 2×2 grid per A4 landscape page, measured from the Light Image PDF export (mm).
const GRID = { m: 11.3, gapX: 7, headerY: 7.8, top: 18, pitch: 97.3, imgScale: 0.85, titleGap: 2.2, swGap: 6.7, swH: 5.75, swSpace: 1 };
const PER_PAGE = 4;

function pagesOf(items) {
  const pages = [];
  for (let i = 0; i < items.length; i += PER_PAGE) pages.push(items.slice(i, i + PER_PAGE));
  return pages;
}

function composePage(items) {
  const G = GRID, bg = bgRgb();
  const ink = luminance(bg) > 0.55 ? [20, 22, 26] : [255, 255, 255];
  const colW = (PAGE.w - 2 * G.m - G.gapX) / 2, boxW = colW * G.imgScale, boxH = boxW * 9 / 16;
  const L = { bg, texts: [], cells: [] };
  if (state.header.trim()) {
    L.texts.push({ text: state.header.trim(), x: G.m, y: G.headerY, size: 16, bold: true, color: ink });
  }
  items.forEach((item, i) => {
    const cx = G.m + (i % 2) * (colW + G.gapX), base = G.top + Math.floor(i / 2) * G.pitch;
    const boxX = cx + (colW - boxW) / 2, boxY = base + G.titleGap;
    const ar = item.img.naturalWidth / item.img.naturalHeight;
    let iw = boxW, ih = iw / ar;
    if (ih > boxH) { ih = boxH; iw = ih * ar; }
    if (state.titles) L.texts.push({ text: item.name, x: boxX, y: base, size: 10, bold: true, color: ink });
    const n = item.palette.length, rows = n > 16 ? 2 : 1, perRow = Math.ceil(n / rows);
    const sw = (colW - G.swSpace * (perRow - 1)) / perRow, swTop = boxY + boxH + G.swGap;
    const bottom = swTop + rows * G.swH + (rows - 1) * G.swSpace;
    L.cells.push({
      item,
      image: { x: boxX + (boxW - iw) / 2, y: boxY + (boxH - ih) / 2, w: iw, h: ih },
      swatches: item.palette.map((rgb, k) => ({
        x: cx + (k % perRow) * (sw + G.swSpace), y: swTop + Math.floor(k / perRow) * (G.swH + G.swSpace), w: sw, h: G.swH, rgb
      })),
      rect: { x: cx, y: base - 4.5, w: colW, h: bottom - base + 4.5 }
    });
  });
  return L;
}

function drawPagePreview(canvas, items) {
  const L = composePage(items), s = canvas.width / PAGE.w, ctx = canvas.getContext('2d');
  ctx.fillStyle = hex(L.bg);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const tx of L.texts) {
    ctx.font = `${tx.bold ? 'bold ' : ''}${tx.size * PT * s}px Helvetica, Arial, sans-serif`;
    ctx.fillStyle = hex(tx.color);
    ctx.fillText(tx.text, tx.x * s, tx.y * s);
  }
  for (const cell of L.cells) {
    const im = cell.image;
    ctx.drawImage(cell.item.img, im.x * s, im.y * s, im.w * s, im.h * s);
    for (const sw of cell.swatches) {
      ctx.fillStyle = hex(sw.rgb);
      ctx.fillRect(sw.x * s, sw.y * s, sw.w * s, sw.h * s);
    }
  }
  return L;
}

function jpegFor(item) {
  if (item.jpeg) return item.jpeg;
  const s = Math.min(1, 2400 / Math.max(item.img.naturalWidth, item.img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = Math.round(item.img.naturalWidth * s);
  c.height = Math.round(item.img.naturalHeight * s);
  c.getContext('2d').drawImage(item.img, 0, 0, c.width, c.height);
  item.jpeg = c.toDataURL('image/jpeg', 0.9);
  return item.jpeg;
}

function exportPdf() {
  const doc = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  pagesOf(state.items).forEach((items, i) => {
    if (i) doc.addPage();
    const L = composePage(items);
    doc.setFillColor(...L.bg);
    doc.rect(0, 0, PAGE.w, PAGE.h, 'F');
    for (const tx of L.texts) {
      doc.setFont('helvetica', tx.bold ? 'bold' : 'normal');
      doc.setFontSize(tx.size);
      doc.setTextColor(...tx.color);
      doc.text(tx.text, tx.x, tx.y);
    }
    for (const cell of L.cells) {
      const im = cell.image;
      doc.addImage(jpegFor(cell.item), 'JPEG', im.x, im.y, im.w, im.h);
      for (const sw of cell.swatches) {
        doc.setFillColor(...sw.rgb);
        doc.rect(sw.x, sw.y, sw.w, sw.h, 'F');
      }
    }
  });
  const base = state.header.trim().replace(/[\\/:*?"<>|]+/g, '').slice(0, 60) || t('fileName');
  doc.save(`${base}.pdf`);
}

// ---------- Preview dialog and reordering ----------
let dragFrom = null, ctxIndex = null, lastFocus = null;

function moveItem(from, to) {
  if (to < 0 || to >= state.items.length || from === to) return;
  const [it] = state.items.splice(from, 1);
  state.items.splice(to, 0, it);
  renderPages(to);
  renderResults();
}

function renderPages(focusIndex) {
  const pages = pagesOf(state.items), total = state.items.length;
  const pct = (v, of) => `${v / of * 100}%`;
  $('pages').replaceChildren(...pages.map((items, p) => {
    const wrap = document.createElement('div');
    wrap.className = 'page';
    const sheet = document.createElement('div');
    sheet.className = 'sheet';
    const c = document.createElement('canvas');
    c.width = 1188; c.height = 840;
    const L = drawPagePreview(c, items);
    sheet.append(c);
    L.cells.forEach((cell, k) => {
      const i = p * PER_PAGE + k, slot = document.createElement('div');
      slot.className = 'slot';
      slot.draggable = true;
      slot.tabIndex = 0;
      slot.dataset.index = i;
      slot.setAttribute('aria-label', `${cell.item.name}, ${t('page', i + 1, total)}`);
      Object.assign(slot.style, {
        left: pct(cell.rect.x, PAGE.w), top: pct(cell.rect.y, PAGE.h),
        width: pct(cell.rect.w, PAGE.w), height: pct(cell.rect.h, PAGE.h)
      });
      sheet.append(slot);
    });
    const label = document.createElement('p');
    label.textContent = t('sheet', p + 1, pages.length);
    wrap.append(sheet, label);
    return wrap;
  }));
  if (focusIndex != null) $('pages').querySelector(`.slot[data-index="${focusIndex}"]`)?.focus();
}

function openModal() {
  if (!state.items.length) { showNotice(t('needImages')); return; }
  lastFocus = document.activeElement;
  $('modal').hidden = false;
  renderPages();
  $('saveBtn').focus();
}
function closeModal() {
  closeCtx();
  $('modal').hidden = true;
  lastFocus?.focus();
}

function clearMarkers() {
  document.querySelectorAll('.slot.before,.slot.after').forEach(p => p.classList.remove('before', 'after'));
}
const slotOf = e => e.target.closest?.('.slot');

$('pages').addEventListener('dragstart', e => {
  const p = slotOf(e);
  if (!p) return;
  dragFrom = +p.dataset.index;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', String(dragFrom));
  p.classList.add('dragging');
});
$('pages').addEventListener('dragover', e => {
  const p = slotOf(e);
  if (dragFrom == null || !p) return;
  e.preventDefault();
  const r = p.getBoundingClientRect(), after = e.clientX > r.left + r.width / 2;
  clearMarkers();
  p.classList.add(after ? 'after' : 'before');
});
$('pages').addEventListener('drop', e => {
  const p = slotOf(e);
  if (dragFrom == null || !p) return;
  e.preventDefault();
  const target = +p.dataset.index, after = p.classList.contains('after');
  let to = after ? target + 1 : target;
  if (dragFrom < to) to--;
  const from = dragFrom;
  dragFrom = null;
  moveItem(from, to);
});
$('pages').addEventListener('dragend', () => {
  dragFrom = null;
  clearMarkers();
  document.querySelectorAll('.slot.dragging').forEach(p => p.classList.remove('dragging'));
});

function openCtx(index, x, y) {
  ctxIndex = index;
  const last = state.items.length - 1, menu = $('ctx');
  menu.querySelector('[data-move="forward"]').disabled = index === 0;
  menu.querySelector('[data-move="first"]').disabled = index === 0;
  menu.querySelector('[data-move="back"]').disabled = index === last;
  menu.querySelector('[data-move="last"]').disabled = index === last;
  menu.hidden = false;
  const r = menu.getBoundingClientRect();
  menu.style.left = `${Math.min(x, innerWidth - r.width - 8)}px`;
  menu.style.top = `${Math.min(y, innerHeight - r.height - 8)}px`;
  menu.querySelector('button:not(:disabled)')?.focus();
}
function closeCtx() {
  $('ctx').hidden = true;
  ctxIndex = null;
}

$('pages').addEventListener('contextmenu', e => {
  const p = slotOf(e);
  if (!p) return;
  e.preventDefault();
  const r = p.getBoundingClientRect();
  const fromKeyboard = e.clientX === 0 && e.clientY === 0;
  openCtx(+p.dataset.index, fromKeyboard ? r.left + 16 : e.clientX, fromKeyboard ? r.top + 16 : e.clientY);
});
$('ctx').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b || b.disabled || ctxIndex == null) return;
  const i = ctxIndex, last = state.items.length - 1;
  const to = { forward: i - 1, back: i + 1, first: 0, last }[b.dataset.move];
  closeCtx();
  moveItem(i, to);
});
document.addEventListener('pointerdown', e => {
  if (!$('ctx').hidden && !$('ctx').contains(e.target)) closeCtx();
});
$('ctx').addEventListener('keydown', e => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  e.preventDefault();
  const items = [...$('ctx').querySelectorAll('button:not(:disabled)')];
  const i = items.indexOf(document.activeElement);
  items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!$('ctx').hidden) {
    const i = ctxIndex;
    closeCtx();
    $('pages').querySelector(`.slot[data-index="${i}"]`)?.focus();
  } else if (!$('modal').hidden) {
    closeModal();
  }
});

// ---------- Drop anywhere ----------
let dragDepth = 0;
const hasFiles = e => [...(e.dataTransfer?.types || [])].includes('Files');
addEventListener('dragenter', e => {
  if (!hasFiles(e)) return;
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
addEventListener('drop', e => {
  if (!hasFiles(e)) return;
  e.preventDefault();
  dragDepth = 0;
  $('dropOverlay').hidden = true;
  if ($('modal').hidden) importFiles(e.dataTransfer.files);
});

// ---------- Controls ----------
$('pickFiles').addEventListener('click', () => $('fileInput').click());
$('pickFolder').addEventListener('click', () => $('folderInput').click());
for (const id of ['fileInput', 'folderInput']) {
  $(id).addEventListener('change', e => {
    importFiles(e.target.files);
    e.target.value = '';
  });
}
$('clear').addEventListener('click', () => {
  state.items.forEach(it => URL.revokeObjectURL(it.url));
  state.items = [];
  $('notice').hidden = true;
  updateCount();
  renderResults();
});
$('noticeClose').addEventListener('click', () => { $('notice').hidden = true; });

document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
  state.lang = b.dataset.lang;
  savePrefs();
  applyLang();
}));

function updateSeg() {
  $('seg').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', +b.dataset.n === state.count));
}
$('seg').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b || +b.dataset.n === state.count) return;
  state.count = +b.dataset.n;
  savePrefs();
  updateSeg();
  setTimeout(() => {
    state.items.forEach(it => { it.palette = extractPalette(it.samples, state.count); });
    renderResults();
  });
});

$('header').addEventListener('input', e => { state.header = e.target.value; savePrefs(); });
$('titles').addEventListener('change', e => { state.titles = e.target.checked; savePrefs(); });
$('exportBtn').addEventListener('click', openModal);
$('modalClose').addEventListener('click', closeModal);
$('cancelBtn').addEventListener('click', closeModal);
$('modal').addEventListener('click', e => { if (e.target === $('modal')) closeModal(); });
$('saveBtn').addEventListener('click', () => {
  const b = $('saveBtn');
  b.disabled = true;
  b.textContent = t('exporting');
  setTimeout(() => {
    try {
      exportPdf();
      closeModal();
    } finally {
      b.disabled = false;
      b.textContent = t('exportFinal');
    }
  }, 30);
});

let wheelDown = false;
wheelCanvas.addEventListener('pointerdown', e => {
  wheelDown = true;
  wheelCanvas.setPointerCapture(e.pointerId);
  pickFromWheel(e);
});
wheelCanvas.addEventListener('pointermove', e => { if (wheelDown) pickFromWheel(e); });
wheelCanvas.addEventListener('pointerup', () => { wheelDown = false; savePrefs(); });
$('value').addEventListener('input', e => {
  state.hsv = [state.hsv[0], state.hsv[1], e.target.value / 100];
  drawWheel();
  updateBackground();
});
$('value').addEventListener('change', savePrefs);
$('hexIn').addEventListener('change', e => {
  const m = e.target.value.trim().match(/^#?([0-9a-f]{6})$/i);
  if (m) {
    state.hsv = rgbToHsv([0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16)));
    drawWheel();
    savePrefs();
  }
  updateBackground();
  e.target.value = hex(bgRgb());
});

loadPrefs();
$('header').value = state.header;
$('titles').checked = state.titles;
updateSeg();
drawWheel();
updateBackground();
applyLang();
