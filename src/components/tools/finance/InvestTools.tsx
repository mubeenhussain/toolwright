"use client";

import { useState, type FormEvent } from "react";
import {
  annuityFutureValue,
  annuityPayment,
  bondPrice,
  cagr,
  compoundInterest,
  formatMoney,
  formatPct,
  futureValue,
  inflationAdjust,
  irr,
  parseNum,
  paybackPeriod,
  presentValue,
  roi,
  roundMoney,
  simpleInterest,
} from "@/lib/finance/formulas";
import {
  CalcShell,
  EmptyResult,
  FinanceDisclaimer,
  FinanceForm,
  MetricGrid,
  NumberField,
  ResultTitle,
} from "@/components/tools/finance/ui";

export function CompoundInterestCalculatorTool() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [monthly, setMonthly] = useState("200");
  const [out, setOut] = useState<ReturnType<typeof compoundInterest> | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    const m = parseNum(monthly) ?? 0;
    if (p == null || r == null || y == null) return;
    setOut(
      compoundInterest({
        principal: p,
        annualRatePct: r,
        years: y,
        compoundsPerYear: 12,
        monthlyContribution: m,
      }),
    );
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Starting amount"
            value={principal}
            onChange={setPrincipal}
            suffix="$"
          />
          <NumberField
            label="Annual return"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <NumberField
            label="Years"
            value={years}
            onChange={setYears}
            suffix="years"
          />
          <NumberField
            label="Monthly contribution"
            value={monthly}
            onChange={setMonthly}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Future value"
              value={formatMoney(out.futureValue)}
            />
            <MetricGrid
              items={[
                {
                  label: "Total contributions",
                  value: formatMoney(out.totalContrib),
                },
                { label: "Interest earned", value: formatMoney(out.interest) },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Project compound growth with optional monthly deposits." />
        )
      }
    />
  );
}

export function InterestCalculatorTool() {
  return <CompoundInterestCalculatorTool />;
}
export function InvestmentCalculatorTool() {
  return <CompoundInterestCalculatorTool />;
}
export function SavingsCalculatorTool() {
  return <CompoundInterestCalculatorTool />;
}
export function FinanceCalculatorTool() {
  return <CompoundInterestCalculatorTool />;
}
export function CdCalculatorTool() {
  return <CompoundInterestCalculatorTool />;
}
export function MutualFundCalculatorTool() {
  return <CompoundInterestCalculatorTool />;
}

export function SimpleInterestCalculatorTool() {
  const [principal, setPrincipal] = useState("5000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("3");
  const [out, setOut] = useState<ReturnType<typeof simpleInterest> | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (p == null || r == null || y == null) return;
    setOut(simpleInterest(p, r, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Principal"
            value={principal}
            onChange={setPrincipal}
            suffix="$"
          />
          <NumberField label="Rate" value={rate} onChange={setRate} suffix="%" />
          <NumberField
            label="Time"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Interest" value={formatMoney(out.interest)} />
            <MetricGrid
              items={[{ label: "Total", value: formatMoney(out.total) }]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Calculate simple interest (I = PRT)." />
        )
      }
    />
  );
}

export function InterestRateCalculatorTool() {
  const [begin, setBegin] = useState("10000");
  const [end, setEnd] = useState("15000");
  const [years, setYears] = useState("5");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const b = parseNum(begin);
    const en = parseNum(end);
    const y = parseNum(years);
    if (b == null || en == null || y == null) return;
    setOut(cagr(b, en, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Starting value"
            value={begin}
            onChange={setBegin}
            suffix="$"
          />
          <NumberField
            label="Ending value"
            value={end}
            onChange={setEnd}
            suffix="$"
          />
          <NumberField
            label="Years"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Annualized rate (CAGR)" value={formatPct(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Solve for the annualized growth rate between two values." />
        )
      }
    />
  );
}

export function AverageReturnCalculatorTool() {
  return <InterestRateCalculatorTool />;
}

export function PresentValueCalculatorTool() {
  const [future, setFuture] = useState("25000");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("8");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const f = parseNum(future);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (f == null || r == null || y == null) return;
    setOut(presentValue(f, r, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Future amount"
            value={future}
            onChange={setFuture}
            suffix="$"
          />
          <NumberField
            label="Discount rate"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <NumberField
            label="Years"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Present value" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Discount a future amount to today's dollars." />
        )
      }
    />
  );
}

export function FutureValueCalculatorTool() {
  const [present, setPresent] = useState("10000");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("8");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(present);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (p == null || r == null || y == null) return;
    setOut(futureValue(p, r, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Present amount"
            value={present}
            onChange={setPresent}
            suffix="$"
          />
          <NumberField label="Rate" value={rate} onChange={setRate} suffix="%" />
          <NumberField
            label="Years"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Future value" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Grow a present amount at a constant rate." />
        )
      }
    />
  );
}

