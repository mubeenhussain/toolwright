"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  amortizationSchedule,
  creditCardPayoff,
  debtToIncome,
  downPayment,
  formatMoney,
  houseAffordability,
  leasePayment,
  loanSummary,
  minPaymentEstimate,
  parseNum,
  roundMoney,
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

type LoanDefaults = {
  principal: string;
  rate: string;
  years: string;
  title: string;
  principalLabel?: string;
};

function AmortizingLoanTool({ defaults }: { defaults: LoanDefaults }) {
  const [principal, setPrincipal] = useState(defaults.principal);
  const [rate, setRate] = useState(defaults.rate);
  const [years, setYears] = useState(defaults.years);
  const [out, setOut] = useState<ReturnType<typeof loanSummary> | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (p == null || r == null || y == null || p <= 0 || y <= 0) return;
    setOut(loanSummary(p, r, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label={defaults.principalLabel ?? "Loan amount"}
            value={principal}
            onChange={setPrincipal}
            suffix="$"
          />
          <NumberField
            label="Interest rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            step="0.01"
          />
          <NumberField
            label="Term"
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
              label={`${defaults.title} payment`}
              value={formatMoney(out.payment)}
              hint="Estimated monthly payment"
            />
            <MetricGrid
              items={[
                { label: "Total paid", value: formatMoney(out.totalPaid) },
                {
                  label: "Total interest",
                  value: formatMoney(out.totalInterest),
                },
                { label: "Payments", value: String(out.months) },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult
            text={`Estimate your ${defaults.title.toLowerCase()} monthly payment.`}
          />
        )
      }
    />
  );
}

function loan(defaults: LoanDefaults) {
  return function LoanTool() {
    return <AmortizingLoanTool defaults={defaults} />;
  };
}

export const MortgageCalculatorTool = loan({
  title: "Mortgage",
  principal: "350000",
  rate: "6.5",
  years: "30",
  principalLabel: "Home loan amount",
});
export const AutoLoanCalculatorTool = loan({
  title: "Auto loan",
  principal: "28000",
  rate: "7",
  years: "5",
  principalLabel: "Vehicle loan amount",
});
export const LoanCalculatorTool = loan({
  title: "Loan",
  principal: "20000",
  rate: "8",
  years: "5",
});
export const PaymentCalculatorTool = loan({
  title: "Payment",
  principal: "15000",
  rate: "9",
  years: "4",
});
export const StudentLoanCalculatorTool = loan({
  title: "Student loan",
  principal: "35000",
  rate: "5.5",
  years: "10",
});
export const PersonalLoanCalculatorTool = loan({
  title: "Personal loan",
  principal: "10000",
  rate: "11",
  years: "3",
});
export const BusinessLoanCalculatorTool = loan({
  title: "Business loan",
  principal: "75000",
  rate: "9.5",
  years: "7",
});
export const BoatLoanCalculatorTool = loan({
  title: "Boat loan",
  principal: "45000",
  rate: "7.5",
  years: "10",
});
export const AprCalculatorTool = loan({
  title: "APR loan",
  principal: "25000",
  rate: "8.9",
  years: "5",
  principalLabel: "Amount financed",
});
export const FhaLoanCalculatorTool = loan({
  title: "FHA mortgage",
  principal: "300000",
  rate: "6.25",
  years: "30",
});
export const VaMortgageCalculatorTool = loan({
  title: "VA mortgage",
  principal: "320000",
  rate: "6",
  years: "30",
});
export const HomeEquityLoanCalculatorTool = loan({
  title: "Home equity loan",
  principal: "50000",
  rate: "8.25",
  years: "15",
});
export const HelocCalculatorTool = loan({
  title: "HELOC",
  principal: "40000",
  rate: "8.5",
  years: "10",
  principalLabel: "Drawn balance",
});

export function AmortizationCalculatorTool() {
  const [principal, setPrincipal] = useState("350000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [rows, setRows] = useState<ReturnType<
    typeof amortizationSchedule
  > | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (p == null || r == null || y == null) return;
    setRows(amortizationSchedule(p, r, y).slice(0, 12));
  }

  const totals = useMemo(() => {
    if (!rows) return null;
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (p == null || r == null || y == null) return null;
    const full = amortizationSchedule(p, r, y);
    return {
      interest: full.reduce((s, row) => s + row.interest, 0),
      payments: full.length,
    };
  }, [rows, principal, rate, years]);

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
          <NumberField
            label="Rate"
            value={rate}
            onChange={setRate}
            suffix="%"
            step="0.01"
          />
          <NumberField
            label="Term"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        rows && totals ? (
          <div>
            <ResultTitle
              label="First 12 months"
              value={`${totals.payments} payments`}
              hint={`Total interest (full term): ${formatMoney(totals.interest)}`}
            />
            <div className="mt-3 max-h-56 overflow-auto text-xs">
              <table className="w-full border border-line">
                <thead>
                  <tr className="bg-bg-elevated text-left">
                    <th className="px-2 py-1">#</th>
                    <th className="px-2 py-1">Pay</th>
                    <th className="px-2 py-1">Interest</th>
                    <th className="px-2 py-1">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.period} className="border-t border-line">
                      <td className="px-2 py-1">{row.period}</td>
                      <td className="px-2 py-1">{formatMoney(row.payment)}</td>
                      <td className="px-2 py-1">{formatMoney(row.interest)}</td>
                      <td className="px-2 py-1">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Build an amortization schedule and preview the first year." />
        )
      }
    />
  );
}

