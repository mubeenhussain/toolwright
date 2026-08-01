export type Sex = "male" | "female";
export type UnitSystem = "metric" | "imperial";

export function lbToKg(lb: number) {
  return lb * 0.45359237;
}

export function kgToLb(kg: number) {
  return kg / 0.45359237;
}

export function inToCm(inches: number) {
  return inches * 2.54;
}

export function cmToIn(cm: number) {
  return cm / 2.54;
}

export function ftInToCm(feet: number, inches: number) {
  return inToCm(feet * 12 + inches);
}

export function toKg(weight: number, units: UnitSystem) {
  return units === "metric" ? weight : lbToKg(weight);
}

export function toCm(height: number, units: UnitSystem) {
  return units === "metric" ? height : inToCm(height);
}

export function round(value: number, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export const activityFactors = {
  sedentary: { label: "Sedentary (little or no exercise)", factor: 1.2 },
  light: { label: "Light (1–3 days/week)", factor: 1.375 },
  moderate: { label: "Moderate (3–5 days/week)", factor: 1.55 },
  active: { label: "Active (6–7 days/week)", factor: 1.725 },
  very: { label: "Very active (hard exercise daily)", factor: 1.9 },
} as const;

export type ActivityKey = keyof typeof activityFactors;

export function bmi(weightKg: number, heightCm: number) {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiCategory(value: number) {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal weight";
  if (value < 30) return "Overweight";
  return "Obesity";
}

/** Mifflin–St Jeor */
export function bmrMifflin(weightKg: number, heightCm: number, age: number, sex: Sex) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function tdee(bmr: number, activity: ActivityKey) {
  return bmr * activityFactors[activity].factor;
}

/** US Navy body fat % */
export function navyBodyFat(params: {
  sex: Sex;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
}) {
  const { sex, heightCm, neckCm, waistCm, hipCm = 0 } = params;
  if (sex === "male") {
    return (
      86.01 * Math.log10(waistCm - neckCm) -
      70.041 * Math.log10(heightCm) +
      36.76
    );
  }
  return (
    163.205 * Math.log10(waistCm + hipCm - neckCm) -
    97.684 * Math.log10(heightCm) -
    78.387
  );
}

/** DoD / Army circumference method (approx.) */
export function armyBodyFat(params: {
  sex: Sex;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
}) {
  const heightIn = cmToIn(params.heightCm);
  const neckIn = cmToIn(params.neckCm);
  const waistIn = cmToIn(params.waistCm);
  const hipIn = cmToIn(params.hipCm ?? 0);
  if (params.sex === "male") {
    return (
      86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76
    );
  }
  return (
    163.205 * Math.log10(waistIn + hipIn - neckIn) -
    97.684 * Math.log10(heightIn) -
    78.387
  );
}

/** Devine ideal body weight (kg) */
export function idealWeightDevine(heightCm: number, sex: Sex) {
  const inches = cmToIn(heightCm);
  const over5ft = Math.max(0, inches - 60);
  return sex === "male" ? 50 + 2.3 * over5ft : 45.5 + 2.3 * over5ft;
}

export function healthyWeightRange(heightCm: number) {
  const m = heightCm / 100;
  return { minKg: 18.5 * m * m, maxKg: 24.9 * m * m };
}

/** Boer lean body mass (kg) */
export function leanBodyMassBoer(weightKg: number, heightCm: number, sex: Sex) {
  if (sex === "male") {
    return 0.407 * weightKg + 0.267 * heightCm - 19.2;
  }
  return 0.252 * weightKg + 0.473 * heightCm - 48.3;
}

export function leanFromBodyFat(weightKg: number, bodyFatPct: number) {
  return weightKg * (1 - bodyFatPct / 100);
}

/** Epley 1RM */
export function oneRepMaxEpley(weight: number, reps: number) {
  if (reps <= 1) return weight;
  return weight * (1 + reps / 30);
}

export function maxHeartRate(age: number) {
  return 220 - age;
}

/** Karvonen target HR zone */
export function targetHeartRate(
  age: number,
  restingHr: number,
  lowPct: number,
  highPct: number,
) {
  const max = maxHeartRate(age);
  const reserve = max - restingHr;
  return {
    max,
    low: restingHr + reserve * lowPct,
    high: restingHr + reserve * highPct,
  };
}

export function paceFromTimeDistance(seconds: number, distanceKm: number) {
  const paceSec = seconds / distanceKm;
  const speedKmh = distanceKm / (seconds / 3600);
  return { paceSecPerKm: paceSec, speedKmh };
}

export function formatPace(secondsPerUnit: number) {
  const m = Math.floor(secondsPerUnit / 60);
  const s = Math.round(secondsPerUnit % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Rough MET calories: MET * kg * hours */
export function caloriesBurned(met: number, weightKg: number, minutes: number) {
  return met * weightKg * (minutes / 60);
}

export const commonMets: { label: string; met: number }[] = [
  { label: "Walking (3 mph)", met: 3.5 },
  { label: "Jogging", met: 7 },
  { label: "Running (6 mph)", met: 9.8 },
  { label: "Cycling (moderate)", met: 7.5 },
  { label: "Swimming", met: 8 },
  { label: "Weight lifting", met: 5 },
  { label: "Yoga", met: 3 },
  { label: "HIIT", met: 10 },
];

export function macrosFromCalories(
  calories: number,
  proteinPct: number,
  carbPct: number,
  fatPct: number,
) {
  return {
    proteinG: (calories * (proteinPct / 100)) / 4,
    carbG: (calories * (carbPct / 100)) / 4,
    fatG: (calories * (fatPct / 100)) / 9,
  };
}

export function proteinByWeight(weightKg: number, gramsPerKg: number) {
  return weightKg * gramsPerKg;
}

/** Mosteller BSA (m²) */
export function bodySurfaceArea(weightKg: number, heightCm: number) {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

/** CKD-EPI 2021 creatinine GFR approximation (non-race) */
export function gfrCkdEpi(creatinineMgDl: number, age: number, sex: Sex) {
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const sexFactor = sex === "female" ? 1.012 : 1;
  const crK = creatinineMgDl / kappa;
  const min = Math.min(crK, 1);
  const max = Math.max(crK, 1);
  return 142 * min ** alpha * max ** -1.2 * 0.9938 ** age * sexFactor;
}

/**
 * Widmark BAC estimate (g/100ml ≈ %).
 * alcoholGrams / (bodyWeightKg * r) - (0.015 * hours)
 */
export function bacWidmark(params: {
  alcoholGrams: number;
  weightKg: number;
  sex: Sex;
  hours: number;
}) {
  const r = params.sex === "male" ? 0.68 : 0.55;
  const raw = params.alcoholGrams / (params.weightKg * r) - 0.015 * params.hours;
  return Math.max(0, raw);
}

export function standardDrinkGrams(drinks: number, gramsPerDrink = 14) {
  return drinks * gramsPerDrink;
}

/** Naegele: LMP + 280 days */
export function dueDateFromLmp(lmp: Date) {
  const due = new Date(lmp);
  due.setDate(due.getDate() + 280);
  return due;
}

export function pregnancyFromLmp(lmp: Date, today = new Date()) {
  const ms = today.getTime() - lmp.getTime();
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const weeks = Math.floor(days / 7);
  const remDays = days % 7;
  const due = dueDateFromLmp(lmp);
  return { days, weeks, remDays, due, trimester: weeks < 13 ? 1 : weeks < 27 ? 2 : 3 };
}

export function ovulationFromCycle(lmp: Date, cycleLength: number) {
  const ovulation = new Date(lmp);
  ovulation.setDate(ovulation.getDate() + (cycleLength - 14));
  const fertileStart = new Date(ovulation);
  fertileStart.setDate(fertileStart.getDate() - 5);
  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(fertileEnd.getDate() + 1);
  const nextPeriod = new Date(lmp);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
  return { ovulation, fertileStart, fertileEnd, nextPeriod };
}

export function conceptionFromDueDate(due: Date) {
  const conception = new Date(due);
  conception.setDate(conception.getDate() - 266);
  return conception;
}

/** IOM pregnancy weight gain ranges (kg) by pre-pregnancy BMI category */
export function pregnancyWeightGainRange(preBmi: number) {
  if (preBmi < 18.5) return { min: 12.5, max: 18, label: "Underweight" };
  if (preBmi < 25) return { min: 11.5, max: 16, label: "Normal weight" };
  if (preBmi < 30) return { min: 7, max: 11.5, label: "Overweight" };
  return { min: 5, max: 9, label: "Obesity" };
}

export function bodyTypeFromRatios(wristCm: number, heightCm: number, sex: Sex) {
  const r = heightCm / wristCm;
  if (sex === "male") {
    if (r > 10.4) return "Ectomorph";
    if (r < 9.6) return "Endomorph";
    return "Mesomorph";
  }
  if (r > 11) return "Ectomorph";
  if (r < 10.1) return "Endomorph";
  return "Mesomorph";
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toInputDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseInputDate(value: string) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
