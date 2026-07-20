const VERSION = 'peru-2026-v15-stable';
const CORE_CACHE = `${VERSION}-core`;
const PHOTO_CACHE = 'peru-2026-photo-pack';
const CORE = [
  './', './index.html', './styles.css', './data.js', './guides.js', './app.js',
  './modules/journal.js', './modules/amazon.js', './modules/cusco.js',
  './modules/ollantaytambo.js', './modules/lima.js', './modules/machu.js',
  './modules/wildlife.js', './photos.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CORE_CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key !== CORE_CACHE && key !== PHOTO_CACHE && key !== 'peru-2026-photo-pack-v14')
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

async function navigationResponse(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CORE_CACHE); cache.put('./index.html', response.clone()).catch(() => {});
    return response;
  } catch {
    return (await caches.match('./index.html')) || Response.error();
  }
}

async function coreResponse(request) {
  const hit = await caches.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response?.ok) (await caches.open(CORE_CACHE)).put(request, response.clone()).catch(() => {});
  return response;
}

async function imageResponse(request) {
  const cache = await caches.open(PHOTO_CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch { return Response.error(); }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') { event.respondWith(navigationResponse(event.request)); return; }
  if (event.request.destination === 'image') { event.respondWith(imageResponse(event.request)); return; }
  event.respondWith(coreResponse(event.request).catch(() => caches.match('./index.html')));
});
