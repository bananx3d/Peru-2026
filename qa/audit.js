const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const scriptFiles = [
  'data.js', 'guides.js', 'day-details.js', 'modules/journal.js', 'modules/amazon.js',
  'modules/cusco.js', 'modules/ollantaytambo.js', 'modules/lima.js',
  'modules/machu.js', 'modules/wildlife.js', 'photos.js', 'i18n.js',
  'phrasebook.js', 'app.js'
];
const routes = [
  'dashboard', 'plan', 'bookings', 'tasks', 'machu', 'payments', 'journal',
  'journal/04.09', 'journal/20.09', 'plan/04.09', 'plan/20.09', 'plan/26.09', 'machu/day', 'machu/3a', 'machu/2', 'machu/history', 'machu/rules', 'pack', 'emergency', 'amazon', 'wildlife',
  'photos', 'cusco', 'ollanta', 'lima', 'guide', 'phrases', 'more', 'settings',
  'guide/amazon', 'guide/iquitos', 'guide/cusco', 'guide/sacred',
  'guide/olla', 'guide/machu', 'unknown-route', 'journal/26.09'
];

function createContext(hash, language = 'pl') {
  const store = new Map([['peru2026_language', language]]);
  const body = {
    innerHTML: '', appendChild() {}, querySelectorAll() { return []; },
    classList: { add() {}, remove() {} }
  };
  const document = {
    body,
    documentElement: { scrollHeight: 1600, lang: 'pl' },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createTreeWalker: () => ({ currentNode: null, nextNode: () => false }),
    createElement: tag => ({
      tagName: String(tag).toUpperCase(), className: '', textContent: '', value: '',
      classList: { add() {}, remove() {}, toggle() { return false; } },
      click() {}, appendChild() {}, remove() {}, select() {}, setAttribute() {},
      querySelectorAll() { return []; }, closest() { return null; },
      set href(value) { this._href = value; }, get href() { return this._href; }
    })
  };
  const localStorage = {
    get length() { return store.size; },
    key(index) { return [...store.keys()][index] ?? null; },
    getItem(key) { return store.has(key) ? store.get(key) : null; },
    setItem(key, value) { store.set(key, String(value)); },
    removeItem(key) { store.delete(key); }
  };
  const context = {
    console, window: null, document, localStorage, NodeFilter: { SHOW_TEXT: 4 },
    location: { hash: `#/${hash}`, reload() {} },
    navigator: { onLine: true },
    addEventListener() {}, innerHeight: 844, scrollY: 0, scrollTo() {}, print() {},
    Blob, Request: class {}, URL: class URLMock {
      constructor(url) { const parsed = new (require('url').URL)(url); this.hostname = parsed.hostname; }
      static createObjectURL() { return 'blob:test'; }
      static revokeObjectURL() {}
    },
    alert() {}, confirm: () => true, FormData: class {}, FileReader: class {}, Image: class {},
    SpeechSynthesisUtterance: class {}, speechSynthesis: { cancel() {}, speak() {} },
    setTimeout, clearTimeout, Date, JSON, Math, Object, Array, String, Number, Boolean,
    RegExp, Map, Set, Promise
  };
  context.window = context;
  vm.createContext(context);
  return { context, body, store };
}

function executeScripts(context, files = scriptFiles) {
  for (const file of files) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
}

const failures = [];
const routeLengths = [];
for (const route of routes) {
  const { context, body } = createContext(route);
  try {
    executeScripts(context);
    if (!body.innerHTML.includes('<main')) failures.push(`Trasa ${route}: brak głównej zawartości`);
    routeLengths.push([route, body.innerHTML.length]);
  } catch (error) {
    failures.push(`Trasa ${route}: ${error.stack || error.message}`);
  }
}



