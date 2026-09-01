/**
 * Pockez — personal notes, health, and training
 * Notes widget, i18n, single-widget icon navigation
 */
import { STORAGE_KEYS, loadPreference, savePreference, removePreference } from "./storage.js?v=14";
import { translations } from "./i18n.js?v=21";

import { DEBUG_ENABLED, debugLog, logUiState, logWeightTooltip } from "./debug.js?v=2";
import { formatMeasurementDate, formatWeight, getTodayDateValue } from "./format.js?v=1";
import { accentOptions, activityDescription, activityInput, aggressiveCaloriesResult, animationsState, animationsToggle, backgroundOptions, bodyForm, bodyInputs, bodyResults, calorieModeOptions, chartEmpty, chartRangeSelect, chartSummary, clearDataButton, conservativeCaloriesResult, darkModeState, darkModeToggle, dashDateEl, dashProgressEl, dashProgressFill, dashProgressMeta, exportDataButton, goalHint, goalWeightInput, goalWeightResult, i18nAriaElements, i18nElements, i18nPlaceholderElements, i18nTitleElements, importDataButton, importDataInput, installButtons, iosHintEls, isFileProtocol, isIos, isStandalone, languageSelect, latestWeightResult, measurementCancelButton, measurementDateInput, measurementList, measurementSubmitButton, measurementWeightInput, navButtons, newWorkoutButton, profileAddButton, profileCancelButton, profileCount, profileDeleteButton, profileEditor, profileNameInput, profileRenameButton, profileSaveButton, profileSelect, quickLinks, resetOfflineCacheButton, saveStatus, settingsClose, settingsDialog, settingsOpen, startingWeightResult, summaryBmi, summaryCalorieMode, summaryCalories, summaryWeight, summaryWeightChange, titleEl, trainerCustomForm, trainerCustomSection, trainerCustomSplitInput, trainerDays, trainerForm, trainerModeInputs, trainerPlanHeading, trainerPlanMeta, trainerPlanTitle, trainerRecommendedSection, trainingDaysInput, trainingEmphasisInput, trainingGoalInput, trainingVolumeInput, trueShadowsState, trueShadowsToggle, weightChangeResult, weightChart, weightChartArea, weightChartBaseline, weightChartGrid, weightChartLine, weightChartLineUnderlay, weightChartPoints, weightChartTooltip, weightChartTooltipBox, weightChartTooltipText, weightChartXLabels, weightChartYLabels, weightForm, weightGoalLine, weightHeroFill, weightHeroMeta, weightHeroProgress, weightTrendLine, widgetPanels, workoutAddExerciseName, workoutAddExerciseSubmit, workoutCelebration, workoutCelebrationText, workoutDateInput, workoutEditor, workoutExercisesContainer, workoutFeelingsInput, workoutLayout, workoutList, workoutSaveButton, workoutTonnageValue, workoutTotalRepsValue } from "./elements.js?v=1";
import { TRAINER_BODY_REGION, TRAINER_MUSCLE_COLORS, trainerExercises } from "./exerciseLibrary.js?v=1";
import { state } from "./state.js?v=1";

import { addCustomExercise, addLibraryExercise, buildCustomTrainerPlan, buildTrainerPlan, customSplitIdForPlan, getDayRecommendedExerciseIds, recommendRepsForSets, recommendSetsForReps } from "./trainerEngine.js?v=1";
import { computeWorkoutTonnage, getAllTimePRs, getCelebration, getWorkouts } from "./workoutEngine.js?v=1";


import { formatTrainerRest, getSavedTrainerPlan, getSuggestedTrainerEmphasis, getTrainerDayName, getTrainerPlanStore, loadTrainerPlan, migrateLegacyTrainerPlan, renderTrainerPlan, saveTrainerPlan, saveTrainerPlanStore, setTrainerModeRadio, updateTrainerSections } from "./trainer.js?v=2";
import { loadSettings, setAccent, setAnimationsEnabled, setBackground, setDarkModeEnabled, setTrueShadowsEnabled, updateActivityDescription } from "./settings.js?v=1";

import { getActiveProfile, getActiveProfileId, getProfiles, makeProfile, saveProfiles, updateActiveProfile } from "./profiles.js?v=1";

import { computeWeightProgress, getGoalWeight, loadBodyStatsProfile, renderWeightChart, replayWeightChartAnimation } from "./weightChart.js?v=1";
import { showSaveStatus } from "./ui.js?v=1";
import { initPwa } from "./pwa.js?v=1";

// Fast startup: remove `no-js` (so CSS hiding applies) and enable splash immediately
try {
  document.body.classList.add("splash");
  document.body.classList.remove("no-js");
} catch (e) {
  // ignore if body not ready
}


// --- PWA: service worker + install UX (extracted to pwa.js) ---
initPwa();


