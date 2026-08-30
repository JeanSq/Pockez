import { languageSelect } from "./elements.js?v=1";
import { translations } from "./i18n.js?v=21";

export function formatWeight(value) {
  return Number(value).toFixed(1);
}

export function formatMeasurementDate(dateValue) {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString(
    languageSelect.value,
    { year: "numeric", month: "short", day: "numeric" }
  );
}

export function getTodayDateValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - offset).toISOString().split("T")[0];
}
