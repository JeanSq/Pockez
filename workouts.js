import { translations } from "./i18n.js?v=21";
import { state } from "./state.js?v=1";
import { showSaveStatus } from "./ui.js?v=1";
import { STORAGE_KEYS, savePreference } from "./storage.js?v=14";
import { getWorkouts, computeWorkoutTonnage, getAllTimePRs, getCelebration, getExercisePR, EXERCISE_LIBRARY } from "./workoutEngine.js?v=1";
import { TRAINER_MUSCLE_COLORS } from "./exerciseLibrary.js?v=1";
import {
  languageSelect,
  saveStatus,
  workoutCelebration,
  workoutCelebrationText,
  workoutDateInput,
  workoutEditor,
  workoutExercisesContainer,
  workoutFeelingsInput,
  workoutLayout,
  workoutList,
  workoutTonnageValue,
  workoutTotalRepsValue,
} from "./elements.js?v=1";

function saveWorkouts(workouts) {
  showSaveStatus("saving");

  try {
    savePreference(STORAGE_KEYS.workouts, JSON.stringify(workouts));
    showSaveStatus("saved");
  } catch (error) {
    console.error("Save failed:", error);
    showSaveStatus("error");
  }
}

// The workout currently open in the editor. In-memory only: a fresh visit
// starts with the editor hidden until the user opens or creates a workout.

// In-progress edits for the active workout (avoids mutating stored data)

function setEditorVisible(visible) {
  if (workoutEditor) workoutEditor.hidden = !visible;
  if (saveStatus) saveStatus.hidden = !visible;
  if (workoutLayout) workoutLayout.classList.toggle("editor-hidden", !visible);
}

function scheduleWorkoutSave() {
  showSaveStatus("saving");
  if (state.saveTimer) clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(() => saveActiveWorkout(), 400);
}

function workoutTierClass(totalKg) {
  if (totalKg >= 1000) return "var(--accent-yellow)";
  if (totalKg >= 300) return "var(--accent-purple)";
  if (totalKg >= 100) return "var(--accent-red)";
  return "var(--accent-blue)";
}

function sessionMeta(w, strings) {
  const parts = [];
  if (w.exercises && w.exercises.length) {
    parts.push(w.exercises.length + " " + (strings.logExercisesTiny || "ex"));
   }
  const note = (w.notes || "").replace(/\s+/g,  ' ').trim();
 if (note) parts.push(note.slice(0, 24));
  return parts.join("  -  ");
}

function renderWorkoutList() {
  const workouts = getWorkouts();
  const strings = translations[languageSelect.value] || translations.en;
  if (!workoutList) return;
  workoutList.innerHTML = "";

  if (workouts.length === 0) {
    const empty = document.createElement("li");
    empty.className = "workout-list-empty";
    const emptyText = document.createElement("span");
    emptyText.textContent = strings.logNoSessions || "No sessions yet";
    empty.append(emptyText);
    const flourish = document.createElement("span");
    flourish.className = "workout-list-empty-flourish";
    flourish.textContent = strings.logEmptyFlourish || "";
    empty.append(flourish);
    workoutList.append(empty);
    return;
  }

  [...workouts].sort((a, b) => b.date.localeCompare(a.date)).forEach((w) => {
    const item = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    const tonnage = computeWorkoutTonnage(w.exercises);
    btn.className = "workout-list-item summary-card dash-row";
    btn.style.borderLeftWidth = "6px";
    btn.style.borderLeftColor = workoutTierClass(tonnage.totalKg);
    btn.classList.toggle("is-active", w.id === state.activeWorkoutId);
    const rowText = document.createElement("span");
    rowText.className = "dash-row-text";
    const dateEl = document.createElement("strong");
    dateEl.textContent = w.date;
    const metaEl = document.createElement("em");
    metaEl.textContent = sessionMeta(w, strings);
    rowText.append(dateEl, metaEl);
    const valueEl = document.createElement("span");
    valueEl.className = "dash-value";
    const val = document.createElement("span");
    val.textContent = tonnage.totalKg.toLocaleString();
    const unit = document.createElement("small");
    unit.textContent = strings.weightUnit || "kg";
    valueEl.append(val, unit);
    btn.append(rowText, valueEl);
    btn.addEventListener("click", () => selectWorkout(w.id));

    const del = document.createElement("button");
    del.type = "button";
    del.className = "workout-list-delete";
    del.textContent = "×";
    del.title = strings.deleteNote || "Delete";
    del.addEventListener("click", (e) => { e.stopPropagation(); deleteWorkout(w.id); });

    item.append(btn, del);
    workoutList.append(item);
  });
}