debugLog('startup: added splash/no-js handling');

// Hook title animation events to log and ensure we don't reveal content early
if (titleEl) {
  titleEl.addEventListener('animationstart', () => debugLog('title animationstart'));
  titleEl.addEventListener('animationend', () => debugLog('title animationend'));
}

// Day-index set of currently expanded plan days, so add/remove re-renders
// don't collapse the day being edited (null = never rendered yet).



function applyTranslations(lang) {
  const strings = translations[lang] || translations.en;

  for (const element of i18nElements) {
    const key = element.getAttribute("data-i18n");
    if (strings[key]) {
      element.textContent = strings[key];
    }
  }

  for (const element of i18nPlaceholderElements) {
    const key = element.getAttribute("data-i18n-placeholder");
    if (strings[key]) {
      element.placeholder = strings[key];
    }
  }

  // Icon buttons: accessible labels without visible text under icons
  for (const element of i18nAriaElements) {
    const key = element.getAttribute("data-i18n-aria");
    if (strings[key]) {
      element.setAttribute("aria-label", strings[key]);
    }
  }

  for (const element of i18nTitleElements) {
    const key = element.getAttribute("data-i18n-title");
    if (strings[key]) {
      element.title = strings[key];
    }
  }

  updateActivityDescription(lang);
  updateBmiCategoryText(lang);
  updateBmiReference(lang);
  if (animationsToggle) {
    animationsState.textContent = animationsToggle.checked
      ? strings.animationsOn
      : strings.animationsOff;
  }
  if (darkModeToggle && darkModeState) {
    darkModeState.textContent = darkModeToggle.checked
      ? strings.darkModeOn
      : strings.darkModeOff;
  }
  if (trueShadowsToggle && trueShadowsState) {
    trueShadowsState.textContent = trueShadowsToggle.checked
      ? strings.trueShadowsOn
      : strings.trueShadowsOff;
  }
  renderWeightLog();
  renderWorkouts();
  renderProfiles();
  loadTrainerPlan();
  renderDashDate();

  document.documentElement.lang = lang;
}

function setLanguage(lang) {
  const safeLang = translations[lang] ? lang : "en";
  applyTranslations(safeLang);
  languageSelect.value = safeLang;

  try {
    savePreference(STORAGE_KEYS.language, safeLang);
  } catch (error) {
    console.warn("Could not save language preference:", error);
  }
}

function loadLanguage() {
  let savedLang = "en";

  try {
    savedLang = loadPreference(STORAGE_KEYS.language, "en");
  } catch (error) {
    console.warn("Could not read language preference:", error);
  }

  setLanguage(savedLang);
}



function renderProfiles() {
  const profiles = getProfiles();
  const strings = translations[languageSelect.value] || translations.en;
  profileSelect.innerHTML = "";
  profiles.forEach((profile) => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.name;
    profileSelect.append(option);
  });
  profileSelect.value = getActiveProfileId();
  profileCount.textContent = strings.profileCount.replace("{count}", profiles.length);
  profileDeleteButton.disabled = profiles.length === 1;
  profileAddButton.disabled = profiles.length >= 5;
}

function switchProfile(profileId) {
  if (!getProfiles().some((profile) => profile.id === profileId)) return;
  savePreference(STORAGE_KEYS.activeProfile, profileId);
  state.editingMeasurementId = null;
  renderProfiles();
  loadBodyStats();
  cancelMeasurementEdit();
  renderWeightLog();
  loadTrainerPlan();
}

function addProfile() {
  const strings = translations[languageSelect.value] || translations.en;
  const profiles = getProfiles();
  if (profiles.length >= 5) {
    window.alert(strings.maxProfilesWarning);
    return;
  }
  state.profileEditMode = "add";
  profileNameInput.value = `${strings.newProfileName} ${profiles.length + 1}`;
  profileEditor.hidden = false;
  profileNameInput.focus();
}

function renameProfile() {
  const profile = getActiveProfile();
  state.profileEditMode = "rename";
  profileNameInput.value = profile.name;
  profileEditor.hidden = false;
  profileNameInput.focus();
}

function saveProfileName() {
  const name = profileNameInput.value.trim();
  if (!name) return;
  const profiles = getProfiles();
  if (state.profileEditMode === "add") {
    const profile = makeProfile(name);
    profiles.push(profile);
    saveProfiles(profiles);
    savePreference(STORAGE_KEYS.activeProfile, profile.id);
    renderProfiles();
    loadBodyStats();
    cancelMeasurementEdit();
    renderWeightLog();
  } else if (state.profileEditMode === "rename") {
    const activeId = getActiveProfileId();
    saveProfiles(profiles.map((profile) => profile.id === activeId ? { ...profile, name } : profile));
    renderProfiles();
  }
  state.profileEditMode = null;
  profileEditor.hidden = true;
}

