/* Pockez service worker - offline app shell.
   RELEASE CHECKLIST - bump together when you ship changes:
   1. CACHE_VERSION below (e.g. pockez-v1.0 -> pockez-v1.1)
   2. the ?v=N query on style.css / app.js in index.html (changed files only)
   3. the ?v=N on the import specifiers at the top of app.js (when a module
      like storage.js / i18n.js changed)
   A changed URL can never be served from a stale cache - not the phone's
   HTTP cache, not a service worker, not the GitHub Pages CDN. */
const CACHE_VERSION = "pockez-v1.17";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css?v=32",
  "./app.js?v=41",
  "./state.js?v=1",
  "./ui.js?v=1",
  "./debug.js?v=2",
  "./settings.js?v=1",
  "./profiles.js?v=1",
  "./weightChart.js?v=1",
  "./data.js?v=1",
  "./format.js?v=1",
  "./elements.js?v=2",
  "./elements.js?v=1",
  "./exerciseLibrary.js?v=1",
  "./trainer.js?v=2",
  "./pwa.js?v=1",
  "./notes.js?v=1",
  "./trainerEngine.js?v=1",
  "./storage.js?v=14",
  "./i18n.js?v=22",
  "./i18n.js?v=21",
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

/* Exact-match cache first, then network (with runtime caching). No
   ignoreSearch: matching ANY cached version of a URL used to serve a
   one-deploy-stale app shell (old app.js against new HTML = dead UI).
   Offline navigations fall back to the cached shell. */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((exact) => {
      if (exact) return exact;
      return fetch(request)
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
            return caches.match("./index.html");
          }
          return caches.match(request, { ignoreSearch: true });
        });
    })
  );
});
