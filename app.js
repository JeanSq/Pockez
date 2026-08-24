/**
 * Pockez — personal notes, health, and training
 * Notes widget, i18n, single-widget icon navigation
 */

const translations = {
  en: {
    appTitle: "Pockez",
    appSubtitle: "Notes, habits, and health — all in one place.",
    languageLabel: "Language",
    settings: "Settings",
    closeSettings: "Close settings",
    settingsTitle: "Settings",
    accentLabel: "Accent color",
    accentRedBlue: "Red + blue",
    accentOrangeTeal: "Orange + teal",
    accentYellowPink: "Yellow + pink",
    backgroundLabel: "Background style",
    backgroundPaper: "Paper",
    backgroundDarkPaper: "Dark paper",
    backgroundGraffiti: "Graffiti traces",
    backgroundBlueprint: "Blueprint paper",
    animationsLabel: "Animations",
    animationsOn: "On",
    animationsOff: "Off",
    darkModeLabel: "Dark mode",
    darkModeOn: "On",
    darkModeOff: "Off",
    profileLabel: "Profile",
    addProfile: "Add",
    renameProfile: "Rename",
    deleteProfile: "Delete",
    profileHint: "Each profile has its own body stats, weight log, and goal.",
    profileCount: "{count} of 5 profiles",
    profileNamePrompt: "Profile name",
    profileNamePlaceholder: "Profile name",
    saveProfile: "Save",
    cancelProfileEdit: "Cancel",
    newProfileName: "New profile",
    renameProfilePrompt: "Rename profile",
    deleteProfileConfirm: "Delete this profile and all of its data?",
    lastProfileWarning: "Keep at least one profile.",
    maxProfilesWarning: "You can have up to 5 profiles.",
    dataToolsLabel: "Your data",
    exportData: "Export data",
    importData: "Import data",
    clearData: "Clear all data",
    dataToolsHint: "Keep a backup or move your dashboard to another browser.",
    clearDataConfirm: "Clear all saved dashboard data? This cannot be undone.",
    importSuccess: "Data imported",
    importError: "Could not import data",
    navNotes: "Notes",
    navDashboard: "Dashboard",
    navBody: "Body stats",
    navWeight: "Weight log",
    navTrainer: "Personal trainer",
    trainerTitle: "Personal trainer",
    trainerHint: "Build a practical split around the days you can train.",
    trainingDaysLabel: "Days available",
    trainingGoalLabel: "Main goal",
    trainingEmphasisLabel: "Training emphasis",
    trainingVolumeLabel: "Weekly volume",
    volumeLow: "Low",
    volumeModerate: "Moderate",
    volumeModerateHigh: "Moderate-high",
    volumeLabel: "volume",
    emphasisBalanced: "Balanced",
    emphasisLower: "Lower-body emphasis",
    emphasisUpper: "Upper-body emphasis",
    goalStrength: "Strength",
    goalMuscle: "Muscle & balance",
    goalFitness: "General fitness",
    generatePlan: "Generate plan",
    yourPlan: "Your plan",
    trainerNote: "Adjust the variables to match your experience, equipment, and recovery.",
    splitFullBody: "Full body",
    splitUpperLower: "Upper / lower",
    splitPushPullLegs: "Push / pull / legs",
    splitUpperLowerPlus: "Upper / lower + full body",
    dayLabel: "Day",
    setsLabel: "Sets",
    repsLabel: "Reps",
    timeLabel: "Time",
    restLabel: "Rest",
    minutesLabel: "min",
    secondsLabel: "sec",
    formCueLabel: "Form cue",
    trainerVisualLabel: "Reference cue",
    trainerSafety: "Start light, use controlled form, and stop if something feels painful. This is general education, not medical advice.",
    notesTitle: "Notes",
    notesHint: "Jot anything down. Saves automatically.",
    notesPlaceholder: "Write your thoughts here...",
    newNoteButton: "New note",
    noteTitleLabel: "Note title",
    noteTitlePlaceholder: "Note title",
    untitledNote: "Untitled note",
    noNotes: "No notes yet. Start with a fresh page.",
    deleteNote: "Delete note",
    saved: "Saved",
    saving: "Saving...",
    saveError: "Could not save",
    bodyStatsTitle: "Body stats",
    bodyStatsHint: "Add your details to estimate BMI, BMR, and daily calories.",
    ageLabel: "Age",
    sexLabel: "Sex",
    femaleOption: "Female",
    maleOption: "Male",
    heightLabel: "Height (cm)",
    weightLabel: "Weight (kg)",
    activityLabel: "Activity level",
    activitySedentary: "Sedentary",
    activitySedentaryDescription: "Little or no planned exercise; mostly sitting during the day.",
    activityLight: "Lightly active",
    activityLightDescription: "Light exercise or walking about 1–3 days per week.",
    activityModerate: "Moderately active",
    activityModerateDescription: "Moderate exercise or sports about 3–5 days per week.",
    activityVery: "Very active",
    activityVeryDescription: "Hard exercise or sports about 6–7 days per week.",
    activityExtra: "Extra active",
    activityExtraDescription: "Very hard training, physical work, or demanding training twice a day.",
    calorieModeLabel: "Calorie goal",
    deficitOption: "Deficit",
    surplusOption: "Surplus",
    calculateButton: "Calculate stats",
    bmiLabel: "BMI",
    bmiCategoryUnderweight: "Below the general range",
    bmiCategoryHealthy: "Within the general range",
    bmiCategoryOverweight: "Above the general range",
    bmiCategoryObesity: "Well above the general range",
    bmiCategoryNote: "BMI categories are general screening guidance, not a diagnosis.",
    bmiReferenceLabel: "BMI reference ranges",
    bmiScaleLow: "Low",
    bmiScaleHealthy: "Healthy",
    bmiScaleHigh: "High",
    bmiScaleVeryHigh: "Very high",
    bmiReferenceDescription: "BMI reference: below 18.5 is low, 18.5 to 24.9 is the general healthy range, 25 to 29.9 is high, and 30 or above is very high.",
    bmiDescription: "A height-to-weight ratio used as a general screening measure.",
    bmrLabel: "BMR",
    bmrDescription: "Estimated calories your body uses at rest.",
    maintenanceCaloriesLabel: "Maintenance",
    maintenanceCaloriesDescription: "Estimated calories needed to maintain your current weight.",
    calorieTargetsTitle: "Suggested targets",
    conservativeTarget: "Conservative · 10%",
    aggressiveTarget: "Aggressive · 15%",
    caloriesUnit: "kcal/day",
    estimateNote: "Estimates for learning and personal tracking, not medical advice.",
    weightTitle: "Weight log",
    weightHint: "Record measurements and watch your journey over time.",
    measurementDateLabel: "Date",
    measurementWeightLabel: "Weight (kg)",
    addMeasurementButton: "Add measurement",
    startingWeightLabel: "Starting weight",
    latestWeightLabel: "Latest weight",
    weightChangeLabel: "Change",
    weightUnit: "kg",
    weightTooltip: "Weight",
    chartEmpty: "Add at least two measurements to see your journey.",
    deleteMeasurement: "Delete measurement",
    goalWeightLabel: "Goal weight (kg)",
    goalWeightHint: "Your goal appears as a guide on the graph.",
    goalWeightShortLabel: "Goal",
    progressToGoal: "{percent}% toward goal",
    progressGoalReached: "Goal reached",
    measurementLegend: "Measurements",
    trendLegend: "Smoothed trend",
    trendLegendDescription: "An average of the latest three measurements that makes the overall direction easier to see.",
    goalLegend: "Goal",
    chartRangeLabel: "Chart range",
    chartRangeAll: "All time",
    chartRange30: "Last 30 days",
    chartRange90: "Last 90 days",
    chartRange365: "Last year",
    editMeasurement: "Edit measurement",
    saveMeasurement: "Save measurement",
    cancelEdit: "Cancel edit",
    chartSummary: "Showing {count} measurements from {start} to {end}.",
    footerNote: "Personal dashboard — learning project",
    dashboardTitle: "Today",
    dashboardEyebrow: "Personal snapshot",
    dashboardHint: "A quick look at your personal dashboard.",
    summaryLatestWeight: "Latest weight",
    summaryBmi: "BMI",
    summaryFromBody: "From Body Stats",
    summaryCalories: "Calorie target",
    openBodyStats: "Open Body Stats",
    openWeightLog: "Open Weight Log",
    noData: "No data yet",
    deficitSummary: "Deficit",
    surplusSummary: "Surplus",
  },
  es: {
    appTitle: "Pockez",
    appSubtitle: "Notas, hábitos y salud — todo en un solo lugar.",
    languageLabel: "Idioma",
    settings: "Ajustes",
    closeSettings: "Cerrar ajustes",
    settingsTitle: "Ajustes",
    accentLabel: "Color de acento",
    accentRedBlue: "Rojo + azul",
    accentOrangeTeal: "Naranja + turquesa",
    accentYellowPink: "Amarillo + rosa",
    backgroundLabel: "Estilo de fondo",
    backgroundPaper: "Papel",
    backgroundDarkPaper: "Papel oscuro",
    backgroundGraffiti: "Trazos de graffiti",
    backgroundBlueprint: "Papel de plano",
    animationsLabel: "Animaciones",
    animationsOn: "Activadas",
    animationsOff: "Desactivadas",
    darkModeLabel: "Modo oscuro",
    darkModeOn: "Activado",
    darkModeOff: "Desactivado",
    profileLabel: "Perfil",
    addProfile: "Añadir",
    renameProfile: "Renombrar",
    deleteProfile: "Eliminar",
    profileHint: "Cada perfil tiene sus propios datos corporales, registro de peso y objetivo.",
    profileCount: "{count} de 5 perfiles",
    profileNamePrompt: "Nombre del perfil",
    profileNamePlaceholder: "Nombre del perfil",
    saveProfile: "Guardar",
    cancelProfileEdit: "Cancelar",
    newProfileName: "Nuevo perfil",
    renameProfilePrompt: "Renombrar perfil",
    deleteProfileConfirm: "¿Eliminar este perfil y todos sus datos?",
    lastProfileWarning: "Conserva al menos un perfil.",
    maxProfilesWarning: "Puedes tener hasta 5 perfiles.",
    dataToolsLabel: "Tus datos",
    exportData: "Exportar datos",
    importData: "Importar datos",
    clearData: "Borrar todos los datos",
    dataToolsHint: "Guarda una copia o mueve tu tablero a otro navegador.",
    clearDataConfirm: "¿Borrar todos los datos guardados del tablero? No se puede deshacer.",
    importSuccess: "Datos importados",
    importError: "No se pudieron importar los datos",
    navNotes: "Notas",
    navDashboard: "Panel",
    navBody: "Datos corporales",
    navWeight: "Registro de peso",
    navTrainer: "Entrenador personal",
    trainerTitle: "Entrenador personal",
    trainerHint: "Crea una división práctica según los días que puedas entrenar.",
    trainingDaysLabel: "Días disponibles",
    trainingGoalLabel: "Objetivo principal",
    trainingEmphasisLabel: "Enfoque del entrenamiento",
    trainingVolumeLabel: "Volumen semanal",
    volumeLow: "Bajo",
    volumeModerate: "Moderado",
    volumeModerateHigh: "Moderado-alto",
    volumeLabel: "volumen",
    emphasisBalanced: "Equilibrado",
    emphasisLower: "Enfoque en tren inferior",
    emphasisUpper: "Enfoque en tren superior",
    goalStrength: "Fuerza",
    goalMuscle: "Músculo y equilibrio",
    goalFitness: "Condición general",
    generatePlan: "Generar plan",
    yourPlan: "Tu plan",
    trainerNote: "Ajusta las variables según tu experiencia, equipo y recuperación.",
    splitFullBody: "Cuerpo completo",
    splitUpperLower: "Tren superior / inferior",
    splitPushPullLegs: "Empuje / tirón / piernas",
    splitUpperLowerPlus: "Superior / inferior + cuerpo completo",
    dayLabel: "Día",
    setsLabel: "Series",
    repsLabel: "Repeticiones",
    timeLabel: "Tiempo",
    restLabel: "Descanso",
    minutesLabel: "min",
    secondsLabel: "seg",
    formCueLabel: "Clave técnica",
    trainerVisualLabel: "Referencia",
    trainerSafety: "Empieza ligero, usa una técnica controlada y detente si algo duele. Esto es información general, no consejo médico.",
    notesTitle: "Notas",
    notesHint: "Escribe lo que quieras. Se guarda solo.",
    notesPlaceholder: "Escribe tus ideas aquí...",
    newNoteButton: "Nueva nota",
    noteTitleLabel: "Título de nota",
    noteTitlePlaceholder: "Título de nota",
    untitledNote: "Nota sin título",
    noNotes: "Aún no hay notas. Empieza una página nueva.",
    deleteNote: "Eliminar nota",
    saved: "Guardado",
    saving: "Guardando...",
    saveError: "No se pudo guardar",
    bodyStatsTitle: "Datos corporales",
    bodyStatsHint: "Añade tus datos para estimar IMC, TMB y calorías diarias.",
    ageLabel: "Edad",
    sexLabel: "Sexo",
    femaleOption: "Mujer",
    maleOption: "Hombre",
    heightLabel: "Altura (cm)",
    weightLabel: "Peso (kg)",
    activityLabel: "Nivel de actividad",
    activitySedentary: "Sedentario",
    activitySedentaryDescription: "Poco o nada de ejercicio planificado; pasas la mayor parte del día sentado.",
    activityLight: "Poco activo",
    activityLightDescription: "Ejercicio ligero o caminatas aproximadamente 1–3 días por semana.",
    activityModerate: "Moderadamente activo",
    activityModerateDescription: "Ejercicio moderado o deporte aproximadamente 3–5 días por semana.",
    activityVery: "Muy activo",
    activityVeryDescription: "Ejercicio intenso o deporte aproximadamente 6–7 días por semana.",
    activityExtra: "Extra activo",
    activityExtraDescription: "Entrenamiento muy intenso, trabajo físico o entrenamientos exigentes dos veces al día.",
    calorieModeLabel: "Objetivo de calorías",
    deficitOption: "Déficit",
    surplusOption: "Superávit",
    calculateButton: "Calcular datos",
    bmiLabel: "IMC",
    bmiCategoryUnderweight: "Por debajo del rango general",
    bmiCategoryHealthy: "Dentro del rango general",
    bmiCategoryOverweight: "Por encima del rango general",
    bmiCategoryObesity: "Muy por encima del rango general",
    bmiCategoryNote: "Las categorías del IMC son una orientación general, no un diagnóstico.",
    bmiReferenceLabel: "Rangos de referencia del IMC",
    bmiScaleLow: "Bajo",
    bmiScaleHealthy: "Saludable",
    bmiScaleHigh: "Alto",
    bmiScaleVeryHigh: "Muy alto",
    bmiReferenceDescription: "Referencia del IMC: menos de 18,5 es bajo; de 18,5 a 24,9 es el rango saludable general; de 25 a 29,9 es alto; y 30 o más es muy alto.",
    bmiDescription: "Una relación entre altura y peso usada como medida general de referencia.",
    bmrLabel: "TMB",
    bmrDescription: "Calorías estimadas que tu cuerpo usa estando en reposo.",
    maintenanceCaloriesLabel: "Mantenimiento",
    maintenanceCaloriesDescription: "Calorías estimadas para mantener tu peso actual.",
    calorieTargetsTitle: "Objetivos sugeridos",
    conservativeTarget: "Conservador · 10%",
    aggressiveTarget: "Agresivo · 15%",
    caloriesUnit: "kcal/día",
    estimateNote: "Estimaciones para aprender y registrar datos, no son consejo médico.",
    weightTitle: "Registro de peso",
    weightHint: "Registra tus medidas y observa tu progreso con el tiempo.",
    measurementDateLabel: "Fecha",
    measurementWeightLabel: "Peso (kg)",
    addMeasurementButton: "Añadir medida",
    startingWeightLabel: "Peso inicial",
    latestWeightLabel: "Peso más reciente",
    weightChangeLabel: "Cambio",
    weightUnit: "kg",
    weightTooltip: "Peso",
    chartEmpty: "Añade al menos dos medidas para ver tu progreso.",
    deleteMeasurement: "Eliminar medida",
    goalWeightLabel: "Peso objetivo (kg)",
    goalWeightHint: "Tu objetivo aparece como guía en el gráfico.",
    goalWeightShortLabel: "Objetivo",
    progressToGoal: "{percent}% hacia el objetivo",
    progressGoalReached: "Objetivo alcanzado",
    measurementLegend: "Medidas",
    trendLegend: "Tendencia suavizada",
    trendLegendDescription: "Un promedio de las tres medidas más recientes para ver mejor la dirección general.",
    goalLegend: "Objetivo",
    chartRangeLabel: "Rango del gráfico",
    chartRangeAll: "Todo el periodo",
    chartRange30: "Últimos 30 días",
    chartRange90: "Últimos 90 días",
    chartRange365: "Último año",
    editMeasurement: "Editar medida",
    saveMeasurement: "Guardar medida",
    cancelEdit: "Cancelar edición",
    chartSummary: "Se muestran {count} medidas desde {start} hasta {end}.",
    footerNote: "Tablero personal — proyecto de aprendizaje",
    dashboardTitle: "Hoy",
    dashboardEyebrow: "Resumen personal",
    dashboardHint: "Un vistazo rápido a tu tablero personal.",
    summaryLatestWeight: "Peso más reciente",
    summaryBmi: "IMC",
    summaryFromBody: "Desde Datos corporales",
    summaryCalories: "Objetivo de calorías",
    openBodyStats: "Abrir Datos corporales",
    openWeightLog: "Abrir Registro de peso",
    noData: "Aún no hay datos",
    deficitSummary: "Déficit",
    surplusSummary: "Superávit",
  },
};

