import { translations } from "./i18n.js?v=22";
import { languageSelect, saveStatus } from "./elements.js?v=2";

// Toggle the save-status chip through its three states: "saving" (working),
// "saved" (default/neutral), "error" (save failed). Used across data ops,
// workout saves, and cache reset â€” every persistence path funnels through here
// so the chip never shows stale state.
export function showSaveStatus(state) {
  const strings = translations[languageSelect.value] || translations.en;

  saveStatus.classList.remove("is-saving", "is-error");

  if (state === "saving") {
    saveStatus.textContent = strings.saving;
    saveStatus.classList.add("is-saving");
  } else if (state === "error") {
    saveStatus.textContent = strings.saveError;
    saveStatus.classList.add("is-error");
  } else {
    saveStatus.textContent = strings.saved;
  }
}
