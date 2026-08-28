/* Pockez service worker - offline app shell.
   RELEASE CHECKLIST - bump together when you ship changes:
   1. CACHE_VERSION below (e.g. pockez-v9 -> pockez-v10)
   2. the ?v=N query on style.css / app.js in index.html (changed files only)
   3. the ?v=N on the import specifiers at the top of app.js (when a module
      like storage.js / i18n.js changed)
   A changed URL can never be served from a stale cache - not the phone's
   HTTP cache, not a service worker, not the GitHub Pages CDN. */
const CACHE_VERSION = "pockez-v27";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css?v=24",
  "./app.js?v=23",
  "./storage.js?v=12",
  "./i18n.js?v=17",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./fonts/bangers-400.woff2",
  "./fonts/caveat.woff2",
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
   instant loads, and the cache self-heals whenever the network is up.
   `ignoreSearch` lets a versioned request (style.css?v=N) fall back to ANY
   cached version, so a mid-deploy 404 can never break a working client. */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
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
        .catch(() => {
          // Offline / failed fetch: navigations fall back to the cached
          // shell so the app still opens; assets serve the last good copy.
          if (request.mode === "navigate") {
            return caches.match("./index.html", { ignoreSearch: true });
          }
          return cached;
        });
      return cached || network;
    })
  );
});
