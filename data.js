import { STORAGE_KEYS, loadPreference, savePreference, removePreference } from "./storage.js?v=14";
import { translations } from "./i18n.js?v=22";
import { clearDataButton, exportDataButton, importDataButton, importDataInput, languageSelect } from "./elements.js?v=2";
import { getTodayDateValue } from "./format.js?v=1";
import { showSaveStatus } from "./ui.js?v=1";

// Gather every persisted preference into a single backup object.
export function getExportData() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: Object.fromEntries(Object.values(STORAGE_KEYS).map((key) => [key, loadPreference(key, "")])),
  };
}

// Serialize the backup to JSON and trigger a download.
export function exportData() {
  const file = new Blob([JSON.stringify(getExportData(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pockez-backup-${getTodayDateValue()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Read a backup file, persist each preference, and reload to re-init.
export function importData(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported?.data || typeof imported.data !== "object") throw new Error("Invalid backup");
      for (const key of Object.values(STORAGE_KEYS)) {
        if (typeof imported.data[key] === "string") savePreference(key, imported.data[key]);
      }
      window.location.reload();
    } catch (error) {
      showSaveStatus("error");
      console.warn("Could not import dashboard data:", error);
    }
  });
  reader.readAsText(file);
}

// Wipe every persisted preference after confirming with the user.
export function clearAllData() {
  const strings = translations[languageSelect.value] || translations.en;
  if (!window.confirm(strings.clearDataConfirm)) return;
  for (const key of Object.values(STORAGE_KEYS)) removePreference(key);
  window.location.reload();
}

exportDataButton.addEventListener("click", exportData);
importDataButton.addEventListener("click", () => importDataInput.click());
importDataInput.addEventListener("change", () => {
  if (importDataInput.files[0]) importData(importDataInput.files[0]);
  importDataInput.value = "";
});
clearDataButton.addEventListener("click", clearAllData);