// Fast startup: remove `no-js` (so CSS hiding applies) and enable splash immediately
try {
  document.body.classList.add("splash");
  document.body.classList.remove("no-js");
} catch (e) {
  // ignore if body not ready
}

// --- Debug / instrumentation ---
// Active ONLY when the page is opened with ?debug in the URL
// (e.g. index.html?debug). Production runs stay free of console spam
// and the log buffer can no longer grow without bound.
const DEBUG_ENABLED = /[?&]debug\b/i.test(location.search);
const MAX_DEBUG_LOGS = 500;
const __debugLogs = [];
function debugLog(msg, meta = {}) {
  if (!DEBUG_ENABLED) return;
  const entry = { t: new Date().toISOString(), msg, bodyClass: document.body.className, meta };
  __debugLogs.push(entry);
  if (__debugLogs.length > MAX_DEBUG_LOGS) __debugLogs.shift();
  try { console.log("[dbg]", entry); } catch (e) {}
}

function exportDebugLogs() {
  try {
    const blob = new Blob([JSON.stringify(__debugLogs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pockez-debug-log.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
  }
}

// Floating export button + Shift+D shortcut, ?debug builds only
if (DEBUG_ENABLED) {
  const debugButton = document.createElement('button');
  debugButton.textContent = 'Export logs';
  debugButton.id = 'debug-export';
  debugButton.style.cssText = 'position:fixed;right:12px;bottom:96px;z-index:9999;padding:6px 8px;border-radius:6px;background:#222;color:#fff;border:0;opacity:0.8;font-size:12px;';
  debugButton.addEventListener('click', exportDebugLogs);
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(debugButton));

  // keyboard export: Shift+D
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 'd') {
      exportDebugLogs();
    }
  });
}

