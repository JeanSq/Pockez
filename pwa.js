import { translations } from "./i18n.js?v=21";
import { state } from "./state.js?v=1";
import { showSaveStatus } from "./ui.js?v=1";
import {
  installButtons,
  iosHintEls,
  isFileProtocol,
  isIos,
  isStandalone,
  languageSelect,
  resetOfflineCacheButton,
} from "./elements.js?v=1";

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js", { scope: "./", updateViaCache: "none" })
        .then((registration) => {
          registration.update().catch(() => {});

          document.addEventListener("visibilitychange", () => {
            if (!document.hidden) registration.update().catch(() => {});
          });
        })
        .catch((error) => {
          console.warn("Service worker registration failed:", error);
        });

      if (navigator.serviceWorker.controller) {
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });
      }
    });
  }
}

function showInstallButtons() {
  installButtons.forEach((btn) => btn.removeAttribute("hidden"));
  const footerWrap = document.querySelector(".footer-install");
  if (footerWrap) footerWrap.removeAttribute("hidden");
}

function hideInstallButtons() {
  installButtons.forEach((btn) => btn.setAttribute("hidden", ""));
  const footerWrap = document.querySelector(".footer-install");
  if (footerWrap) footerWrap.setAttribute("hidden", "");
}

function showIosHints() {
  iosHintEls.forEach((el) => el.removeAttribute("hidden"));
}

function showInstalledToast() {
  const strings = translations[languageSelect.value] || translations.en;
  const toast = document.createElement("div");
  toast.className = "install-toast";
  toast.textContent = strings.appInstalled;
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("is-hiding");
    setTimeout(() => toast.remove(), 400);
  }, 2600);
}

async function resetOfflineCache() {
  const strings = translations[languageSelect.value] || translations.en;
  if (!window.confirm(strings.clearAppCacheConfirm)) return;
  try {
    showSaveStatus("saving"); // brief "working..." feedback
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
    showSaveStatus("saved");
    // Re-download the fresh appearance shell, then load it.
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) await registration.update();
    }
    window.location.reload();
  } catch (error) {
    console.warn("Could not reset offline cache:", error);
    showSaveStatus("error");
  }
}

function initPwa() {
  registerServiceWorker();

  if (isStandalone || isFileProtocol) {
    hideInstallButtons();
  } else if (isIos) {
    showIosHints();
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    if (!isStandalone && !isFileProtocol) showInstallButtons();
  });

  installButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!state.deferredInstallPrompt) return;
      state.deferredInstallPrompt.prompt();
      const { outcome } = await state.deferredInstallPrompt.userChoice;
      if (outcome === "accepted") state.deferredInstallPrompt = null;
    });
  });

  window.addEventListener("appinstalled", () => {
    state.deferredInstallPrompt = null;
    hideInstallButtons();
    showInstalledToast();
  });

  if (resetOfflineCacheButton) {
    resetOfflineCacheButton.addEventListener("click", resetOfflineCache);
  }
}

export {
  registerServiceWorker,
  showInstallButtons,
  hideInstallButtons,
  showIosHints,
  showInstalledToast,
  resetOfflineCache,
  initPwa,
};
