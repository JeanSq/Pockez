// Muscle-group accent colors for the trainer plan cards (their `muscle`
// field drives both the tile color and the card's accent edge).
export const TRAINER_MUSCLE_COLORS = {
  quads: "var(--accent-blue)",
  hamstrings: "var(--accent-purple)",
  chest: "var(--accent-red)",
  shoulders: "var(--accent-orange)",
  back: "var(--accent-green)",
  biceps: "var(--accent-yellow)",
  triceps: "var(--accent-red)",
  abs: "var(--accent-purple)",
};

export const trainerExercises = {
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

// Body region per muscle group, used to filter which exercises a day
// recommends when adding moves to a custom plan (upper days should never
// suggest squats, Romanian deadlifts, etc., and vice versa).
export const TRAINER_BODY_REGION = {
  quads: "lower",
  hamstrings: "lower",
  chest: "upper",
  shoulders: "upper",
  back: "upper",
  biceps: "upper",
  triceps: "upper",
  abs: "core",
};