debugLog('startup: added splash/no-js handling');

// Hook title animation events to log and ensure we don't reveal content early
const titleEl = document.querySelector('.title');
if (titleEl) {
  titleEl.addEventListener('animationstart', () => debugLog('title animationstart'));
  titleEl.addEventListener('animationend', () => debugLog('title animationend'));
}

const STORAGE_PREFIX = "@sketch-dashboard:";
const LEGACY_PREFIX = "sketch-dashboard-";

const STORAGE_KEYS = {
  notes: `${STORAGE_PREFIX}notes`,
  language: `${STORAGE_PREFIX}language`,
  activeWidget: `${STORAGE_PREFIX}active-widget`,
  accent: `${STORAGE_PREFIX}accent`,
  background: `${STORAGE_PREFIX}background`,
  bodyStats: `${STORAGE_PREFIX}body-stats`,
  weightEntries: `${STORAGE_PREFIX}weight-entries`,
  notesCollection: `${STORAGE_PREFIX}notes-collection`,
  activeNote: `${STORAGE_PREFIX}active-note`,
  goalWeight: `${STORAGE_PREFIX}goal-weight`,
  animations: `${STORAGE_PREFIX}animations`,
  darkMode: `${STORAGE_PREFIX}dark-mode`,
  profiles: `${STORAGE_PREFIX}profiles`,
  activeProfile: `${STORAGE_PREFIX}active-profile`,
  trainerPlan: `${STORAGE_PREFIX}trainer-plan`,
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

const languageSelect = document.getElementById("language-select");
const notesInput = document.getElementById("notes-input");
const noteTitleInput = document.getElementById("note-title-input");
const noteList = document.getElementById("note-list");
const newNoteButton = document.getElementById("note-new");
const saveStatus = document.getElementById("save-status");
const navButtons = document.querySelectorAll(".nav-btn");
const widgetPanels = document.querySelectorAll(".widget-panel");
const settingsDialog = document.getElementById("settings-dialog");
const settingsOpen = document.getElementById("settings-open");
const settingsClose = document.getElementById("settings-close");
const accentOptions = document.querySelectorAll('input[name="accent"]');
const backgroundOptions = document.querySelectorAll('input[name="background"]');
const animationsToggle = document.getElementById("animations-toggle");
const animationsState = document.querySelector(".toggle-state");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const darkModeState = darkModeToggle?.closest(".animation-setting")?.querySelector(".toggle-state");
const exportDataButton = document.getElementById("export-data");
const importDataButton = document.getElementById("import-data-button");
const importDataInput = document.getElementById("import-data-input");
const clearDataButton = document.getElementById("clear-data");
const profileSelect = document.getElementById("profile-select");
const profileCount = document.getElementById("profile-count");
const profileAddButton = document.getElementById("profile-add");
const profileRenameButton = document.getElementById("profile-rename");
const profileDeleteButton = document.getElementById("profile-delete");
const profileEditor = document.getElementById("profile-editor");
const profileNameInput = document.getElementById("profile-name-input");
const profileSaveButton = document.getElementById("profile-save");
const profileCancelButton = document.getElementById("profile-cancel");
let profileEditMode = null;
const bodyForm = document.getElementById("body-form");
const bodyInputs = {
  age: document.getElementById("age-input"),
  sex: document.getElementById("sex-input"),
  height: document.getElementById("height-input"),
  weight: document.getElementById("body-weight-input"),
  activity: document.getElementById("activity-input"),
};
const bodyResults = {
  bmi: document.getElementById("bmi-result"),
  bmiCategory: document.getElementById("bmi-category"),
  bmiMarker: document.getElementById("bmi-scale-marker"),
  bmiReferenceDescription: document.getElementById("bmi-reference-description"),
  bmr: document.getElementById("bmr-result"),
  calories: document.getElementById("maintenance-calories-result"),
};
const calorieModeOptions = document.querySelectorAll('input[name="calorie-mode"]');
const conservativeCaloriesResult = document.getElementById("conservative-calories-result");
const aggressiveCaloriesResult = document.getElementById("aggressive-calories-result");
const weightForm = document.getElementById("weight-form");
const measurementSubmitButton = weightForm?.querySelector('button[type="submit"]');
const measurementCancelButton = document.getElementById("measurement-cancel");
const measurementDateInput = document.getElementById("measurement-date-input");
const measurementWeightInput = document.getElementById("measurement-weight-input");
const startingWeightResult = document.getElementById("starting-weight-result");
const latestWeightResult = document.getElementById("latest-weight-result");
const weightChangeResult = document.getElementById("weight-change-result");
const weightChart = document.getElementById("weight-chart");
const weightChartGrid = document.getElementById("weight-chart-grid");
const weightChartYLabels = document.getElementById("weight-chart-y-labels");
const weightChartArea = document.getElementById("weight-chart-area");
const weightChartLine = document.getElementById("weight-chart-line");
const weightChartPoints = document.getElementById("weight-chart-points");
const weightChartXLabels = document.getElementById("weight-chart-x-labels");
const weightChartTooltip = document.getElementById("weight-chart-tooltip");
const weightChartTooltipBox = document.getElementById("weight-chart-tooltip-box");
const weightChartTooltipText = document.getElementById("weight-chart-tooltip-text");
let weightTooltipTimer = null;
let weightTooltipFadeTimer = null;
let weightTooltipHideDelayTimer = null;
const chartEmpty = document.getElementById("chart-empty");
const measurementList = document.getElementById("measurement-list");
const goalWeightInput = document.getElementById("goal-weight-input");
const goalWeightResult = document.getElementById("goal-weight-result");
const weightGoalLine = document.getElementById("weight-goal-line");
const weightTrendLine = document.getElementById("weight-trend-line");
const goalHint = document.getElementById("goal-hint");
const chartRangeSelect = document.getElementById("chart-range-select");
const chartSummary = document.getElementById("chart-summary");
const summaryWeight = document.getElementById("summary-weight");
const summaryWeightChange = document.getElementById("summary-weight-change");
const summaryBmi = document.getElementById("summary-bmi");
const summaryCalories = document.getElementById("summary-calories");
const summaryCalorieMode = document.getElementById("summary-calorie-mode");
const quickLinks = document.querySelectorAll("[data-widget-target]");
let editingMeasurementId = null;
let bodyStatsCalculated = false;
const trainerForm = document.getElementById("trainer-form");
const trainingDaysInput = document.getElementById("training-days-input");
const trainingGoalInput = document.getElementById("training-goal-input");
const trainingEmphasisInput = document.getElementById("training-emphasis-input");
const trainingVolumeInput = document.getElementById("training-volume-input");
const trainerPlanHeading = document.getElementById("trainer-plan-heading");
const trainerPlanTitle = document.getElementById("trainer-plan-title");
const trainerPlanMeta = document.getElementById("trainer-plan-meta");
const trainerDays = document.getElementById("trainer-days");

const i18nElements = document.querySelectorAll("[data-i18n]");
const i18nPlaceholderElements = document.querySelectorAll(
  "[data-i18n-placeholder]"
);
const i18nAriaElements = document.querySelectorAll("[data-i18n-aria]");
const i18nTitleElements = document.querySelectorAll("[data-i18n-title]");
const activityInput = document.getElementById("activity-input");
const activityDescription = document.getElementById("activity-description");

const DEBUG_UI = DEBUG_ENABLED;
const DEBUG_WEIGHT_TOOLTIP = DEBUG_ENABLED;

function logWeightTooltip(eventName, details = {}) {
  if (!DEBUG_WEIGHT_TOOLTIP) return;
  console.log(`[Weight Tooltip] ${eventName}`, {
    ...details,
    tooltipHidden: weightChartTooltip?.hidden,
    tooltipText: weightChartTooltipText?.textContent,
    timerActive: weightTooltipTimer !== null,
  });
}

function logUiState(label) {
  if (!DEBUG_UI) return;

  const widget = document.querySelector(".widget-panel.is-active");
  const dialog = settingsDialog;
  const widgetStyles = widget ? getComputedStyle(widget) : null;
  const dialogStyles = dialog ? getComputedStyle(dialog) : null;

  console.group(`[Pockez] ${label}`);
  console.log("Theme", {
    accent: loadPreference(STORAGE_KEYS.accent, "red-blue"),
    background: loadPreference(STORAGE_KEYS.background, "desk"),
    activeWidget: widget?.dataset.widget || "none",
  });
  console.log("Widget panel", widget ? {
    className: widget.className,
    hidden: widget.hidden,
    rect: widget.getBoundingClientRect().toJSON(),
    border: widgetStyles.border,
    boxShadow: widgetStyles.boxShadow,
    transform: widgetStyles.transform,
    filter: widgetStyles.filter,
    clipPath: widgetStyles.clipPath,
  } : "not found");
  console.log("Settings dialog", dialog ? {
    open: dialog.open,
    rect: dialog.getBoundingClientRect().toJSON(),
    border: dialogStyles.border,
    boxShadow: dialogStyles.boxShadow,
    transform: dialogStyles.transform,
    filter: dialogStyles.filter,
    clipPath: dialogStyles.clipPath,
  } : "not found");
  console.groupEnd();
}

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
  renderWeightLog();
  renderNotes();
  renderProfiles();
  loadTrainerPlan();

  document.documentElement.lang = lang;
}

