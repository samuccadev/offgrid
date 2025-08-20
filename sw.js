const CACHE_NAME = 'solar-app-cache-v1';
const urlsToCache = [
  './index.html',
  './style.css',
  './script.js'
];

// 🔹 Instalação e cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 🔹 Ativação (opcional, usado para limpar caches antigos)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// 🔹 Intercepta requisições e retorna do cache ou rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
