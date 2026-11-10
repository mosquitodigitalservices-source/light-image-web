'use strict';

const STRINGS = {
  es: {
    lead: 'Configura, revisa y genera una estructura lista para producción. Todo se procesa en tu navegador.',
    aboutTool: 'Información sobre Disktree', aboutDest: 'Información sobre el destino', aboutMulti: 'Información sobre DayXX_OF_DayXX', aboutSections: 'Información sobre cómo ordenar las secciones', aboutCreate: 'Información sobre Revisar y crear',
    template: 'Template', defaultTpl: 'Default', unsaved: 'Cambios sin guardar',
    saveNew: 'Guardar como nuevo', update: 'Actualizar', manage: 'Gestionar',
    projTitle: 'Proyecto',
    projectName: 'Nombre del proyecto', company: 'Productora',
    chooseDest: 'Seleccionar destino', changeDest: 'Cambiar destino', grantDest: 'Dar acceso',
    destPending: 'Destino pendiente', destLabel: 'Destino',
    destNeedsAccess: 'Pulsa «Dar acceso» para que el navegador vuelva a poder usar esta carpeta.',
    destZip: 'Este navegador no puede crear carpetas directamente: la estructura se descargará como ZIP.',
    destHint: 'Chrome no deja usar directamente el Escritorio, Documentos, Descargas, tu carpeta de usuario ni la raíz de un disco. Elige una carpeta dentro de ellos, o créala con «Nueva carpeta» en la ventana de selección (por ejemplo, Escritorio › Rodajes).',
    destHintCancelled: 'Si Chrome ha dicho que «la carpeta no se puede abrir», es porque es una carpeta del sistema. Vuelve a pulsar «Seleccionar destino» y elige o crea una carpeta dentro de ella (por ejemplo, Escritorio › Rodajes). También puedes seguir sin destino y descargar la estructura como ZIP.',
    datesTitle: 'Fechas y organización', datesCount: n => n === 1 ? '1 jornada seleccionada' : `${n} jornadas seleccionadas`,
    date: 'Fecha', addDate: 'Añadir fecha', removeDate: 'Eliminar fecha',
    nsd: 'NEXT SHOOTING DAY', searching: 'Buscando la última jornada creada…',
    ambiguous: 'Se encontraron varias referencias posibles. Selecciona la jornada correcta.', use: 'Usar',
    lastDay: 'Última jornada', lastDate: 'Última fecha', newDay: 'Nueva jornada', newDate: 'Nueva fecha',
    skipWeekends: 'Saltar fines de semana', addSuggested: 'Añadir jornada sugerida', addedDay: n => `Day${n} añadida a las fechas.`,
    manualDay: 'Última jornada (n.º)', manualDate: 'Fecha de esa jornada',
    nsdManualBrowser: 'Este navegador no puede leer tus carpetas. Escribe la última jornada creada y su fecha para proponer la siguiente.',
    nsdNoDest: 'Selecciona un destino para detectar la última jornada creada, o escríbela a mano.',
    nsdNoProject: 'Introduce el proyecto o la productora para localizar su carpeta, o escribe la última jornada a mano.',
    nsdNeedsAccess: 'Da acceso de nuevo al destino para detectar la última jornada, o escríbela a mano.',
    nsdNotFound: 'No se encontraron jornadas compatibles dentro del proyecto seleccionado. Puedes escribir la última jornada a mano.',
    format: 'Formato de fecha', prefix: 'Usar la fecha como prefijo', suffix: 'Usar la fecha como sufijo',
    multi: 'Usar formato DayXX_OF_DayXX', multiHelp: 'Las nuevas jornadas utilizan el formato DayXX.',
    numbered: 'Numerar las subcarpetas principales', sectionDate: 'Añadir la fecha como sufijo a las secciones',
    offset: 'Desplazamiento del día inicial',
    previewTitle: 'Vista previa',
    secTitle: 'Secciones', secCount: n => `${n} grupos`,
    secHelp: 'Arrastra cada sección por su asa ⋮⋮ o usa las flechas para cambiar el orden.', addSection: 'Añadir sección',
    sectionName: 'Nombre de la sección', folderName: 'Nombre de carpeta',
    includeSection: 'Incluir sección', includeFolder: 'Incluir carpeta', addFolder: 'Añadir carpeta a la sección',
    moveUp: 'Subir sección', moveDown: 'Bajar sección', removeSection: 'Eliminar sección', reorder: 'Reordenar sección',
    readyReview: 'LISTO PARA REVISAR', readyZip: 'LISTO PARA DESCARGAR', destPendingTitle: 'DESTINO PENDIENTE',
    createHint: 'Primero se mostrará un resumen y se comprobarán los conflictos.', review: 'Revisar y crear',
    reviewTitle: 'Confirmar estructura', planned: n => `${n} carpetas previstas`,
    inDest: name => `en «${name}»`, asZip: 'se descargará como ZIP',
    checkedFolders: 'CARPETAS QUE SE COMPROBARÁN', exists: 'ya existe', fileExists: 'es un archivo',
    existingNote: n => n === 1 ? '1 carpeta ya existe y se omitirá.' : `${n} carpetas ya existen y se omitirán.`,
    blockingNote: 'Hay archivos con el mismo nombre que algunas carpetas. Renómbralos o cambia la estructura antes de crearla.',
    zipNote: 'Descomprime el ZIP en el disco de destino para obtener la estructura.',
    cancel: 'Cancelar', zip: 'Descargar ZIP', create: 'Crear carpetas', creating: 'Creando…', close: 'Cerrar', ok: 'Aceptar',
    createdTitle: 'Estructura creada',
    createdMsg: (c, path, s) => `Se crearon ${c} carpetas en ${path}. Se omitieron ${s} carpetas que ya existían.`,
    zipTitle: 'ZIP descargado', zipMsg: (n, file) => `${file} contiene ${n} carpetas. Descomprímelo en el disco de destino.`,
    errorTitle: 'No se pudo crear la estructura', tplErrorTitle: 'Templates',
    saveNewTitle: 'Guardar nuevo template', renameTitle: 'Renombrar template', tplName: 'Nombre del template',
    save: 'Guardar', rename: 'Renombrar', nameRequired: 'Escribe un nombre.',
    loadDefaultQ: '¿Cargar Default?', loadOtherQ: '¿Cargar otro template?', unsavedMsg: 'La configuración del Editor contiene cambios sin guardar.',
    loadDefault: 'Cargar Default', load: 'Cargar template',
    deleteQ: name => `¿Eliminar «${name}»?`, deleteMsg: 'Se eliminará únicamente el template. No se borrará ninguna carpeta del sistema.',
    delete: 'Eliminar', duplicate: 'Duplicar', copyOf: name => `${name} copia`, loadShort: 'Cargar',
    manageTitle: 'Templates',
    tplEmpty: 'Guarda la configuración actual del Editor para crear el primer template.',
    modified: d => `Modificado ${d}`, loaded: 'cargado',
    importTpl: 'Importar', exportTpl: 'Exportar todo', exportOne: 'Exportar', importedName: 'Template importado',
    imported: (added, skipped) => {
      const text = added === 1 ? 'Se importó 1 template.' : `Se importaron ${added} templates.`;
      if (!skipped) return text;
      if (!added) return skipped === 1 ? 'El template ya estaba en la lista.' : `Los ${skipped} templates ya estaban en la lista.`;
      return `${text} ${skipped === 1 ? '1 ya estaba' : `${skipped} ya estaban`} en la lista.`;
    },
    importError: 'El archivo no es un archivo de templates válido.',
    tplSaveError: 'No se pudieron guardar los templates en este navegador.',
    err_destinationMissing: () => 'Selecciona una carpeta de destino.',
    err_accessDenied: () => 'No se pudo acceder al destino. Comprueba los permisos o vuelve a seleccionarlo.',
    err_invalidName: n => `El nombre de carpeta «${n}» no es válido. Evita nombres vacíos, «.» y «..», barras, dos puntos y caracteres de control.`,
    err_fileConflict: p => `No se puede crear «${p}» porque ya existe un archivo con ese nombre.`,
    err_creationFailed: (p, r) => `No se pudo crear «${p}»: ${r}`,
    err_projectUnavailable: () => 'La carpeta del proyecto no existe todavía en el destino.',
    err_projectNotDir: () => 'La ruta del proyecto no es una carpeta.',
    err_dateNotEncoded: () => 'La configuración actual no incluye la fecha en el nombre de las jornadas.',
    err_invalidDate: n => `La jornada «${n}» contiene una fecha no válida.`,
    err_invalidReference: () => 'La fecha de la jornada de referencia no es válida.',
    err_invalidCustom: () => 'La fecha seleccionada no es válida.',
    err_dayOverflow: () => 'No se puede incrementar el número de jornada.',
    err_duplicateDay: n => `La jornada Day${n} ya existe.`,
    err_duplicateDate: d => `Ya existe una jornada para la fecha ${d}.`,
    err_pendingDates: () => 'Elimina las fechas pendientes antes de añadir la jornada sugerida.',
    level: n => `nivel ${n}`
  },
  en: {
    lead: 'Set up, review and generate a production-ready folder structure. Everything runs in your browser.',
    aboutTool: 'About Disktree', aboutDest: 'About the destination', aboutMulti: 'About DayXX_OF_DayXX', aboutSections: 'About reordering sections', aboutCreate: 'About Review and create',
    template: 'Template', defaultTpl: 'Default', unsaved: 'Unsaved changes',
    saveNew: 'Save as new', update: 'Update', manage: 'Manage',
    projTitle: 'Project',
    projectName: 'Project name', company: 'Production company',
    chooseDest: 'Choose destination', changeDest: 'Change destination', grantDest: 'Grant access',
    destPending: 'Destination pending', destLabel: 'Destination',
    destNeedsAccess: 'Click “Grant access” so the browser can use this folder again.',
    destZip: 'This browser can’t create folders directly: the structure will download as a ZIP.',
    destHint: 'Chrome doesn’t allow your Desktop, Documents, Downloads, home folder or a drive’s root to be used directly. Pick a folder inside them, or make one with “New Folder” in the picker (for example, Desktop › Shoots).',
    destHintCancelled: 'If Chrome said the folder “can’t be opened”, it’s a system folder. Click “Choose destination” again and pick or create a folder inside it (for example, Desktop › Shoots). You can also carry on without a destination and download the structure as a ZIP.',
    datesTitle: 'Dates and organization', datesCount: n => n === 1 ? '1 shooting day selected' : `${n} shooting days selected`,
    date: 'Date', addDate: 'Add date', removeDate: 'Remove date',
    nsd: 'NEXT SHOOTING DAY', searching: 'Looking for the latest shooting day…',
    ambiguous: 'Several possible references were found. Pick the right shooting day.', use: 'Use',
    lastDay: 'Latest day', lastDate: 'Latest date', newDay: 'New day', newDate: 'New date',
    skipWeekends: 'Skip weekends', addSuggested: 'Add suggested day', addedDay: n => `Day${n} added to the dates.`,
    manualDay: 'Latest day (no.)', manualDate: 'Date of that day',
    nsdManualBrowser: 'This browser can’t read your folders. Enter the latest shooting day and its date to get the next one.',
    nsdNoDest: 'Choose a destination to detect the latest shooting day, or enter it by hand.',
    nsdNoProject: 'Enter the project or production company to find its folder, or enter the latest day by hand.',
    nsdNeedsAccess: 'Grant access to the destination again to detect the latest day, or enter it by hand.',
    nsdNotFound: 'No matching shooting days were found in this project. You can enter the latest day by hand.',
    format: 'Date format', prefix: 'Use the date as a prefix', suffix: 'Use the date as a suffix',
    multi: 'Use DayXX_OF_DayXX format', multiHelp: 'New shooting days use the DayXX format.',
    numbered: 'Number the main subfolders', sectionDate: 'Add the date as a suffix to sections',
    offset: 'Starting day offset',
    previewTitle: 'Preview',
    secTitle: 'Sections', secCount: n => `${n} groups`,
    secHelp: 'Drag a section by its ⋮⋮ handle or use the arrows to change the order.', addSection: 'Add section',
    sectionName: 'Section name', folderName: 'Folder name',
    includeSection: 'Include section', includeFolder: 'Include folder', addFolder: 'Add folder to section',
    moveUp: 'Move section up', moveDown: 'Move section down', removeSection: 'Remove section', reorder: 'Reorder section',
    readyReview: 'READY TO REVIEW', readyZip: 'READY TO DOWNLOAD', destPendingTitle: 'DESTINATION PENDING',
    createHint: 'You’ll see a summary and a conflict check first.', review: 'Review and create',
    reviewTitle: 'Confirm structure', planned: n => `${n} folders planned`,
    inDest: name => `in “${name}”`, asZip: 'will download as a ZIP',
    checkedFolders: 'FOLDERS TO CHECK', exists: 'exists', fileExists: 'is a file',
    existingNote: n => n === 1 ? '1 folder already exists and will be skipped.' : `${n} folders already exist and will be skipped.`,
    blockingNote: 'Some folder names match existing files. Rename them or change the structure before creating it.',
    zipNote: 'Unzip it on the destination drive to get the structure.',
    cancel: 'Cancel', zip: 'Download ZIP', create: 'Create folders', creating: 'Creating…', close: 'Close', ok: 'OK',
    createdTitle: 'Structure created',
    createdMsg: (c, path, s) => `Created ${c} folders in ${path}. Skipped ${s} folders that already existed.`,
    zipTitle: 'ZIP downloaded', zipMsg: (n, file) => `${file} contains ${n} folders. Unzip it on the destination drive.`,
    errorTitle: 'Couldn’t create the structure', tplErrorTitle: 'Templates',
    saveNewTitle: 'Save new template', renameTitle: 'Rename template', tplName: 'Template name',
    save: 'Save', rename: 'Rename', nameRequired: 'Enter a name.',
    loadDefaultQ: 'Load Default?', loadOtherQ: 'Load another template?', unsavedMsg: 'The Editor configuration has unsaved changes.',
    loadDefault: 'Load Default', load: 'Load template',
    deleteQ: name => `Delete “${name}”?`, deleteMsg: 'Only the template is deleted. No folders on your system are removed.',
    delete: 'Delete', duplicate: 'Duplicate', copyOf: name => `${name} copy`, loadShort: 'Load',
    manageTitle: 'Templates',
    tplEmpty: 'Save the current Editor configuration to create your first template.',
    modified: d => `Modified ${d}`, loaded: 'loaded',
    importTpl: 'Import', exportTpl: 'Export all', exportOne: 'Export', importedName: 'Imported template',
    imported: (added, skipped) => {
      const text = added === 1 ? 'Imported 1 template.' : `Imported ${added} templates.`;
      if (!skipped) return text;
      if (!added) return skipped === 1 ? 'That template was already in the list.' : `All ${skipped} templates were already in the list.`;
      return `${text} ${skipped} ${skipped === 1 ? 'was' : 'were'} already in the list.`;
    },
    importError: 'That file isn’t a valid templates file.',
    tplSaveError: 'Couldn’t save templates in this browser.',
    err_destinationMissing: () => 'Choose a destination folder.',
    err_accessDenied: () => 'Couldn’t access the destination. Check permissions or choose it again.',
    err_invalidName: n => `The folder name “${n}” isn’t valid. Avoid empty names, “.” and “..”, slashes, colons and control characters.`,
    err_fileConflict: p => `Can’t create “${p}” because a file with that name already exists.`,
    err_creationFailed: (p, r) => `Couldn’t create “${p}”: ${r}`,
    err_projectUnavailable: () => 'The project folder doesn’t exist in the destination yet.',
    err_projectNotDir: () => 'The project path isn’t a folder.',
    err_dateNotEncoded: () => 'The current settings don’t include the date in shooting-day names.',
    err_invalidDate: n => `The shooting day “${n}” has an invalid date.`,
    err_invalidReference: () => 'The reference shooting day has an invalid date.',
    err_invalidCustom: () => 'The selected date isn’t valid.',
    err_dayOverflow: () => 'The shooting day number can’t be increased.',
    err_duplicateDay: n => `Shooting day Day${n} already exists.`,
    err_duplicateDate: d => `There’s already a shooting day for ${d}.`,
    err_pendingDates: () => 'Remove the pending dates before adding the suggested day.',
    level: n => `level ${n}`
  }
};