function updateActivityDescription(lang = languageSelect.value) {
  const strings = translations[lang] || translations.en;
  const selectedOption = activityInput.options[activityInput.selectedIndex];
  const descriptionKey = selectedOption?.dataset.descriptionKey;
  activityDescription.textContent = descriptionKey
    ? strings[descriptionKey] || translations.en[descriptionKey]
    : "";
}

function setLanguage(lang) {
  const safeLang = translations[lang] ? lang : "en";
  applyTranslations(safeLang);
  languageSelect.value = safeLang;

  try {
    localStorage.setItem(STORAGE_KEYS.language, safeLang);
  } catch (error) {
    console.warn("Could not save language preference:", error);
  }
}

function loadLanguage() {
  let savedLang = "en";

  try {
    savedLang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  } catch (error) {
    console.warn("Could not read language preference:", error);
  }

  setLanguage(savedLang);
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Could not save preference:", error);
  }
}

function loadPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    console.warn("Could not read preference:", error);
    return fallback;
  }
}

const accentThemes = {
  "red-blue": ["#b54a4a", "#4a6d8c"],
  "orange-teal": ["#d97941", "#3d8c87"],
  "yellow-pink": ["#d5ad38", "#bd5772"],
};

function setAccent(accentId) {
  const colors = accentThemes[accentId] || accentThemes["red-blue"];
  document.documentElement.style.setProperty("--aberration-a", colors[0]);
  document.documentElement.style.setProperty("--aberration-b", colors[1]);
  const selectedOption = document.querySelector(`input[name="accent"][value="${accentId}"]`);
  if (selectedOption) selectedOption.checked = true;
  savePreference(STORAGE_KEYS.accent, accentId);
  logUiState(`Accent changed to ${accentId}`);
}

function setBackground(backgroundId) {
  const normalizedBackground = backgroundId === "desk" ? "paper" : backgroundId;
  const safeBackground = ["paper", "dark-paper", "graffiti", "blueprint"].includes(normalizedBackground)
    ? normalizedBackground
    : "graffiti";
  document.body.classList.remove(
    "background-paper",
    "background-dark-paper",
    "background-graffiti",
    "background-blueprint"
  );
  document.body.classList.add(`background-${safeBackground}`);
  const selectedOption = document.querySelector(
    `input[name="background"][value="${safeBackground}"]`
  );
  if (selectedOption) selectedOption.checked = true;
  savePreference(STORAGE_KEYS.background, safeBackground);
  logUiState(`Background changed to ${safeBackground}`);
}

function setAnimationsEnabled(enabled) {
  const safeEnabled = enabled !== false;
  document.body.classList.toggle("animations-off", !safeEnabled);
  animationsToggle.checked = safeEnabled;
  animationsState.textContent = safeEnabled
    ? (translations[languageSelect.value] || translations.en).animationsOn
    : (translations[languageSelect.value] || translations.en).animationsOff;
  savePreference(STORAGE_KEYS.animations, String(safeEnabled));
}

function setDarkModeEnabled(enabled) {
  const safeEnabled = enabled === true;
  document.body.classList.toggle("dark-mode", safeEnabled);
  darkModeToggle.checked = safeEnabled;
  darkModeState.textContent = safeEnabled
    ? (translations[languageSelect.value] || translations.en).darkModeOn
    : (translations[languageSelect.value] || translations.en).darkModeOff;
  savePreference(STORAGE_KEYS.darkMode, String(safeEnabled));
}

function loadSettings() {
  setAccent(loadPreference(STORAGE_KEYS.accent, "red-blue"));
  setBackground(loadPreference(STORAGE_KEYS.background, "graffiti"));
  setAnimationsEnabled(loadPreference(STORAGE_KEYS.animations, "true") !== "false");
  setDarkModeEnabled(loadPreference(STORAGE_KEYS.darkMode, "false") === "true");
}

function makeProfile(name, data = {}) {
  return {
    id: crypto.randomUUID(),
    name: name.trim() || "My profile",
    bodyStats: data.bodyStats || "",
    weightEntries: data.weightEntries || "[]",
    goalWeight: data.goalWeight || "",
    trainerPlan: data.trainerPlan || "",
  };
}

function getProfiles() {
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

function saveProfiles(profiles) {
  savePreference(STORAGE_KEYS.profiles, JSON.stringify(profiles));
}

function getActiveProfileId() {
  const profiles = getProfiles();
  const savedId = loadPreference(STORAGE_KEYS.activeProfile, "");
  return profiles.some((profile) => profile.id === savedId) ? savedId : profiles[0].id;
}

function getActiveProfile() {
  return getProfiles().find((profile) => profile.id === getActiveProfileId());
}

function updateActiveProfile(update) {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  const profile = profiles.find((item) => item.id === activeId);
  if (!profile) return;
  Object.assign(profile, update);
  saveProfiles(profiles);
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
  editingMeasurementId = null;
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
  profileEditMode = "add";
  profileNameInput.value = `${strings.newProfileName} ${profiles.length + 1}`;
  profileEditor.hidden = false;
  profileNameInput.focus();
}

function renameProfile() {
  const profile = getActiveProfile();
  profileEditMode = "rename";
  profileNameInput.value = profile.name;
  profileEditor.hidden = false;
  profileNameInput.focus();
}

function saveProfileName() {
  const name = profileNameInput.value.trim();
  if (!name) return;
  const profiles = getProfiles();
  if (profileEditMode === "add") {
    const profile = makeProfile(name);
    profiles.push(profile);
    saveProfiles(profiles);
    savePreference(STORAGE_KEYS.activeProfile, profile.id);
    renderProfiles();
    loadBodyStats();
    cancelMeasurementEdit();
    renderWeightLog();
  } else if (profileEditMode === "rename") {
    const activeId = getActiveProfileId();
    saveProfiles(profiles.map((profile) => profile.id === activeId ? { ...profile, name } : profile));
    renderProfiles();
  }
  profileEditMode = null;
  profileEditor.hidden = true;
}

function cancelProfileEdit() {
  profileEditMode = null;
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
  bodyStatsCalculated = true;

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
    bodyStatsCalculated = false;
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

function getGoalWeight() {
  const savedGoal = getActiveProfile()?.goalWeight || "";
  return savedGoal === "" ? null : Number(savedGoal);
}

function saveGoalWeight() {
  const value = Number(goalWeightInput.value);
  if (goalWeightInput.value === "" || !Number.isFinite(value)) {
    updateActiveProfile({ goalWeight: "" });
    return;
  }
  updateActiveProfile({ goalWeight: String(value) });
}

function formatWeight(value) {
  return Number(value).toFixed(1);
}

function formatMeasurementDate(dateValue) {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString(
    languageSelect.value,
    { year: "numeric", month: "short", day: "numeric" }
  );
}

function getTodayDateValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - offset).toISOString().split("T")[0];
}

