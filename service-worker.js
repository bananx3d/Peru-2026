
const CACHE="peru-expedition-v3";
const CORE=[
  "./","./index.html","./styles.css","./data.js","./app.js","./manifest.webmanifest",
  "./assets/logo.svg","./assets/amazon-hero.jpg","./assets/amazon-canoe.jpg",
  "./assets/amazon-lilies.jpg","./assets/amazon-monkey.jpg","./assets/amazon-frog.jpg",
  "./assets/machu.jpg","./assets/cusco.jpg","./assets/lima.jpg","./assets/sacred-valley.jpg",
  "./icons/icon-192.png","./icons/icon-512.png"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{
    const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;
  }).catch(()=>e.request.mode==="navigate"?caches.match("./index.html"):undefined)));
});
