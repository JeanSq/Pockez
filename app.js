/**
 * Pockez â€” personal notes, health, and training
 * Notes widget, i18n, single-widget icon navigation
 */
import { STORAGE_KEYS, loadPreference, savePreference, removePreference } from "./storage.js?v=14";
import { translations } from "./i18n.js?v=22";

import { DEBUG_ENABLED, debugLog, logUiState, logWeightTooltip } from "./debug.js?v=2";
import { formatMeasurementDate, formatWeight, getTodayDateValue } from "./format.js?v=1";
import { accentOptions, activityDescription, activityInput, aggressiveCaloriesResult, animationsState, animationsToggle, backgroundOptions, bodyForm, bodyInputs, bodyResults, calorieModeOptions, chartEmpty, chartRangeSelect, chartSummary, clearDataButton, conservativeCaloriesResult, darkModeState, darkModeToggle, dashDateEl, dashProgressEl, dashProgressFill, dashProgressMeta, exportDataButton, goalHint, goalWeightInput, goalWeightResult, i18nAriaElements, i18nElements, i18nPlaceholderElements, i18nTitleElements, importDataButton, importDataInput, installButtons, iosHintEls, isFileProtocol, isIos, isStandalone, languageSelect, latestWeightResult, measurementCancelButton, measurementDateInput, measurementList, measurementSubmitButton, measurementWeightInput, navButtons, profileAddButton, profileCancelButton, profileCount, profileDeleteButton, profileEditor, profileNameInput, profileRenameButton, profileSaveButton, profileSelect, quickLinks, resetOfflineCacheButton, saveStatus, settingsClose, settingsDialog, settingsOpen, startingWeightResult, summaryBmi, summaryCalorieMode, summaryCalories, summaryWeight, summaryWeightChange, titleEl, trainerCustomForm, trainerCustomSection, trainerCustomSplitInput, trainerDays, trainerForm, trainerModeInputs, trainerPlanHeading, trainerPlanMeta, trainerPlanTitle, trainerRecommendedSection, trainingDaysInput, trainingEmphasisInput, trainingGoalInput, trainingVolumeInput, trueShadowsState, trueShadowsToggle, weightChangeResult, weightChart, weightChartArea, weightChartBaseline, weightChartGrid, weightChartLine, weightChartLineUnderlay, weightChartPoints, weightChartTooltip, weightChartTooltipBox, weightChartTooltipText, weightChartXLabels, weightChartYLabels, weightForm, weightGoalLine, weightHeroFill, weightHeroMeta, weightHeroProgress, weightTrendLine, widgetPanels } from "./elements.js?v=2";
import { TRAINER_BODY_REGION, TRAINER_MUSCLE_COLORS, trainerExercises } from "./exerciseLibrary.js?v=1";
import { state } from "./state.js?v=1";

import { addCustomExercise, addLibraryExercise, buildCustomTrainerPlan, buildTrainerPlan, customSplitIdForPlan, getDayRecommendedExerciseIds, recommendRepsForSets, recommendSetsForReps } from "./trainerEngine.js?v=1";


import { formatTrainerRest, getSavedTrainerPlan, getSuggestedTrainerEmphasis, getTrainerDayName, getTrainerPlanStore, loadTrainerPlan, migrateLegacyTrainerPlan, renderTrainerPlan, saveTrainerPlan, saveTrainerPlanStore, setTrainerModeRadio, updateTrainerSections } from "./trainer.js?v=2";
import { loadSettings, setAccent, setAnimationsEnabled, setBackground, setDarkModeEnabled, setTrueShadowsEnabled, updateActivityDescription } from "./settings.js?v=1";

import { getActiveProfile, getActiveProfileId, getProfiles, makeProfile, saveProfiles, updateActiveProfile } from "./profiles.js?v=1";

import { computeWeightProgress, getGoalWeight, loadBodyStatsProfile, renderWeightChart, replayWeightChartAnimation } from "./weightChart.js?v=1";
import { showSaveStatus } from "./ui.js?v=1";
import { initPwa } from "./pwa.js?v=1";
import { addNote, renderNotes } from "./notes.js?v=1";

// Fast startup: remove `no-js` (so CSS hiding applies) and enable splash immediately
try {
  document.body.classList.add("splash");
  document.body.classList.remove("no-js");
} catch (e) {
  // ignore if body not ready
}

// Replay the subtitle's 4.5s entrance only the first load of a tab session;
// on later loads in the same session skip it so the intro doesn't re-theaterize
// a daily-working dashboard. The title's own 1.2s entrance, and reduced-motion /
// animations-off, are unaffected (see style.css: body.no-intro-replay .subtitle).
try {
  if (sessionStorage.getItem("pockez-seen-intro")) {
    document.body.classList.add("no-intro-replay");
  } else {
    sessionStorage.setItem("pockez-seen-intro", "1");
  }
} catch (e) {
  // storage blocked: keep the intro
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
  renderNotes();
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
    bodyResults.bmi.textContent = "â€”";
    bodyResults.bmiCategory.textContent = "";
    bodyResults.bmiMarker.hidden = true;
    bodyResults.bmr.textContent = "â€”";
    bodyResults.calories.textContent = "â€”";
    conservativeCaloriesResult.textContent = "â€”";
    aggressiveCaloriesResult.textContent = "â€”";
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

  startingWeightResult.textContent = firstEntry ? formatWeight(firstEntry.weight) : "â€”";
  latestWeightResult.textContent = latestEntry ? formatWeight(latestEntry.weight) : "â€”";
  weightChangeResult.textContent = change === null ? "â€”" : `${change > 0 ? "+" : ""}${formatWeight(change)}`;
  const goalWeight = getGoalWeight();
  goalWeightInput.value = goalWeight === null ? "" : formatWeight(goalWeight);
  goalWeightResult.textContent = goalWeight === null ? "â€”" : formatWeight(goalWeight);
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
    weightHeroProgress.textContent = "â€”";
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
    deleteButton.textContent = "Ã—";
    deleteButton.title = (translations[languageSelect.value] || translations.en).deleteMeasurement;
    deleteButton.setAttribute("aria-label", `${deleteButton.title}: ${formatMeasurementDate(entry.date)}`);
    deleteButton.addEventListener("click", () => {
      saveWeightEntries(getWeightEntries().filter((savedEntry) => savedEntry.id !== entry.id));
      renderWeightLog();
    });
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "measurement-edit";
    editButton.textContent = "âœŽ";
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

  summaryWeight.textContent = latestEntry ? formatWeight(latestEntry.weight) : "â€”";
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
    if (dashProgressEl) dashProgressEl.textContent = "â€”";
    if (dashProgressFill) dashProgressFill.style.width = "0%";
    if (dashProgressMeta) dashProgressMeta.textContent = latestEntry ? strings.dashNoGoal : strings.noData;
  }

  if (!profile) {
    summaryBmi.textContent = "â€”";
    summaryCalories.textContent = "â€”";
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

// Home "+" tile: jump to the Notes tab and focus the compose box
const dashAddButton = document.getElementById("dash-add");
if (dashAddButton) {
  dashAddButton.addEventListener("click", () => {
    showWidget("notes");
    noteComposeInput?.focus();
  });
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
  renderNotes,
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
    // No title element â€” quickly reveal
    setTimeout(revealNow, 200);
  }
}

startRevealSequence();