export function MortgagePayoffCalculatorTool() {
  const [principal, setPrincipal] = useState("280000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [extra, setExtra] = useState("200");
  const [out, setOut] = useState<{
    baseMonths: number;
    extraMonths: number;
    interestSaved: number;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    const x = parseNum(extra) ?? 0;
    if (p == null || r == null || y == null) return;
    const base = amortizationSchedule(p, r, y);
    const withExtra = amortizationSchedule(p, r, y, x);
    const baseInterest = base.reduce((s, row) => s + row.interest, 0);
    const extraInterest = withExtra.reduce((s, row) => s + row.interest, 0);
    setOut({
      baseMonths: base.length,
      extraMonths: withExtra.length,
      interestSaved: baseInterest - extraInterest,
    });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Balance"
            value={principal}
            onChange={setPrincipal}
            suffix="$"
          />
          <NumberField label="Rate" value={rate} onChange={setRate} suffix="%" />
          <NumberField
            label="Remaining term"
            value={years}
            onChange={setYears}
            suffix="years"
          />
          <NumberField
            label="Extra monthly"
            value={extra}
            onChange={setExtra}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Payoff time"
              value={`${out.extraMonths} mo`}
              hint={`vs ${out.baseMonths} months with no extra`}
            />
            <MetricGrid
              items={[
                {
                  label: "Months saved",
                  value: String(out.baseMonths - out.extraMonths),
                },
                {
                  label: "Interest saved",
                  value: formatMoney(out.interestSaved),
                },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="See how extra payments shorten your mortgage." />
        )
      }
    />
  );
}

export function HouseAffordabilityCalculatorTool() {
  const [income, setIncome] = useState("95000");
  const [debts, setDebts] = useState("450");
  const [down, setDown] = useState("40000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [out, setOut] = useState<ReturnType<typeof houseAffordability> | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(income);
    const d = parseNum(debts);
    const dp = parseNum(down);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (a == null || d == null || dp == null || r == null || y == null) return;
    setOut(
      houseAffordability({
        annualIncome: a,
        monthlyDebts: d,
        downPayment: dp,
        annualRatePct: r,
        years: y,
      }),
    );
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Annual income"
            value={income}
            onChange={setIncome}
            suffix="$"
          />
          <NumberField
            label="Monthly debts"
            value={debts}
            onChange={setDebts}
            suffix="$"
          />
          <NumberField
            label="Down payment"
            value={down}
            onChange={setDown}
            suffix="$"
          />
          <NumberField label="Rate" value={rate} onChange={setRate} suffix="%" />
          <NumberField
            label="Term"
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
              label="Max home price"
              value={formatMoney(out.maxHome)}
            />
            <MetricGrid
              items={[
                { label: "Max loan", value: formatMoney(out.maxLoan) },
                { label: "Max payment", value: formatMoney(out.maxPayment) },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate home affordability using a 36% DTI guideline." />
        )
      }
    />
  );
}

export function RentCalculatorTool() {
  const [income, setIncome] = useState("6500");
  const [rule, setRule] = useState("30");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const i = parseNum(income);
    const r = parseNum(rule);
    if (i == null || r == null) return;
    setOut(i * (r / 100));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Monthly income"
            value={income}
            onChange={setIncome}
            suffix="$"
          />
          <NumberField
            label="Rent-to-income"
            value={rule}
            onChange={setRule}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Suggested rent budget"
              value={formatMoney(out)}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Budget rent from monthly income (commonly ~30%)." />
        )
      }
    />
  );
}

