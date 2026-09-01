import { STORAGE_KEYS, loadPreference, savePreference } from "./storage.js?v=14";
import { translations } from "./i18n.js?v=21";
import { activityDescription, activityInput, animationsState, animationsToggle, darkModeState, darkModeToggle, languageSelect, trueShadowsState, trueShadowsToggle } from "./elements.js?v=1";
import { logUiState } from "./debug.js?v=2";

export function updateActivityDescription(lang = languageSelect.value) {
  const strings = translations[lang] || translations.en;
  const selectedOption = activityInput.options[activityInput.selectedIndex];
  const descriptionKey = selectedOption?.dataset.descriptionKey;
  activityDescription.textContent = descriptionKey
    ? strings[descriptionKey] || translations.en[descriptionKey]
    : "";
}


export const accentThemes = {
  "red-blue": ["#ef4444", "#3b5bdb"],
  "orange-teal": ["#f59b2c", "#0e9f9a"],
  "yellow-pink": ["#f6d80b", "#e84393"],
};

export function setAccent(accentId) {
  const colors = accentThemes[accentId] || accentThemes["red-blue"];
  document.documentElement.style.setProperty("--aberration-a", colors[0]);
  document.documentElement.style.setProperty("--aberration-b", colors[1]);
  const selectedOption = document.querySelector(`input[name="accent"][value="${accentId}"]`);
  if (selectedOption) selectedOption.checked = true;
  savePreference(STORAGE_KEYS.accent, accentId);
  logUiState(`Accent changed to ${accentId}`);
}

export function setBackground(backgroundId) {
  const normalizedBackground = backgroundId === "desk" ? "paper" : backgroundId;
  // "dark-paper" was removed as an option: saved preferences for it fall
  // through to the "graffiti" default below.
  const safeBackground = ["paper", "graffiti", "blueprint"].includes(normalizedBackground)
    ? normalizedBackground
    : "graffiti";
  document.body.classList.remove(
    "background-paper",
    "background-graffiti",
    "background-blueprint"
  );
  document.body.classList.add(`background-${safeBackground}`);
  const selectedOption = document.querySelector(
    `input[name="background"][value="${safeBackground}"]`
  );
  if (selectedOption) selectedOption.checked = true;
  savePreference(STORAGE_KEYS.background, safeBackground);
  logUiState(`Background changed to ${safeBackground}`);
}

export function setAnimationsEnabled(enabled) {
  const safeEnabled = enabled !== false;
  document.body.classList.toggle("animations-off", !safeEnabled);
  animationsToggle.checked = safeEnabled;
  animationsState.textContent = safeEnabled
    ? (translations[languageSelect.value] || translations.en).animationsOn
    : (translations[languageSelect.value] || translations.en).animationsOff;
  savePreference(STORAGE_KEYS.animations, String(safeEnabled));
}

export function setDarkModeEnabled(enabled) {
  const safeEnabled = enabled === true;
  document.body.classList.toggle("dark-mode", safeEnabled);
  darkModeToggle.checked = safeEnabled;
  darkModeState.textContent = safeEnabled
    ? (translations[languageSelect.value] || translations.en).darkModeOn
    : (translations[languageSelect.value] || translations.en).darkModeOff;
  updateThemeColor();
  savePreference(STORAGE_KEYS.darkMode, String(safeEnabled));
}

// Keep the browser chrome / status bar in tune with the theme (the static meta
// previously left a near-black frame around the light app). Light mode matches
// the warm page base; dark mode matches the near-black canvas dueskin.

function updateThemeColor() {
  const dark = document.body.classList.contains("dark-mode");
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = dark ? "#151517" : "#e9e7e2";
  const status = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (status) status.content = dark ? "black-translucent" : "default";
}

export function setTrueShadowsEnabled(enabled) {
  const safeEnabled = enabled === true;
  document.body.classList.toggle("true-shadows", safeEnabled);
  trueShadowsToggle.checked = safeEnabled;
  trueShadowsState.textContent = safeEnabled
    ? (translations[languageSelect.value] || translations.en).trueShadowsOn
    : (translations[languageSelect.value] || translations.en).trueShadowsOff;
  savePreference(STORAGE_KEYS.trueShadows, String(safeEnabled));
}

export function loadSettings() {
  setAccent(loadPreference(STORAGE_KEYS.accent, "red-blue"));
  setBackground(loadPreference(STORAGE_KEYS.background, "graffiti"));
  setAnimationsEnabled(loadPreference(STORAGE_KEYS.animations, "true") !== "false");
  setDarkModeEnabled(loadPreference(STORAGE_KEYS.darkMode, "false") === "true");
  setTrueShadowsEnabled(loadPreference(STORAGE_KEYS.trueShadows, "false") === "true");
}
