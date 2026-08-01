"use client";

import { useState, type FormEvent } from "react";
import {
  activityFactors,
  armyBodyFat,
  bmi,
  bmiCategory,
  bmrMifflin,
  caloriesBurned,
  commonMets,
  formatPace,
  healthyWeightRange,
  idealWeightDevine,
  kgToLb,
  leanBodyMassBoer,
  leanFromBodyFat,
  navyBodyFat,
  oneRepMaxEpley,
  paceFromTimeDistance,
  round,
  targetHeartRate,
  tdee,
  toCm,
  toKg,
  type ActivityKey,
  type Sex,
  type UnitSystem,
} from "@/lib/health/formulas";
import {
  CalcShell,
  Disclaimer,
  EmptyResult,
  MetricGrid,
  NumberField,
  ResultTitle,
  SelectField,
  SexToggle,
  SubmitRow,
  UnitToggle,
} from "@/components/tools/health/ui";

function parseNum(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function BmiCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [weight, setWeight] = useState("154");
  const [height, setHeight] = useState("67");
  const [out, setOut] = useState<{ value: number; category: string } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    const h = parseNum(height);
    if (w == null || h == null || w <= 0 || h <= 0) return;
    const value = bmi(toKg(w, units), toCm(h, units));
    setOut({ value, category: bmiCategory(value) });
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <NumberField
            label="Weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="BMI"
              value={round(out.value, 1).toString()}
              hint={out.category}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Enter height and weight to calculate body mass index." />
        )
      }
    />
  );
}

export function BmrCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("154");
  const [height, setHeight] = useState("67");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(age);
    const w = parseNum(weight);
    const h = parseNum(height);
    if (a == null || w == null || h == null) return;
    setOut(bmrMifflin(toKg(w, units), toCm(h, units), a, sex));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SexToggle value={sex} onChange={setSex} />
          <NumberField label="Age" value={age} onChange={setAge} suffix="years" />
          <NumberField
            label="Weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="BMR (Mifflin–St Jeor)"
              value={`${Math.round(out).toLocaleString()} kcal/day`}
              hint="Calories burned at complete rest"
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate basal metabolic rate from age, sex, height, and weight." />
        )
      }
    />
  );
}

export function TdeeCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("154");
  const [height, setHeight] = useState("67");
  const [activity, setActivity] = useState<ActivityKey>("moderate");
  const [out, setOut] = useState<{ bmr: number; tdee: number } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(age);
    const w = parseNum(weight);
    const h = parseNum(height);
    if (a == null || w == null || h == null) return;
    const bmr = bmrMifflin(toKg(w, units), toCm(h, units), a, sex);
    setOut({ bmr, tdee: tdee(bmr, activity) });
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SexToggle value={sex} onChange={setSex} />
          <NumberField label="Age" value={age} onChange={setAge} suffix="years" />
          <NumberField
            label="Weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <SelectField
            label="Activity"
            value={activity}
            onChange={(v) => setActivity(v as ActivityKey)}
            options={Object.entries(activityFactors).map(([value, meta]) => ({
              value,
              label: meta.label,
            }))}
          />
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="TDEE"
              value={`${Math.round(out.tdee).toLocaleString()} kcal/day`}
            />
            <MetricGrid
              items={[
                { label: "BMR", value: `${Math.round(out.bmr)} kcal` },
                {
                  label: "Maintain",
                  value: `${Math.round(out.tdee)} kcal`,
                },
                {
                  label: "Mild cut",
                  value: `${Math.round(out.tdee - 300)} kcal`,
                },
                {
                  label: "Mild bulk",
                  value: `${Math.round(out.tdee + 250)} kcal`,
                },
              ]}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Total daily energy expenditure from BMR and activity level." />
        )
      }
    />
  );
}

export function CalorieCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("154");
  const [height, setHeight] = useState("67");
  const [activity, setActivity] = useState<ActivityKey>("moderate");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("lose");
  const [out, setOut] = useState<{ tdee: number; target: number } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(age);
    const w = parseNum(weight);
    const h = parseNum(height);
    if (a == null || w == null || h == null) return;
    const maintenance = tdee(bmrMifflin(toKg(w, units), toCm(h, units), a, sex), activity);
    const target =
      goal === "lose" ? maintenance - 500 : goal === "gain" ? maintenance + 300 : maintenance;
    setOut({ tdee: maintenance, target });
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SexToggle value={sex} onChange={setSex} />
          <NumberField label="Age" value={age} onChange={setAge} suffix="years" />
          <NumberField
            label="Weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <SelectField
            label="Activity"
            value={activity}
            onChange={(v) => setActivity(v as ActivityKey)}
            options={Object.entries(activityFactors).map(([value, meta]) => ({
              value,
              label: meta.label,
            }))}
          />
          <SelectField
            label="Goal"
            value={goal}
            onChange={(v) => setGoal(v as typeof goal)}
            options={[
              { value: "lose", label: "Lose weight (~0.5 kg/week)" },
              { value: "maintain", label: "Maintain weight" },
              { value: "gain", label: "Gain weight" },
            ]}
          />
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Daily calories"
              value={`${Math.round(out.target).toLocaleString()} kcal`}
            />
            <MetricGrid
              items={[
                { label: "Maintenance", value: `${Math.round(out.tdee)} kcal` },
                { label: "Target", value: `${Math.round(out.target)} kcal` },
              ]}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Daily calorie target for lose, maintain, or gain goals." />
        )
      }
    />
  );
}