const LANG_KEY = 'lightimage.lang';
const TPL_KEY = 'lightimage.disktree.templates';
const DEST_KEY = 'disktree.destination';
const SCHEMA_VERSION = 1;
const FORMATS = ['YYYYMMDD', 'MMDDYYYY', 'DDMMYYYY'];
const fsSupported = typeof window.showDirectoryPicker === 'function';

const $ = id => document.getElementById(id);
let lang = 'es';
const t = (key, ...args) => {
  const v = STRINGS[lang][key];
  return typeof v === 'function' ? v(...args) : v;
};

const uuid = () => crypto.randomUUID().toUpperCase();
const clone = v => JSON.parse(JSON.stringify(v));

class DtError extends Error {
  constructor(key, ...args) {
    super(key);
    this.key = key;
    this.args = args;
  }
}
const errText = e => e instanceof DtError ? t(`err_${e.key}`, ...e.args) : (e?.message || String(e));

function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (typeof v !== 'string' && k in el) el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  el.append(...kids.flat().filter(c => c != null && c !== false));
  return el;
}

const ICONS = {
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  drive: '<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M5 13 7.5 5h9L19 13M7 17h.01"/>',
  grip: '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4"/>'
};
function icon(name) {
  const span = document.createElement('span');
  span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  return span.firstChild;
}