function cancelProfileEdit() {
  state.profileEditMode = null;
  profileEditor.hidden = true;
}

function deleteProfile() {
  const strings = translations[languageSelect.value] || translations.en;
  const profiles = getProfiles();
  if (profiles.length === 1) {
    window.alert(strings.lastProfileWarning);
    return;
  }
  if (!window.confirm(strings.deleteProfileConfirm)) return;
  const activeId = getActiveProfileId();
  const remaining = profiles.filter((profile) => profile.id !== activeId);
  saveProfiles(remaining);
  savePreference(STORAGE_KEYS.activeProfile, remaining[0].id);
  renderProfiles();
  loadBodyStats();
  cancelMeasurementEdit();
  renderWeightLog();
  loadTrainerPlan();
}

function calculateBodyStats() {
  const age = Number(bodyInputs.age.value);
  const height = Number(bodyInputs.height.value);
  const weight = Number(bodyInputs.weight.value);
  const activity = Number(bodyInputs.activity.value);

  updateActivityDescription();

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const sexAdjustment = bodyInputs.sex.value === "male" ? 5 : -161;
  const bmr = 10 * weight + 6.25 * height - 5 * age + sexAdjustment;
  const dailyCalories = bmr * activity;
  const calorieMode = document.querySelector('input[name="calorie-mode"]:checked')?.value || "deficit";
  const adjustment = calorieMode === "surplus" ? 1 : -1;
  const conservativeCalories = dailyCalories * (1 + adjustment * 0.1);
  const aggressiveCalories = dailyCalories * (1 + adjustment * 0.15);

  bodyResults.bmi.textContent = bmi.toFixed(1);
  updateBmiCategoryText();
  updateBmiReference();
  bodyResults.bmr.textContent = Math.round(bmr).toLocaleString();
  bodyResults.calories.textContent = Math.round(dailyCalories).toLocaleString();
  conservativeCaloriesResult.textContent = Math.round(conservativeCalories).toLocaleString();
  aggressiveCaloriesResult.textContent = Math.round(aggressiveCalories).toLocaleString();
  state.bodyStatsCalculated = true;

  updateActiveProfile({
    bodyStats: JSON.stringify({
      age,
      sex: bodyInputs.sex.value,
      height,
      weight,
      activity,
      calorieMode,
    }),
  });
  renderDashboardSummary();
}

function updateBmiCategoryText(lang = languageSelect.value) {
  const bmi = Number(bodyResults.bmi.textContent);
  if (!Number.isFinite(bmi)) {
    bodyResults.bmiCategory.textContent = "";
    return;
  }

  const bmiCategoryKey = bmi < 18.5
    ? "bmiCategoryUnderweight"
    : bmi < 25
      ? "bmiCategoryHealthy"
      : bmi < 30
        ? "bmiCategoryOverweight"
        : "bmiCategoryObesity";
  const strings = translations[lang] || translations.en;
  bodyResults.bmiCategory.textContent = strings[bmiCategoryKey];
}

function updateBmiReference(lang = languageSelect.value) {
  const bmi = Number(bodyResults.bmi.textContent);
  const strings = translations[lang] || translations.en;
  bodyResults.bmiReferenceDescription.textContent = strings.bmiReferenceDescription;

  if (!Number.isFinite(bmi)) {
    bodyResults.bmiMarker.hidden = true;
    return;
  }

  const markerPosition = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
  bodyResults.bmiMarker.style.left = `${markerPosition}%`;
  bodyResults.bmiMarker.hidden = false;
}

function loadBodyStats() {
  const savedStats = getActiveProfile()?.bodyStats || null;
  if (!savedStats) {
    bodyForm.reset();
    state.bodyStatsCalculated = false;
    bodyResults.bmi.textContent = "—";
    bodyResults.bmiCategory.textContent = "";
    bodyResults.bmiMarker.hidden = true;
    bodyResults.bmr.textContent = "—";
    bodyResults.calories.textContent = "—";
    conservativeCaloriesResult.textContent = "—";
    aggressiveCaloriesResult.textContent = "—";
    updateActivityDescription();
    renderDashboardSummary();
    return;
  }

  try {
    const stats = JSON.parse(savedStats);
    bodyInputs.age.value = stats.age;
    bodyInputs.sex.value = stats.sex;
    bodyInputs.height.value = stats.height;
    bodyInputs.weight.value = stats.weight;
    bodyInputs.activity.value = stats.activity;
    const savedMode = document.querySelector(
      `input[name="calorie-mode"][value="${stats.calorieMode || "deficit"}"]`
    );
    if (savedMode) savedMode.checked = true;
    calculateBodyStats();
  } catch (error) {
    console.warn("Could not load body stats:", error);
  }
}

