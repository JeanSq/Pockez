import { translations } from "./i18n.js?v=21";
import { state } from "./state.js?v=1";
import { showSaveStatus } from "./ui.js?v=1";
import { STORAGE_KEYS, savePreference } from "./storage.js?v=14";
import { getWorkouts, computeWorkoutTonnage, getAllTimePRs, getCelebration } from "./workoutEngine.js?v=1";
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

function renderWorkoutList() {
  const workouts = getWorkouts();
  const strings = translations[languageSelect.value] || translations.en;
  if (!workoutList) return;
  workoutList.innerHTML = "";

  if (workouts.length === 0) {
    const empty = document.createElement("li");
    empty.className = "workout-list-empty";
    empty.textContent = strings.logNoSessions || "No sessions yet";
    workoutList.append(empty);
    return;
  }

  [...workouts].sort((a, b) => b.date.localeCompare(a.date)).forEach((w) => {
    const item = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "workout-list-item";
    btn.classList.toggle("is-active", w.id === state.activeWorkoutId);
    const tonnage = computeWorkoutTonnage(w.exercises);
    btn.textContent = w.date + "  —  " + tonnage.totalKg.toLocaleString() + " kg";
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
  const prs = getAllTimePRs();
  workoutExercisesContainer.innerHTML = "";

  state.unsavedExercises.forEach((ex, exIdx) => {
    const card = document.createElement("article");
    card.className = "exercise-card";

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

    const pr = prs[ex.name];
    if (pr && pr.kg > 0) {
      const prEl = document.createElement("small");
      prEl.className = "workout-pr";
      prEl.textContent = "PR: " + pr.kg + " kg";
      card.append(prEl);
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