// v18 information architecture, day briefs and localisation checks
{
  const { context, body } = createContext('dashboard', 'pl');
  executeScripts(context);
  const desktopNav = body.innerHTML.match(/<nav class="nav ux-primary-nav"[\s\S]*?<\/nav>/)?.[0] || '';
  const mobileNav = body.innerHTML.match(/<nav class="mobile-dock ux-mobile-dock"[\s\S]*?<\/nav>/)?.[0] || '';
  if ((desktopNav.match(/data-route=/g) || []).length !== 5) failures.push('UX v18: pasek boczny nie ma dokładnie 5 pozycji');
  if ((mobileNav.match(/data-route=/g) || []).length !== 5) failures.push('UX v18: dolny pasek nie ma dokładnie 5 pozycji');
  if (!body.innerHTML.includes('home-mission')) failures.push('UX v18: brak Mission Control na ekranie Start');
}
{
  const { context, body } = createContext('guide', 'pl');
  executeScripts(context);
  if ((body.innerHTML.match(/class="destination-card"/g) || []).length !== 6) failures.push('UX v18: Przewodnik nie zawiera 6 głównych miejsc');
}
{
  const { context, body } = createContext('more', 'pl');
  executeScripts(context);
  if ((body.innerHTML.match(/class="tool-card/g) || []).length !== 9) failures.push('UX v18: ekran Więcej nie zawiera 9 narzędzi');
}
for (const [language, route, expected] of [
  ['en','dashboard','Quick access'], ['en','guide','Places on your route'], ['en','more','Tools and organisation'],
  ['es','dashboard','Acceso rápido'], ['es','guide','Lugares de vuestra ruta'], ['es','more','Herramientas y organización']
]) {
  const { context, body } = createContext(route, language);
  try { executeScripts(context); if (!body.innerHTML.includes(expected)) failures.push(`UX i18n: ${route}/${language} nie zawiera „${expected}”`); }
  catch (error) { failures.push(`UX i18n: ${route}/${language}: ${error.message}`); }
}


// v18: every itinerary day opens as a dedicated brief with schedule and expandable history.
{
  const { context, body } = createContext('plan', 'pl');
  executeScripts(context);
  const dayCount = (body.innerHTML.match(/class="day-index-card"/g) || []).length;
  if (dayCount !== context.PERU_2026.itinerary.length) failures.push(`UX v18: indeks planu ma ${dayCount}/${context.PERU_2026.itinerary.length} dni`);
}
for (const date of ['04.09','07.09','14.09','17.09','19.09','20.09','26.09']) {
  const { context, body } = createContext(`plan/${date}`, 'pl');
  try {
    executeScripts(context);
    if (!body.innerHTML.includes('day-brief-page')) failures.push(`UX v18: ${date} nie ma osobnej karty dnia`);
    if (!body.innerHTML.includes('day-history-card')) failures.push(`UX v18: ${date} nie ma rozwijanego rysu historycznego`);
    if (!body.innerHTML.includes('day-schedule-item')) failures.push(`UX v18: ${date} nie ma rozbudowanego przebiegu dnia`);
  } catch (error) { failures.push(`UX v18: karta ${date}: ${error.message}`); }
}
for (const view of ['day','3a','2','history','rules']) {
  const { context, body } = createContext(`machu/${view}`, 'pl');
  try {
    executeScripts(context);
    if (!body.innerHTML.includes('machu-tabs')) failures.push(`Machu v18: ${view} nie ma nawigacji zakładkowej`);
    if (!body.innerHTML.includes('machu-view')) failures.push(`Machu v18: ${view} nie wyrenderował widoku`);
  } catch (error) { failures.push(`Machu v18: ${view}: ${error.message}`); }
}
{
  const { context } = createContext('dashboard', 'pl');
  executeScripts(context, scriptFiles.slice(0, -1));
  const days = context.PERU_DAY_DETAILS?.days || {};
  const itinerary = context.PERU_2026.itinerary || [];
  if (Object.keys(days).length !== itinerary.length) failures.push(`Day details: ${Object.keys(days).length}/${itinerary.length}`);
  for (const day of itinerary) {
    const detail = days[day.date];
    if (!detail) { failures.push(`Day details: brak ${day.date}`); continue; }
    if (!Array.isArray(detail.schedule) || detail.schedule.length < 3) failures.push(`Day details: ${day.date} ma zbyt krótki plan`);
    if (!Array.isArray(detail.history) || detail.history.length < 2) failures.push(`Day details: ${day.date} ma zbyt krótki rys historyczny`);
    if (!Array.isArray(detail.practical) || detail.practical.length < 2) failures.push(`Day details: ${day.date} ma zbyt mało wskazówek`);
  }
}

const base = createContext('dashboard').context;
executeScripts(base, scriptFiles.slice(0, -1));
const photos = base.PERU_PHOTOS.items;
const amazonSpecies = base.PERU_AMAZON.species;
const phrasebook = base.PERU_PHRASEBOOK;
const i18n = base.PERU_I18N;
const allowedHosts = new Set(['commons.wikimedia.org', 'curassowlodge.com']);
const photoIds = new Set();
for (const item of photos) {
  if (!item.id || photoIds.has(item.id)) failures.push(`Zdjęcia: zduplikowany/pusty id ${item.id || '(brak)'}`);
  photoIds.add(item.id);
  if (item.ai !== false || item.kind !== 'photograph') failures.push(`Zdjęcia: ${item.title} nie ma polityki photograph/ai:false`);
  for (const field of ['source', 'image']) {
    try {
      const host = new (require('url').URL)(item[field]).hostname;
      if (!allowedHosts.has(host)) failures.push(`Zdjęcia: niedozwolona domena ${host}`);
    } catch { failures.push(`Zdjęcia: nieprawidłowy URL w ${item.title}`); }
  }
}

const coverageGroups = [
  ['Zwierzęta', amazonSpecies.map(item => item.id)],
  ['Rośliny', ['ceiba','rubber-tree','cacao','aguaje','victoria-amazonica','heliconia']],
  ['Amazonia i Iquitos', ['curassow','canoe','wildlife','forest','lodge','bungalow','iquitos','port']],
  ['Cusco', ['plaza','qorikancha','hatun-rumiyoc','san-blas','san-pedro','sacsayhuaman']],
  ['Sacred Valley', ['pisac','moray','maras','chinchero']],
  ['Lima', ['malecon','kennedy','barranco','huaca','surquillo','centro']],
  ['Ollantaytambo', ['old-town','park']],
  ['Machu Picchu', ['sun','water','climb','summit','descent','condor','2a-quarry','2a-temples','2a-inti','2a-sacred','2a-mirrors','2b-quarry','2b-temples','2b-inti','2b-sacred','2b-mirrors']]
];
let coverageExpected = 0; let coverageActual = 0;
for (const [category, targets] of coverageGroups) {
  for (const target of targets) {
    coverageExpected += 1;
    if (photos.some(photo => photo.category === category && photo.targets.includes(target))) coverageActual += 1;
    else failures.push(`Brak zdjęcia: ${category} / ${target}`);
  }
}


function auditLocalizedObjects(value, pathLabel, seen = new Set()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  const keys = ['pl','en','es'];
  if (keys.some(key => Object.prototype.hasOwnProperty.call(value, key))) {
    for (const key of keys) if (!String(value[key] || '').trim()) failures.push(`i18n v18: ${pathLabel} nie ma ${key}`);
  }
  if (Array.isArray(value)) value.forEach((item, index) => auditLocalizedObjects(item, `${pathLabel}[${index}]`, seen));
  else Object.entries(value).forEach(([key, item]) => auditLocalizedObjects(item, `${pathLabel}.${key}`, seen));
}
auditLocalizedObjects(base.PERU_DAY_DETAILS, 'PERU_DAY_DETAILS');
auditLocalizedObjects(base.PERU_MACHU?.route3, 'PERU_MACHU.route3');
auditLocalizedObjects(base.PERU_MACHU?.route2, 'PERU_MACHU.route2');

const phraseIds = new Set();
const categoryIds = new Set(phrasebook.categories.map(item => item.id));
for (const phrase of phrasebook.phrases) {
  if (!phrase.id || phraseIds.has(phrase.id)) failures.push(`Słowniczek: zduplikowany/pusty id ${phrase.id || '(brak)'}`);
  phraseIds.add(phrase.id);
  if (!categoryIds.has(phrase.category)) failures.push(`Słowniczek: nieznana kategoria ${phrase.category}`);
  for (const language of ['pl', 'en', 'es']) {
    if (!String(phrase[language] || '').trim()) failures.push(`Słowniczek: ${phrase.id} nie ma wersji ${language}`);
  }
}
if (phrasebook.categories.length < 8) failures.push('Słowniczek: za mało kategorii');
if (phrasebook.phrases.length < 75) failures.push('Słowniczek: za mało zwrotów');

for (const language of ['en', 'es']) {
  const dictionary = i18n.dictionaries[language];
  if (!dictionary || Object.keys(dictionary).length < 1900) failures.push(`i18n: niepełny słownik ${language}`);
  for (const [source, translated] of Object.entries(dictionary || {})) {
    if (!source.trim() || !String(translated || '').trim()) failures.push(`i18n ${language}: pusty wpis dla ${source}`);
  }
}
for (const source of ['Centrum dowodzenia', 'Słowniczek podróżny', 'Pokaż mieszkańcowi', 'Nie udało się zaimportować pełnego backupu.']) {
  for (const language of ['en', 'es']) if (!i18n.dictionaries[language]?.[source]) failures.push(`i18n: brak ${language} dla „${source}”`);
}

const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const defs = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map(match => match[1]));
const refs = new Set([...css.matchAll(/var\(--([\w-]+)/g)].map(match => match[1]));
const dynamic = new Set(['hero', 'cusco-hero', 'lima-hero', 'machu-hero', 'ollanta-hero', 'home-image']);
for (const ref of refs) if (!defs.has(ref) && !dynamic.has(ref)) failures.push(`CSS: niezdefiniowana zmienna --${ref}`);
for (const selector of ['.phrasebook-hero', '.phrase-modal', '.settings-language-grid', '.ux-primary-nav', '.home-mission', '.destination-grid', '.tool-grid', '.day-index-list', '.day-brief-page', '.machu-tabs', '.point-history']) {
  if (!css.includes(selector)) failures.push(`CSS: brak stylu ${selector}`);
}

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const script of scriptFiles) {
  if (!index.includes(`./${script}`)) failures.push(`index.html: brak skryptu ${script}`);
}
const order = ['photos.js', 'i18n.js', 'phrasebook.js', 'app.js'].map(file => index.indexOf(`./${file}`));
if (!(order[0] < order[1] && order[1] < order[2] && order[2] < order[3])) failures.push('index.html: zła kolejność photos/i18n/phrasebook/app');

const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
if (!sw.includes('peru-2026-v18-day-briefs-machu')) failures.push('Service worker: niepoprawna wersja v18');
const coreMatch = sw.match(/const CORE = \[([\s\S]*?)\];/);
if (!coreMatch) failures.push('Service worker: brak listy CORE');
else {
  const coreEntries = [...coreMatch[1].matchAll(/'\.\/([^']*)'/g)].map(match => match[1] || 'index.html');
  const duplicateCandidates = coreEntries.filter(entry => entry !== 'index.html');
  const duplicates = duplicateCandidates.filter((entry, index, all) => all.indexOf(entry) !== index);
  if (duplicates.length) failures.push(`Service worker: duplikaty CORE ${[...new Set(duplicates)].join(', ')}`);
  for (const entry of coreEntries) {
    const normalized = entry === '' ? 'index.html' : entry;
    if (normalized !== '.' && !fs.existsSync(path.join(root, normalized))) failures.push(`Service worker: brak pliku ${normalized}`);
  }
  for (const required of ['i18n.js', 'phrasebook.js', 'day-details.js']) if (!coreEntries.includes(required)) failures.push(`Service worker: CORE nie zawiera ${required}`);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
for (const icon of manifest.icons || []) {
  const iconPath = icon.src.replace(/^\.\//, '');
  if (!fs.existsSync(path.join(root, iconPath))) failures.push(`Manifest: brak ikony ${iconPath}`);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '.git' ? [] : walk(full);
    return [full];
  });
}
const allText = walk(root)
  .filter(file => /\.(js|html|md|json|css)$/.test(file))
  .map(file => fs.readFileSync(file, 'utf8')).join('\n');
const privatePatterns = [/HM[A-Z0-9]{6,}/, /\+51\s*939/, /939\s*132\s*148/, /1920\s*USD/i, /150\s*USD/i, /app\.notion\.com\/p\//];
for (const pattern of privatePatterns) if (pattern.test(allText)) failures.push(`Prywatność: wykryto wzorzec ${pattern}`);

console.log(`Routes rendered: ${routeLengths.length}/${routes.length}`);
console.log('UX v18: 5 primary tabs / 6 destinations / 9 grouped tools / dedicated day briefs / focused Machu tabs');
console.log(`Photos: ${photos.length}`);
console.log(`Animal coverage: ${amazonSpecies.length}/${amazonSpecies.length}`);
console.log(`Structured media coverage: ${coverageActual}/${coverageExpected}`);
console.log(`Phrasebook: ${phrasebook.phrases.length} phrases / ${phrasebook.categories.length} categories`);
console.log(`Translations: ${Object.keys(i18n.dictionaries.en).length} EN / ${Object.keys(i18n.dictionaries.es).length} ES`);
console.log(`CSS variables: ${refs.size} references, ${defs.size} definitions`);
console.log(`Privacy patterns: ${privatePatterns.length} checked`);
console.log('Service worker core, manifest icons and script order: checked');
if (failures.length) {
  console.error('\nFAILURES');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('\nAUDIT PASSED');
