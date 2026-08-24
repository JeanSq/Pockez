/* Pockez service worker - offline app shell.
   RELEASE CHECKLIST - bump ALL of these together when you ship changes:
   1. CACHE_VERSION below (e.g. pockez-v3 -> pockez-v4)
   2. the ?v=N query on style.css / app.js in index.html
   A changed URL can never be served from a stale cache - not the phone's
   HTTP cache, not a service worker, not the GitHub Pages CDN. */
const CACHE_VERSION = "pockez-v5";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css?v=4",
  "./app.js?v=4",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

/* Cache-first with background refresh (stale-while-revalidate):
   instant loads, and the cache self-heals whenever the network is up. */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          const cacheable =
            response &&
            response.status === 200 &&
            (response.type === "basic" || response.type === "opaque");
          if (cacheable) {
            const copy = response.clone();
            caches
              .open(CACHE_VERSION)
              .then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