// ---------- Dates ----------
const pad = (n, w = 2) => String(n).padStart(w, '0');
function toDate({ y, m, d }) {
  const dt = new Date(2000, 0, 1);
  dt.setFullYear(y, m - 1, d);
  dt.setHours(0, 0, 0, 0);
  return dt;
}
const fromDate = dt => ({ y: dt.getFullYear(), m: dt.getMonth() + 1, d: dt.getDate() });
function validYmd(v) {
  if (!v || ![v.y, v.m, v.d].every(Number.isInteger)) return false;
  const dt = toDate(v);
  return dt.getFullYear() === v.y && dt.getMonth() === v.m - 1 && dt.getDate() === v.d;
}
const sameDay = (a, b) => a.y === b.y && a.m === b.m && a.d === b.d;
const cmpDate = (a, b) => toDate(a) - toDate(b);
function fromInput(value) {
  const m = /^(\d{4,})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!m) return null;
  const v = { y: +m[1], m: +m[2], d: +m[3] };
  return validYmd(v) ? v : null;
}
const toInput = v => `${pad(v.y, 4)}-${pad(v.m)}-${pad(v.d)}`;
const displayDate = v => toDate(v).toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' });

function formatDate(fmt, { y, m, d }) {
  if (fmt === 'MMDDYYYY') return pad(m) + pad(d) + pad(y, 4);
  if (fmt === 'DDMMYYYY') return pad(d) + pad(m) + pad(y, 4);
  return pad(y, 4) + pad(m) + pad(d);
}
function parseDateText(text, fmt) {
  if (!/^\d{8}$/.test(text)) return null;
  const n = (a, b) => parseInt(text.slice(a, b), 10);
  const v = fmt === 'MMDDYYYY' ? { m: n(0, 2), d: n(2, 4), y: n(4, 8) }
    : fmt === 'DDMMYYYY' ? { d: n(0, 2), m: n(2, 4), y: n(4, 8) }
    : { y: n(0, 4), m: n(4, 6), d: n(6, 8) };
  return validYmd(v) ? v : null;
}

// ---------- Configuration ----------
const DEFAULT_SECTIONS = [
  ['CameraRaw', [['Cam A'], ['Cam B'], ['Stills', false]]],
  ['Sound', [['Original'], ['Sound Reports']]],
  ['Transcodes', [['Cam A'], ['Cam B', false], ['Original Resolution']]],
  ['Stills', [['Original'], ['Light', false]]],
  ['DIT', [['Silverstack Reports'], ['DaVinci Resolve'], ['Sound Reports'], ['2AC Reports']]]
];
const defaultConfig = () => ({
  projectName: '',
  productionCompany: '',
  dateFormat: 'YYYYMMDD',
  usesDatePrefix: true,
  usesDateSuffix: false,
  usesMultiDayFolders: false,
  initialDayOffset: 0,
  usesNumberedSubfolders: true,
  usesDateSuffixInSections: false,
  sections: DEFAULT_SECTIONS.map(([name, items]) => ({
    id: uuid(), name, isEnabled: true,
    items: items.map(([n, on = true]) => ({ id: uuid(), name: n, isEnabled: on }))
  }))
});

// Same field order and shape as the Mac app's DisktreeTemplateConfiguration.
function normalizeConfig(c) {
  const bool = v => v === true;
  if (!c || typeof c !== 'object' || !Array.isArray(c.sections) || !FORMATS.includes(c.dateFormat)) return null;
  const str = v => typeof v === 'string' ? v : '';
  return {
    projectName: typeof c.projectName === 'string' ? c.projectName : null,
    productionCompany: str(c.productionCompany),
    dateFormat: c.dateFormat,
    usesDatePrefix: bool(c.usesDatePrefix),
    usesDateSuffix: bool(c.usesDateSuffix),
    usesMultiDayFolders: bool(c.usesMultiDayFolders),
    initialDayOffset: Number.isInteger(c.initialDayOffset) ? Math.min(99, Math.max(0, c.initialDayOffset)) : 0,
    usesNumberedSubfolders: bool(c.usesNumberedSubfolders),
    usesDateSuffixInSections: bool(c.usesDateSuffixInSections),
    sections: c.sections.map(s => ({
      id: str(s?.id) || uuid(),
      name: str(s?.name),
      isEnabled: bool(s?.isEnabled),
      items: (Array.isArray(s?.items) ? s.items : []).map(f => ({ id: str(f?.id) || uuid(), name: str(f?.name), isEnabled: bool(f?.isEnabled) }))
    }))
  };
}
const configKey = c => JSON.stringify({ ...c, projectName: c.projectName ?? '' });

// ---------- Tree (port of DisktreePreviewBuilder) ----------
const joined = (a, b) => [a, b].filter(Boolean).join('_');
const rootName = c => joined(c.projectName.trim(), c.productionCompany.trim()) || 'UNTITLED_PROJECT';
function affixed(name, dateText, c) {
  if (c.usesDatePrefix) return joined(dateText, name);
  if (c.usesDateSuffix) return joined(name, dateText);
  return name;
}
function buildSections(c, dateSuffix) {
  const project = c.projectName.trim();
  return c.sections.filter(s => s.isEnabled).map((s, i) => {
    const prefix = c.usesNumberedSubfolders ? `${pad(i + 1)}_` : '';
    const name = s.name.trim() || 'UNTITLED_SECTION';
    const projectSuffix = project ? `_${project}` : '';
    return {
      name: joined(prefix + name + projectSuffix, dateSuffix),
      children: s.items.filter(f => f.isEnabled).map(f => ({ name: f.name.trim() || 'UNTITLED_FOLDER', children: [] }))
    };
  });
}
function buildTree(c, dates, dayNameOverride) {
  const root = rootName(c);
  if (!dates.length) return { name: root, children: buildSections(c, '') };
  if (dates.length === 1) {
    const dateText = formatDate(c.dateFormat, dates[0]);
    const sections = buildSections(c, c.usesDateSuffixInSections ? dateText : '');
    if (dayNameOverride) {
      return { name: root, children: [{ name: affixed(dayNameOverride, dateText, c), children: sections }] };
    }
    return { name: affixed(root, dateText, c), children: sections };
  }
  const last = c.initialDayOffset + dates.length;
  return {
    name: root,
    children: dates.map((date, i) => {
      const n = c.initialDayOffset + i + 1;
      const dayName = c.usesMultiDayFolders ? `Day${pad(n)}_OF_Day${pad(last)}` : `Day${pad(n)}`;
      const dateText = formatDate(c.dateFormat, date);
      return { name: affixed(dayName, dateText, c), children: buildSections(c, c.usesDateSuffixInSections ? dateText : '') };
    })
  };
}
function flatten(node, depth = 0, parent = '', out = []) {
  const path = parent ? `${parent}/${node.name}` : node.name;
  out.push({ name: node.name, depth, path, hasChildren: node.children.length > 0 });
  node.children.forEach(child => flatten(child, depth + 1, path, out));
  return out;
}
function validName(name) {
  const trimmed = name.trim();
  return trimmed !== '' && trimmed !== '.' && trimmed !== '..'
    && !/[/:\u0000-\u001f\u007f-\u009f]/.test(name)
    && new TextEncoder().encode(name).length <= 255;
}