export function DebtToIncomeCalculatorTool() {
  const [debt, setDebt] = useState("1800");
  const [income, setIncome] = useState("6500");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const d = parseNum(debt);
    const i = parseNum(income);
    if (d == null || i == null) return;
    setOut(debtToIncome(d, i));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Monthly debt payments"
            value={debt}
            onChange={setDebt}
            suffix="$"
          />
          <NumberField
            label="Gross monthly income"
            value={income}
            onChange={setIncome}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="DTI ratio" value={`${roundMoney(out, 1)}%`} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Calculate your debt-to-income ratio." />
        )
      }
    />
  );
}

export function DownPaymentCalculatorTool() {
  const [price, setPrice] = useState("400000");
  const [pct, setPct] = useState("20");
  const [out, setOut] = useState<ReturnType<typeof downPayment> | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(price);
    const percent = parseNum(pct);
    if (p == null || percent == null) return;
    setOut(downPayment(p, percent));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Home price"
            value={price}
            onChange={setPrice}
            suffix="$"
          />
          <NumberField
            label="Down payment"
            value={pct}
            onChange={setPct}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Down payment" value={formatMoney(out.down)} />
            <MetricGrid
              items={[{ label: "Loan amount", value: formatMoney(out.loan) }]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Convert home price and down-payment percent into dollars." />
        )
      }
    />
  );
}

export function RefinanceCalculatorTool() {
  const [balance, setBalance] = useState("275000");
  const [oldRate, setOldRate] = useState("7.25");
  const [newRate, setNewRate] = useState("6.25");
  const [years, setYears] = useState("30");
  const [costs, setCosts] = useState("4500");
  const [out, setOut] = useState<{
    oldPay: number;
    newPay: number;
    monthlySave: number;
    breakEven: number;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const b = parseNum(balance);
    const o = parseNum(oldRate);
    const n = parseNum(newRate);
    const y = parseNum(years);
    const c = parseNum(costs) ?? 0;
    if (b == null || o == null || n == null || y == null) return;
    const oldPay = loanSummary(b, o, y).payment;
    const newPay = loanSummary(b, n, y).payment;
    const monthlySave = oldPay - newPay;
    setOut({
      oldPay,
      newPay,
      monthlySave,
      breakEven: monthlySave > 0 ? c / monthlySave : Infinity,
    });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Current balance"
            value={balance}
            onChange={setBalance}
            suffix="$"
          />
          <NumberField
            label="Current rate"
            value={oldRate}
            onChange={setOldRate}
            suffix="%"
          />
          <NumberField
            label="New rate"
            value={newRate}
            onChange={setNewRate}
            suffix="%"
          />
          <NumberField
            label="New term"
            value={years}
            onChange={setYears}
            suffix="years"
          />
          <NumberField
            label="Closing costs"
            value={costs}
            onChange={setCosts}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Monthly savings"
              value={formatMoney(out.monthlySave)}
            />
            <MetricGrid
              items={[
                { label: "Old payment", value: formatMoney(out.oldPay) },
                { label: "New payment", value: formatMoney(out.newPay) },
                {
                  label: "Break-even",
                  value: Number.isFinite(out.breakEven)
                    ? `${roundMoney(out.breakEven, 1)} mo`
                    : "N/A",
                },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Compare refinance payment and break-even months." />
        )
      }
    />
  );
}

