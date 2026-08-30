import { STORAGE_KEYS, loadPreference } from "./storage.js?v=14";
import { trainerExercises } from "./exerciseLibrary.js?v=1";

export function getWorkouts() {
  const saved = loadPreference(STORAGE_KEYS.workouts, null);
  if (saved) {
    try {
      const workouts = JSON.parse(saved);
      if (Array.isArray(workouts)) return workouts;
    } catch (error) {
      console.warn("Could not load workouts:", error);
    }
  }
  return [];
}

export const EXERCISE_LIBRARY = Object.entries(trainerExercises).map(([key, def]) => ({
  id: key,
  name: def.en,
  muscle: def.muscle,
}));

export function computeWorkoutTonnage(exercises) {
  let totalKg = 0;
  let totalReps = 0;
  for (const exercise of exercises) {
    for (const set of exercise.sets) {
      const reps = Number(set.reps) || 0;
      const kgs = Number(set.kgs) || 0;
      totalKg += reps * kgs;
      totalReps += reps;
    }
  }
  return { totalKg, totalReps };
}

export function getAllTimePRs() {
  const workouts = getWorkouts();
  const prs = {};
  for (const workout of workouts) {
    for (const exercise of workout.exercises) {
      const maxKg = Math.max(
        0,
        ...exercise.sets.map((s) => Number(s.kgs) || 0)
      );
      const existing = prs[exercise.name];
      if (!existing || maxKg > existing.kg) {
        prs[exercise.name] = { kg: maxKg, date: workout.date };
      }
    }
  }
  return prs;
}

export function getExercisePR(name, currentSets) {
  const prs = getAllTimePRs();
  const saved = prs[name];
  if (!saved) return null;
  const currentMax = Math.max(0, ...currentSets.map((s) => Number(s.kgs) || 0));
  if (currentMax > saved.kg) {
    return { kg: currentMax, isNew: true };
  }
  return { kg: saved.kg, isNew: false, date: saved.date };
}

export const CELEBRATION_TIERS = [
  { max: 500, key: "celebrationWashingMachine" },
  { max: 1000, key: "celebrationPanda" },
  { max: 2000, key: "celebrationGrandPiano" },
  { max: 6000, key: "celebrationElephant" },
  { max: 15000, key: "celebrationBlueWhale" },
  { max: Infinity, key: "celebrationTyrannosaurus" },
];

export function getCelebration(totalKg) {
  for (const tier of CELEBRATION_TIERS) {
    if (totalKg <= tier.max) return tier.key;
  }
  return CELEBRATION_TIERS[CELEBRATION_TIERS.length - 1].key;
}
