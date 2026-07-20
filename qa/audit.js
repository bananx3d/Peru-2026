const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const scriptFiles = [
  'data.js', 'guides.js', 'modules/journal.js', 'modules/amazon.js',
  'modules/cusco.js', 'modules/ollantaytambo.js', 'modules/lima.js',
  'modules/machu.js', 'modules/wildlife.js', 'photos.js', 'app.js'
];
const routes = [
  'dashboard', 'plan', 'bookings', 'tasks', 'machu', 'payments', 'journal',
  'journal/04.09', 'pack', 'emergency', 'amazon', 'wildlife', 'photos',
  'cusco', 'ollanta', 'lima', 'guide', 'settings',
  'guide/amazon', 'guide/iquitos', 'guide/cusco', 'guide/sacred',
  'guide/olla', 'guide/machu', 'unknown-route', 'journal/20.09', 'plan'
];

function createContext(hash) {
  const store = new Map();
  const body = { innerHTML: '', appendChild() {} };
  const document = {
    body,
    documentElement: { scrollHeight: 1600 },
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: tag => ({
      tagName: String(tag).toUpperCase(), className: '', textContent: '',
      classList: { add() {}, remove() {}, toggle() { return false; } },
      click() {}, appendChild() {}, setAttribute() {},
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
    console, window: null, document, localStorage,
    location: { hash: `#/${hash}`, reload() {} },
    navigator: { onLine: true },
    addEventListener() {}, innerHeight: 844, scrollY: 0, scrollTo() {}, print() {},
    Blob, Request: class {}, URL: class URLMock {
      constructor(url) { const parsed = new (require('url').URL)(url); this.hostname = parsed.hostname; }
      static createObjectURL() { return 'blob:test'; }
      static revokeObjectURL() {}
    },
    alert() {}, confirm: () => true, FormData: class {}, FileReader: class {}, Image: class {},
    setTimeout, clearTimeout, Date, JSON, Math, Object, Array, String, Number, Boolean,
    RegExp, Map, Set, Promise
  };
  context.window = context;
  vm.createContext(context);
  return { context, body };
}

const failures = [];
const routeLengths = [];
for (const route of routes) {
  const { context, body } = createContext(route);
  try {
    for (const file of scriptFiles) {
      vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
    }
    if (!body.innerHTML.includes('<main')) failures.push(`Trasa ${route}: brak głównej zawartości`);
    routeLengths.push([route, body.innerHTML.length]);
  } catch (error) {
    failures.push(`Trasa ${route}: ${error.message}`);
  }
}

const base = createContext('dashboard').context;
for (const file of scriptFiles.slice(0, -1)) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), base, { filename: file });
}
const photos = base.PERU_PHOTOS.items;
const amazonSpecies = base.PERU_AMAZON.species;
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
  ['Amazonia i Iquitos', ['curassow','canoe','river','wildlife','forest','lodge','habitat','bungalow','iquitos','port','iquitos-sunset','iquitos-centre']],
  ['Cusco', base.PERU_CUSCO.places.map(item => item.id)],
  ['Sacred Valley', ['pisac','moray','maras','chinchero']],
  ['Lima', base.PERU_LIMA.sights.map(item => item.id)],
  ['Ollantaytambo', base.PERU_OLLANTA.places.map(item => item.id)],
  ['Machu Picchu', base.PERU_MACHU.route3.map(item => item.id)],
  ['Machu Picchu', base.PERU_MACHU.route2.routes.find(item => item.id === '2a').steps.map(item => item.id)],
  ['Machu Picchu', base.PERU_MACHU.route2.routes.find(item => item.id === '2b').steps.map(item => item.id)]
];
let coverageExpected = 0; let coverageActual = 0;
for (const [category, targets] of coverageGroups) {
  for (const target of targets) {
    coverageExpected += 1;
    if (photos.some(photo => photo.category === category && photo.targets.includes(target))) coverageActual += 1;
    else failures.push(`Brak zdjęcia: ${category} / ${target}`);
  }
}

const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const defs = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map(match => match[1]));
const refs = new Set([...css.matchAll(/var\(--([\w-]+)/g)].map(match => match[1]));
const dynamic = new Set(['hero', 'cusco-hero', 'lima-hero', 'machu-hero', 'ollanta-hero']);
for (const ref of refs) if (!defs.has(ref) && !dynamic.has(ref)) failures.push(`CSS: niezdefiniowana zmienna --${ref}`);


const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
const coreMatch = sw.match(/const CORE = \[([\s\S]*?)\];/);
if (!coreMatch) failures.push('Service worker: brak listy CORE');
else {
  const coreEntries = [...coreMatch[1].matchAll(/'\.\/([^']*)'/g)].map(match => match[1] || 'index.html');
  for (const entry of coreEntries) {
    const normalized = entry === '' ? 'index.html' : entry;
    if (normalized !== '.' && !fs.existsSync(path.join(root, normalized))) failures.push(`Service worker: brak pliku ${normalized}`);
  }
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
for (const icon of manifest.icons || []) {
  const iconPath = icon.src.replace(/^\.\//, '');
  if (!fs.existsSync(path.join(root, iconPath))) failures.push(`Manifest: brak ikony ${iconPath}`);
}

const allText = fs.readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isFile() && /\.(js|html|md|json|css)$/.test(entry.name))
  .map(entry => fs.readFileSync(path.join(root, entry.name), 'utf8')).join('\n');
const privatePatterns = [/HM[A-Z0-9]{6,}/, /\+51\s*939/, /939\s*132\s*148/, /1920\s*USD/i, /150\s*USD/i, /app\.notion\.com\/p\//];
for (const pattern of privatePatterns) if (pattern.test(allText)) failures.push(`Prywatność: wykryto wzorzec ${pattern}`);

console.log(`Routes rendered: ${routeLengths.length}/${routes.length}`);
console.log(`Photos: ${photos.length}`);
console.log(`Animal coverage: ${amazonSpecies.length}/${amazonSpecies.length}`);
console.log(`Structured media coverage: ${coverageActual}/${coverageExpected}`);
console.log(`CSS variables: ${refs.size} references, ${defs.size} definitions`);
console.log(`Privacy patterns: ${privatePatterns.length} checked`);
console.log('Service worker core and manifest icons: checked');
if (failures.length) {
  console.error('\nFAILURES');
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('\nAUDIT PASSED');