// ---------- Shooting days (port of the detection and next-day services) ----------
function parseDayName(name, c) {
  let re, dateAt, dayAt, totalAt = 0;
  const legacy = !c.usesMultiDayFolders;
  if (legacy && c.usesDatePrefix) {
    re = /^([0-9]{8})_Day([0-9]{2,})(?:_OF_Day([0-9]{2,}))?$/; dateAt = 1; dayAt = 2; totalAt = 3;
  } else if (legacy && c.usesDateSuffix) {
    re = /^Day([0-9]{2,})(?:_OF_Day([0-9]{2,}))?_([0-9]{8})$/; dayAt = 1; totalAt = 2; dateAt = 3;
  } else if (c.usesDatePrefix) {
    re = /^([0-9]{8})_Day([0-9]{2,})_OF_Day([0-9]{2,})$/; dateAt = 1; dayAt = 2; totalAt = 3;
  } else if (c.usesDateSuffix) {
    re = /^Day([0-9]{2,})_OF_Day([0-9]{2,})_([0-9]{8})$/; dayAt = 1; totalAt = 2; dateAt = 3;
  } else {
    return null;
  }
  const m = re.exec(name);
  if (!m) return null;
  return {
    dateText: m[dateAt],
    dayNumber: parseInt(m[dayAt], 10),
    width: m[dayAt].length,
    total: totalAt && m[totalAt] ? parseInt(m[totalAt], 10) : null
  };
}

async function detectShootingDays(projectHandle, c) {
  if (!c.usesDatePrefix && !c.usesDateSuffix) throw new DtError('dateNotEncoded');
  const refs = [];
  for await (const [name, entry] of projectHandle.entries()) {
    if (entry.kind !== 'directory' || name.startsWith('.')) continue;
    const parsed = parseDayName(name, c);
    if (!parsed) continue;
    const date = parseDateText(parsed.dateText, c.dateFormat);
    if (!date) throw new DtError('invalidDate', name);
    refs.push({ name, dayNumber: parsed.dayNumber, width: parsed.width, total: parsed.total, date });
  }
  if (!refs.length) return { kind: 'notFound' };
  refs.sort((a, b) => a.dayNumber === b.dayNumber ? (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : a.dayNumber - b.dayNumber);
  return isUnambiguous(refs, c.usesMultiDayFolders)
    ? { kind: 'found', latest: refs[refs.length - 1], existing: refs }
    : { kind: 'ambiguous', refs };
}
function isUnambiguous(refs, multi) {
  if (new Set(refs.map(r => r.dayNumber)).size !== refs.length) return false;
  if (multi) {
    const totals = new Set(refs.map(r => r.total).filter(v => v != null));
    if (totals.size !== 1 || !refs.every(r => r.total != null && r.total >= r.dayNumber)) return false;
  }
  for (let i = 1; i < refs.length; i++) if (!(cmpDate(refs[i - 1].date, refs[i].date) < 0)) return false;
  return true;
}

function suggestNextDay(ref, existing, fmt, skipWeekends, customDate) {
  const next = ref.dayNumber + 1;
  if (!Number.isSafeInteger(next)) throw new DtError('dayOverflow');
  if (existing.some(e => e.dayNumber === next)) throw new DtError('duplicateDay', next);
  if (!validYmd(ref.date)) throw new DtError('invalidReference');
  let date;
  if (customDate) {
    if (!validYmd(customDate)) throw new DtError('invalidCustom');
    date = customDate;
  } else {
    const dt = toDate(ref.date);
    dt.setDate(dt.getDate() + 1);
    if (skipWeekends) while (dt.getDay() === 0 || dt.getDay() === 6) dt.setDate(dt.getDate() + 1);
    date = fromDate(dt);
  }
  const dateText = formatDate(fmt, date);
  if (existing.some(e => sameDay(e.date, date))) throw new DtError('duplicateDate', dateText);
  const width = Math.max(ref.width, String(next).length);
  return { reference: ref, dayNumber: next, dayNumberText: pad(next, width), date, dateText };
}

// ---------- State ----------
const S = {
  cfg: defaultConfig(),
  dates: [],
  dest: null,
  nsdMode: 'manual',
  nsdMsg: 'nsdNoDest',
  nsd: { kind: 'empty' },
  skipWeekends: true,
  manual: { day: '', date: '' },
  override: null,
  acceptedCtx: null,
  acceptedId: null,
  templates: [],
  loadedId: null,
  baseline: null,
  defaultCfg: null
};
S.defaultCfg = clone(S.cfg);
S.baseline = configKey(S.cfg);

const contextKey = () => [
  S.dest ? `${S.dest.name}:${S.dest.permission}` : '',
  S.cfg.projectName, S.cfg.productionCompany, S.cfg.dateFormat,
  S.cfg.usesDatePrefix, S.cfg.usesDateSuffix, S.cfg.usesMultiDayFolders
].join('|');

// ---------- Destination (File System Access API, Chromium only) ----------
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
    if (!handle) return;
    S.dest = { handle, name: handle.name, permission: await handle.queryPermission({ mode: 'readwrite' }) };
  } catch {}
}

async function selectDestination() {
  let handle;
  try {
    handle = await window.showDirectoryPicker({ id: 'disktree', mode: 'readwrite', startIn: 'desktop' });
  } catch (e) {
    // Chrome reports its blocked system folders (Desktop, Documents, home…) as a plain cancel.
    if (e.name === 'AbortError') {
      S.pickCancelled = true;
      renderDest();
    } else {
      showMessage(t('errorTitle'), t('err_accessDenied'));
    }
    return;
  }
  S.pickCancelled = false;
  S.dest = { handle, name: handle.name, permission: 'granted' };
  try { await idb('readwrite', s => s.put(handle, DEST_KEY)); } catch {}
  renderDest();
  refreshNsd();
}

async function ensurePermission() {
  if (!S.dest) return false;
  let p = await S.dest.handle.queryPermission({ mode: 'readwrite' });
  if (p !== 'granted') p = await S.dest.handle.requestPermission({ mode: 'readwrite' });
  const changed = p !== S.dest.permission;
  S.dest.permission = p;
  if (changed) { renderDest(); refreshNsd(); }
  return p === 'granted';
}

// ---------- Next shooting day (port of the view model logic) ----------
let nsdToken = 0;
function setManual(msgKey) {
  S.nsdMode = 'manual';
  S.nsdMsg = msgKey;
  applyManual();
}

async function refreshNsd() {
  if (S.acceptedCtx) {
    if (S.acceptedCtx === contextKey()) return;
    clearAccepted();
  }
  const token = ++nsdToken, c = S.cfg;
  if (!fsSupported) return setManual('nsdManualBrowser');
  if (!S.dest) return setManual('nsdNoDest');
  if (!c.projectName.trim() && !c.productionCompany.trim()) return setManual('nsdNoProject');
  if (S.dest.permission !== 'granted') return setManual('nsdNeedsAccess');
  S.nsdMode = 'auto';
  S.nsd = { kind: 'loading' };
  renderNsd();
  try {
    let project;
    try {
      project = await S.dest.handle.getDirectoryHandle(rootName(c));
    } catch (e) {
      throw new DtError(e.name === 'NotFoundError' ? 'projectUnavailable' : e.name === 'TypeMismatchError' ? 'projectNotDir' : 'accessDenied');
    }
    const result = await detectShootingDays(project, c);
    if (token !== nsdToken) return;
    if (result.kind === 'notFound') return setManual('nsdNotFound');
    if (result.kind === 'ambiguous') S.nsd = { kind: 'ambiguous', refs: result.refs };
    else return makeProposal(result.latest, result.existing);
  } catch (e) {
    if (token !== nsdToken) return;
    if (e instanceof DtError && e.key === 'projectUnavailable') return setManual('nsdNotFound');
    S.nsd = { kind: 'unavailable', error: e };
  }
  renderNsd();
}

function applyManual() {
  const day = parseInt(S.manual.day, 10), date = fromInput(S.manual.date);
  if (!(day >= 0) || !date) {
    S.nsd = { kind: 'empty' };
    renderNsd();
    return;
  }
  const ref = { name: 'manual', dayNumber: day, width: Math.max(2, String(day).length), total: null, date };
  makeProposal(ref, [ref]);
}

