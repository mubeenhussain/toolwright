"use client";

import type { FormEvent, ReactNode } from "react";
import type { Sex, UnitSystem } from "@/lib/health/formulas";

export function CalcShell({
  form,
  result,
}: {
  form: ReactNode;
  result: ReactNode;
}) {
  return (
    <div className="grid overflow-hidden rounded-lg border border-line md:grid-cols-2">
      <div className="flex flex-col gap-3.5 bg-white p-5 sm:p-6">{form}</div>
      <div className="border-t border-line bg-bg-elevated p-5 sm:p-6 md:border-t-0 md:border-l">
        {result}
      </div>
    </div>
  );
}

export function EmptyResult({ text }: { text: string }) {
  return (
    <div className="flex h-full min-h-[160px] flex-col justify-center">
      <p className="font-display text-lg font-semibold text-ink">Result</p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">{text}</p>
    </div>
  );
}

export function ResultTitle({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-faint">
        {label}
      </p>
      <p className="mt-1.5 font-display text-3xl font-bold tracking-tight text-ink">
        {value}
      </p>
      {hint ? <p className="mt-1.5 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export function MetricGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[11px] uppercase tracking-[0.05em] text-ink-faint">
            {item.label}
          </dt>
          <dd className="mt-0.5 font-mono text-sm font-semibold text-ink">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function FieldLabel({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <span className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.06em] text-ink-faint">
      {children}
      {action}
    </span>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = "any",
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: string | number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <input
          type="number"
          className="field"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function UnitToggle({
  value,
  onChange,
}: {
  value: UnitSystem;
  onChange: (value: UnitSystem) => void;
}) {
  return (
    <div className="flex gap-1 rounded border border-line p-0.5">
      {(
        [
          ["metric", "Metric"],
          ["imperial", "US"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          className={`flex-1 rounded px-2 py-1.5 text-xs font-semibold ${
            value === id ? "bg-accent text-white" : "text-ink-muted"
          }`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function SexToggle({
  value,
  onChange,
}: {
  value: Sex;
  onChange: (value: Sex) => void;
}) {
  return (
    <div className="flex gap-1 rounded border border-line p-0.5">
      {(
        [
          ["male", "Male"],
          ["female", "Female"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          className={`flex-1 rounded px-2 py-1.5 text-xs font-semibold ${
            value === id ? "bg-accent text-white" : "text-ink-muted"
          }`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function SubmitRow({
  label = "Calculate",
  onSubmit,
}: {
  label?: string;
  onSubmit?: (event: FormEvent) => void;
}) {
  return (
    <button type="submit" className="btn btn-primary mt-1 w-full sm:w-auto" onClick={onSubmit}>
      {label}
    </button>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-ink-faint">
      Estimates only — not medical advice. Talk to a clinician for health decisions.
    </p>
  );
}