export function RentVsBuyCalculatorTool() {
  const [rent, setRent] = useState("2200");
  const [price, setPrice] = useState("420000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const [downPct, setDownPct] = useState("20");
  const [out, setOut] = useState<{
    buyPay: number;
    rentAnnual: number;
    buyAnnual: number;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const rentM = parseNum(rent);
    const p = parseNum(price);
    const r = parseNum(rate);
    const y = parseNum(years);
    const d = parseNum(downPct);
    if (rentM == null || p == null || r == null || y == null || d == null)
      return;
    const loanAmt = p * (1 - d / 100);
    const buyPay = loanSummary(loanAmt, r, y).payment;
    setOut({
      buyPay,
      rentAnnual: rentM * 12,
      buyAnnual: buyPay * 12,
    });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Monthly rent"
            value={rent}
            onChange={setRent}
            suffix="$"
          />
          <NumberField
            label="Home price"
            value={price}
            onChange={setPrice}
            suffix="$"
          />
          <NumberField
            label="Mortgage rate"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <NumberField
            label="Term"
            value={years}
            onChange={setYears}
            suffix="years"
          />
          <NumberField
            label="Down payment"
            value={downPct}
            onChange={setDownPct}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Monthly mortgage (P&I)"
              value={formatMoney(out.buyPay)}
            />
            <MetricGrid
              items={[
                { label: "Annual rent", value: formatMoney(out.rentAnnual) },
                { label: "Annual P&I", value: formatMoney(out.buyAnnual) },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Rough rent vs buy payment comparison." />
        )
      }
    />
  );
}

export function RealEstateCalculatorTool() {
  return <HouseAffordabilityCalculatorTool />;
}

export function RentalPropertyCalculatorTool() {
  const [rent, setRent] = useState("2400");
  const [expenses, setExpenses] = useState("800");
  const [price, setPrice] = useState("360000");
  const [out, setOut] = useState<{ cashFlow: number; capRate: number } | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const r = parseNum(rent);
    const exp = parseNum(expenses);
    const p = parseNum(price);
    if (r == null || exp == null || p == null || p <= 0) return;
    const noi = r * 12 - exp;
    setOut({ cashFlow: noi / 12, capRate: (noi / p) * 100 });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Monthly rent"
            value={rent}
            onChange={setRent}
            suffix="$"
          />
          <NumberField
            label="Annual expenses"
            value={expenses}
            onChange={setExpenses}
            suffix="$"
          />
          <NumberField
            label="Property price"
            value={price}
            onChange={setPrice}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Cap rate"
              value={`${roundMoney(out.capRate, 2)}%`}
            />
            <MetricGrid
              items={[
                {
                  label: "Monthly cash flow",
                  value: formatMoney(out.cashFlow),
                },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate rental cap rate and monthly cash flow." />
        )
      }
    />
  );
}

export function AutoLeaseCalculatorTool() {
  const [cap, setCap] = useState("32000");
  const [residual, setResidual] = useState("18000");
  const [mf, setMf] = useState("0.0025");
  const [months, setMonths] = useState("36");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const c = parseNum(cap);
    const res = parseNum(residual);
    const m = parseNum(mf);
    const mo = parseNum(months);
    if (c == null || res == null || m == null || mo == null) return;
    setOut(
      leasePayment({
        capCost: c,
        residualValue: res,
        moneyFactor: m,
        months: mo,
      }),
    );
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField label="Cap cost" value={cap} onChange={setCap} suffix="$" />
          <NumberField
            label="Residual value"
            value={residual}
            onChange={setResidual}
            suffix="$"
          />
          <NumberField
            label="Money factor"
            value={mf}
            onChange={setMf}
            step="0.0001"
          />
          <NumberField
            label="Term"
            value={months}
            onChange={setMonths}
            suffix="months"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Est. lease payment" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate a lease payment from cap cost, residual, and money factor." />
        )
      }
    />
  );
}

export function LeaseCalculatorTool() {
  return <AutoLeaseCalculatorTool />;
}

