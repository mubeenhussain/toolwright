"use client";

import { useEffect, useState, type FormEvent } from "react";

const MS_SECOND = 1000;
const MS_MINUTE = 60 * MS_SECOND;
const MS_HOUR = 60 * MS_MINUTE;
const MS_DAY = 24 * MS_HOUR;
const MS_WEEK = 7 * MS_DAY;

type AgeResult = {
  breakdown: { years: number; months: number; days: number };
  totals: {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  birthday: { date: Date; daysUntil: number };
};

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateInput(value: string) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function calendarAge(birth: Date, at: Date) {
  let years = at.getFullYear() - birth.getFullYear();
  let months = at.getMonth() - birth.getMonth();
  let days = at.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = at.getMonth() === 0 ? 11 : at.getMonth() - 1;
    const prevMonthYear =
      at.getMonth() === 0 ? at.getFullYear() - 1 : at.getFullYear();
    days += daysInMonth(prevMonthYear, prevMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function nextBirthday(birth: Date, at: Date) {
  const candidate = new Date(
    at.getFullYear(),
    birth.getMonth(),
    birth.getDate(),
    0,
    0,
    0,
    0,
  );

  if (
    birth.getMonth() === 1 &&
    birth.getDate() === 29 &&
    candidate.getMonth() !== 1
  ) {
    candidate.setFullYear(at.getFullYear(), 2, 1);
  }

  if (candidate.getTime() <= at.getTime()) {
    candidate.setFullYear(candidate.getFullYear() + 1);
    if (
      birth.getMonth() === 1 &&
      birth.getDate() === 29 &&
      candidate.getMonth() !== 1
    ) {
      candidate.setFullYear(candidate.getFullYear(), 2, 1);
    }
  }

  return {
    date: candidate,
    daysUntil: Math.ceil((candidate.getTime() - at.getTime()) / MS_DAY),
  };
}

function calculateAge(
  birth: Date,
  at: Date,
): { ok: true; data: AgeResult } | { ok: false; error: string } {
  if (at.getTime() < birth.getTime()) {
    return {
      ok: false,
      error: "The “age at” date must be on or after the date of birth.",
    };
  }

  const breakdown = calendarAge(birth, at);
  const totalMs = at.getTime() - birth.getTime();

  return {
    ok: true,
    data: {
      breakdown,
      totals: {
        years: breakdown.years,
        months: breakdown.years * 12 + breakdown.months,
        weeks: Math.floor(totalMs / MS_WEEK),
        days: Math.floor(totalMs / MS_DAY),
        hours: Math.floor(totalMs / MS_HOUR),
        minutes: Math.floor(totalMs / MS_MINUTE),
        seconds: Math.floor(totalMs / MS_SECOND),
      },
      birthday: nextBirthday(birth, at),
    },
  };
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AgeCalculatorTool() {
  const [birthValue, setBirthValue] = useState("2000-01-01");
  const [atValue, setAtValue] = useState("");
  const [today, setToday] = useState("");
  const [result, setResult] = useState<
    | { ok: true; data: AgeResult; birth: Date; at: Date }
    | { ok: false; error: string }
    | null
  >(null);

  useEffect(() => {
    const value = toDateInputValue(new Date());
    setToday(value);
    setAtValue(value);
  }, []);

  function handleCalculate(event: FormEvent) {
    event.preventDefault();
    const birth = parseDateInput(birthValue);
    const at = parseDateInput(atValue);
    if (!birth || !at) {
      setResult({ ok: false, error: "Enter valid dates to calculate age." });
      return;
    }
    const calculated = calculateAge(birth, at);
    if (!calculated.ok) {
      setResult(calculated);
      return;
    }
    setResult({ ok: true, data: calculated.data, birth, at });
  }

  return (
    <div className="grid overflow-hidden rounded-lg border border-line md:grid-cols-2">
      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-4 bg-white p-5 sm:p-6"
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.06em] text-ink-faint">
            Date of birth
          </span>
          <input
            type="date"
            className="field"
            value={birthValue}
            max={today || undefined}
            onChange={(event) => setBirthValue(event.target.value)}
            required
            aria-label="Date of birth"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.06em] text-ink-faint">
            Age as of
            <button
              type="button"
              className="font-semibold normal-case tracking-normal text-accent hover:underline disabled:opacity-40"
              disabled={!today}
              onClick={() => setAtValue(today)}
            >
              Use today
            </button>
          </span>
          <input
            type="date"
            className="field"
            value={atValue}
            onChange={(event) => setAtValue(event.target.value)}
            required
            aria-label="Age as of date"
          />
        </label>

        {result && !result.ok ? (
          <p className="text-sm text-danger" role="alert">
            {result.error}
          </p>
        ) : null}

        <button type="submit" className="btn btn-primary mt-auto w-full sm:w-auto">
          Calculate age
        </button>
      </form>

      <div
        className="border-t border-line bg-bg-elevated p-5 sm:p-6 md:border-t-0 md:border-l"
        aria-live="polite"
      >
        {result?.ok ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-faint">
              Exact age
            </p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
              {result.data.breakdown.years}
              <span className="text-lg font-semibold text-ink-muted">y</span>{" "}
              {result.data.breakdown.months}
              <span className="text-lg font-semibold text-ink-muted">m</span>{" "}
              {result.data.breakdown.days}
              <span className="text-lg font-semibold text-ink-muted">d</span>
            </p>
            <p className="mt-2 text-xs text-ink-muted">
              {formatShortDate(result.birth)} → {formatShortDate(result.at)}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
              {(
                [
                  ["Years", result.data.totals.years],
                  ["Months", result.data.totals.months],
                  ["Weeks", result.data.totals.weeks],
                  ["Days", result.data.totals.days],
                  ["Hours", result.data.totals.hours],
                  ["Minutes", result.data.totals.minutes],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] uppercase tracking-[0.05em] text-ink-faint">
                    {label}
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold text-ink">
                    {value.toLocaleString()}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 border-t border-line pt-4 text-sm text-ink-muted">
              Next birthday in{" "}
              <span className="font-semibold text-ink">
                {result.data.birthday.daysUntil.toLocaleString()} days
              </span>{" "}
              ({formatShortDate(result.data.birthday.date)})
            </p>
          </div>
        ) : (
          <div className="flex h-full min-h-[180px] flex-col justify-center">
            <p className="font-display text-lg font-semibold text-ink">
              Your result appears here
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
              Pick a birth date and an “as of” date, then calculate to see years,
              months, days, and total time lived.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
