/**
 * Pockez — storage abstraction.
 * Every read/write of persistent data flows through this module, so a future
 * backend swap (IndexedDB, cloud sync) touches exactly one file. The legacy
 * key migration runs once, on import.
 */

const STORAGE_PREFIX = "@sketch-dashboard:";
const LEGACY_PREFIX = "sketch-dashboard-";

export const STORAGE_KEYS = {
  notes: `${STORAGE_PREFIX}notes`,
  language: `${STORAGE_PREFIX}language`,
  accent: `${STORAGE_PREFIX}accent`,
  background: `${STORAGE_PREFIX}background`,
  bodyStats: `${STORAGE_PREFIX}body-stats`,
  weightEntries: `${STORAGE_PREFIX}weight-entries`,
  notesCollection: `${STORAGE_PREFIX}notes-collection`,
  goalWeight: `${STORAGE_PREFIX}goal-weight`,
  animations: `${STORAGE_PREFIX}animations`,
  darkMode: `${STORAGE_PREFIX}dark-mode`,
  trueShadows: `${STORAGE_PREFIX}true-shadows`,
  profiles: `${STORAGE_PREFIX}profiles`,
  activeProfile: `${STORAGE_PREFIX}active-profile`,
  trainerPlan: `${STORAGE_PREFIX}trainer-plan`,
  workouts: `${STORAGE_PREFIX}workouts`,
};

// Migrate legacy keys (copy only if new key not set)
function migrateLegacyStorage() {
  try {
    for (const [key, newKey] of Object.entries(STORAGE_KEYS)) {
      const legacyKey = `${LEGACY_PREFIX}${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      if (localStorage.getItem(newKey) == null && localStorage.getItem(legacyKey) != null) {
        localStorage.setItem(newKey, localStorage.getItem(legacyKey));
      }
    }
  } catch (error) {
    console.warn("Migration failed:", error);
  }
}

migrateLegacyStorage();

export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Could not save preference:", error);
  }
}

export function loadPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    console.warn("Could not read preference:", error);
    return fallback;
  }
}

export function removePreference(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Could not remove preference:", error);
  }
}