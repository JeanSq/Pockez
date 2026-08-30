import { STORAGE_KEYS, loadPreference, savePreference } from "./storage.js?v=14";

export function makeProfile(name, data = {}) {
  return {
    id: crypto.randomUUID(),
    name: name.trim() || "My profile",
    bodyStats: data.bodyStats || "",
    weightEntries: data.weightEntries || "[]",
    goalWeight: data.goalWeight || "",
    trainerPlan: data.trainerPlan || "",
  };
}

export function getProfiles() {
  const savedProfiles = loadPreference(STORAGE_KEYS.profiles, null);
  if (savedProfiles) {
    try {
      const profiles = JSON.parse(savedProfiles);
      if (Array.isArray(profiles) && profiles.length > 0) return profiles;
    } catch (error) {
      console.warn("Could not load profiles:", error);
    }
  }

  const migratedProfile = makeProfile("My profile", {
    bodyStats: loadPreference(STORAGE_KEYS.bodyStats, ""),
    weightEntries: loadPreference(STORAGE_KEYS.weightEntries, "[]"),
    goalWeight: loadPreference(STORAGE_KEYS.goalWeight, ""),
  });
  saveProfiles([migratedProfile]);
  savePreference(STORAGE_KEYS.activeProfile, migratedProfile.id);
  return [migratedProfile];
}

export function saveProfiles(profiles) {
  savePreference(STORAGE_KEYS.profiles, JSON.stringify(profiles));
}

export function getActiveProfileId() {
  const profiles = getProfiles();
  const savedId = loadPreference(STORAGE_KEYS.activeProfile, "");
  return profiles.some((profile) => profile.id === savedId) ? savedId : profiles[0].id;
}

export function getActiveProfile() {
  return getProfiles().find((profile) => profile.id === getActiveProfileId());
}

export function updateActiveProfile(update) {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  const profile = profiles.find((item) => item.id === activeId);
  if (!profile) return;
  Object.assign(profile, update);
  saveProfiles(profiles);
}
