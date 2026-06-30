const CACHE_NAME = 'adrhtml-cache-v1';
const FILES_TO_CACHE = [
    'index.html',
    'manifest.json'
];

// Install event — cache core files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Fetch event — serve from cache first
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
