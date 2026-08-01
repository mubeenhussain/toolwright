"use client";

import { useState, type FormEvent } from "react";
import {
  bacWidmark,
  bodySurfaceArea,
  bodyTypeFromRatios,
  gfrCkdEpi,
  macrosFromCalories,
  proteinByWeight,
  round,
  standardDrinkGrams,
  toCm,
  toKg,
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

export function MacroCalculatorTool() {
  const [calories, setCalories] = useState("2200");
  const [protein, setProtein] = useState("30");
  const [carb, setCarb] = useState("40");
  const [fat, setFat] = useState("30");
  const [out, setOut] = useState<{
    proteinG: number;
    carbG: number;
    fatG: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cal = parseNum(calories);
    const p = parseNum(protein);
    const c = parseNum(carb);
    const f = parseNum(fat);
    if (cal == null || p == null || c == null || f == null) return;
    if (Math.round(p + c + f) !== 100) {
      setError("Protein + carbs + fat must equal 100%.");
      setOut(null);
      return;
    }
    setError(null);
    setOut(macrosFromCalories(cal, p, c, f));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <NumberField
            label="Daily calories"
            value={calories}
            onChange={setCalories}
            suffix="kcal"
          />
          <NumberField label="Protein %" value={protein} onChange={setProtein} />
          <NumberField label="Carbs %" value={carb} onChange={setCarb} />
          <NumberField label="Fat %" value={fat} onChange={setFat} />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Daily macros" value={`${calories} kcal split`} />
            <MetricGrid
              items={[
                { label: "Protein", value: `${round(out.proteinG, 0)} g` },
                { label: "Carbs", value: `${round(out.carbG, 0)} g` },
                { label: "Fat", value: `${round(out.fatG, 0)} g` },
              ]}
            />
          </div>
        ) : (
          <EmptyResult text="Convert calorie target and macro percentages into grams." />
        )
      }
    />
  );
}

export function CarbohydrateCalculatorTool() {
  const [calories, setCalories] = useState("2200");
  const [pct, setPct] = useState("45");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cal = parseNum(calories);
    const p = parseNum(pct);
    if (cal == null || p == null) return;
    setOut((cal * (p / 100)) / 4);
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <NumberField
            label="Daily calories"
            value={calories}
            onChange={setCalories}
            suffix="kcal"
          />
          <NumberField label="Carb target" value={pct} onChange={setPct} suffix="%" />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Carbohydrates" value={`${round(out, 0)} g/day`} />
          </div>
        ) : (
          <EmptyResult text="Daily carbohydrate grams from calories and % target." />
        )
      }
    />
  );
}

export function ProteinCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [weight, setWeight] = useState("154");
  const [intensity, setIntensity] = useState("1.6");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    const g = parseNum(intensity);
    if (w == null || g == null) return;
    setOut(proteinByWeight(toKg(w, units), g));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <NumberField
            label="Body weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          <SelectField
            label="Goal"
            value={intensity}
            onChange={setIntensity}
            options={[
              { value: "0.8", label: "Sedentary (0.8 g/kg)" },
              { value: "1.2", label: "Endurance (1.2 g/kg)" },
              { value: "1.6", label: "Strength (1.6 g/kg)" },
              { value: "2.0", label: "High (2.0 g/kg)" },
            ]}
          />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Protein target" value={`${round(out, 0)} g/day`} />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Daily protein target from body weight and training goal." />
        )
      }
    />
  );
}

export function FatIntakeCalculatorTool() {
  const [calories, setCalories] = useState("2200");
  const [pct, setPct] = useState("30");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cal = parseNum(calories);
    const p = parseNum(pct);
    if (cal == null || p == null) return;
    setOut((cal * (p / 100)) / 9);
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <NumberField
            label="Daily calories"
            value={calories}
            onChange={setCalories}
            suffix="kcal"
          />
          <NumberField label="Fat target" value={pct} onChange={setPct} suffix="%" />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Fat intake" value={`${round(out, 0)} g/day`} />
          </div>
        ) : (
          <EmptyResult text="Daily fat grams from calories and percentage target." />
        )
      }
    />
  );
}

export function GfrCalculatorTool() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("45");
  const [creatinine, setCreatinine] = useState("1.0");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(age);
    const c = parseNum(creatinine);
    if (a == null || c == null) return;
    setOut(gfrCkdEpi(c, a, sex));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <SexToggle value={sex} onChange={setSex} />
          <NumberField label="Age" value={age} onChange={setAge} suffix="years" />
          <NumberField
            label="Serum creatinine"
            value={creatinine}
            onChange={setCreatinine}
            suffix="mg/dL"
            step="0.01"
          />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="eGFR (CKD-EPI)"
              value={`${round(out, 0)} mL/min/1.73mÂ²`}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate GFR from creatinine, age, and sex (CKD-EPI)." />
        )
      }
    />
  );
}

export function BodySurfaceAreaCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [weight, setWeight] = useState("154");
  const [height, setHeight] = useState("67");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    const h = parseNum(height);
    if (w == null || h == null) return;
    setOut(bodySurfaceArea(toKg(w, units), toCm(h, units)));
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
        out != null ? (
          <div>
            <ResultTitle
              label="Body surface area"
              value={`${round(out, 2)} mÂ²`}
              hint="Mosteller formula"
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Mosteller body surface area from height and weight." />
        )
      }
    />
  );
}

export function BodyTypeCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState("67");
  const [wrist, setWrist] = useState("6.5");
  const [out, setOut] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const h = parseNum(height);
    const w = parseNum(wrist);
    if (h == null || w == null) return;
    setOut(bodyTypeFromRatios(toCm(w, units), toCm(h, units), sex));
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
            label="Wrist circumference"
            value={wrist}
            onChange={setWrist}
            suffix={units === "metric" ? "cm" : "in"}
          />
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Body type" value={out} />
            <p className="mt-3 text-sm text-ink-muted">
              Frame estimate from height-to-wrist ratio. Somatotypes are
              approximate.
            </p>
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Rough ectomorph / mesomorph / endomorph frame estimate." />
        )
      }
    />
  );
}

export function BacCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState("154");
  const [drinks, setDrinks] = useState("2");
  const [hours, setHours] = useState("2");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    const d = parseNum(drinks);
    const h = parseNum(hours);
    if (w == null || d == null || h == null) return;
    setOut(
      bacWidmark({
        alcoholGrams: standardDrinkGrams(d),
        weightKg: toKg(w, units),
        sex,
        hours: h,
      }),
    );
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <SexToggle value={sex} onChange={setSex} />
          <NumberField
            label="Body weight"
            value={weight}
            onChange={setWeight}
            suffix={units === "metric" ? "kg" : "lb"}
          />
          <NumberField
            label="Standard drinks"
            value={drinks}
            onChange={setDrinks}
            step="0.5"
          />
          <NumberField
            label="Hours since first drink"
            value={hours}
            onChange={setHours}
            step="0.5"
          />
          <SubmitRow />
        </form>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Estimated BAC"
              value={`${round(out, 3)}%`}
              hint="Widmark estimate · never drive after drinking"
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Rough blood-alcohol estimate. Not for legal or safety decisions." />
        )
      }
    />
  );
}
