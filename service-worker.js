self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('meta-pwa-cache-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './static/style.css',
        './static/script.js',
        './manifest.json',
        './static/templates.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Always fetch the templates file fresh from the network
  if (event.request.url.includes("static/templates.json")) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
