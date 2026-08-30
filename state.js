// Shared mutable app state, centralized in one object so feature modules can
// read AND reassign it across module boundaries. ES-module imports are
// read-only bindings, so a plain `export const state = {...}` object whose
// PROPERTIES are mutated is the clean way to share mutable state between
// modules without introducing import cycles.
export const state = {
  deferredInstallPrompt: null,   // PWA beforeinstallprompt capture
  profileEditMode: null,         // "add" | "rename" | null
  weightTooltipTimer: null,      // chart tooltip timers
  weightTooltipFadeTimer: null,
  weightTooltipHideDelayTimer: null,
  editingMeasurementId: null,    // measurement currently being edited
  bodyStatsCalculated: false,
  trainerOpenDays: null,         // set of expanded trainer plan days
  activeWorkoutId: null,         // workout currently open in the editor
  unsavedExercises: [],          // editor's unsaved exercise list
  unsavedNotes: "",
  widgetBeforeSettings: null,    // panel restored after closing settings
  saveTimer: null,               // debounced workout autosave timer
};