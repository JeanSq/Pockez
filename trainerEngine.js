import { trainerExercises, TRAINER_BODY_REGION } from "./exerciseLibrary.js?v=1";

export function getExerciseBodyRegion(muscle) {
  return TRAINER_BODY_REGION[muscle] || "upper";
}

// Split-day focus: "Upper body" / "Push" / "Pull" are upper days, "Lower
// body" / "Legs" are lower days, and "Full body" spans everything.
export function getDayBodyRegion(dayName) {
  if (dayName === "Full body") return "full";
  if (dayName === "Upper body" || dayName === "Push" || dayName === "Pull") return "upper";
  if (dayName === "Lower body" || dayName === "Legs") return "lower";
  return "full";
}

export function getDayRecommendedExerciseIds(dayName) {
  const region = getDayBodyRegion(dayName);
  return Object.entries(trainerExercises)
    .filter(([, libraryItem]) => {
      const itemRegion = getExerciseBodyRegion(libraryItem.muscle);
      return region === "full" || itemRegion === region || itemRegion === "core";
    })
    .map(([id]) => id);
}

export const trainerSplits = {
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

export function getTrainerVariables(goal) {
  if (goal === "strength") return { sets: 4, reps: "4-6", rest: "2 - 3 min" };
  if (goal === "fitness") return { sets: 3, reps: "10-12", rest: "2 - 3 min" };
  return { sets: 3, reps: "8-12", rest: "2 - 3 min" };
}

export const trainerVolumeRanges = {
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

export function getWeeklySetTarget(muscle, volume) {
  const range = trainerVolumeRanges[muscle]?.[volume] || trainerVolumeRanges.quads.moderate;
  return Math.round((range[0] + range[1]) / 2);
}

export function assignTrainerVolume(days, volume) {
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

export function getTrainerSplit(dayCount, emphasis = "balanced") {
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

export function buildTrainerPlan(dayCount, goal, emphasis, volume) {
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

// --- Custom trainer plans ---
// The split picker maps onto the same day templates as the recommended
// generator, but the user chooses the structure explicitly and is then free
// to add / remove / reorder exercises by hand.
export const trainerCustomSplits = [
  { id: "fullBody2", key: "fullBody", days: 2 },
  { id: "fullBody3", key: "fullBody", days: 3 },
  { id: "upperLower4", key: "upperLower", days: 4 },
  { id: "upperLowerPlus5", key: "upperLowerPlus", days: 5 },
  { id: "pushPullLegs6", key: "pushPullLegs", days: 6 },
];

export function getCustomTrainerSplit(splitId) {
  const match = trainerCustomSplits.find((split) => split.id === splitId) || trainerCustomSplits[1];
  const split = getTrainerSplit(match.days, "balanced");
  return { id: match.id, key: split.key, days: split.days.slice(0, match.days) };
}

export function customSplitIdForPlan(plan) {
  const match = trainerCustomSplits.find(
    (split) => split.key === plan.splitKey && split.days === plan.dayCount
  );
  return match ? match.id : "fullBody3";
}

export function buildCustomTrainerPlan(splitId, goal, volume) {
  const split = getCustomTrainerSplit(splitId);
  const variables = getTrainerVariables(goal);
  const daysWithVolume = assignTrainerVolume(split.days.map((day) => ({
    name: day.name,
    exercises: day.exercises.map((exerciseId) => ({ id: exerciseId, ...variables })),
  })), volume);
  return {
    dayCount: split.days.length,
    goal,
    emphasis: "custom",
    volume,
    splitKey: split.key,
    custom: true,
    days: daysWithVolume,
  };
}

export function addLibraryExercise(plan, dayIndex, exerciseId) {
  const day = plan.days[dayIndex];
  if (!day) return;
  day.exercises.push({ id: exerciseId, ...getTrainerVariables(plan.goal || "muscle") });
}

export function addCustomExercise(plan, dayIndex, name) {
  const day = plan.days[dayIndex];
  if (!day) return;
  day.exercises.push({
    id: `custom-${Date.now()}`,
    custom: true,
    customName: name,
    ...getTrainerVariables(plan.goal || "muscle"),
  });
}

export function recommendRepsForSets(sets) {
  if (sets <= 1) return "12-15";
  if (sets === 2) return "10-12";
  if (sets === 3) return "8-12";
  return "6-10";
}

export function recommendSetsForReps(reps) {
  const firstRep = Number.parseInt(reps, 10);
  if (!Number.isFinite(firstRep)) return 3;
  if (firstRep <= 6) return 4;
  if (firstRep <= 8) return 4;
  if (firstRep <= 12) return 3;
  return 2;
}