function getWeightEntries() {
  const savedEntries = getActiveProfile()?.weightEntries || "[]";
  try {
    const entries = JSON.parse(savedEntries);
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    console.warn("Could not load weight entries:", error);
    return [];
  }
}

function saveWeightEntries(entries) {
  updateActiveProfile({ weightEntries: JSON.stringify(entries) });
}


function saveGoalWeight() {
  const value = Number(goalWeightInput.value);
  if (goalWeightInput.value === "" || !Number.isFinite(value)) {
    updateActiveProfile({ goalWeight: "" });
    return;
  }
  updateActiveProfile({ goalWeight: String(value) });
}


// Home header date line ("AUGUST 26, 2026"), locale-aware
function renderDashDate() {
  if (!dashDateEl) return;
  dashDateEl.textContent = new Date()
    .toLocaleDateString(languageSelect.value, { year: "numeric", month: "long", day: "numeric" })
    .toUpperCase();
}




function renderWeightLog() {
  const entries = getWeightEntries().sort((a, b) => a.date.localeCompare(b.date));
  const firstEntry = entries[0];
  const latestEntry = entries[entries.length - 1];
  const change = firstEntry && latestEntry ? Number(latestEntry.weight) - Number(firstEntry.weight) : null;

  startingWeightResult.textContent = firstEntry ? formatWeight(firstEntry.weight) : "—";
  latestWeightResult.textContent = latestEntry ? formatWeight(latestEntry.weight) : "—";
  weightChangeResult.textContent = change === null ? "—" : `${change > 0 ? "+" : ""}${formatWeight(change)}`;
  const goalWeight = getGoalWeight();
  goalWeightInput.value = goalWeight === null ? "" : formatWeight(goalWeight);
  goalWeightResult.textContent = goalWeight === null ? "—" : formatWeight(goalWeight);
  const strings = translations[languageSelect.value] || translations.en;
  // Null-ish (not ===null) on purpose: entries[...] is undefined when the
  // log is empty, and the old check let goal-without-measurements through.
  let progress = null;
  if (goalWeight === null || !firstEntry || !latestEntry) {
    goalHint.textContent = strings.goalWeightHint;
  } else {
    progress = computeWeightProgress(entries, goalWeight);
    if (progress === null) {
      goalHint.textContent = strings.goalWeightHint;
    } else {
      goalHint.textContent = progress >= 100
        ? strings.progressGoalReached
        : strings.progressToGoal.replace("{percent}", Math.round(progress));
    }
  }

  // Goal-progress hero strip: same computation as above, home-tab styling.
  if (progress === null) {
    weightHeroProgress.textContent = "—";
    weightHeroMeta.textContent = strings.weightHeroNoGoal;
    weightHeroFill.style.width = "0%";
  } else {
    weightHeroProgress.textContent = String(Math.round(progress));
    weightHeroMeta.textContent = progress >= 100
      ? strings.progressGoalReached
      : strings.progressToGoal.replace("{percent}", Math.round(progress));
    weightHeroFill.style.width = `${progress}%`;
  }
  measurementList.innerHTML = "";

  [...entries].reverse().forEach((entry) => {
    const item = document.createElement("li");
    item.className = "measurement-item";
    item.innerHTML = `
      <span class="measurement-details">
        <span class="measurement-date">${formatMeasurementDate(entry.date)}</span>
        <strong>${formatWeight(entry.weight)} kg</strong>
      </span>
    `;
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "measurement-delete";
    deleteButton.textContent = "×";
    deleteButton.title = (translations[languageSelect.value] || translations.en).deleteMeasurement;
    deleteButton.setAttribute("aria-label", `${deleteButton.title}: ${formatMeasurementDate(entry.date)}`);
    deleteButton.addEventListener("click", () => {
      saveWeightEntries(getWeightEntries().filter((savedEntry) => savedEntry.id !== entry.id));
      renderWeightLog();
    });
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "measurement-edit";
    editButton.textContent = "✎";
    editButton.title = strings.editMeasurement;
    editButton.setAttribute("aria-label", `${strings.editMeasurement}: ${formatMeasurementDate(entry.date)}`);
    editButton.addEventListener("click", () => startMeasurementEdit(entry));
    const actions = document.createElement("span");
    actions.className = "measurement-actions";
    actions.append(editButton, deleteButton);
    item.append(actions);
    measurementList.append(item);
  });

  const rangeDays = chartRangeSelect.value === "all" ? null : Number(chartRangeSelect.value);
  const latestDate = entries[entries.length - 1]?.date;
  const visibleEntries = rangeDays && latestDate
    ? entries.filter((entry) => (new Date(`${latestDate}T00:00:00`) - new Date(`${entry.date}T00:00:00`)) / 86400000 <= rangeDays)
    : entries;
  renderWeightChart(visibleEntries);
  renderDashboardSummary();
}

