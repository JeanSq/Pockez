// --- Debug / instrumentation ---
// Active ONLY when the page is opened with ?debug in the URL
// (e.g. index.html?debug). Production runs stay free of console spam
// and the log buffer can no longer grow without bound.
export const DEBUG_ENABLED = /[?&]debug\b/i.test(location.search);
export const MAX_DEBUG_LOGS = 500;
export const __debugLogs = [];
export function debugLog(msg, meta = {}) {
  if (!DEBUG_ENABLED) return;
  const entry = { t: new Date().toISOString(), msg, bodyClass: document.body.className, meta };
  __debugLogs.push(entry);
  if (__debugLogs.length > MAX_DEBUG_LOGS) __debugLogs.shift();
  try { console.log("[dbg]", entry); } catch (e) {}
}

export function exportDebugLogs() {
  try {
    const blob = new Blob([JSON.stringify(__debugLogs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pockez-debug-log.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
  }
}

// Floating export button + Shift+D shortcut, ?debug builds only
if (DEBUG_ENABLED) {
  const debugButton = document.createElement('button');
  debugButton.textContent = 'Export logs';
  debugButton.id = 'debug-export';
  debugButton.style.cssText = 'position:fixed;right:12px;bottom:96px;z-index:9999;padding:6px 8px;border-radius:6px;background:#222;color:#fff;border:0;opacity:0.8;font-size:12px;';
  debugButton.addEventListener('click', exportDebugLogs);
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(debugButton));

  // keyboard export: Shift+D
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 'd') {
      exportDebugLogs();
    }
  });
}

// Freeze perpetual decorative loops while scrolling (see .is-scrolling CSS).
let __scrollEndTimer = null;
export function __markScrolling() {
  document.body.classList.add("is-scrolling");
  if (__scrollEndTimer) clearTimeout(__scrollEndTimer);
  __scrollEndTimer = setTimeout(() => {
    document.body.classList.remove("is-scrolling");
  }, 200);
}
window.addEventListener("scroll", __markScrolling, { passive: true });

// (?debug) Scroll-geometry probe: logs the exact numbers that expose any
// horizontal shift - scrollbar width, column edges, centering error, and
// the fixed nav / active panel rects.
let __lastScrollProbe = 0;
window.addEventListener(
  "scroll",
  () => {
    if (!DEBUG_ENABLED) return;
    const now = performance.now();
    if (now - __lastScrollProbe < 250) return;
    __lastScrollProbe = now;

    const root = document.documentElement;
    const bodyRect = document.body.getBoundingClientRect();
    const navRect = document.querySelector(".app-nav")?.getBoundingClientRect();
    const panelRect = document
      .querySelector(".widget-panel.is-active")
      ?.getBoundingClientRect();
    const round1 = (n) => Math.round(n * 10) / 10;
    debugLog("scroll geometry", {
      scrollXExact: Math.round(window.scrollX * 100) / 100,
      scrollYExact: Math.round(window.scrollY * 100) / 100,
      innerWidth: window.innerWidth,
      rootClientWidth: root.clientWidth,
      scrollbarWidth: window.innerWidth - root.clientWidth,
      rootHOverflow: root.scrollWidth - root.clientWidth,
      bodyHOverflow: document.body.scrollWidth - document.body.clientWidth,
      bodyLeftGap: round1(bodyRect.left),
      bodyRightGap: round1(window.innerWidth - bodyRect.right),
      centerDeviation: round1((bodyRect.left + bodyRect.right) / 2 - window.innerWidth / 2),
      navLeft: navRect ? round1(navRect.left) : null,
      navRightGap: navRect ? round1(window.innerWidth - navRect.right) : null,
      panelLeft: panelRect ? round1(panelRect.left) : null,
      panelRightGap: panelRect ? round1(window.innerWidth - panelRect.right) : null,
    });
  },
  { passive: true }
);
