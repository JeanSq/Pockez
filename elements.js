export const installButtons = document.querySelectorAll(".install-app-button");
export const iosHintEls = document.querySelectorAll(".install-ios-hint");
export const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;
export const isFileProtocol = location.protocol === "file:";
export const isIos =
  /ipad|iphone|ipod/i.test(navigator.userAgent || "") && !window.MSStream;
export const titleEl = document.querySelector('.title');
export const languageSelect = document.getElementById("language-select");
export const noteComposeInput = document.getElementById("note-compose-input");
export const noteComposeSubmit = document.getElementById("note-compose-submit");
export const notesList = document.getElementById("notes-list");
export const saveStatus = document.getElementById("save-status");
export const navButtons = document.querySelectorAll(".nav-btn");
export const widgetPanels = document.querySelectorAll(".widget-panel");
export const settingsDialog = document.getElementById("settings-dialog");
export const settingsOpen = document.getElementById("settings-open");
export const settingsClose = document.getElementById("settings-close");
export const accentOptions = document.querySelectorAll('input[name="accent"]');
export const backgroundOptions = document.querySelectorAll('input[name="background"]');
export const animationsToggle = document.getElementById("animations-toggle");
export const animationsState = document.querySelector(".toggle-state");
export const darkModeToggle = document.getElementById("dark-mode-toggle");
export const darkModeState = darkModeToggle?.closest(".animation-setting")?.querySelector(".toggle-state");
export const trueShadowsToggle = document.getElementById("true-shadows-toggle");
export const trueShadowsState = trueShadowsToggle?.closest(".animation-setting")?.querySelector(".toggle-state");
export const exportDataButton = document.getElementById("export-data");
export const importDataButton = document.getElementById("import-data-button");
export const importDataInput = document.getElementById("import-data-input");
export const clearDataButton = document.getElementById("clear-data");
export const resetOfflineCacheButton = document.getElementById("reset-offline-cache");
export const profileSelect = document.getElementById("profile-select");
export const profileCount = document.getElementById("profile-count");
export const profileAddButton = document.getElementById("profile-add");
export const profileRenameButton = document.getElementById("profile-rename");
export const profileDeleteButton = document.getElementById("profile-delete");
export const profileEditor = document.getElementById("profile-editor");
export const profileNameInput = document.getElementById("profile-name-input");
export const profileSaveButton = document.getElementById("profile-save");
export const profileCancelButton = document.getElementById("profile-cancel");
export const bodyForm = document.getElementById("body-form");
export const bodyInputs = {
  age: document.getElementById("age-input"),
  sex: document.getElementById("sex-input"),
  height: document.getElementById("height-input"),
  weight: document.getElementById("body-weight-input"),
  activity: document.getElementById("activity-input"),
};
export const bodyResults = {
  bmi: document.getElementById("bmi-result"),
  bmiCategory: document.getElementById("bmi-category"),
  bmiMarker: document.getElementById("bmi-scale-marker"),
  bmiReferenceDescription: document.getElementById("bmi-reference-description"),
  bmr: document.getElementById("bmr-result"),
  calories: document.getElementById("maintenance-calories-result"),
};
export const calorieModeOptions = document.querySelectorAll('input[name="calorie-mode"]');
export const conservativeCaloriesResult = document.getElementById("conservative-calories-result");
export const aggressiveCaloriesResult = document.getElementById("aggressive-calories-result");
export const weightForm = document.getElementById("weight-form");
export const measurementSubmitButton = weightForm?.querySelector('button[type="submit"]');
export const measurementCancelButton = document.getElementById("measurement-cancel");
export const measurementDateInput = document.getElementById("measurement-date-input");
export const measurementWeightInput = document.getElementById("measurement-weight-input");
export const startingWeightResult = document.getElementById("starting-weight-result");
export const latestWeightResult = document.getElementById("latest-weight-result");
export const weightChangeResult = document.getElementById("weight-change-result");
export const weightChart = document.getElementById("weight-chart");
export const weightChartGrid = document.getElementById("weight-chart-grid");
export const weightChartYLabels = document.getElementById("weight-chart-y-labels");
export const weightChartArea = document.getElementById("weight-chart-area");
export const weightChartLineUnderlay = document.getElementById("weight-chart-line-underlay");
export const weightChartBaseline = document.getElementById("weight-chart-baseline");
export const weightChartLine = document.getElementById("weight-chart-line");
export const weightChartPoints = document.getElementById("weight-chart-points");
export const weightChartXLabels = document.getElementById("weight-chart-x-labels");
export const weightChartTooltip = document.getElementById("weight-chart-tooltip");
export const weightChartTooltipBox = document.getElementById("weight-chart-tooltip-box");
export const weightChartTooltipText = document.getElementById("weight-chart-tooltip-text");
export const chartEmpty = document.getElementById("chart-empty");
export const measurementList = document.getElementById("measurement-list");
export const goalWeightInput = document.getElementById("goal-weight-input");
export const goalWeightResult = document.getElementById("goal-weight-result");
export const weightGoalLine = document.getElementById("weight-goal-line");
export const weightTrendLine = document.getElementById("weight-trend-line");
export const goalHint = document.getElementById("goal-hint");
export const weightHeroProgress = document.getElementById("weight-hero-progress");
export const weightHeroMeta = document.getElementById("weight-hero-meta");
export const weightHeroFill = document.getElementById("weight-hero-fill");
export const chartRangeSelect = document.getElementById("chart-range-select");
export const chartSummary = document.getElementById("chart-summary");
export const summaryWeight = document.getElementById("summary-weight");
export const summaryWeightChange = document.getElementById("summary-weight-change");
export const summaryBmi = document.getElementById("summary-bmi");
export const summaryCalories = document.getElementById("summary-calories");
export const summaryCalorieMode = document.getElementById("summary-calorie-mode");
export const quickLinks = document.querySelectorAll("[data-widget-target]");
export const dashDateEl = document.getElementById("dash-date");
export const dashProgressEl = document.getElementById("dash-progress");
export const dashProgressFill = document.getElementById("dash-progress-fill");
export const dashProgressMeta = document.getElementById("dash-progress-meta");
export const dashNotesCount = document.getElementById("dash-notes-count");
export const trainerForm = document.getElementById("trainer-form");
export const trainingDaysInput = document.getElementById("training-days-input");
export const trainingGoalInput = document.getElementById("training-goal-input");
export const trainingEmphasisInput = document.getElementById("training-emphasis-input");
export const trainingVolumeInput = document.getElementById("training-volume-input");
export const trainerPlanHeading = document.getElementById("trainer-plan-heading");
export const trainerPlanTitle = document.getElementById("trainer-plan-title");
export const trainerPlanMeta = document.getElementById("trainer-plan-meta");
export const trainerDays = document.getElementById("trainer-days");
export const trainerRecommendedSection = document.getElementById("trainer-recommended");
export const trainerCustomSection = document.getElementById("trainer-custom");
export const trainerCustomForm = document.getElementById("trainer-custom-form");
export const trainerCustomSplitInput = document.getElementById("trainer-custom-split-input");
export const trainerModeInputs = document.querySelectorAll('input[name="trainer-mode"]');
export const i18nElements = document.querySelectorAll("[data-i18n]");
export const i18nPlaceholderElements = document.querySelectorAll(
  "[data-i18n-placeholder]"
);
export const i18nAriaElements = document.querySelectorAll("[data-i18n-aria]");
export const i18nTitleElements = document.querySelectorAll("[data-i18n-title]");
export const activityInput = document.getElementById("activity-input");
export const activityDescription = document.getElementById("activity-description");