function getWeightChartRange(values) {
  if (values.length === 0) return { minimum: 0, maximum: 1 };
  const sex = bodyInputs.sex.value || loadBodyStatsProfile()?.sex || "female";
  const referenceRange = sex === "male"
    ? { minimum: 65, maximum: 105 }
    : { minimum: 50, maximum: 90 };
  const actualMinimum = Math.min(...values);
  const actualMaximum = Math.max(...values);
  const goalWeight = getGoalWeight();
  const allValues = goalWeight === null
    ? [actualMinimum, actualMaximum]
    : [actualMinimum, actualMaximum, goalWeight];

  return {
    minimum: Math.min(referenceRange.minimum, Math.floor(Math.min(...allValues) - 5)),
    maximum: Math.max(referenceRange.maximum, Math.ceil(Math.max(...allValues) + 5)),
  };
}

function loadBodyStatsProfile() {
  const savedStats = getActiveProfile()?.bodyStats || null;
  if (!savedStats) return null;

  try {
    return JSON.parse(savedStats);
  } catch (error) {
    return null;
  }
}

function showWeightTooltip(point, entry, chartWidth, chartHeight) {
  logWeightTooltip("show:start", {
    date: entry.date,
    weight: entry.weight,
    pointClass: point.className.baseVal,
    pointTitle: point.querySelector("title")?.textContent || null,
    pointAriaLabel: point.getAttribute("aria-label"),
  });
  const tooltipText = `${formatMeasurementDate(entry.date)} · ${(translations[languageSelect.value] || translations.en).weightTooltip}: ${formatWeight(entry.weight)} kg`;
  if (weightTooltipHideDelayTimer) {
    clearTimeout(weightTooltipHideDelayTimer);
    weightTooltipHideDelayTimer = null;
  }
  const tooltipWidth = Math.max(112, tooltipText.length * 6.2);
  const tooltipHeight = 24;
  const pointX = Number(point.getAttribute("cx"));
  const pointY = Number(point.getAttribute("cy"));
  const tooltipX = Math.min(Math.max(pointX - tooltipWidth / 2, 4), chartWidth - tooltipWidth - 4);
  const tooltipY = pointY > 42 ? pointY - tooltipHeight - 10 : pointY + 12;

  weightChartTooltipBox.setAttribute("x", tooltipX);
  weightChartTooltipBox.setAttribute("y", tooltipY);
  weightChartTooltipBox.setAttribute("width", tooltipWidth);
  weightChartTooltipBox.setAttribute("height", tooltipHeight);
  weightChartTooltipText.setAttribute("x", tooltipX + tooltipWidth / 2);
  weightChartTooltipText.setAttribute("y", tooltipY + 16);
  weightChartTooltipText.textContent = tooltipText;
  weightChartTooltip.hidden = false;
  weightChartTooltip.classList.add("is-visible");
  point.classList.add("is-hovered");

  if (weightTooltipTimer) clearTimeout(weightTooltipTimer);
  weightTooltipTimer = setTimeout(() => {
    logWeightTooltip("timer:expired", { date: entry.date });
    hideWeightTooltip(point);
  }, 2000);
  logWeightTooltip("show:timer-started", { timeoutMs: 2000 });
}

function hideWeightTooltip(point) {
  logWeightTooltip("hide:start", {
    pointClass: point.className.baseVal,
  });
  if (weightTooltipTimer) {
    clearTimeout(weightTooltipTimer);
    weightTooltipTimer = null;
    logWeightTooltip("hide:timer-cleared");
  }
  if (weightTooltipFadeTimer) clearTimeout(weightTooltipFadeTimer);
  weightChartTooltip.classList.remove("is-visible");
  weightTooltipFadeTimer = setTimeout(() => {
    weightChartTooltip.hidden = true;
    weightTooltipFadeTimer = null;
  }, 180);
  point.classList.remove("is-hovered");
  logWeightTooltip("hide:complete");
}

function scheduleHideWeightTooltip(point) {
  if (weightTooltipHideDelayTimer) clearTimeout(weightTooltipHideDelayTimer);
  logWeightTooltip("hide:scheduled", { delayMs: 2000 });
  weightTooltipHideDelayTimer = setTimeout(() => {
    weightTooltipHideDelayTimer = null;
    logWeightTooltip("hide:delay-expired");
    hideWeightTooltip(point);
  }, 2000);
}