export function BodyFatCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState("67");
  const [neck, setNeck] = useState("15");
  const [waist, setWaist] = useState("34");
  const [hip, setHip] = useState("38");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const h = parseNum(height);
    const n = parseNum(neck);
    const w = parseNum(waist);
    const hp = parseNum(hip);
    if (h == null || n == null || w == null) return;
    const value = navyBodyFat({
      sex,
      heightCm: toCm(h, units),
      neckCm: toCm(n, units),
      waistCm: toCm(w, units),
      hipCm: hp != null ? toCm(hp, units) : undefined,
    });
    if (Number.isFinite(value)) setOut(value);
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SexToggle value={sex} onChange={setSex} />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <NumberField
            label="Neck"
            value={neck}
            onChange={setNeck}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <NumberField
            label="Waist"
            value={waist}
            onChange={setWaist}
            suffix={units === "metric" ? "cm" : "in"}
          />
          {sex === "female" ? (
            <NumberField
              label="Hip"
              value={hip}
              onChange={setHip}
              suffix={units === "metric" ? "cm" : "in"}
            />
          ) : null}
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Body fat (US Navy)"
              value={`${round(out, 1)}%`}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate body fat % with the US Navy circumference method." />
        )
      }
    />
  );
}

export function ArmyBodyFatCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState("70");
  const [neck, setNeck] = useState("15");
  const [waist, setWaist] = useState("34");
  const [hip, setHip] = useState("38");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const h = parseNum(height);
    const n = parseNum(neck);
    const w = parseNum(waist);
    const hp = parseNum(hip);
    if (h == null || n == null || w == null) return;
    const value = armyBodyFat({
      sex,
      heightCm: toCm(h, units),
      neckCm: toCm(n, units),
      waistCm: toCm(w, units),
      hipCm: hp != null ? toCm(hp, units) : undefined,
    });
    if (Number.isFinite(value)) setOut(value);
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SexToggle value={sex} onChange={setSex} />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <NumberField
            label="Neck"
            value={neck}
            onChange={setNeck}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <NumberField
            label="Waist"
            value={waist}
            onChange={setWaist}
            suffix={units === "metric" ? "cm" : "in"}
          />
          {sex === "female" ? (
            <NumberField
              label="Hip"
              value={hip}
              onChange={setHip}
              suffix={units === "metric" ? "cm" : "in"}
            />
          ) : null}
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Army body fat" value={`${round(out, 1)}%`} />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="DoD / Army circumference body-fat estimate." />
        )
      }
    />
  );
}

export function IdealWeightCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState("67");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const h = parseNum(height);
    if (h == null) return;
    setOut(idealWeightDevine(toCm(h, units), sex));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SexToggle value={sex} onChange={setSex} />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Ideal weight (Devine)"
              value={
                units === "metric"
                  ? `${round(out, 1)} kg`
                  : `${round(kgToLb(out), 1)} lb`
              }
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Devine formula ideal body weight from height and sex." />
        )
      }
    />
  );
}

export function HealthyWeightCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [height, setHeight] = useState("67");
  const [out, setOut] = useState<{ minKg: number; maxKg: number } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const h = parseNum(height);
    if (h == null) return;
    setOut(healthyWeightRange(toCm(h, units)));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <NumberField
            label="Height"
            value={height}
            onChange={setHeight}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Healthy BMI weight range"
              value={
                units === "metric"
                  ? `${round(out.minKg, 1)}–${round(out.maxKg, 1)} kg`
                  : `${round(kgToLb(out.minKg), 1)}–${round(kgToLb(out.maxKg), 1)} lb`
              }
              hint="Based on BMI 18.5–24.9"
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Healthy weight range for your height using BMI guidelines." />
        )
      }
    />
  );
}

export function LeanBodyMassCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [mode, setMode] = useState<"boer" | "fat">("boer");
  const [weight, setWeight] = useState("154");
  const [height, setHeight] = useState("67");
  const [fat, setFat] = useState("20");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    if (w == null) return;
    const kg = toKg(w, units);
    if (mode === "boer") {
      const h = parseNum(height);
      if (h == null) return;
      setOut(leanBodyMassBoer(kg, toCm(h, units), sex));
    } else {
      const f = parseNum(fat);
      if (f == null) return;
      setOut(leanFromBodyFat(kg, f));
    }
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SelectField
            label="Method"
            value={mode}
            onChange={(v) => setMode(v as typeof mode)}
            options={[
              { value: "boer", label: "Boer formula" },
              { value: "fat", label: "From body fat %" },
            ]}
          />
          {mode === "boer" ? <SexToggle value={sex} onChange={setSex} /> : null}
          <NumberField
            label="Weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          {mode === "boer" ? (
            <NumberField
              label="Height"
              value={height}
              onChange={setHeight}
              suffix={units === "metric" ? "cm" : "in"}
            />
          ) : (
            <NumberField label="Body fat" value={fat} onChange={setFat} suffix="%" />
          )}
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Lean body mass"
              value={
                units === "metric"
                  ? `${round(out, 1)} kg`
                  : `${round(kgToLb(out), 1)} lb`
              }
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate lean body mass with Boer or body-fat %." />
        )
      }
    />
  );
}

