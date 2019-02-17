self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("minimal-cache").then(function(cache) {
      console.log("sw install");
      return null;
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log("sw fetch");
      return response || fetch(event.request);
    })
  );
});
