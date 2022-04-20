// Files to cache
const cacheName = 'CalcoloCodiceFiscaleGioacchinoSpinazzola';
const contentToCache = [
  '/codice_fiscale_generator/scripts/calcolo_codice_fiscale.js',
  '/codice_fiscale_generator/styles/bulma/css/bulma-rtl.css',
  '/codice_fiscale_generator/styles/stile.css',
  '/codice_fiscale_generator/favicon.ico',
  '/codice_fiscale_generator/icon-192x192.png',
  '/codice_fiscale_generator/icon-256x256.png',
  '/codice_fiscale_generator/icon-384x384.png',
  '/codice_fiscale_generator/icon-512x512.png',
  '/codice_fiscale_generator/index.html'
];

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});