export function CashBackOrLowInterestCalculatorTool() {
  const [price, setPrice] = useState("30000");
  const [cashBack, setCashBack] = useState("2000");
  const [lowRate, setLowRate] = useState("1.9");
  const [highRate, setHighRate] = useState("6.9");
  const [years, setYears] = useState("5");
  const [out, setOut] = useState<{
    cashBackCost: number;
    lowRateCost: number;
    winner: string;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(price);
    const cb = parseNum(cashBack);
    const low = parseNum(lowRate);
    const high = parseNum(highRate);
    const y = parseNum(years);
    if (p == null || cb == null || low == null || high == null || y == null)
      return;
    const cashBackLoan = loanSummary(p - cb, high, y);
    const lowInterestLoan = loanSummary(p, low, y);
    setOut({
      cashBackCost: cashBackLoan.totalPaid,
      lowRateCost: lowInterestLoan.totalPaid,
      winner:
        cashBackLoan.totalPaid < lowInterestLoan.totalPaid
          ? "Cash back + higher rate"
          : "Low interest rate",
    });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Price"
            value={price}
            onChange={setPrice}
            suffix="$"
          />
          <NumberField
            label="Cash back"
            value={cashBack}
            onChange={setCashBack}
            suffix="$"
          />
          <NumberField
            label="Low APR offer"
            value={lowRate}
            onChange={setLowRate}
            suffix="%"
          />
          <NumberField
            label="Rate with cash back"
            value={highRate}
            onChange={setHighRate}
            suffix="%"
          />
          <NumberField
            label="Term"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Better deal" value={out.winner} />
            <MetricGrid
              items={[
                {
                  label: "Cash-back total",
                  value: formatMoney(out.cashBackCost),
                },
                {
                  label: "Low-rate total",
                  value: formatMoney(out.lowRateCost),
                },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Compare dealer cash back vs low-interest financing." />
        )
      }
    />
  );
}

export function CreditCardCalculatorTool() {
  const [balance, setBalance] = useState("4500");
  const [apr, setApr] = useState("22");
  const [payment, setPayment] = useState("200");
  const [out, setOut] = useState<ReturnType<typeof creditCardPayoff> | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const b = parseNum(balance);
    const a = parseNum(apr);
    const p = parseNum(payment);
    if (b == null || a == null || p == null) return;
    setOut(creditCardPayoff(b, a, p));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Balance"
            value={balance}
            onChange={setBalance}
            suffix="$"
          />
          <NumberField label="APR" value={apr} onChange={setApr} suffix="%" />
          <NumberField
            label="Monthly payment"
            value={payment}
            onChange={setPayment}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Payoff time"
              value={
                Number.isFinite(out.months)
                  ? `${out.months} months`
                  : "Never (payment too low)"
              }
            />
            {Number.isFinite(out.totalInterest) ? (
              <MetricGrid
                items={[
                  {
                    label: "Total interest",
                    value: formatMoney(out.totalInterest),
                  },
                  { label: "Total paid", value: formatMoney(out.totalPaid) },
                  {
                    label: "Min payment now",
                    value: formatMoney(
                      minPaymentEstimate(
                        parseNum(balance) ?? 0,
                        parseNum(apr) ?? 0,
                      ),
                    ),
                  },
                ]}
              />
            ) : null}
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate credit card payoff time and interest." />
        )
      }
    />
  );
}

export function CreditCardsPayoffCalculatorTool() {
  return <CreditCardCalculatorTool />;
}
export function DebtPayoffCalculatorTool() {
  return <CreditCardCalculatorTool />;
}

export function DebtConsolidationCalculatorTool() {
  const [balances, setBalances] = useState("12000");
  const [oldApr, setOldApr] = useState("21");
  const [newApr, setNewApr] = useState("9");
  const [years, setYears] = useState("4");
  const [out, setOut] = useState<{
    old: number;
    consolidated: number;
    saved: number;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const b = parseNum(balances);
    const o = parseNum(oldApr);
    const n = parseNum(newApr);
    const y = parseNum(years);
    if (b == null || o == null || n == null || y == null) return;
    const old = loanSummary(b, o, y);
    const neu = loanSummary(b, n, y);
    setOut({
      old: old.totalInterest,
      consolidated: neu.totalInterest,
      saved: old.totalInterest - neu.totalInterest,
    });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Total debt"
            value={balances}
            onChange={setBalances}
            suffix="$"
          />
          <NumberField
            label="Current APR (avg)"
            value={oldApr}
            onChange={setOldApr}
            suffix="%"
          />
          <NumberField
            label="Consolidation APR"
            value={newApr}
            onChange={setNewApr}
            suffix="%"
          />
          <NumberField
            label="Term"
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
              label="Interest saved"
              value={formatMoney(out.saved)}
            />
            <MetricGrid
              items={[
                { label: "Old interest", value: formatMoney(out.old) },
                {
                  label: "New interest",
                  value: formatMoney(out.consolidated),
                },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Compare interest if you consolidate high-APR debt." />
        )
      }
    />
  );
}

export function RepaymentCalculatorTool() {
  return <MortgagePayoffCalculatorTool />;
}
