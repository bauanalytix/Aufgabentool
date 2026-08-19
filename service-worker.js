const CACHE_NAME = "mein-tag-v8-2026-08-19";
const APP_FILES = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/assets/app-icon.svg",
  "/assets/fluse-klein.png"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);

  if(event.request.mode==="navigate"){
    event.respondWith(
      // Startseiten immer frisch anfordern. Dadurch erhalten installierte
      // Handy- und Laptop-Apps Korrekturen ohne veraltete HTML-Zwischenstände.
      fetch(event.request,{cache:"no-store"})
        .then(response=>{
          const copy=response.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put("/index.html",copy));
          return response;
        })
        .catch(()=>caches.match("/index.html"))
    );
    return;
  }

  if(url.origin===self.location.origin || url.hostname==="www.gstatic.com"){
    event.respondWith(
      caches.match(event.request).then(cached=>{
        const fresh=fetch(event.request).then(response=>{
          if(response && (response.ok || response.type==="opaque")){
            const copy=response.clone();
            caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
          }
          return response;
        }).catch(()=>cached);
        return cached || fresh;
      })
    );
  }
});