function renderWorkoutExercises() {
  const strings = translations[languageSelect.value] || translations.en;
  const prs = getAllTimePRs(); // kept for reference; per-exercise PR + new-PR detection is below
  workoutExercisesContainer.innerHTML = "";

  state.unsavedExercises.forEach((ex, exIdx) => {
    const card = document.createElement("article");
    card.className = "exercise-card";
    const libraryItem = EXERCISE_LIBRARY.find((e) => e.name === ex.name);
    const muscleColor = libraryItem ? (TRAINER_MUSCLE_COLORS[libraryItem.muscle] || "var(--accent-purple)") : "var(--accent-purple)";
    card.style.borderLeftColor = muscleColor;
    card.style.borderLeftWidth = "6px";

    const header = document.createElement("div");
    header.className = "workout-exercise-header";
    const nameEl = document.createElement("strong");
    nameEl.className = "workout-exercise-title";
    nameEl.textContent = ex.name;
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "exercise-remove";
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", (strings.logRemoveExercise || "Remove exercise") + ": " + ex.name);
    removeBtn.addEventListener("click", () => removeWorkoutExercise(exIdx));
    header.append(nameEl, removeBtn);
    card.append(header);

    const currentMax = Math.max(0,...ex.sets.map((s) => Number(s.kgs) || 0));
    const prInfo = getExercisePR(ex.name, ex.sets);
    if (prInfo && prInfo.kg > 0) {
      const chipsRow = document.createElement("div");
      chipsRow.className = "workout-pr-row";
      const prEl = document.createElement("small");
      prEl.className = "workout-pr";
      prEl.textContent = "PR: " + prInfo.kg + " kg";
      chipsRow.append(prEl);
      if (prInfo.isNew && currentMax > 0) {
        const chip = document.createElement("span");
        chip.className = "workout-pr-chip";
        chip.textContent = strings.logNewPr || "NEW PR";
        chipsRow.append(chip);
      }
      card.append(chipsRow);
    }

    ex.sets.forEach((set, setIdx) => {
      const row = document.createElement("div");
      row.className = "workout-set-row";
      const label = document.createElement("span");
      label.className = "workout-set-label";
      label.textContent = (strings.setsLabel || "Set") + " " + (setIdx + 1);

      const repsInput = document.createElement("input");
      repsInput.type = "number";
      repsInput.min = "0";
      repsInput.step = "1";
      repsInput.className = "workout-set-input";
      repsInput.value = set.reps;
      repsInput.placeholder = strings.logRepsLabel || "reps";
      repsInput.dataset.exerciseIndex = exIdx;
      repsInput.dataset.setIndex = setIdx;
      repsInput.dataset.field = "reps";
      repsInput.addEventListener("input", onWorkoutSetChange);

      const kgsInput = document.createElement("input");
      kgsInput.type = "number";
      kgsInput.min = "0";
      kgsInput.step = "0.5";
      kgsInput.className = "workout-set-input";
      kgsInput.value = set.kgs;
      kgsInput.placeholder = strings.logKgsLabel || "kg";
      kgsInput.dataset.exerciseIndex = exIdx;
      kgsInput.dataset.setIndex = setIdx;
      kgsInput.dataset.field = "kgs";
      kgsInput.addEventListener("input", onWorkoutSetChange);

      row.append(label, repsInput, kgsInput);
      card.append(row);
    });

    const addSetBtn = document.createElement("button");
    addSetBtn.type = "button";
    addSetBtn.className = "workout-add-set-btn form-submit";
    addSetBtn.textContent = "+ " + (strings.logAddSet || "Set");
    addSetBtn.dataset.exerciseIndex = exIdx;
    addSetBtn.addEventListener("click", () => addWorkoutSet(exIdx));
    card.append(addSetBtn);

    workoutExercisesContainer.append(card);
  });


  updateWorkoutSummary();
}

function onWorkoutSetChange(e) {
  const exIdx = Number(e.target.dataset.exerciseIndex);
  const setIdx = Number(e.target.dataset.setIndex);
  const field = e.target.dataset.field;
  if (!state.unsavedExercises[exIdx] || !state.unsavedExercises[exIdx].sets[setIdx]) return;
  state.unsavedExercises[exIdx].sets[setIdx][field] = e.target.value;
  updateWorkoutSummary();
  scheduleWorkoutSave();
}

