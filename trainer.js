import { translations } from "./i18n.js?v=21";
import { getActiveProfile, updateActiveProfile } from "./profiles.js?v=1";
import { customSplitIdForPlan, getDayRecommendedExerciseIds } from "./trainerEngine.js?v=1";
import { trainerExercises, TRAINER_MUSCLE_COLORS } from "./exerciseLibrary.js?v=1";
import { state } from "./state.js?v=1";
import {
  languageSelect,
  trainerCustomSection,
  trainerCustomSplitInput,
  trainerDays,
  trainerModeInputs,
  trainerPlanHeading,
  trainerPlanMeta,
  trainerPlanTitle,
  trainerRecommendedSection,
  trainingDaysInput,
  trainingEmphasisInput,
  trainingGoalInput,
  trainingVolumeInput,
} from "./elements.js?v=1";

function getTrainerPlanStore() {
  const saved = getActiveProfile()?.trainerPlan || "";
  if (!saved) return null;
  try {
    const parsed = JSON.parse(saved);
    if (parsed && Array.isArray(parsed.days) && !parsed.activeMode) {
      return { activeMode: "recommended", recommended: parsed, custom: null };
    }
    return parsed && parsed.activeMode ? parsed : null;
  } catch (error) {
    return null;
  }
}

function saveTrainerPlanStore(store) {
  updateActiveProfile({ trainerPlan: JSON.stringify(store) });
}

function saveTrainerPlan(plan) {
  const store = getTrainerPlanStore() || { activeMode: "recommended", recommended: null, custom: null };
  store[store.activeMode] = plan;
  saveTrainerPlanStore(store);
}

