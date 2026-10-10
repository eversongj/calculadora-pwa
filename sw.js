const CACHE = "calculadora-v1";

self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js",
        "./manifest.json",
        "./icons/icon-192.jpg",
        "./icons/icon-512.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", function (evento) {
  if (evento.request.method !== "GET") {
    return;
  }

  evento.respondWith(
    caches.match(evento.request).then(function (resposta) {
      return resposta || fetch(evento.request);
    })
  );
});