export function RoiCalculatorTool() {
  const [cost, setCost] = useState("5000");
  const [gain, setGain] = useState("7200");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const c = parseNum(cost);
    const g = parseNum(gain);
    if (c == null || g == null) return;
    setOut(roi(g, c));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Cost / investment"
            value={cost}
            onChange={setCost}
            suffix="$"
          />
          <NumberField
            label="Final value / gain amount"
            value={gain}
            onChange={setGain}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="ROI" value={formatPct(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Measure return on investment as a percentage." />
        )
      }
    />
  );
}

export function PaybackPeriodCalculatorTool() {
  const [invest, setInvest] = useState("50000");
  const [cash, setCash] = useState("12000");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const i = parseNum(invest);
    const c = parseNum(cash);
    if (i == null || c == null) return;
    setOut(paybackPeriod(i, c));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Initial investment"
            value={invest}
            onChange={setInvest}
            suffix="$"
          />
          <NumberField
            label="Annual cash flow"
            value={cash}
            onChange={setCash}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Payback period"
              value={
                Number.isFinite(out) ? `${roundMoney(out, 2)} years` : "N/A"
              }
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate years to recover an investment." />
        )
      }
    />
  );
}

export function IrrCalculatorTool() {
  const [c0, setC0] = useState("-10000");
  const [c1, setC1] = useState("3000");
  const [c2, setC2] = useState("4000");
  const [c3, setC3] = useState("5000");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const flows = [c0, c1, c2, c3].map((v) => parseNum(v));
    if (flows.some((v) => v == null)) return;
    setOut(irr(flows as number[]));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Year 0 (investment)"
            value={c0}
            onChange={setC0}
            suffix="$"
          />
          <NumberField label="Year 1" value={c1} onChange={setC1} suffix="$" />
          <NumberField label="Year 2" value={c2} onChange={setC2} suffix="$" />
          <NumberField label="Year 3" value={c3} onChange={setC3} suffix="$" />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="IRR" value={formatPct(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate internal rate of return from yearly cash flows." />
        )
      }
    />
  );
}

export function BondCalculatorTool() {
  const [face, setFace] = useState("1000");
  const [coupon, setCoupon] = useState("5");
  const [ytm, setYtm] = useState("4.5");
  const [years, setYears] = useState("10");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const f = parseNum(face);
    const c = parseNum(coupon);
    const y = parseNum(ytm);
    const yrs = parseNum(years);
    if (f == null || c == null || y == null || yrs == null) return;
    setOut(
      bondPrice({
        face: f,
        couponPct: c,
        ytmPct: y,
        years: yrs,
      }),
    );
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Face value"
            value={face}
            onChange={setFace}
            suffix="$"
          />
          <NumberField
            label="Coupon rate"
            value={coupon}
            onChange={setCoupon}
            suffix="%"
          />
          <NumberField label="YTM" value={ytm} onChange={setYtm} suffix="%" />
          <NumberField
            label="Years to maturity"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Bond price" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Price a bond from coupon rate and yield to maturity." />
        )
      }
    />
  );
}

export function AnnuityCalculatorTool() {
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("20");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const m = parseNum(monthly);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (m == null || r == null || y == null) return;
    setOut(annuityFutureValue(m, r, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Monthly contribution"
            value={monthly}
            onChange={setMonthly}
            suffix="$"
          />
          <NumberField
            label="Annual return"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <NumberField
            label="Years"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Annuity future value" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Grow regular deposits into an annuity balance." />
        )
      }
    />
  );
}

export function AnnuityPayoutCalculatorTool() {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("20");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (p == null || r == null || y == null) return;
    setOut(annuityPayment(p, r, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Principal"
            value={principal}
            onChange={setPrincipal}
            suffix="$"
          />
          <NumberField label="Rate" value={rate} onChange={setRate} suffix="%" />
          <NumberField
            label="Payout years"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Monthly payout"
              value={formatMoney(out)}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Convert a lump sum into estimated monthly annuity payments." />
        )
      }
    />
  );
}

export function InflationCalculatorTool() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");
  const [out, setOut] = useState<ReturnType<typeof inflationAdjust> | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(amount);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (a == null || r == null || y == null) return;
    setOut(inflationAdjust(a, r, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Amount today"
            value={amount}
            onChange={setAmount}
            suffix="$"
          />
          <NumberField
            label="Inflation rate"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <NumberField
            label="Years"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Future equivalent"
              value={formatMoney(out.future)}
            />
            <MetricGrid
              items={[
                {
                  label: "Purchasing power later",
                  value: formatMoney(out.purchasingPower),
                },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="See how inflation changes the value of money over time." />
        )
      }
    />
  );
}