function startMeasurementEdit(entry) {
  state.editingMeasurementId = entry.id;
  measurementDateInput.value = entry.date;
  measurementWeightInput.value = entry.weight;
  measurementSubmitButton.textContent = (translations[languageSelect.value] || translations.en).saveMeasurement;
  measurementCancelButton.hidden = false;
  measurementWeightInput.focus();
}

function cancelMeasurementEdit() {
  state.editingMeasurementId = null;
  measurementWeightInput.value = "";
  setTodayAsMeasurementDate();
  measurementSubmitButton.textContent = (translations[languageSelect.value] || translations.en).addMeasurementButton;
  measurementCancelButton.hidden = true;
}

function renderDashboardSummary() {
  const strings = translations[languageSelect.value] || translations.en;
  const entries = getWeightEntries().sort((a, b) => a.date.localeCompare(b.date));
  const profile = loadBodyStatsProfile();
  const latestEntry = entries[entries.length - 1];
  const firstEntry = entries[0];

  summaryWeight.textContent = latestEntry ? formatWeight(latestEntry.weight) : "—";
  summaryWeightChange.textContent = latestEntry && firstEntry
    ? `${Number(latestEntry.weight) - Number(firstEntry.weight) > 0 ? "+" : ""}${formatWeight(Number(latestEntry.weight) - Number(firstEntry.weight))} kg`
    : strings.noData;

  // Hero "overall progress": how far the actual latest weight has moved from
  // the recorded point farthest from the goal toward the profile's goal weight.
  // Direction-aware, so both cutting and bulking read correctly; clamped 0-100%.
  const goalWeight = getGoalWeight();
  if (latestEntry && goalWeight !== null) {
    const computed = computeWeightProgress(entries, goalWeight);
    const pct = computed === null ? 0 : Math.max(0, Math.min(100, Math.round(computed)));
    if (dashProgressEl) dashProgressEl.textContent = String(pct);
    if (dashProgressFill) dashProgressFill.style.width = `${pct}%`;
    if (dashProgressMeta) dashProgressMeta.textContent = `${strings.dashGoalLabel}: ${formatWeight(goalWeight)} kg`;
  } else {
    if (dashProgressEl) dashProgressEl.textContent = "—";
    if (dashProgressFill) dashProgressFill.style.width = "0%";
    if (dashProgressMeta) dashProgressMeta.textContent = latestEntry ? strings.dashNoGoal : strings.noData;
  }

  if (!profile) {
    summaryBmi.textContent = "—";
    summaryCalories.textContent = "—";
    summaryCalorieMode.textContent = strings.noData;
    return;
  }

  const heightInMeters = Number(profile.height) / 100;
  const bmi = Number(profile.weight) / (heightInMeters * heightInMeters);
  const sexAdjustment = profile.sex === "male" ? 5 : -161;
  const bmr = 10 * Number(profile.weight) + 6.25 * Number(profile.height) - 5 * Number(profile.age) + sexAdjustment;
  const maintenance = bmr * Number(profile.activity);
  const adjustment = profile.calorieMode === "surplus" ? 1 : -1;
  const target = maintenance * (1 + adjustment * 0.1);

  summaryBmi.textContent = bmi.toFixed(1);
  summaryCalories.textContent = Math.round(target).toLocaleString();
  summaryCalorieMode.textContent = profile.calorieMode === "surplus"
    ? strings.surplusSummary
    : strings.deficitSummary;
}



















function setTodayAsMeasurementDate() {
  measurementDateInput.value = getTodayDateValue();
}

// --- Widget navigation (one panel at a time) ---
// Staggered entrance for cards in a freshly shown tab. Mirrors the
// trainer plan pop. Purely decorative: `animations-off` and reduced-motion
// neutralize it through CSS.
function animateStaggerIn(elements, stepMs = 60) {
  const list = Array.from(elements);
  if (!list.length) return;

  for (const el of list) {
    el.classList.remove("pop-in");
  }

  // Style flush so re-adding the class restarts the animation even when
  // the panel never left the screen (e.g. restoring after Settings closes).
  void list[0].offsetWidth;

  list.forEach((el, index) => {
    el.style.setProperty("--pop-delay", `${index * stepMs}ms`);
    el.classList.add("pop-in");
  });
}

