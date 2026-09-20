var cacheName = 'sanleandro-09 20 26 1418';
var indexUrl = 'index.html?rel=09%2020%2026%201418';
var cacheUrls = [
  indexUrl,
  'manifest.json?rel=09%2020%2026%201418',
  'sanleandro-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) { return cache.addAll(cacheUrls); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (names) {
        return Promise.all(names.filter(function (name) { return name !== cacheName; })
                                .map(function (name) { return caches.delete(name); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') { return; }
  event.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request, { ignoreSearch: true }).then(function (cached) {
        if (cached) { return cached; }
        return fetch(event.request).catch(function () {
          if (event.request.mode === 'navigate') { return cache.match(indexUrl); }
          return Response.error();
        });
      });
    })
  );
});