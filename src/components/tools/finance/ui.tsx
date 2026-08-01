"use client";

import type { FormEvent, ReactNode } from "react";
import {
  CalcShell,
  EmptyResult,
  FieldLabel,
  MetricGrid,
  NumberField,
  ResultTitle,
  SubmitRow,
} from "@/components/tools/health/ui";

export function FinanceDisclaimer() {
  return (
    <p className="mt-4 border-t border-line pt-3 text-[11px] leading-relaxed text-ink-faint">
      Estimates only — not financial, tax, or investment advice. Verify with a
      licensed professional before major decisions.
    </p>
  );
}

export function FinanceForm({
  onSubmit,
  children,
}: {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
      {children}
      <SubmitRow />
    </form>
  );
}

export {
  CalcShell,
  EmptyResult,
  FieldLabel,
  MetricGrid,
  NumberField,
  ResultTitle,
  SubmitRow,
};