function showWidget(widgetId) {
  // Remember whether this tab was already on screen: restoring it (e.g.
  // after closing the settings dialog) must not replay entrance
  // animations the user has already seen.
  const previousPanel = document.querySelector(".widget-panel.is-active");
  const isSamePanel =
    Boolean(previousPanel) && previousPanel.dataset.widget === widgetId;

  for (const panel of widgetPanels) {
    const isActive = panel.dataset.widget === widgetId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  }

  for (const button of navButtons) {
    const isActive = button.dataset.widget === widgetId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  }

  // Staggered entrance for a freshly SHOWN tab (dashboard summaries and
  // quick links, body stat results/targets, weight summary + chart wrap).
  // Deliberately skipped when the tab was already visible - e.g. it sits
  // under the settings dialog, so closing settings just restores it.
  if (!isSamePanel) {
    const activePanel = [...widgetPanels].find(
      (panel) => panel.dataset.widget === widgetId
    );
    if (activePanel) {
      animateStaggerIn(
        activePanel.querySelectorAll(
          ".summary-card, .quick-link, .result-card, .target-card, .weight-chart-wrap"
        )
      );
    }
  }

  if (widgetId === "weight") {
    // Replay the chart entrance on every visit - at startup it would
    // otherwise play invisibly behind the hidden tab.
    replayWeightChartAnimation();
  }

  logUiState(`Widget changed to ${widgetId}`);
}

function loadActiveWidget() {
  // The app always opens on Home - no session restore.
  showWidget("dashboard");
}

for (const button of navButtons) {
  // Skip buttons that are not widget targets (e.g. the settings gear)
  if (!button.dataset.widget) continue;
  button.addEventListener("click", () => {
    showWidget(button.dataset.widget);
  });
}

for (const link of quickLinks) {
  link.addEventListener("click", () => {
    showWidget(link.dataset.widgetTarget);
    // Jump straight into logging when the CTA targets the weight log
    if (link.dataset.widgetTarget === "weight") {
      document.getElementById("measurement-weight-input")?.focus();
    }
  });
}

// Home "+" tile: same as "New note" in the Notes sidebar
const dashAddButton = document.getElementById("dash-add");
if (dashAddButton) {
  dashAddButton.addEventListener("click", () => {
    showWidget("notes");
    createWorkout();
  });
}

// --- Workout log save / load ---


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








languageSelect.addEventListener("change", () => {
  setLanguage(languageSelect.value);
});

// Widget that was visible right before the settings gear was clicked.
// Restored when the settings dialog closes, no matter how it is closed.

settingsOpen.addEventListener("click", () => {
  const activePanel = document.querySelector(".widget-panel.is-active");
  state.widgetBeforeSettings = activePanel ? activePanel.dataset.widget : null;

  // Mark the settings gear as the selected tab while the dialog is open
  // (same is-active/aria-current scheme as showWidget). The dialog's
  // "close" handler restores the previous tab's highlight.
  for (const button of navButtons) {
    const isActive = button === settingsOpen;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  }

  settingsDialog.showModal();
  logUiState("Settings opened");
});

// Single restore point: fires for the X button, clicks outside the dialog,
// and the Escape key alike.
settingsDialog.addEventListener("close", () => {
  const validIds = [...widgetPanels].map((panel) => panel.dataset.widget);
  showWidget(validIds.includes(state.widgetBeforeSettings) ? state.widgetBeforeSettings : "dashboard");

  state.widgetBeforeSettings = null;
  debugLog("settings closed, restored widget");
  logUiState("Settings closed");
});

settingsClose.addEventListener("click", () => {
  settingsDialog.close();
});
settingsDialog.addEventListener("click", (event) => {
  if (event.target === settingsDialog) {
    // Click landed outside the dialog card (on the backdrop) -> treat exactly
    // like pressing the X: close, and the "close" listener restores the widget.
    settingsDialog.close();
    logUiState("Settings closed by backdrop");
  }
});

for (const option of accentOptions) {
  option.addEventListener("change", () => setAccent(option.value));
}

for (const option of backgroundOptions) {
  option.addEventListener("change", () => setBackground(option.value));
}

animationsToggle.addEventListener("change", () => {
  setAnimationsEnabled(animationsToggle.checked);
});

darkModeToggle.addEventListener("change", () => {
  setDarkModeEnabled(darkModeToggle.checked);
});

trueShadowsToggle.addEventListener("change", () => {
  setTrueShadowsEnabled(trueShadowsToggle.checked);
});

profileSelect.addEventListener("change", () => switchProfile(profileSelect.value));
profileAddButton.addEventListener("click", addProfile);
profileRenameButton.addEventListener("click", renameProfile);
profileDeleteButton.addEventListener("click", deleteProfile);
profileSaveButton.addEventListener("click", saveProfileName);
profileCancelButton.addEventListener("click", cancelProfileEdit);
profileNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") saveProfileName();
  if (event.key === "Escape") cancelProfileEdit();
});

if (newWorkoutButton) newWorkoutButton.addEventListener("click", createWorkout);
if (workoutSaveButton) workoutSaveButton.addEventListener("click", saveActiveWorkout);
if (workoutDateInput) workoutDateInput.addEventListener("change", scheduleWorkoutSave);
if (workoutFeelingsInput) workoutFeelingsInput.addEventListener("input", scheduleWorkoutSave);

