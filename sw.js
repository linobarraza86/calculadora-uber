self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("uber-calc-v1").then((cache) => {
            return cache.addAll([
                "index.html",
                "manifest.json",
                "icon.png"
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== "uber-calc-v1") {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});