function makeProposal(ref, existing, customDate) {
  try {
    const proposal = suggestNextDay(ref, existing, S.cfg.dateFormat, S.skipWeekends, customDate);
    S.nsd = { kind: 'ready', existing, proposal, validation: null };
  } catch (e) {
    S.nsd = S.nsd.kind === 'ready' ? { ...S.nsd, existing, validation: e } : { kind: 'unavailable', error: e };
  }
  renderNsd();
}

function addSuggestedDay() {
  if (S.nsd.kind !== 'ready') return;
  if (S.dates.length) {
    S.nsd = { ...S.nsd, validation: new DtError('pendingDates') };
    renderNsd();
    return;
  }
  const { existing, proposal } = S.nsd;
  const selected = { id: uuid(), ...proposal.date };
  S.dates = [selected];
  S.override = `Day${proposal.dayNumberText}`;
  S.acceptedCtx = contextKey();
  S.acceptedId = selected.id;
  S.nsd = { kind: 'added', existing, proposal };
  renderDates();
  renderNsd();
  renderPreview();
}

function clearAccepted() {
  if (S.override == null) return;
  if (S.acceptedId) S.dates = S.dates.filter(d => d.id !== S.acceptedId);
  S.override = null;
  S.acceptedCtx = null;
  S.acceptedId = null;
  restoreAccepted();
}
function restoreAccepted() {
  if (S.nsd.kind !== 'added') return;
  S.nsd = { kind: 'ready', existing: S.nsd.existing, proposal: S.nsd.proposal, validation: null };
  S.override = null;
  S.acceptedCtx = null;
  S.acceptedId = null;
}

function addCalendarDate() {
  clearAccepted();
  const date = fromInput($('calDate').value);
  if (date && !S.dates.some(d => sameDay(d, date))) {
    S.dates.push({ id: uuid(), ...date });
    S.dates.sort(cmpDate);
  }
  renderDates();
  renderNsd();
  renderPreview();
}
function removeDate(id) {
  S.dates = S.dates.filter(d => d.id !== id);
  if (!S.dates.length) restoreAccepted();
  renderDates();
  renderNsd();
  renderPreview();
}

// ---------- Templates ----------
function loadTemplates() {
  try {
    const store = JSON.parse(localStorage.getItem(TPL_KEY) || 'null');
    if (store?.schemaVersion === SCHEMA_VERSION && Array.isArray(store.templates)) {
      S.templates = store.templates.map(normalizeTemplate).filter(Boolean);
    }
  } catch {}
}
function persistTemplates() {
  try {
    localStorage.setItem(TPL_KEY, JSON.stringify({ schemaVersion: SCHEMA_VERSION, templates: S.templates }));
    return true;
  } catch {
    showMessage(t('tplErrorTitle'), t('tplSaveError'));
    return false;
  }
}
function normalizeTemplate(tp) {
  const configuration = normalizeConfig(tp?.configuration);
  if (!configuration || typeof tp.name !== 'string' || !tp.name.trim()) return null;
  const now = new Date().toISOString();
  return {
    id: typeof tp.id === 'string' && tp.id ? tp.id : uuid(),
    name: tp.name.trim(),
    createdAt: typeof tp.createdAt === 'string' ? tp.createdAt : now,
    modifiedAt: typeof tp.modifiedAt === 'string' ? tp.modifiedAt : now,
    configuration
  };
}
const hasUnsaved = () => configKey(S.cfg) !== S.baseline;
const currentTemplate = () => S.templates.find(tp => tp.id === S.loadedId);

function applyConfig(configuration) {
  const c = clone(configuration);
  S.cfg = {
    ...c,
    projectName: c.projectName ?? S.cfg.projectName,
    usesMultiDayFolders: false
  };
  S.baseline = configKey(S.cfg);
  clearAccepted();
  renderConfig();
  refreshNsd();
}

async function confirmDiscard(titleKey, actionKey) {
  if (!hasUnsaved()) return true;
  return await ask({ title: t(titleKey), message: t('unsavedMsg'), actions: [{ label: t('cancel') }, { label: t(actionKey), value: true, primary: true }] }) === true;
}

async function loadDefault() {
  if (!(await confirmDiscard('loadDefaultQ', 'loadDefault'))) return renderTplBar();
  S.loadedId = null;
  applyConfig(S.defaultCfg);
}
async function loadTemplate(tp) {
  if (!(await confirmDiscard('loadOtherQ', 'load'))) return renderTplBar();
  S.loadedId = tp.id;
  applyConfig(tp.configuration);
  closeModal($('manage'));
}

async function saveAsNew() {
  const name = await ask({ title: t('saveNewTitle'), input: { value: '', placeholder: t('tplName') }, actions: [{ label: t('cancel') }, { label: t('save'), primary: true, submit: true }] });
  if (!name) return;
  const now = new Date().toISOString();
  const tp = { id: uuid(), name, createdAt: now, modifiedAt: now, configuration: clone(S.cfg) };
  S.templates.push(tp);
  if (!persistTemplates()) return S.templates.pop();
  S.loadedId = tp.id;
  S.baseline = configKey(S.cfg);
  renderTplBar();
  renderManage();
}
function updateCurrent() {
  const tp = currentTemplate();
  if (!tp) return;
  tp.configuration = clone(S.cfg);
  tp.modifiedAt = new Date().toISOString();
  if (!persistTemplates()) return;
  S.baseline = configKey(S.cfg);
  renderTplBar();
  renderManage();
}
async function renameTemplate(tp) {
  const name = await ask({ title: t('renameTitle'), input: { value: tp.name, placeholder: t('tplName') }, actions: [{ label: t('cancel') }, { label: t('rename'), primary: true, submit: true }] });
  if (!name || name === tp.name) return;
  tp.name = name;
  tp.modifiedAt = new Date().toISOString();
  persistTemplates();
  renderTplBar();
  renderManage();
}
function duplicateTemplate(tp) {
  const now = new Date().toISOString();
  S.templates.push({ ...clone(tp), id: uuid(), name: t('copyOf', tp.name), createdAt: now, modifiedAt: now });
  persistTemplates();
  renderTplBar();
  renderManage();
}
async function deleteTemplate(tp) {
  const ok = await ask({ title: t('deleteQ', tp.name), message: t('deleteMsg'), actions: [{ label: t('cancel') }, { label: t('delete'), value: true, danger: true }] });
  if (ok !== true) return;
  S.templates = S.templates.filter(x => x.id !== tp.id);
  if (S.loadedId === tp.id) S.loadedId = null;
  persistTemplates();
  renderTplBar();
  renderManage();
}
// Same file as the Mac app's templates.json and its Export: dates without
// milliseconds, so any version of the app can import it.
function exportTemplates(templates, fileName) {
  const isoSeconds = value => new Date(value).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const store = {
    schemaVersion: SCHEMA_VERSION,
    templates: templates.map(tp => ({ ...tp, createdAt: isoSeconds(tp.createdAt), modifiedAt: isoSeconds(tp.modifiedAt) }))
  };
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
  download(blob, `${fileName.replace(/[\\/:*?"<>|]+/g, '-').trim() || 'Disktree Templates'}.json`);
}

const nameKey = name => name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function availableName(name, taken) {
  if (!taken.has(nameKey(name))) return name;
  let n = 2;
  while (taken.has(nameKey(`${name} ${n}`))) n++;
  return `${name} ${n}`;
}

// Same rules as the Mac app: existing templates are never changed or replaced.
// An identical template is skipped; a different one reusing an existing id gets
// a new id; clashing names get a number.
function mergeTemplates(incoming) {
  const result = [...S.templates], taken = new Set(result.map(tp => nameKey(tp.name)));
  let added = 0, skipped = 0;
  for (const tp of incoming) {
    const existing = result.find(x => x.id === tp.id);
    if (existing && existing.name === tp.name && configKey(existing.configuration) === configKey(tp.configuration)) {
      skipped++;
      continue;
    }
    const name = availableName(tp.name, taken);
    taken.add(nameKey(name));
    result.push({ ...tp, id: existing ? uuid() : tp.id, name });
    added++;
  }
  return { templates: result, added, skipped };
}
async function importTemplates(file) {
  let incoming;
  try {
    const data = JSON.parse(await file.text());
    if (data?.schemaVersion !== SCHEMA_VERSION || !Array.isArray(data.templates)) throw new Error();
    incoming = data.templates.map(tp => normalizeTemplate(tp?.name?.trim() ? tp : { ...tp, name: t('importedName') }));
    if (!incoming.length || incoming.some(tp => !tp)) throw new Error();
  } catch {
    return showMessage(t('tplErrorTitle'), t('importError'));
  }
  const merge = mergeTemplates(incoming);
  if (merge.added) {
    const previous = S.templates;
    S.templates = merge.templates;
    if (!persistTemplates()) {
      S.templates = previous;
      return;
    }
  }
  renderTplBar();
  renderManage();
  showMessage(t('tplErrorTitle'), t('imported', merge.added, merge.skipped));
}