function renderWeightChart(entries) {
  const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const hasChart = sortedEntries.length >= 2;
  const chartWidth = 600;
  const chartHeight = 240;
  const padding = { top: 20, right: 22, bottom: 28, left: 42 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const values = sortedEntries.map((entry) => Number(entry.weight));
  const chartRange = getWeightChartRange(values);
  const minimum = chartRange.minimum;
  const maximum = chartRange.maximum;
  const range = maximum - minimum;

  weightChart.hidden = !hasChart;
  chartEmpty.hidden = hasChart;
  if (hasChart) {
    const strings = translations[languageSelect.value] || translations.en;
    chartSummary.textContent = strings.chartSummary
      .replace("{count}", sortedEntries.length)
      .replace("{start}", formatMeasurementDate(sortedEntries[0].date))
      .replace("{end}", formatMeasurementDate(sortedEntries[sortedEntries.length - 1].date));
  } else {
    chartSummary.textContent = "";
  }
  weightChartLine.setAttribute(
    "points",
    sortedEntries.map((entry, index) => {
      const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
      const y = padding.top + ((maximum - Number(entry.weight)) / range) * plotHeight;
      return `${x},${y}`;
    }).join(" ")
  );
  const trendPoints = sortedEntries.map((entry, index) => {
    const windowStart = Math.max(0, index - 2);
    const windowEntries = sortedEntries.slice(windowStart, index + 1);
    const average = windowEntries.reduce((sum, item) => sum + Number(item.weight), 0) / windowEntries.length;
    const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
    const y = padding.top + ((maximum - average) / range) * plotHeight;
    return `${x},${y}`;
  });
  weightTrendLine.setAttribute("points", trendPoints.join(" "));
  const linePoints = sortedEntries.map((entry, index) => {
    const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
    const y = padding.top + ((maximum - Number(entry.weight)) / range) * plotHeight;
    return `${x},${y}`;
  });
  weightChartArea.setAttribute(
    "points",
    `${linePoints.join(" ")} ${chartWidth - padding.right},${chartHeight - padding.bottom} ${padding.left},${chartHeight - padding.bottom}`
  );
  weightChartGrid.innerHTML = "";
  weightChartYLabels.innerHTML = "";
  weightChartPoints.innerHTML = "";
  weightChartXLabels.innerHTML = "";
  weightChartTooltip.hidden = true;
  logWeightTooltip("chart:render-reset");

  const goalWeight = getGoalWeight();
  if (goalWeight === null) {
    weightGoalLine.hidden = true;
  } else {
    const goalY = padding.top + ((maximum - goalWeight) / range) * plotHeight;
    weightGoalLine.hidden = false;
    weightGoalLine.setAttribute("x1", padding.left);
    weightGoalLine.setAttribute("x2", chartWidth - padding.right);
    weightGoalLine.setAttribute("y1", goalY);
    weightGoalLine.setAttribute("y2", goalY);
  }

  if (!hasChart) return;

  for (let index = 0; index < 4; index += 1) {
    const y = padding.top + (index / 3) * plotHeight;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", padding.left);
    line.setAttribute("x2", chartWidth - padding.right);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "rgba(26, 26, 26, 0.16)");
    line.setAttribute("stroke-dasharray", "4 5");
    weightChartGrid.append(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const labelValue = maximum - (index / 3) * range;
    label.setAttribute("x", "4");
    label.setAttribute("y", y + 4);
    label.setAttribute("class", "chart-axis-label");
    label.textContent = `${Math.round(labelValue)} kg`;
    weightChartYLabels.append(label);
  }

  sortedEntries.forEach((entry, index) => {
    const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
    const y = padding.top + ((maximum - Number(entry.weight)) / range) * plotHeight;
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", x);
    point.setAttribute("cy", y);
    point.setAttribute("r", "6");
    point.setAttribute("fill", "var(--aberration-b)");
    point.setAttribute("stroke", "var(--paper)");
    point.setAttribute("stroke-width", "2");
    point.setAttribute("tabindex", "0");
    point.setAttribute("aria-label", `${formatMeasurementDate(entry.date)}: ${formatWeight(entry.weight)} kg`);
    const showPointTooltip = (eventName) => {
      logWeightTooltip(`event:${eventName}`, { date: entry.date });
      showWeightTooltip(point, entry, chartWidth, chartHeight);
    };
    const schedulePointTooltipHide = (eventName) => {
      logWeightTooltip(`event:${eventName}`, { date: entry.date });
      scheduleHideWeightTooltip(point);
    };
    point.addEventListener("pointerenter", () => showPointTooltip("pointerenter"));
    point.addEventListener("mouseenter", () => showPointTooltip("mouseenter"));
    point.addEventListener("pointerleave", () => schedulePointTooltipHide("pointerleave"));
    point.addEventListener("mouseleave", () => schedulePointTooltipHide("mouseleave"));
    point.addEventListener("focus", () => {
      logWeightTooltip("event:focus", { date: entry.date });
      showWeightTooltip(point, entry, chartWidth, chartHeight);
    });
    point.addEventListener("blur", () => {
      logWeightTooltip("event:blur", { date: entry.date });
      scheduleHideWeightTooltip(point);
    });
    weightChartPoints.append(point);

    const dateLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    dateLabel.setAttribute("x", x);
    dateLabel.setAttribute("y", chartHeight - 6);
    dateLabel.setAttribute("class", "chart-axis-label chart-date-label");
    dateLabel.textContent = new Date(`${entry.date}T00:00:00`).toLocaleDateString(
      languageSelect.value,
      { month: "short", day: "numeric" }
    );
    weightChartXLabels.append(dateLabel);
  });
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
  if (goalWeight === null || latestEntry === null) {
    goalHint.textContent = strings.goalWeightHint;
  } else {
    const startingWeight = Number(firstEntry.weight);
    const latestWeight = Number(latestEntry.weight);
    const totalDistance = goalWeight < startingWeight
      ? startingWeight - goalWeight
      : goalWeight - startingWeight;
    const traveledDistance = goalWeight < startingWeight
      ? startingWeight - latestWeight
      : latestWeight - startingWeight;
    const progress = totalDistance === 0
      ? 100
      : Math.min(100, Math.max(0, (traveledDistance / totalDistance) * 100));
    goalHint.textContent = progress >= 100
      ? strings.progressGoalReached
      : strings.progressToGoal.replace("{percent}", Math.round(progress));
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
  editingMeasurementId = entry.id;
  measurementDateInput.value = entry.date;
  measurementWeightInput.value = entry.weight;
  measurementSubmitButton.textContent = (translations[languageSelect.value] || translations.en).saveMeasurement;
  measurementCancelButton.hidden = false;
  measurementWeightInput.focus();
}

function cancelMeasurementEdit() {
  editingMeasurementId = null;
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

const trainerExercises = {
  squat: { name: { en: "Squat", es: "Sentadilla" }, cue: { en: "Brace your trunk and keep your knees tracking over your toes.", es: "Activa el tronco y mantén las rodillas alineadas con los pies." }, muscle: "quads" },
  hinge: { name: { en: "Romanian deadlift", es: "Peso muerto rumano" }, cue: { en: "Push your hips back and keep the weight close to your legs.", es: "Lleva la cadera atrás y mantén el peso cerca de las piernas." }, muscle: "hamstrings" },
  push: { name: { en: "Bench press", es: "Press de banca" }, cue: { en: "Keep your shoulder blades set and lower with control.", es: "Fija los omóplatos y baja con control." }, muscle: "chest" },
  overhead: { name: { en: "Overhead press", es: "Press por encima de la cabeza" }, cue: { en: "Squeeze your glutes and press in a smooth vertical path.", es: "Aprieta los glúteos y empuja en una trayectoria vertical suave." }, muscle: "shoulders" },
  row: { name: { en: "Seated row", es: "Remo sentado" }, cue: { en: "Pull toward your ribs without shrugging your shoulders.", es: "Lleva el agarre hacia las costillas sin encoger los hombros." }, muscle: "back" },
  pulldown: { name: { en: "Lat pulldown", es: "Jalón al pecho" }, cue: { en: "Pull your elbows down and avoid swinging your torso.", es: "Lleva los codos abajo y evita balancear el torso." }, muscle: "back" },
  splitSquat: { name: { en: "Split squat", es: "Sentadilla dividida" }, cue: { en: "Use a stable stance and lower your back knee straight down.", es: "Usa una postura estable y baja la rodilla trasera hacia abajo." }, muscle: "quads" },
  calf: { name: { en: "Calf raise", es: "Elevación de gemelos" }, cue: { en: "Pause briefly at the top and lower through the full range.", es: "Pausa arriba y baja usando todo el recorrido." }, muscle: "hamstrings" },
  pushup: { name: { en: "Push-up", es: "Flexión" }, cue: { en: "Keep your body in one line and move as one unit.", es: "Mantén el cuerpo en línea y muévete como una unidad." }, muscle: "chest" },
  curl: { name: { en: "Dumbbell curl", es: "Curl con mancuernas" }, cue: { en: "Keep your elbows still and avoid using momentum.", es: "Mantén los codos quietos y evita usar impulso." }, muscle: "biceps" },
  triceps: { name: { en: "Triceps pressdown", es: "Extensión de tríceps" }, cue: { en: "Keep your upper arms still as you extend your elbows.", es: "Mantén los brazos quietos mientras extiendes los codos." }, muscle: "triceps" },
  plank: { name: { en: "Plank", es: "Plancha" }, cue: { en: "Keep ribs tucked and squeeze glutes while breathing steadily.", es: "Mantén las costillas recogidas, aprieta los glúteos y respira." }, muscle: "abs" },
};

const trainerSplits = {
  fullBody: [
    { name: "Full body", exercises: ["squat", "push", "row", "plank"] },
    { name: "Full body", exercises: ["hinge", "overhead", "pulldown", "splitSquat"] },
    { name: "Full body", exercises: ["squat", "pushup", "row", "calf"] },
  ],
  upperLower: [
    { name: "Upper body", exercises: ["push", "row", "overhead", "pulldown"] },
    { name: "Lower body", exercises: ["squat", "hinge", "splitSquat", "calf"] },
  ],
  pushPullLegs: [
    { name: "Push", exercises: ["push", "overhead", "pushup", "triceps"] },
    { name: "Pull", exercises: ["hinge", "row", "pulldown", "curl"] },
    { name: "Legs", exercises: ["squat", "hinge", "splitSquat", "calf"] },
  ],
};

function getTrainerVariables(goal) {
  if (goal === "strength") return { sets: 4, reps: "4-6", rest: "2 - 3 min" };
  if (goal === "fitness") return { sets: 3, reps: "10-12", rest: "2 - 3 min" };
  return { sets: 3, reps: "8-12", rest: "2 - 3 min" };
}

const trainerVolumeRanges = {
  back: { low: [8, 14], moderate: [14, 18], moderateHigh: [18, 25] },
  chest: { low: [6, 12], moderate: [12, 16], moderateHigh: [16, 20] },
  quads: { low: [5, 10], moderate: [10, 15], moderateHigh: [15, 18] },
  hamstrings: { low: [4, 8], moderate: [8, 12], moderateHigh: [12, 16] },
  glutes: { low: [6, 8], moderate: [8, 15], moderateHigh: [15, 25] },
  shoulders: { low: [4, 8], moderate: [8, 12], moderateHigh: [12, 16] },
  biceps: { low: [5, 10], moderate: [10, 15], moderateHigh: [15, 18] },
  triceps: { low: [5, 10], moderate: [10, 15], moderateHigh: [15, 18] },
  abs: { low: [3, 5], moderate: [5, 8], moderateHigh: [8, 12] },
};

function getWeeklySetTarget(muscle, volume) {
  const range = trainerVolumeRanges[muscle]?.[volume] || trainerVolumeRanges.quads.moderate;
  return Math.round((range[0] + range[1]) / 2);
}

function assignTrainerVolume(days, volume) {
  const exerciseCounts = {};
  days.forEach((day) => day.exercises.forEach((exercise) => {
    const muscle = trainerExercises[exercise.id].muscle;
    exerciseCounts[muscle] = (exerciseCounts[muscle] || 0) + 1;
  }));

  return days.map((day) => ({
    ...day,
    exercises: day.exercises.map((exercise) => {
      const muscle = trainerExercises[exercise.id].muscle;
      const weeklyTarget = getWeeklySetTarget(muscle, volume);
      const occurrenceCount = exerciseCounts[muscle] || 1;
      return {
        ...exercise,
        sets: Math.max(1, Math.min(6, Math.round(weeklyTarget / occurrenceCount))),
      };
    }),
  }));
}

function getTrainerSplit(dayCount, emphasis = "balanced") {
  const lowerBodyDays = [
    { name: "Lower body", exercises: ["squat", "hinge", "splitSquat", "calf"] },
    { name: "Upper body", exercises: ["push", "row", "overhead", "pulldown"] },
    { name: "Lower body", exercises: ["hinge", "squat", "splitSquat", "plank"] },
  ];
  const upperBodyDays = [
    { name: "Upper body", exercises: ["push", "row", "overhead", "pulldown"] },
    { name: "Lower body", exercises: ["squat", "hinge", "splitSquat", "calf"] },
    { name: "Upper body", exercises: ["pushup", "row", "curl", "triceps"] },
  ];
  if (dayCount <= 3 && emphasis === "lower") return { key: "fullBody", days: lowerBodyDays.slice(0, dayCount) };
  if (dayCount <= 3 && emphasis === "upper") return { key: "fullBody", days: upperBodyDays.slice(0, dayCount) };
  if (dayCount <= 3) return { key: "fullBody", days: trainerSplits.fullBody.slice(0, dayCount) };
  if (dayCount === 4) {
    const days = emphasis === "lower" ? [lowerBodyDays[0], upperBodyDays[0], lowerBodyDays[2], upperBodyDays[2]] : emphasis === "upper" ? [upperBodyDays[0], lowerBodyDays[0], upperBodyDays[2], lowerBodyDays[2]] : [...trainerSplits.upperLower, ...trainerSplits.upperLower];
    return { key: "upperLower", days };
  }
  if (dayCount === 5) {
    const extra = emphasis === "lower" ? lowerBodyDays[2] : emphasis === "upper" ? upperBodyDays[2] : { name: "Full body", exercises: ["squat", "pushup", "pulldown", "plank"] };
    return { key: "upperLowerPlus", days: [...trainerSplits.pushPullLegs, extra, emphasis === "lower" ? lowerBodyDays[0] : emphasis === "upper" ? upperBodyDays[0] : extra] };
  }
  const days = [...trainerSplits.pushPullLegs, ...trainerSplits.pushPullLegs];
  if (emphasis === "lower") [days[0], days[3]] = [days[2], days[2]];
  if (emphasis === "upper") [days[2], days[5]] = [days[0], days[0]];
  return { key: "pushPullLegs", days };
}

function buildTrainerPlan(dayCount, goal, emphasis, volume) {
  const variables = getTrainerVariables(goal);
  const split = getTrainerSplit(dayCount, emphasis);
  const daysWithVolume = assignTrainerVolume(split.days.slice(0, dayCount).map((day) => ({
    name: day.name,
    exercises: day.exercises.map((exerciseId) => ({ id: exerciseId, ...variables })),
  })), volume);
  return {
    dayCount,
    goal,
    emphasis,
    volume,
    splitKey: split.key,
    days: daysWithVolume,
  };
}

function saveTrainerPlan(plan) {
  updateActiveProfile({ trainerPlan: JSON.stringify(plan) });
}

function getSavedTrainerPlan() {
  const saved = getActiveProfile()?.trainerPlan || "";
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (error) {
    return null;
  }
}

function renderTrainerPlan(plan) {
  const strings = translations[languageSelect.value] || translations.en;
  const locale = languageSelect.value;
  const splitKey = plan.splitKey === "upperLowerPlus" ? "splitUpperLowerPlus" : plan.splitKey === "pushPullLegs" ? "splitPushPullLegs" : plan.splitKey === "upperLower" ? "splitUpperLower" : "splitFullBody";
  trainerPlanHeading.hidden = false;
  trainerPlanTitle.textContent = strings[splitKey];
  const volumeKey = plan.volume === "moderateHigh" ? "volumeModerateHigh" : plan.volume === "low" ? "volumeLow" : "volumeModerate";
  trainerPlanMeta.textContent = `${plan.dayCount} ${strings.trainingDaysLabel.toLowerCase()} · ${strings[volumeKey]} ${strings.volumeLabel}`;
  trainerDays.innerHTML = "";

  plan.days.forEach((day, dayIndex) => {
    const daySection = document.createElement("section");
    daySection.className = "trainer-day trainer-day-animated";
    daySection.style.setProperty("--trainer-delay", `${dayIndex * 90}ms`);
    const dayTitle = document.createElement("h4");
    dayTitle.textContent = `${strings.dayLabel} ${dayIndex + 1} · ${getTrainerDayName(day.name, strings)}`;
    daySection.append(dayTitle);

    const exerciseList = document.createElement("div");
    exerciseList.className = "exercise-list";
    day.exercises.forEach((exercise, exerciseIndex) => {
      const data = trainerExercises[exercise.id];
      const card = document.createElement("article");
      card.className = "exercise-card exercise-card-animated";
      card.style.setProperty("--trainer-delay", `${dayIndex * 90 + exerciseIndex * 45 + 120}ms`);
      card.innerHTML = `
        <div class="exercise-visual" aria-hidden="true">${data.name[locale].slice(0, 2).toUpperCase()}</div>
        <div class="exercise-main">
          <h5>${data.name[locale]}</h5>
          <p><strong>${strings.formCueLabel}:</strong> ${data.cue[locale]}</p>
          <div class="exercise-variables">
            <label><span>${strings.setsLabel}</span><input type="number" min="1" max="10" value="${exercise.sets}" data-plan-day="${dayIndex}" data-plan-exercise="${exerciseIndex}" data-variable="sets"></label>
            <label><span>${exercise.id === "plank" ? strings.timeLabel : strings.repsLabel}</span><input type="text" value="${exercise.id === "plank" ? "30-45" : exercise.reps}" data-plan-day="${dayIndex}" data-plan-exercise="${exerciseIndex}" data-variable="${exercise.id === "plank" ? "duration" : "reps"}"><small>${exercise.id === "plank" ? strings.secondsLabel : ""}</small></label>
            <label><span>${strings.restLabel}</span><input type="text" value="${formatTrainerRest(exercise.rest)}" data-plan-day="${dayIndex}" data-plan-exercise="${exerciseIndex}" data-variable="rest"></label>
          </div>
        </div>`;
      exerciseList.append(card);
    });
    daySection.append(exerciseList);
    trainerDays.append(daySection);
  });
}

function formatTrainerRest(rest) {
  return typeof rest === "number" ? "2 - 3 min" : rest || "2 - 3 min";
}

function getSuggestedTrainerEmphasis() {
  const bodyStats = getActiveProfile()?.bodyStats;
  if (!bodyStats) return "balanced";
  try {
    return JSON.parse(bodyStats).sex === "female" ? "lower" : "balanced";
  } catch (error) {
    return "balanced";
  }
}

function getTrainerDayName(name, strings) {
  const names = { "Full body": strings.splitFullBody, "Upper body": languageSelect.value === "es" ? "Tren superior" : "Upper body", "Lower body": languageSelect.value === "es" ? "Tren inferior" : "Lower body", Push: languageSelect.value === "es" ? "Empuje" : "Push", Pull: languageSelect.value === "es" ? "Tirón" : "Pull", Legs: languageSelect.value === "es" ? "Piernas" : "Legs" };
  return names[name] || name;
}

function loadTrainerPlan() {
  const plan = getSavedTrainerPlan();
  if (!plan) {
    trainerPlanHeading.hidden = true;
    trainerDays.innerHTML = "";
    trainingEmphasisInput.value = getSuggestedTrainerEmphasis();
    trainingVolumeInput.value = "moderate";
    return;
  }
  trainingDaysInput.value = plan.dayCount;
  trainingGoalInput.value = plan.goal;
  trainingEmphasisInput.value = plan.emphasis || "balanced";
  trainingVolumeInput.value = plan.volume || "moderate";
  renderTrainerPlan(plan);
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

  // Staggered entrance for the freshly shown tab's cards: dashboard
  // summaries and quick links, body stat results/targets, and the weight
  // summary + chart wrap.
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

  // Only persist real widget ids so temporary states never clobber the saved value
  const isValidWidget = [...widgetPanels].some(
    (panel) => panel.dataset.widget === widgetId
  );
  if (isValidWidget) {
    try {
      localStorage.setItem(STORAGE_KEYS.activeWidget, widgetId);
    } catch (error) {
      console.warn("Could not save active widget:", error);
    }
  }

  logUiState(`Widget changed to ${widgetId}`);
}

function loadActiveWidget() {
  let savedWidget = "dashboard";

  try {
    savedWidget = localStorage.getItem(STORAGE_KEYS.activeWidget) || "notes";
  } catch (error) {
    console.warn("Could not read active widget:", error);
  }

  const validIds = [...widgetPanels].map((panel) => panel.dataset.widget);
  if (!validIds.includes(savedWidget)) {
    savedWidget = "notes";
  }

  showWidget(savedWidget);
}

for (const button of navButtons) {
  // Skip buttons that are not widget targets (e.g. the settings gear)
  if (!button.dataset.widget) continue;
  button.addEventListener("click", () => {
    showWidget(button.dataset.widget);
  });
}

for (const link of quickLinks) {
  link.addEventListener("click", () => showWidget(link.dataset.widgetTarget));
}

// --- Notes save / load ---
function showSaveStatus(state) {
  const lang = languageSelect.value;
  const strings = translations[lang] || translations.en;

  saveStatus.classList.remove("is-saving", "is-error");

  if (state === "saving") {
    saveStatus.textContent = strings.saving;
    saveStatus.classList.add("is-saving");
  } else if (state === "error") {
    saveStatus.textContent = strings.saveError;
    saveStatus.classList.add("is-error");
  } else {
    saveStatus.textContent = strings.saved;
  }
}

function getNotes() {
  const savedNotes = loadPreference(STORAGE_KEYS.notesCollection, null);
  if (savedNotes) {
    try {
      const notes = JSON.parse(savedNotes);
      if (Array.isArray(notes)) return notes;
    } catch (error) {
      console.warn("Could not load notes collection:", error);
    }
  }

  const oldNote = loadPreference(STORAGE_KEYS.notes, "");
  if (oldNote) {
    const migratedNote = [{
      id: crypto.randomUUID(),
      title: "",
      content: oldNote,
      updatedAt: new Date().toISOString(),
    }];
    savePreference(STORAGE_KEYS.notesCollection, JSON.stringify(migratedNote));
    return migratedNote;
  }

  return [];
}

function saveNotes(notes) {
  showSaveStatus("saving");

  try {
    localStorage.setItem(STORAGE_KEYS.notesCollection, JSON.stringify(notes));
    showSaveStatus("saved");
  } catch (error) {
    console.error("Save failed:", error);
    showSaveStatus("error");
  }
}

function getActiveNoteId(notes) {
  const savedId = loadPreference(STORAGE_KEYS.activeNote, "");
  return notes.some((note) => note.id === savedId) ? savedId : notes[0]?.id || null;
}

function saveActiveNoteId(noteId) {
  savePreference(STORAGE_KEYS.activeNote, noteId || "");
}

function renderNoteList(notes, activeNoteId) {
  const strings = translations[languageSelect.value] || translations.en;
  noteList.innerHTML = "";

  if (notes.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "note-list-empty";
    emptyItem.textContent = strings.noNotes;
    noteList.append(emptyItem);
    return;
  }

  [...notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).forEach((note) => {
    const item = document.createElement("li");
    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.className = "note-list-item";
    selectButton.classList.toggle("is-active", note.id === activeNoteId);
    selectButton.textContent = note.title.trim() || strings.untitledNote;
    selectButton.addEventListener("click", () => selectNote(note.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "note-delete";
    deleteButton.textContent = "×";
    deleteButton.title = strings.deleteNote;
    deleteButton.setAttribute("aria-label", `${strings.deleteNote}: ${selectButton.textContent}`);
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    item.append(selectButton, deleteButton);
    noteList.append(item);
  });
}

function renderNotes() {
  const notes = getNotes();
  const activeNoteId = getActiveNoteId(notes);
  const activeNote = notes.find((note) => note.id === activeNoteId);

  renderNoteList(notes, activeNoteId);
  noteTitleInput.value = activeNote?.title || "";
  notesInput.value = activeNote?.content || "";
  saveActiveNoteId(activeNoteId);
}

function selectNote(noteId) {
  saveActiveNoteId(noteId);
  renderNotes();
  showSaveStatus("saved");
}

function createNote() {
  const notes = getNotes();
  const newNote = {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    updatedAt: new Date().toISOString(),
  };
  notes.push(newNote);
  saveNotes(notes);
  saveActiveNoteId(newNote.id);
  renderNotes();
  noteTitleInput.focus();
}

function deleteNote(noteId) {
  const currentNotes = getNotes();
  const wasActive = getActiveNoteId(currentNotes) === noteId;
  const notes = currentNotes.filter((note) => note.id !== noteId);
  saveNotes(notes);
  if (wasActive) {
    saveActiveNoteId(notes[0]?.id || "");
  }
  renderNotes();
}

function saveActiveNote() {
  const notes = getNotes();
  const activeNoteId = getActiveNoteId(notes);
  const activeNote = notes.find((note) => note.id === activeNoteId);
  if (!activeNote) {
    const newNote = {
      id: crypto.randomUUID(),
      title: noteTitleInput.value,
      content: notesInput.value,
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    saveNotes(notes);
    saveActiveNoteId(newNote.id);
    renderNotes();
    return;
  }

  activeNote.title = noteTitleInput.value;
  activeNote.content = notesInput.value;
  activeNote.updatedAt = new Date().toISOString();
  saveNotes(notes);
  renderNoteList(notes, activeNoteId);
}

let saveTimer = null;

function scheduleSave() {
  showSaveStatus("saving");

  if (saveTimer) {
    clearTimeout(saveTimer);
  }

  saveTimer = setTimeout(() => {
    saveActiveNote();
  }, 400);
}

languageSelect.addEventListener("change", () => {
  setLanguage(languageSelect.value);
});

// Widget that was visible right before the settings gear was clicked.
// Restored when the settings dialog closes, no matter how it is closed.
let widgetBeforeSettings = null;

settingsOpen.addEventListener("click", () => {
  const activePanel = document.querySelector(".widget-panel.is-active");
  widgetBeforeSettings = activePanel ? activePanel.dataset.widget : null;
  settingsDialog.showModal();
  logUiState("Settings opened");
});

// Single restore point: fires for the X button, clicks outside the dialog,
// and the Escape key alike.
settingsDialog.addEventListener("close", () => {
  let toShow = widgetBeforeSettings;

  if (!toShow) {
    try {
      toShow = localStorage.getItem(STORAGE_KEYS.activeWidget);
    } catch (error) {
      toShow = null;
    }
  }

  const validIds = [...widgetPanels].map((panel) => panel.dataset.widget);
  showWidget(validIds.includes(toShow) ? toShow : "notes");

  widgetBeforeSettings = null;
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

notesInput.addEventListener("input", scheduleSave);
noteTitleInput.addEventListener("input", scheduleSave);
newNoteButton.addEventListener("click", createNote);

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
    if (bodyStatsCalculated && bodyForm.checkValidity()) {
      calculateBodyStats();
    }
  });
}

weightForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!weightForm.reportValidity()) return;

  const entries = getWeightEntries().filter((entry) => entry.date !== measurementDateInput.value || entry.id === editingMeasurementId);
  const editedEntry = editingMeasurementId && entries.find((entry) => entry.id === editingMeasurementId);
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

function getExportData() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: Object.fromEntries(Object.values(STORAGE_KEYS).map((key) => [key, loadPreference(key, "")])) ,
  };
}

function exportData() {
  const file = new Blob([JSON.stringify(getExportData(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pockez-backup-${getTodayDateValue()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported?.data || typeof imported.data !== "object") throw new Error("Invalid backup");
      for (const key of Object.values(STORAGE_KEYS)) {
        if (typeof imported.data[key] === "string") localStorage.setItem(key, imported.data[key]);
      }
      window.location.reload();
    } catch (error) {
      showSaveStatus("error");
      console.warn("Could not import dashboard data:", error);
    }
  });
  reader.readAsText(file);
}

function clearAllData() {
  const strings = translations[languageSelect.value] || translations.en;
  if (!window.confirm(strings.clearDataConfirm)) return;
  for (const key of Object.values(STORAGE_KEYS)) localStorage.removeItem(key);
  window.location.reload();
}

exportDataButton.addEventListener("click", exportData);
importDataButton.addEventListener("click", () => importDataInput.click());
importDataInput.addEventListener("change", () => {
  if (importDataInput.files[0]) importData(importDataInput.files[0]);
  importDataInput.value = "";
});
clearDataButton.addEventListener("click", clearAllData);

trainerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const plan = buildTrainerPlan(Number(trainingDaysInput.value), trainingGoalInput.value, trainingEmphasisInput.value, trainingVolumeInput.value);
  saveTrainerPlan(plan);
  renderTrainerPlan(plan);
});

trainerDays.addEventListener("change", (event) => {
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

function recommendRepsForSets(sets) {
  if (sets <= 1) return "12-15";
  if (sets === 2) return "10-12";
  if (sets === 3) return "8-12";
  return "6-10";
}

function recommendSetsForReps(reps) {
  const firstRep = Number.parseInt(reps, 10);
  if (!Number.isFinite(firstRep)) return 3;
  if (firstRep <= 6) return 4;
  if (firstRep <= 8) return 4;
  if (firstRep <= 12) return 3;
  return 2;
}

goalWeightInput.addEventListener("change", () => {
  saveGoalWeight();
  renderWeightLog();
});

loadLanguage();
loadSettings();
renderProfiles();
renderNotes();
loadBodyStats();
setTodayAsMeasurementDate();
renderWeightLog();
loadTrainerPlan();
renderDashboardSummary();

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