function renderTrainerPlan(plan) {
  const strings = translations[languageSelect.value] || translations.en;
  const locale = languageSelect.value;
  const isCustomMode = plan.custom === true;
  const splitKey = plan.splitKey === "upperLowerPlus" ? "splitUpperLowerPlus" : plan.splitKey === "pushPullLegs" ? "splitPushPullLegs" : plan.splitKey === "upperLower" ? "splitUpperLower" : "splitFullBody";
  trainerPlanHeading.hidden = false;
  trainerPlanHeading.querySelector(".dashboard-eyebrow").textContent = isCustomMode ? strings.yourCustomPlan : strings.yourPlan;
  trainerPlanTitle.textContent = strings[splitKey];
  const volumeKey = plan.volume === "moderateHigh" ? "volumeModerateHigh" : plan.volume === "low" ? "volumeLow" : "volumeModerate";
  trainerPlanMeta.textContent = `${plan.dayCount} ${strings.trainingDaysLabel.toLowerCase()} · ${strings[volumeKey]} ${strings.volumeLabel}`;
  trainerDays.innerHTML = "";
  const openIndices = state.trainerOpenDays === null ? new Set([0]) : new Set(state.trainerOpenDays);

  plan.days.forEach((day, dayIndex) => {
    const daySection = document.createElement("section");
    daySection.className = "trainer-day trainer-day-animated";
    daySection.style.setProperty("--trainer-delay", `${dayIndex * 90}ms`);

    const dayChipColors = ["var(--accent-red)", "var(--accent-blue)", "var(--accent-yellow)", "var(--accent-purple)", "var(--accent-green)", "var(--accent-orange)"];
    const isOpen = openIndices.has(dayIndex);
    const dayHeader = document.createElement("button");
    dayHeader.type = "button";
    dayHeader.className = "trainer-day-header";
    dayHeader.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) dayHeader.classList.add("is-open");
    const daySr = document.createElement("span");
    daySr.className = "sr-only";
    daySr.textContent = `${strings.dayLabel} ${dayIndex + 1}`;
    const dayChip = document.createElement("span");
    dayChip.className = "trainer-day-chip";
    dayChip.setAttribute("aria-hidden", "true");
    dayChip.style.background = dayChipColors[dayIndex % dayChipColors.length];
    dayChip.textContent = String(dayIndex + 1);
    const dayTitle = document.createElement("h4");
    dayTitle.textContent = getTrainerDayName(day.name, strings);
    const dayCount = document.createElement("span");
    dayCount.className = "trainer-day-count";
    dayCount.setAttribute("aria-hidden", "true");
    dayCount.textContent = String(day.exercises.length);
    const dayArrow = document.createElement("span");
    dayArrow.className = "trainer-day-arrow";
    dayArrow.setAttribute("aria-hidden", "true");
    dayArrow.textContent = "+";
    dayHeader.append(daySr, dayChip, dayTitle, dayCount, dayArrow);

    const exerciseList = document.createElement("div");
    exerciseList.className = "exercise-list";
    if (!isOpen) exerciseList.hidden = true;
    day.exercises.forEach((exercise, exerciseIndex) => {
      const libraryEntry = trainerExercises[exercise.id];
      const card = document.createElement("article");
      card.className = "exercise-card exercise-card-animated";
      card.style.setProperty("--trainer-delay", `${dayIndex * 90 + exerciseIndex * 45 + 120}ms`);
      card.style.borderLeftColor = muscleColor;
      card.innerHTML = `
        <div class="exercise-main">
          <div class="exercise-name-row"></div>
          <div class="exercise-variables">
            <label><span>${strings.setsLabel}</span><input type="number" min="1" max="10" value="${exercise.sets}" data-plan-day="${dayIndex}" data-plan-exercise="${exerciseIndex}" data-variable="sets"></label>
            <label><span>${isTimed ? strings.timeLabel : strings.repsLabel}</span><input type="text" value="${isTimed ? "30-45" : (exercise.reps || "8-12")}" data-plan-day="${dayIndex}" data-plan-exercise="${exerciseIndex}" data-variable="${isTimed ? "duration" : "reps"}"><small>${isTimed ? strings.secondsLabel : ""}</small></label>
            <label><span>${strings.restLabel}</span><input type="text" value="${formatTrainerRest(exercise.rest)}" data-plan-day="${dayIndex}" data-plan-exercise="${exerciseIndex}" data-variable="rest"></label>
          </div>
        </div>`;

      const nameRow = card.querySelector(".exercise-name-row");
      const nameTitle = document.createElement("h5");
      nameTitle.textContent = name;
      nameRow.append(nameTitle);

      if (isCustomMode) {
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "exercise-remove";
        removeButton.dataset.removeDay = String(dayIndex);
        removeButton.dataset.removeExercise = String(exerciseIndex);
        removeButton.setAttribute("aria-label", `${strings.removeExercise}: ${name}`);
        removeButton.textContent = "×";
        nameRow.append(removeButton);
      }

      const cueToggle = document.createElement("button");
      cueToggle.type = "button";
      cueToggle.className = "exercise-cue-toggle";
      cueToggle.setAttribute("aria-expanded", "false");
      cueToggle.textContent = strings.formCueLabel;
      const cueText = document.createElement("p");
      cueText.className = "exercise-cue";
      cueText.hidden = true;
      cueText.textContent = cueValue;
      cueToggle.addEventListener("click", () => {
        const open = cueText.hidden;
        cueText.hidden = !open;
        cueToggle.setAttribute("aria-expanded", String(open));
        cueToggle.classList.toggle("is-open", open);
      });
    if (isCustomMode) {
      const exerciseAddRow = document.createElement("div");
      exerciseAddRow.className = "exercise-add";
      const libraryOptions = getDayRecommendedExerciseIds(day.name)
        .map((id) => `<option value="${id}">${trainerExercises[id].name[locale]}</option>`)
        .join("");
      exerciseAddRow.innerHTML = `
        <select class="exercise-add-select" data-add-day="${dayIndex}" aria-label="${strings.addExercise}">
          <option value="">${strings.addExercise}…</option>
          ${libraryOptions}
          <option value="__custom__">${strings.customExerciseOption}…</option>
        </select>
        <input type="text" class="exercise-add-name" data-add-day="${dayIndex}" placeholder="${strings.customExercisePlaceholder}" hidden />
        <button type="button" class="exercise-add-submit" data-add-day="${dayIndex}" hidden>${strings.addExercise}</button>
      `;
      exerciseList.append(exerciseAddRow);
    }

    dayHeader.addEventListener("click", () => {
      const open = exerciseList.hidden;
      exerciseList.hidden = !open;
      dayHeader.setAttribute("aria-expanded", String(open));
      dayHeader.classList.toggle("is-open", open);
      if (open) {
        openIndices.add(dayIndex);
      } else {
        openIndices.delete(dayIndex);
      }
      state.trainerOpenDays = Array.from(openIndices);
    });

    daySection.append(dayHeader, exerciseList);
    trainerDays.append(daySection);
  });
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

function setTrainerModeRadio(mode) {
  trainerModeInputs.forEach((radio) => {
    radio.checked = radio.value === mode;
  });
}

function migrateLegacyTrainerPlan(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.days) && !parsed.activeMode) {
      updateActiveProfile({
        trainerPlan: JSON.stringify({ activeMode: "recommended", recommended: parsed, custom: null }),
      });
    }
  } catch (error) {
    // stored value is not something we can migrate - leave it alone
  }
}