function updateWorkoutSummary() {
  const strings = translations[languageSelect.value] || translations.en;
  const { totalKg, totalReps } = computeWorkoutTonnage(state.unsavedExercises);
  if (workoutTonnageValue) workoutTonnageValue.textContent = totalKg.toLocaleString() + " " + (strings.weightUnit || "kg");
  if (workoutTotalRepsValue) workoutTotalRepsValue.textContent = String(totalReps);

  if (workoutCelebration && workoutCelebrationText) {
    if (totalKg > 0) {
      const compKey = getCelebration(totalKg);
      const comp = strings[compKey] || "";
      const base = strings.celebrationDefault || "You moved {total} kg today.";
      const msg = base.replace("{total}", totalKg.toLocaleString()) + " " + comp;
      workoutCelebrationText.textContent = msg;
      workoutCelebration.hidden = false;
    } else {
      workoutCelebration.hidden = true;
    }
  }
}

function addWorkoutExercise(name) {
  state.unsavedExercises.push({ name, sets: [{ reps: "", kgs: "" }] });
  renderWorkoutExercises();
  scheduleWorkoutSave();
}

function removeWorkoutExercise(idx) {
  state.unsavedExercises.splice(idx, 1);
  renderWorkoutExercises();
  scheduleWorkoutSave();
}

function addWorkoutSet(exIdx) {
  if (!state.unsavedExercises[exIdx]) return;
  const last = state.unsavedExercises[exIdx].sets[state.unsavedExercises[exIdx].sets.length - 1];
  state.unsavedExercises[exIdx].sets.push(last ? { reps: last.reps, kgs: last.kgs } : { reps: "", kgs: "" });
  renderWorkoutExercises();
  scheduleWorkoutSave();
}

function saveActiveWorkout() {
  if (!state.activeWorkoutId) return;
  const workouts = getWorkouts();
  const w = workouts.find((x) => x.id === state.activeWorkoutId);
  if (!w) return;
  w.exercises = JSON.parse(JSON.stringify(state.unsavedExercises));
  w.notes = workoutFeelingsInput ? workoutFeelingsInput.value : "";
  w.date = workoutDateInput && workoutDateInput.value ? workoutDateInput.value : w.date;
  saveWorkouts(workouts);
  renderWorkoutList();
}

function selectWorkout(id) {
  state.activeWorkoutId = id;
  renderWorkoutList();
  renderWorkout();
  showSaveStatus("saved");
}

function renderWorkout() {
  const workouts = getWorkouts();
  const w = workouts.find((x) => x.id === state.activeWorkoutId);
  if (!w) { setEditorVisible(false); return; }
  setEditorVisible(true);
  if (workoutDateInput) workoutDateInput.value = w.date;
  if (workoutFeelingsInput) workoutFeelingsInput.value = w.notes || "";
  state.unsavedExercises = JSON.parse(JSON.stringify(w.exercises));
  state.unsavedNotes = w.notes || "";
  renderWorkoutExercises();
}

function createWorkout() {
  const workouts = getWorkouts();
  const w = { id: crypto.randomUUID(), date: new Date().toISOString().slice(0, 10), notes: "", exercises: [] };
  workouts.push(w);
  saveWorkouts(workouts);
  state.activeWorkoutId = w.id;
  renderWorkoutList();
  renderWorkout();
  showSaveStatus("saved");
}

function deleteWorkout(id) {
  const strings = translations[languageSelect.value] || translations.en;
  if (!window.confirm(strings.deleteNote || "Delete?")) return;
  const workouts = getWorkouts().filter((w) => w.id !== id);
  if (state.activeWorkoutId === id) state.activeWorkoutId = null;
  saveWorkouts(workouts);
  renderWorkouts();
}

function renderWorkouts() {
  renderWorkoutList();
  renderWorkout();
}

export {
  addWorkoutExercise,
  addWorkoutSet,
  createWorkout,
  deleteWorkout,
  onWorkoutSetChange,
  removeWorkoutExercise,
  renderWorkout,
  renderWorkoutExercises,
  renderWorkoutList,
  renderWorkouts,
  saveActiveWorkout,
  saveWorkouts,
  scheduleWorkoutSave,
  selectWorkout,
  setEditorVisible,
  updateWorkoutSummary,
};