// Add exercise: clicking the button (or pressing Enter in the name field)
// adds an exercise card, which renders the reps/kg number inputs.
if (workoutAddExerciseSubmit && workoutAddExerciseName) {
  workoutAddExerciseSubmit.addEventListener("click", () => {
    const name = workoutAddExerciseName.value.trim();
    if (!name) return;
    addWorkoutExercise(name);
    workoutAddExerciseName.value = "";
    workoutAddExerciseName.focus();
  });
  workoutAddExerciseName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      workoutAddExerciseSubmit.click();
    }
  });
}

bodyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (bodyForm.reportValidity()) {
    calculateBodyStats();
  }
});

activityInput.addEventListener("change", () => {
  updateActivityDescription();
});

for (const option of calorieModeOptions) {
  option.addEventListener("change", () => {
    if (state.bodyStatsCalculated && bodyForm.checkValidity()) {
      calculateBodyStats();
    }
  });
}

weightForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!weightForm.reportValidity()) return;

  const entries = getWeightEntries().filter((entry) => entry.date !== measurementDateInput.value || entry.id === state.editingMeasurementId);
  const editedEntry = state.editingMeasurementId && entries.find((entry) => entry.id === state.editingMeasurementId);
  if (editedEntry) {
    editedEntry.date = measurementDateInput.value;
    editedEntry.weight = Number(measurementWeightInput.value);
  } else {
    entries.push({
      id: crypto.randomUUID(),
      date: measurementDateInput.value,
      weight: Number(measurementWeightInput.value),
    });
  }
  saveWeightEntries(entries);
  cancelMeasurementEdit();
  renderWeightLog();
  measurementWeightInput.value = "";
});

measurementCancelButton.addEventListener("click", cancelMeasurementEdit);

chartRangeSelect.addEventListener("change", renderWeightLog);

// Offline cache reset moved to pwa.js


trainerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const plan = buildTrainerPlan(Number(trainingDaysInput.value), trainingGoalInput.value, trainingEmphasisInput.value, trainingVolumeInput.value);
  const store = getTrainerPlanStore() || { activeMode: "recommended", recommended: null, custom: null };
  store.recommended = plan;
  store.activeMode = "recommended";
  saveTrainerPlanStore(store);
  setTrainerModeRadio("recommended");
  trainerRecommendedSection.hidden = false;
  trainerCustomSection.hidden = true;
  renderTrainerPlan(plan);
});

trainerCustomForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const plan = buildCustomTrainerPlan(trainerCustomSplitInput.value, trainingGoalInput.value, trainingVolumeInput.value);
  const store = getTrainerPlanStore() || { activeMode: "custom", recommended: null, custom: null };
  store.custom = plan;
  store.activeMode = "custom";
  saveTrainerPlanStore(store);
  setTrainerModeRadio("custom");
  trainerRecommendedSection.hidden = true;
  trainerCustomSection.hidden = false;
  renderTrainerPlan(plan);
});

trainerModeInputs.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!radio.checked) return;
    const store = getTrainerPlanStore() || { activeMode: "recommended", recommended: null, custom: null };
    store.activeMode = radio.value;
    saveTrainerPlanStore(store);
    updateTrainerSections(radio.value);
  });
});

trainerDays.addEventListener("change", (event) => {
  // Adding an exercise to a custom plan day (library pick or custom flow)
  const addSelect = event.target.closest(".exercise-add-select");
  if (addSelect) {
    const dayIndex = Number(addSelect.dataset.addDay);
    const row = addSelect.closest(".exercise-add");
    if (addSelect.value === "__custom__") {
      addSelect.value = "";
      const nameInput = row.querySelector(".exercise-add-name");
      const submitButton = row.querySelector(".exercise-add-submit");
      nameInput.hidden = false;
      submitButton.hidden = false;
      nameInput.focus();
      return;
    }
    if (addSelect.value) {
      const plan = getSavedTrainerPlan();
      if (plan) {
        addLibraryExercise(plan, dayIndex, addSelect.value);
        addSelect.value = "";
        saveTrainerPlan(plan);
        renderTrainerPlan(plan);
      }
    }
    return;
  }

  const input = event.target.closest("input[data-plan-day]");
  if (!input) return;
  const plan = getSavedTrainerPlan();
  if (!plan) return;
  const day = plan.days[Number(input.dataset.planDay)];
  const exercise = day?.exercises[Number(input.dataset.planExercise)];
  const variable = input.dataset.variable;
  if (!exercise || !variable) return;
  if (variable === "sets") {
    exercise.sets = Number(input.value);
    exercise.reps = recommendRepsForSets(exercise.sets);
    const repsInput = trainerDays.querySelector(`[data-plan-day="${input.dataset.planDay}"][data-plan-exercise="${input.dataset.planExercise}"][data-variable="reps"]`);
    if (repsInput) repsInput.value = exercise.reps;
  } else if (variable === "reps") {
    exercise.reps = input.value;
    exercise.sets = recommendSetsForReps(input.value);
    const setsInput = trainerDays.querySelector(`[data-plan-day="${input.dataset.planDay}"][data-plan-exercise="${input.dataset.planExercise}"][data-variable="sets"]`);
    if (setsInput) setsInput.value = exercise.sets;
  } else {
    exercise[variable] = input.value;
  }
  const exerciseCard = input.closest(".exercise-card");
  if (exerciseCard) {
    exerciseCard.classList.remove("exercise-card-highlight");
    void exerciseCard.offsetWidth;
    exerciseCard.classList.add("exercise-card-highlight");
  }
  saveTrainerPlan(plan);
});

