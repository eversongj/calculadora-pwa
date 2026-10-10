const CACHE = "calculadora-v3";

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
  self.skipWaiting();
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (cachesAtuais) {
      return Promise.all(
        cachesAtuais
          .filter(function (nome) { return nome !== CACHE; })
          .map(function (nome) { return caches.delete(nome); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (evento) {
  if (evento.request.method !== "GET") {
    return;
  }

  evento.respondWith(
    caches.match(evento.request, { cacheName: CACHE }).then(function (resposta) {
      return resposta || fetch(evento.request);
    })
  );
});
