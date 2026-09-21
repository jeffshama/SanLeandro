const CACHE_NAME='sanleandro-09 21 26 1635';
const PRECACHE=[
  'index.html?rel=09 21 26 1635',
  'manifest.json?rel=09 21 26 1635',
  'sanleandro-icon.png'
];

self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting())
));

self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim())
));

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(
    caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
      if(!response||response.status!==200||response.type==='opaque') return response;
      const copy=response.clone();
      caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));
      return response;
    })).catch(()=>caches.match('index.html?rel=09 21 26 1635'))
  );
});