// Custom plans: remove an exercise or commit a hand-written custom exercise
trainerDays.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".exercise-remove");
  if (removeButton) {
    const dayIndex = Number(removeButton.dataset.removeDay);
    const exerciseIndex = Number(removeButton.dataset.removeExercise);
    const plan = getSavedTrainerPlan();
    if (!plan) return;
    const day = plan.days[dayIndex];
    if (day) day.exercises.splice(exerciseIndex, 1);
    saveTrainerPlan(plan);
    renderTrainerPlan(plan);
    return;
  }
  const submitButton = event.target.closest(".exercise-add-submit");
  if (submitButton) {
    const dayIndex = Number(submitButton.dataset.addDay);
    const row = submitButton.closest(".exercise-add");
    const nameInput = row.querySelector(".exercise-add-name");
    const name = nameInput.value.trim();
    if (!name) return;
    const plan = getSavedTrainerPlan();
    if (!plan) return;
    addCustomExercise(plan, dayIndex, name);
    saveTrainerPlan(plan);
    nameInput.value = "";
    nameInput.hidden = true;
    submitButton.hidden = true;
    renderTrainerPlan(plan);
  }
});

// Enter in the custom-exercise name box commits it (same as the Add button)
trainerDays.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const nameInput = event.target.closest(".exercise-add-name");
  if (!nameInput || nameInput.hidden) return;
  event.preventDefault();
  nameInput.closest(".exercise-add").querySelector(".exercise-add-submit").click();
});



goalWeightInput.addEventListener("change", () => {
  saveGoalWeight();
  renderWeightLog();
});

// Boot inits - each wrapped so one failing subsystem can never kill the
// splash reveal below (a dead script here used to stick the app on splash).
const bootSteps = [
  loadLanguage,
  loadSettings,
  renderProfiles,
  renderWorkouts,
  loadBodyStats,
  setTodayAsMeasurementDate,
  renderWeightLog,
  loadTrainerPlan,
  renderDashboardSummary,
];
for (const step of bootSteps) {
  try {
    step();
  } catch (error) {
    console.error("Boot step failed:", error);
    debugLog(`boot step failed: ${error && error.message}`);
  }
}

// After title intro animation, reveal header and UI while loading widget.
// Use an event-driven approach (animationend) with a fallback timeout to avoid
// timing mismatches that cause the header to be hidden or misplaced.
function startRevealSequence() {
  const title = document.querySelector('.title');
  let revealed = false;

  function revealNow() {
    if (revealed) return;
    revealed = true;
    document.body.classList.add('reveal-header');
    // load and show the previously active widget while revealing
    loadActiveWidget();
    showSaveStatus('saved');
    logUiState('Initial UI state');
    debugLog('reveal-header added');
    // Reveal header and content at the same time so they feel synchronized.
    document.body.classList.add('content-visible', 'animations-ready');
    document.body.classList.remove('splash');
    debugLog('content-visible and animations-ready added');

    // After the fade completes, move the header into normal document flow to
    // prevent overlap and allow usual layout. This change happens after the
    // opacity transition so it doesn't cause an abrupt reposition.
    const fadeMs = 360;
    setTimeout(() => {
      document.body.classList.add('header-in-flow');
      debugLog('header moved into flow (header-in-flow)');
    }, fadeMs);
  }

  if (title) {
    const onAnimEnd = () => {
      debugLog('title animationend -> starting reveal');
      title.removeEventListener('animationend', onAnimEnd);
      clearTimeout(fallbackTimer);
      revealNow();
    };
    title.addEventListener('animationend', onAnimEnd);

    // Fallback if animation doesn't fire (e.g., due to reduced-motion or timing)
    const fallbackTimer = setTimeout(() => {
      debugLog('title animation fallback triggered');
      title.removeEventListener('animationend', onAnimEnd);
      revealNow();
    }, 1800);
  } else {
    // No title element — quickly reveal
    setTimeout(revealNow, 200);
  }
}

startRevealSequence();

// --- Workout log render / edit ---
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