export function PaceCalculatorTool() {
  const [distance, setDistance] = useState("5");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");
  const [out, setOut] = useState<{
    pace: string;
    speed: number;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const d = parseNum(distance);
    const h = parseNum(hours) ?? 0;
    const m = parseNum(minutes) ?? 0;
    const s = parseNum(seconds) ?? 0;
    if (d == null || d <= 0) return;
    const total = h * 3600 + m * 60 + s;
    if (total <= 0) return;
    const { paceSecPerKm, speedKmh } = paceFromTimeDistance(total, d);
    setOut({ pace: formatPace(paceSecPerKm), speed: speedKmh });
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <NumberField
            label="Distance"
            value={distance}
            onChange={setDistance}
            suffix="km"
          />
          <div className="grid grid-cols-3 gap-2">
            <NumberField label="Hours" value={hours} onChange={setHours} />
            <NumberField label="Min" value={minutes} onChange={setMinutes} />
            <NumberField label="Sec" value={seconds} onChange={setSeconds} />
          </div>
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Pace" value={`${out.pace} /km`} />
            <MetricGrid
              items={[
                { label: "Speed", value: `${round(out.speed, 2)} km/h` },
                {
                  label: "mi/h",
                  value: `${round(out.speed * 0.621371, 2)} mph`,
                },
              ]}
            />
          </div>
        ) : (
          <EmptyResult text="Convert race distance and finish time into pace and speed." />
        )
      }
    />
  );
}

export function CaloriesBurnedCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [weight, setWeight] = useState("154");
  const [minutes, setMinutes] = useState("30");
  const [met, setMet] = useState(String(commonMets[1].met));
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    const m = parseNum(minutes);
    const metVal = parseNum(met);
    if (w == null || m == null || metVal == null) return;
    setOut(caloriesBurned(metVal, toKg(w, units), m));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <NumberField
            label="Weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          <NumberField
            label="Duration"
            value={minutes}
            onChange={setMinutes}
            suffix="min"
          />
          <SelectField
            label="Activity"
            value={met}
            onChange={setMet}
            options={commonMets.map((item) => ({
              value: String(item.met),
              label: `${item.label} (MET ${item.met})`,
            }))}
          />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Calories burned"
              value={`${Math.round(out).toLocaleString()} kcal`}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate calories burned from MET value, weight, and time." />
        )
      }
    />
  );
}

export function OneRepMaxCalculatorTool() {
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("5");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    const r = parseNum(reps);
    if (w == null || r == null || r < 1) return;
    setOut(oneRepMaxEpley(w, r));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <NumberField label="Weight lifted" value={weight} onChange={setWeight} />
          <NumberField label="Reps" value={reps} onChange={setReps} min={1} max={12} />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Estimated 1RM (Epley)"
              value={round(out, 1).toString()}
            />
            <MetricGrid
              items={[
                { label: "95%", value: round(out * 0.95, 1).toString() },
                { label: "85%", value: round(out * 0.85, 1).toString() },
                { label: "75%", value: round(out * 0.75, 1).toString() },
                { label: "65%", value: round(out * 0.65, 1).toString() },
              ]}
            />
          </div>
        ) : (
          <EmptyResult text="Estimate one-rep max from a submaximal set (Epley)." />
        )
      }
    />
  );
}

export function TargetHeartRateCalculatorTool() {
  const [age, setAge] = useState("30");
  const [resting, setResting] = useState("60");
  const [out, setOut] = useState<{
    max: number;
    low: number;
    high: number;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(age);
    const r = parseNum(resting);
    if (a == null || r == null) return;
    const zone = targetHeartRate(a, r, 0.5, 0.85);
    setOut({
      max: zone.max,
      low: zone.low,
      high: zone.high,
    });
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <NumberField label="Age" value={age} onChange={setAge} suffix="years" />
          <NumberField
            label="Resting heart rate"
            value={resting}
            onChange={setResting}
            suffix="bpm"
          />
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Training zone (50–85%)"
              value={`${Math.round(out.low)}–${Math.round(out.high)} bpm`}
            />
            <MetricGrid
              items={[
                { label: "Max HR", value: `${Math.round(out.max)} bpm` },
                { label: "Zone low", value: `${Math.round(out.low)} bpm` },
                { label: "Zone high", value: `${Math.round(out.high)} bpm` },
              ]}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Karvonen target heart-rate zone from age and resting HR." />
        )
      }
    />
  );
}