// ---------- Creating ----------
async function planKinds(tree, destination) {
  const kinds = new Map();
  async function walk(node, parent, path) {
    const rel = path ? `${path}/${node.name}` : node.name;
    let kind = 'missing', handle = null;
    if (parent) {
      try {
        handle = await parent.getDirectoryHandle(node.name);
        kind = 'dir';
      } catch (e) {
        if (e.name === 'TypeMismatchError') kind = 'file';
        else if (e.name !== 'NotFoundError') throw new DtError('accessDenied');
      }
    }
    kinds.set(rel, kind);
    for (const child of node.children) await walk(child, kind === 'dir' ? handle : null, rel);
  }
  await walk(tree, destination, '');
  return kinds;
}

async function createTree(tree, destination) {
  const counts = { created: 0, skipped: 0 };
  async function walk(node, parent, path) {
    const rel = path ? `${path}/${node.name}` : node.name;
    let handle;
    try {
      handle = await parent.getDirectoryHandle(node.name);
      counts.skipped++;
    } catch (e) {
      if (e.name === 'TypeMismatchError') throw new DtError('fileConflict', rel);
      if (e.name !== 'NotFoundError') throw new DtError('creationFailed', rel, e.message);
      try {
        handle = await parent.getDirectoryHandle(node.name, { create: true });
        counts.created++;
      } catch (err) {
        throw new DtError('creationFailed', rel, err.message);
      }
    }
    for (const child of node.children) await walk(child, handle, rel);
  }
  await walk(tree, destination, '');
  return counts;
}

// Stored (uncompressed) ZIP holding only directory entries.
function zipDirectories(paths) {
  const enc = new TextEncoder(), now = new Date();
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const local = [], central = [];
  let offset = 0;
  for (const p of paths) {
    const name = enc.encode(`${p}/`);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);
    lh.setUint16(4, 20, true);
    lh.setUint16(6, 0x0800, true);
    lh.setUint16(10, time, true);
    lh.setUint16(12, date, true);
    lh.setUint16(26, name.length, true);
    local.push(new Uint8Array(lh.buffer), name);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true);
    ch.setUint16(4, 0x031e, true);
    ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true);
    ch.setUint16(12, time, true);
    ch.setUint16(14, date, true);
    ch.setUint16(28, name.length, true);
    ch.setUint32(38, ((0o40755 << 16) | 0x10) >>> 0, true);
    ch.setUint32(42, offset, true);
    central.push(new Uint8Array(ch.buffer), name);
    offset += 30 + name.length;
  }
  const size = central.reduce((s, a) => s + a.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, paths.length, true);
  end.setUint16(10, paths.length, true);
  end.setUint32(12, size, true);
  end.setUint32(16, offset, true);
  return new Blob([...local, ...central, new Uint8Array(end.buffer)], { type: 'application/zip' });
}