function updateTrainerSections(mode) {
  trainerRecommendedSection.hidden = mode !== "recommended";
  trainerCustomSection.hidden = mode !== "custom";
  const plan = getSavedTrainerPlan();
  if (plan) {
    renderTrainerPlan(plan);
  } else {
    trainerPlanHeading.hidden = true;
    trainerDays.innerHTML = "";
  }
}

function loadTrainerPlan() {
  const raw = getActiveProfile()?.trainerPlan || "";
  if (raw) migrateLegacyTrainerPlan(raw);
  const store = getTrainerPlanStore();
  const mode = store?.activeMode || "recommended";
  const plan = store ? store[mode] : null;

  setTrainerModeRadio(mode);
  trainerRecommendedSection.hidden = mode !== "recommended";
  trainerCustomSection.hidden = mode !== "custom";

  const recommendedPlan = store?.recommended || null;
  if (recommendedPlan) {
    trainingDaysInput.value = recommendedPlan.dayCount;
    trainingGoalInput.value = recommendedPlan.goal;
    trainingEmphasisInput.value = recommendedPlan.emphasis || "balanced";
    trainingVolumeInput.value = recommendedPlan.volume || "moderate";
  }
  if (store?.custom) {
    trainerCustomSplitInput.value = customSplitIdForPlan(store.custom);
  }

  if (plan) {
    renderTrainerPlan(plan);
  } else {
    trainerPlanHeading.hidden = true;
    trainerDays.innerHTML = "";
    if (!recommendedPlan) {
      trainingEmphasisInput.value = getSuggestedTrainerEmphasis();
      trainingVolumeInput.value = "moderate";
    }
  }
}

export {
  formatTrainerRest,
  getSavedTrainerPlan,
  getSuggestedTrainerEmphasis,
  getTrainerDayName,
  getTrainerPlanStore,
  loadTrainerPlan,
  migrateLegacyTrainerPlan,
  renderTrainerPlan,
  saveTrainerPlan,
  saveTrainerPlanStore,
  setTrainerModeRadio,
  updateTrainerSections,
};

}

      nameTitle.after(cueToggle, cueText);

      exerciseList.append(card);
    });

      const customExercise = !libraryEntry;
      const name = customExercise ? (exercise.customName || exercise.id) : libraryEntry.name[locale];
      const muscle = customExercise ? null : libraryEntry.muscle;
      const muscleColor = muscle ? (TRAINER_MUSCLE_COLORS[muscle] || "var(--accent-blue)") : "var(--accent-purple)";
      const cueValue = customExercise ? (exercise.customCue || strings.customCue) : libraryEntry.cue[locale];
      const isTimed = !customExercise && exercise.id === "plank";

function getSavedTrainerPlan() {
  const store = getTrainerPlanStore();
  return store ? store[store.activeMode] : null;
}
