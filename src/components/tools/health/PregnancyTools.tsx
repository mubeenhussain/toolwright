"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  bmi,
  conceptionFromDueDate,
  dueDateFromLmp,
  formatDate,
  ovulationFromCycle,
  parseInputDate,
  pregnancyFromLmp,
  pregnancyWeightGainRange,
  round,
  toCm,
  toInputDate,
  toKg,
  type UnitSystem,
} from "@/lib/health/formulas";
import {
  CalcShell,
  Disclaimer,
  EmptyResult,
  FieldLabel,
  MetricGrid,
  NumberField,
  ResultTitle,
  SubmitRow,
  UnitToggle,
} from "@/components/tools/health/ui";

function parseNum(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function DueDateCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [out, setOut] = useState<Date | null>(null);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    setLmp(toInputDate(d));
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const date = parseInputDate(lmp);
    if (!date) return;
    setOut(dueDateFromLmp(date));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <label className="block">
            <FieldLabel>First day of last period</FieldLabel>
            <input
              type="date"
              className="field"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              required
            />
          </label>
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Estimated due date" value={formatDate(out)} />
            <p className="mt-3 text-sm text-ink-muted">
              Based on Naegele’s rule (LMP + 280 days).
            </p>
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate due date from the first day of your last menstrual period." />
        )
      }
    />
  );
}

export function PregnancyCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [out, setOut] = useState<ReturnType<typeof pregnancyFromLmp> | null>(
    null,
  );

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - 60);
    setLmp(toInputDate(d));
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const date = parseInputDate(lmp);
    if (!date) return;
    setOut(pregnancyFromLmp(date));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <label className="block">
            <FieldLabel>First day of last period</FieldLabel>
            <input
              type="date"
              className="field"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              required
            />
          </label>
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Pregnancy progress"
              value={`${out.weeks}w ${out.remDays}d`}
              hint={`Trimester ${out.trimester}`}
            />
            <MetricGrid
              items={[
                { label: "Due date", value: formatDate(out.due) },
                { label: "Days since LMP", value: String(out.days) },
              ]}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="See gestational age and trimester from your LMP." />
        )
      }
    />
  );
}

export function OvulationCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [out, setOut] = useState<ReturnType<typeof ovulationFromCycle> | null>(
    null,
  );

  useEffect(() => {
    setLmp(toInputDate(new Date()));
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const date = parseInputDate(lmp);
    const c = parseNum(cycle);
    if (!date || c == null || c < 20 || c > 45) return;
    setOut(ovulationFromCycle(date, c));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <label className="block">
            <FieldLabel>First day of last period</FieldLabel>
            <input
              type="date"
              className="field"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              required
            />
          </label>
          <NumberField
            label="Average cycle length"
            value={cycle}
            onChange={setCycle}
            suffix="days"
            min={20}
            max={45}
          />
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Estimated ovulation"
              value={formatDate(out.ovulation)}
            />
            <MetricGrid
              items={[
                {
                  label: "Fertile window",
                  value: `${formatDate(out.fertileStart)} – ${formatDate(out.fertileEnd)}`,
                },
                { label: "Next period", value: formatDate(out.nextPeriod) },
              ]}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate ovulation day and fertile window from cycle length." />
        )
      }
    />
  );
}

export function PeriodCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [periods, setPeriods] = useState<Date[]>([]);

  useEffect(() => {
    setLmp(toInputDate(new Date()));
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const date = parseInputDate(lmp);
    const c = parseNum(cycle);
    if (!date || c == null) return;
    const next: Date[] = [];
    for (let i = 1; i <= 6; i += 1) {
      const d = new Date(date);
      d.setDate(d.getDate() + c * i);
      next.push(d);
    }
    setPeriods(next);
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <label className="block">
            <FieldLabel>First day of last period</FieldLabel>
            <input
              type="date"
              className="field"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              required
            />
          </label>
          <NumberField
            label="Cycle length"
            value={cycle}
            onChange={setCycle}
            suffix="days"
          />
          <SubmitRow />
        </form>
      }
      result={
        periods.length ? (
          <div>
            <ResultTitle label="Upcoming periods" value="Next 6 cycles" />
            <ul className="mt-4 space-y-1.5 text-sm text-ink">
              {periods.map((d) => (
                <li key={d.toISOString()} className="font-mono">
                  {formatDate(d)}
                </li>
              ))}
            </ul>
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Project upcoming period start dates from your cycle length." />
        )
      }
    />
  );
}

export function ConceptionCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [out, setOut] = useState<Date | null>(null);

  useEffect(() => {
    setLmp(toInputDate(new Date()));
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const date = parseInputDate(lmp);
    const c = parseNum(cycle);
    if (!date || c == null) return;
    setOut(ovulationFromCycle(date, c).ovulation);
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <label className="block">
            <FieldLabel>First day of last period</FieldLabel>
            <input
              type="date"
              className="field"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              required
            />
          </label>
          <NumberField
            label="Cycle length"
            value={cycle}
            onChange={setCycle}
            suffix="days"
          />
          <SubmitRow label="Estimate conception day" />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Most likely conception"
              value={formatDate(out)}
              hint="Aligned with estimated ovulation day"
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate the most likely conception day from LMP and cycle length." />
        )
      }
    />
  );
}

export function PregnancyConceptionCalculatorTool() {
  const [due, setDue] = useState("");
  const [out, setOut] = useState<Date | null>(null);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 200);
    setDue(toInputDate(d));
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const date = parseInputDate(due);
    if (!date) return;
    setOut(conceptionFromDueDate(date));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <label className="block">
            <FieldLabel>Due date</FieldLabel>
            <input
              type="date"
              className="field"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              required
            />
          </label>
          <SubmitRow />
        </form>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Estimated conception"
              value={formatDate(out)}
              hint="Due date minus ~266 days"
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="Work backward from a due date to estimate conception." />
        )
      }
    />
  );
}

export function PregnancyWeightGainCalculatorTool() {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [weight, setWeight] = useState("132");
  const [height, setHeight] = useState("65");
  const [out, setOut] = useState<{
    min: number;
    max: number;
    label: string;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const w = parseNum(weight);
    const h = parseNum(height);
    if (w == null || h == null) return;
    const pre = bmi(toKg(w, units), toCm(h, units));
    setOut(pregnancyWeightGainRange(pre));
  }

  return (
    <CalcShell
      form={
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <UnitToggle value={units} onChange={setUnits} />
          <NumberField
            label="Pre-pregnancy weight"
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
              label={`Recommended gain (${out.label})`}
              value={`${out.min}–${out.max} kg`}
              hint="IOM guidelines for singleton pregnancy"
            />
            <MetricGrid
              items={[
                {
                  label: "Midpoint",
                  value: `${round((out.min + out.max) / 2, 1)} kg`,
                },
              ]}
            />
            <Disclaimer />
          </div>
        ) : (
          <EmptyResult text="IOM pregnancy weight-gain range from pre-pregnancy BMI." />
        )
      }
    />
  );
}