function download(blob, filename) {
  const a = h('a', { href: URL.createObjectURL(blob), download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

let reviewState = null;
async function openReview() {
  const tree = buildTree(S.cfg, S.dates, S.override);
  const lines = flatten(tree);
  const bad = lines.find(l => !validName(l.name));
  if (bad) return showMessage(t('errorTitle'), t('err_invalidName', bad.name));
  let kinds = null;
  if (fsSupported && S.dest) {
    try {
      if (!(await ensurePermission())) return showMessage(t('errorTitle'), t('err_accessDenied'));
      kinds = await planKinds(tree, S.dest.handle);
    } catch (e) {
      return showMessage(t('errorTitle'), errText(e));
    }
  }
  reviewState = { tree, lines, kinds };
  renderReview();
  openModal($('review'));
}

function renderReview() {
  if (!reviewState) return;
  const { lines, kinds } = reviewState;
  const direct = kinds != null;
  const existing = direct ? lines.filter(l => kinds.get(l.path) === 'dir').length : 0;
  const blocking = direct ? lines.filter(l => kinds.get(l.path) === 'file').length : 0;
  $('reviewSub').textContent = `${t('planned', lines.length)} · ${direct ? t('inDest', S.dest.name) : t('asZip')}`;
  const note = $('reviewNote');
  note.hidden = false;
  note.classList.toggle('warn', blocking > 0);
  note.textContent = blocking ? t('blockingNote') : direct ? (existing ? t('existingNote', existing) : '') : t('zipNote');
  if (!note.textContent) note.hidden = true;
  $('reviewList').replaceChildren(...lines.map(l => {
    const kind = direct ? kinds.get(l.path) : 'missing';
    return h('li', {},
      h('span', { text: l.path }),
      kind === 'dir' && h('span', { class: 'tag', text: t('exists') }),
      kind === 'file' && h('span', { class: 'tag bad', text: t('fileExists') }));
  }));
  $('createBtn').hidden = !direct;
  $('createBtn').disabled = blocking > 0;
  $('zipBtn').classList.toggle('primary', !direct);
}

async function createConfirmed() {
  const btn = $('createBtn');
  btn.disabled = true;
  btn.textContent = t('creating');
  try {
    if (!(await ensurePermission())) throw new DtError('accessDenied');
    const { created, skipped } = await createTree(reviewState.tree, S.dest.handle);
    closeModal($('review'));
    showMessage(t('createdTitle'), t('createdMsg', created, `${S.dest.name}/${reviewState.tree.name}`, skipped));
    refreshNsd();
  } catch (e) {
    closeModal($('review'));
    showMessage(t('errorTitle'), errText(e));
  } finally {
    btn.disabled = false;
    btn.textContent = t('create');
  }
}

function downloadZip() {
  const { tree, lines } = reviewState;
  const file = `${tree.name}.zip`;
  download(zipDirectories(lines.map(l => l.path)), file);
  closeModal($('review'));
  showMessage(t('zipTitle'), t('zipMsg', lines.length, file));
}

// ---------- Dialogs ----------
let lastFocus = [];
function openModal(modal) {
  lastFocus.push(document.activeElement);
  modal.hidden = false;
  (modal.querySelector('.dlg-foot .primary:not([hidden])') || modal.querySelector('button'))?.focus();
}
function closeModal(modal) {
  if (modal.hidden) return;
  modal.hidden = true;
  if (modal.id === 'dlg') dlgResolve?.(null);
  lastFocus.pop()?.focus?.();
}

let dlgResolve = null;
function ask({ title, message = '', input = null, actions }) {
  const modal = $('dlg');
  $('dlgTitle').textContent = title;
  $('dlgMsg').textContent = message;
  $('dlgMsg').hidden = !message;
  $('dlgBody').hidden = !input;
  $('dlgError').hidden = true;
  if (input) {
    $('dlgInput').value = input.value;
    $('dlgInput').placeholder = input.placeholder || '';
    $('dlgInput').setAttribute('aria-label', input.placeholder || title);
  }
  return new Promise(resolve => {
    const finish = value => {
      dlgResolve = null;
      resolve(value);
      closeModal(modal);
    };
    const submit = () => {
      const v = $('dlgInput').value.trim();
      if (!v) {
        $('dlgError').textContent = t('nameRequired');
        $('dlgError').hidden = false;
        return;
      }
      finish(v);
    };
    $('dlgActions').replaceChildren(...actions.map(a => h('button', {
      type: 'button',
      class: `btn${a.primary ? ' primary' : ''}${a.danger ? ' danger-btn' : ''}`,
      text: a.label,
      onclick: () => a.submit ? submit() : finish(a.value ?? null)
    })));
    $('dlgInput').onkeydown = e => { if (e.key === 'Enter') submit(); };
    $('dlgInput').oninput = () => { $('dlgError').hidden = true; };
    dlgResolve = resolve;
    openModal(modal);
    if (input) { $('dlgInput').focus(); $('dlgInput').select(); }
  });
}
const showMessage = (title, message) => ask({ title, message, actions: [{ label: t('ok'), primary: true }] });

// ---------- Rendering ----------
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  document.querySelectorAll('[data-i18n-title]').forEach(el => el.setAttribute('title', t(el.dataset.i18nTitle)));
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  renderAll();
  renderReview();
  renderManage();
}

function renderAll() {
  renderTplBar();
  renderConfig();
  renderDest();
  renderNsd();
}

function renderConfig() {
  const c = S.cfg;
  $('projectName').value = c.projectName;
  $('company').value = c.productionCompany;
  $('dateFormat').value = c.dateFormat;
  for (const k of ['usesDatePrefix', 'usesDateSuffix', 'usesMultiDayFolders', 'usesNumberedSubfolders', 'usesDateSuffixInSections']) $(k).checked = c[k];
  $('usesMultiDayFolders').closest('.opt').toggleAttribute('data-disabled', true);
  $('offsetOut').textContent = c.initialDayOffset;
  $('offsetDown').disabled = c.initialDayOffset <= 0;
  $('offsetUp').disabled = c.initialDayOffset >= 99;
  renderDates();
  renderSections();
  renderPreview();
}

function renderTplBar() {
  const sel = $('tplSelect');
  sel.replaceChildren(
    h('option', { value: '', text: t('defaultTpl') }),
    ...[...S.templates].sort((a, b) => a.name.localeCompare(b.name)).map(tp => h('option', { value: tp.id, text: tp.name })));
  sel.value = S.loadedId ?? '';
  const unsaved = hasUnsaved();
  $('tplStatus').textContent = unsaved ? t('unsaved') : '';
  $('updateBtn').disabled = !(S.loadedId && unsaved);
}

function renderDest() {
  const info = $('destInfo');
  if (!fsSupported) {
    info.replaceChildren(icon('drive'), h('span', { text: t('destZip') }));
    $('destBtn').hidden = true;
  } else if (!S.dest) {
    info.replaceChildren(icon('drive'), h('span', { text: t('destPending') }));
    $('destBtn').hidden = false;
    $('destBtnLabel').textContent = t('chooseDest');
  } else {
    const needsAccess = S.dest.permission !== 'granted';
    info.replaceChildren(icon('folder'), h('span', {}, `${t('destLabel')}: `, h('strong', { text: S.dest.name }), needsAccess ? ` — ${t('destNeedsAccess')}` : ''));
    $('destBtn').hidden = false;
    $('destBtnLabel').textContent = needsAccess ? t('grantDest') : t('changeDest');
  }
  $('createTitle').textContent = !fsSupported ? t('readyZip') : S.dest ? t('readyReview') : t('destPendingTitle');
  $('destInfoTip').hidden = !fsSupported;
  const warning = $('destHint');
  warning.hidden = !fsSupported || !!S.dest || !S.pickCancelled;
  warning.textContent = t('destHintCancelled');
  warning.classList.add('warn');
}

function renderDates() {
  $('datesCount').textContent = t('datesCount', S.dates.length);
  $('chips').replaceChildren(...S.dates.map(d => h('span', { class: 'chip' },
    formatDate(S.cfg.dateFormat, d),
    h('button', { type: 'button', class: 'icon-btn', 'aria-label': `${t('removeDate')} ${displayDate(d)}`, onclick: () => removeDate(d.id) }, icon('x')))));
}

function renderNsd() {
  const box = $('nsd'), n = S.nsd;
  const kids = [h('p', { class: 'nsd-head' }, icon('calendar'), t('nsd'))];
  if (S.nsdMode === 'manual') {
    kids.push(h('p', { text: t(S.nsdMsg) }));
    const day = h('input', { class: 'input', type: 'number', min: '0', step: '1', inputmode: 'numeric', value: S.manual.day, placeholder: '05' });
    const date = h('input', { class: 'input date-in', type: 'date', value: S.manual.date });
    const onManual = () => {
      S.manual = { day: day.value, date: date.value };
      clearAccepted();
      applyManual();
      renderDates();
      renderPreview();
    };
    day.addEventListener('change', onManual);
    date.addEventListener('change', onManual);
    kids.push(h('div', { class: 'manual' },
      h('label', { class: 'fld' }, h('span', { text: t('manualDay') }), day),
      h('label', { class: 'fld' }, h('span', { text: t('manualDate') }), date)));
  }
  if (n.kind === 'loading') kids.push(h('p', { text: t('searching') }));
  if (n.kind === 'unavailable') kids.push(h('p', { class: 'err', text: errText(n.error) }));
  if (n.kind === 'ambiguous') {
    kids.push(h('p', { text: t('ambiguous') }), h('ul', { class: 'ref-list' }, n.refs.map(ref => h('li', {},
      h('span', { text: ref.name }),
      h('button', { type: 'button', class: 'btn', text: t('use'), onclick: () => makeProposal(ref, n.refs) })))));
  }
  if (n.kind === 'ready' || n.kind === 'added') {
    const p = n.proposal, ref = p.reference;
    const newDate = h('input', { class: 'input date-in', type: 'date', value: toInput(p.date), disabled: n.kind === 'added', 'aria-label': t('newDate') });
    newDate.addEventListener('change', () => {
      const v = fromInput(newDate.value);
      if (v && S.nsd.kind === 'ready') makeProposal(ref, S.nsd.existing, v);
    });
    kids.push(h('dl', { class: 'kv' },
      h('dt', { text: t('lastDay') }), h('dd', { text: `Day${pad(ref.dayNumber, ref.width)}` }),
      h('dt', { text: t('lastDate') }), h('dd', { text: displayDate(ref.date) }),
      h('dt', { text: t('newDay') }), h('dd', { text: `Day${p.dayNumberText}` }),
      h('dt', { text: t('newDate') }), h('dd', {}, newDate)));
    const skip = h('input', { type: 'checkbox', checked: S.skipWeekends, disabled: n.kind === 'added' });
    skip.addEventListener('change', () => {
      S.skipWeekends = skip.checked;
      if (S.nsd.kind === 'ready') makeProposal(ref, S.nsd.existing);
    });
    kids.push(h('label', { class: 'switch opt' }, h('span', { text: t('skipWeekends') }), skip));
    if (n.kind === 'ready' && n.validation) kids.push(h('p', { class: 'err', text: errText(n.validation) }));
    kids.push(h('div', { class: 'nsd-actions' }, n.kind === 'ready'
      ? h('button', { type: 'button', class: 'btn primary', text: t('addSuggested'), onclick: addSuggestedDay })
      : h('p', { text: t('addedDay', p.dayNumberText) })));
  }
  box.replaceChildren(...kids);
}

const FOLDER_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>';
function renderPreview() {
  const lines = flatten(buildTree(S.cfg, S.dates, S.override));
  $('tree').replaceChildren(...lines.map(l => {
    const li = h('li', { class: l.depth === 0 ? 'root' : l.hasChildren ? '' : 'leaf', 'aria-label': `${l.name}, ${t('level', l.depth + 1)}` });
    li.style.paddingLeft = `${l.depth * 18}px`;
    li.innerHTML = FOLDER_SVG;
    li.append(h('span', { text: l.name }));
    return li;
  }));
  renderTplBar();
}

let dragId = null;
function renderSections() {
  const secs = S.cfg.sections;
  $('secCount').textContent = t('secCount', secs.length);
  const cards = secs.map((s, i) => {
    const card = h('div', { class: `sec-card${s.isEnabled ? '' : ' off'}`, 'data-id': s.id });
    const grip = h('span', { class: 'grip', draggable: 'true', title: t('reorder'), 'aria-hidden': 'true' }, icon('grip'));
    grip.addEventListener('dragstart', e => {
      dragId = s.id;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', s.id);
      e.dataTransfer.setDragImage(card, 20, 20);
      card.classList.add('dragging');
    });
    grip.addEventListener('dragend', () => {
      dragId = null;
      document.querySelectorAll('.sec-card').forEach(el => el.classList.remove('dragging', 'drop-before', 'drop-after'));
    });
    card.addEventListener('dragover', e => {
      if (!dragId || dragId === s.id) return;
      e.preventDefault();
      const r = card.getBoundingClientRect(), after = e.clientY > r.top + r.height / 2;
      document.querySelectorAll('.sec-card').forEach(el => el.classList.remove('drop-before', 'drop-after'));
      card.classList.add(after ? 'drop-after' : 'drop-before');
    });
    card.addEventListener('drop', e => {
      if (!dragId || dragId === s.id) return;
      e.preventDefault();
      const after = card.classList.contains('drop-after');
      const from = secs.findIndex(x => x.id === dragId);
      const [moved] = secs.splice(from, 1);
      const target = secs.findIndex(x => x.id === s.id);
      secs.splice(after ? target + 1 : target, 0, moved);
      dragId = null;
      structuralChange();
    });
    const toggle = h('input', { type: 'checkbox', class: 'mini-switch', checked: s.isEnabled, 'aria-label': t('includeSection') });
    toggle.addEventListener('change', () => { s.isEnabled = toggle.checked; structuralChange(); });
    const name = h('input', { class: 'input sec-name', type: 'text', value: s.name, 'aria-label': t('sectionName'), placeholder: t('sectionName'), spellcheck: 'false' });
    name.addEventListener('input', () => { s.name = name.value; textChange(); });
    const btn = (ic, label, onclick, disabled, extra = '') => h('button', { type: 'button', class: `icon-btn${extra}`, 'aria-label': label, title: label, disabled, onclick }, icon(ic));
    const move = to => { const [m] = secs.splice(i, 1); secs.splice(to, 0, m); structuralChange(); $('sections').querySelector(`[data-id="${s.id}"] [aria-label="${to < i ? t('moveUp') : t('moveDown')}"]`)?.focus(); };
    card.append(
      h('div', { class: 'sec-row' }, grip, toggle, name,
        btn('plus', t('addFolder'), () => { s.items.push({ id: uuid(), name: 'NEW_FOLDER', isEnabled: true }); structuralChange(); }),
        btn('up', t('moveUp'), () => move(i - 1), i === 0),
        btn('down', t('moveDown'), () => move(i + 1), i === secs.length - 1),
        btn('trash', t('removeSection'), () => { secs.splice(i, 1); structuralChange(); }, false, ' danger')),
      h('div', { class: 'items' }, s.items.map(f => {
        const ft = h('input', { type: 'checkbox', class: 'mini-switch', checked: f.isEnabled, 'aria-label': t('includeFolder') });
        ft.addEventListener('change', () => { f.isEnabled = ft.checked; structuralChange(); });
        const fn = h('input', { class: 'input', type: 'text', value: f.name, 'aria-label': t('folderName'), placeholder: t('folderName'), spellcheck: 'false' });
        fn.addEventListener('input', () => { f.name = fn.value; textChange(); });
        return h('div', { class: `item-row${f.isEnabled ? '' : ' off'}` }, ft, fn);
      })));
    return card;
  });
  // Like the Mac app: two columns filled alternately (1, 3, 5… left; 2, 4… right); one column on narrow screens.
  const columns = twoColumns.matches ? [[], []] : [[]];
  cards.forEach((card, i) => columns[i % columns.length].push(card));
  $('sections').replaceChildren(...columns.map(col => h('div', { class: 'sec-col' }, col)));
}
const twoColumns = matchMedia('(min-width: 900px)');
twoColumns.addEventListener('change', renderSections);

function structuralChange() {
  renderSections();
  renderPreview();
}
function textChange() {
  renderPreview();
}

function renderManage() {
  const list = $('tplList');
  $('tplEmpty').hidden = S.templates.length > 0;
  $('exportBtn').disabled = !S.templates.length;
  list.replaceChildren(...[...S.templates].sort((a, b) => a.name.localeCompare(b.name)).map(tp => {
    const modified = new Date(tp.modifiedAt);
    const meta = Number.isNaN(+modified) ? '' : t('modified', modified.toLocaleString(lang, { dateStyle: 'medium', timeStyle: 'short' }));
    return h('li', {},
      h('div', {}, h('span', { class: 'tpl-name', text: tp.name }), S.loadedId === tp.id && h('span', { class: 'tag', text: t('loaded') }), h('span', { class: 'tpl-meta', text: meta })),
      h('div', { class: 'row' },
        h('button', { type: 'button', class: 'btn', text: t('loadShort'), onclick: () => loadTemplate(tp) }),
        h('button', { type: 'button', class: 'btn', text: t('rename'), onclick: () => renameTemplate(tp) }),
        h('button', { type: 'button', class: 'btn', text: t('duplicate'), onclick: () => duplicateTemplate(tp) }),
        h('button', { type: 'button', class: 'btn', text: t('exportOne'), onclick: () => exportTemplates([tp], tp.name) }),
        h('button', { type: 'button', class: 'btn', text: t('delete'), onclick: () => deleteTemplate(tp) })));
  }));
}

// ---------- Events ----------
let contextTimer = null;
function contextChanged(immediate) {
  clearTimeout(contextTimer);
  if (immediate) refreshNsd();
  else contextTimer = setTimeout(refreshNsd, 400);
}

$('projectName').addEventListener('input', e => { S.cfg.projectName = e.target.value; textChange(); contextChanged(); });
$('company').addEventListener('input', e => { S.cfg.productionCompany = e.target.value; textChange(); contextChanged(); });
$('dateFormat').addEventListener('change', e => {
  S.cfg.dateFormat = e.target.value;
  renderDates();
  renderPreview();
  contextChanged(true);
});
$('usesDatePrefix').addEventListener('change', e => {
  S.cfg.usesDatePrefix = e.target.checked;
  if (e.target.checked) { S.cfg.usesDateSuffix = false; $('usesDateSuffix').checked = false; }
  renderPreview();
  contextChanged(true);
});
$('usesDateSuffix').addEventListener('change', e => {
  S.cfg.usesDateSuffix = e.target.checked;
  if (e.target.checked) { S.cfg.usesDatePrefix = false; $('usesDatePrefix').checked = false; }
  renderPreview();
  contextChanged(true);
});
for (const k of ['usesNumberedSubfolders', 'usesDateSuffixInSections']) {
  $(k).addEventListener('change', e => { S.cfg[k] = e.target.checked; renderPreview(); });
}
const setOffset = v => {
  S.cfg.initialDayOffset = Math.min(99, Math.max(0, v));
  $('offsetOut').textContent = S.cfg.initialDayOffset;
  $('offsetDown').disabled = S.cfg.initialDayOffset <= 0;
  $('offsetUp').disabled = S.cfg.initialDayOffset >= 99;
  renderPreview();
};
$('offsetDown').addEventListener('click', () => setOffset(S.cfg.initialDayOffset - 1));
$('offsetUp').addEventListener('click', () => setOffset(S.cfg.initialDayOffset + 1));

$('addDateBtn').addEventListener('click', addCalendarDate);
$('addSectionBtn').addEventListener('click', () => {
  S.cfg.sections.push({ id: uuid(), name: 'CUSTOM', isEnabled: true, items: [{ id: uuid(), name: 'NEW_FOLDER', isEnabled: true }] });
  structuralChange();
});
$('destBtn').addEventListener('click', () => {
  if (S.dest && S.dest.permission !== 'granted') ensurePermission().catch(() => showMessage(t('errorTitle'), t('err_accessDenied')));
  else selectDestination();
});
$('reviewBtn').addEventListener('click', openReview);
$('createBtn').addEventListener('click', createConfirmed);
$('zipBtn').addEventListener('click', downloadZip);

$('tplSelect').addEventListener('change', e => {
  const tp = S.templates.find(x => x.id === e.target.value);
  if (tp) loadTemplate(tp); else loadDefault();
});
$('saveNewBtn').addEventListener('click', saveAsNew);
$('updateBtn').addEventListener('click', updateCurrent);
$('manageBtn').addEventListener('click', () => { renderManage(); openModal($('manage')); });
$('exportBtn').addEventListener('click', () => exportTemplates([...S.templates].sort((a, b) => a.name.localeCompare(b.name)), 'Disktree Templates'));
$('importBtn').addEventListener('click', () => $('importInput').click());
$('importInput').addEventListener('change', e => {
  const f = e.target.files[0];
  e.target.value = '';
  if (f) importTemplates(f);
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.closest('[data-close]')) closeModal(modal);
  });
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const open = [...document.querySelectorAll('.modal')].filter(m => !m.hidden).pop();
  if (open) closeModal(open);
});

document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  applyLang();
}));

(async function init() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved in STRINGS) lang = saved;
  } catch {}
  $('calDate').value = toInput(fromDate(new Date()));
  loadTemplates();
  if (fsSupported) await restoreDestination();
  applyLang();
  refreshNsd();
})();
