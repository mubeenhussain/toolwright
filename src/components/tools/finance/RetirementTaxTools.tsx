"use client";

import { useState, type FormEvent } from "react";
import {
  commission,
  compoundInterest,
  discount,
  estimateFederalTax,
  formatMoney,
  formatPct,
  marginFromCost,
  parseNum,
  rmd,
  roundMoney,
  salesTax,
  straightLineDepreciation,
  takeHomePay,
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

export function RetirementCalculatorTool() {
  const [current, setCurrent] = useState("80000");
  const [monthly, setMonthly] = useState("600");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("25");
  const [out, setOut] = useState<ReturnType<typeof compoundInterest> | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const c = parseNum(current);
    const m = parseNum(monthly);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (c == null || m == null || r == null || y == null) return;
    setOut(
      compoundInterest({
        principal: c,
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
            label="Current savings"
            value={current}
            onChange={setCurrent}
            suffix="$"
          />
          <NumberField
            label="Monthly contribution"
            value={monthly}
            onChange={setMonthly}
            suffix="$"
          />
          <NumberField
            label="Expected return"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
          <NumberField
            label="Years to retirement"
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
              label="Projected nest egg"
              value={formatMoney(out.futureValue)}
            />
            <MetricGrid
              items={[
                {
                  label: "Contributed",
                  value: formatMoney(out.totalContrib),
                },
                { label: "Growth", value: formatMoney(out.interest) },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Project retirement savings with ongoing contributions." />
        )
      }
    />
  );
}

export function FourOhOneKCalculatorTool() {
  return <RetirementCalculatorTool />;
}
export function RothIraCalculatorTool() {
  return <RetirementCalculatorTool />;
}
export function IraCalculatorTool() {
  return <RetirementCalculatorTool />;
}
export function PensionCalculatorTool() {
  return <RetirementCalculatorTool />;
}

export function SocialSecurityCalculatorTool() {
  const [earnings, setEarnings] = useState("65000");
  const [claimAge, setClaimAge] = useState("67");
  const [out, setOut] = useState<{ monthly: number; note: string } | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const earn = parseNum(earnings);
    const age = parseNum(claimAge);
    if (earn == null || age == null) return;
    // Rough educational estimate: ~40% replacement at FRA, adjusted by claim age
    let factor = 0.4;
    if (age < 67) factor *= 0.7 + ((age - 62) / 5) * 0.3;
    if (age > 67) factor *= 1 + Math.min(age - 67, 3) * 0.08;
    const monthly = (earn * factor) / 12;
    setOut({
      monthly,
      note: "Rough educational estimate only — not SSA benefits.",
    });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Average annual earnings"
            value={earnings}
            onChange={setEarnings}
            suffix="$"
          />
          <NumberField
            label="Claim age"
            value={claimAge}
            onChange={setClaimAge}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Est. monthly benefit"
              value={formatMoney(out.monthly)}
              hint={out.note}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Get a rough Social Security benefit ballpark (not official)." />
        )
      }
    />
  );
}

export function RmdCalculatorTool() {
  const [balance, setBalance] = useState("450000");
  const [age, setAge] = useState("73");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const b = parseNum(balance);
    const a = parseNum(age);
    if (b == null || a == null) return;
    setOut(rmd(b, a));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Account balance"
            value={balance}
            onChange={setBalance}
            suffix="$"
          />
          <NumberField label="Age" value={age} onChange={setAge} suffix="years" />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Estimated RMD" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate required minimum distribution using a simplified life-expectancy factor." />
        )
      }
    />
  );
}

export function IncomeTaxCalculatorTool() {
  const [income, setIncome] = useState("85000");
  const [out, setOut] = useState<{ tax: number; effective: number } | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const i = parseNum(income);
    if (i == null) return;
    const taxable = Math.max(0, i - 14600);
    const tax = estimateFederalTax(taxable);
    setOut({ tax, effective: i > 0 ? (tax / i) * 100 : 0 });
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Taxable wages (approx)"
            value={income}
            onChange={setIncome}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Est. federal income tax"
              value={formatMoney(out.tax)}
              hint="Single filer, simplified brackets + standard deduction"
            />
            <MetricGrid
              items={[
                {
                  label: "Effective rate",
                  value: formatPct(out.effective),
                },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Rough US federal income tax estimate for a single filer." />
        )
      }
    />
  );
}

export function MarriageTaxCalculatorTool() {
  return <IncomeTaxCalculatorTool />;
}
export function EstateTaxCalculatorTool() {
  const [estate, setEstate] = useState("15000000");
  const [exemption, setExemption] = useState("13610000");
  const [rate, setRate] = useState("40");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const eAmt = parseNum(estate);
    const ex = parseNum(exemption);
    const r = parseNum(rate);
    if (eAmt == null || ex == null || r == null) return;
    setOut(Math.max(0, eAmt - ex) * (r / 100));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Taxable estate"
            value={estate}
            onChange={setEstate}
            suffix="$"
          />
          <NumberField
            label="Exemption"
            value={exemption}
            onChange={setExemption}
            suffix="$"
          />
          <NumberField
            label="Tax rate"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Est. estate tax" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Simple estate tax estimate above an exemption threshold." />
        )
      }
    />
  );
}

export function SalaryCalculatorTool() {
  return <TakeHomePaycheckCalculatorTool />;
}

export function TakeHomePaycheckCalculatorTool() {
  const [gross, setGross] = useState("90000");
  const [state, setState] = useState("5");
  const [pretax, setPretax] = useState("6000");
  const [out, setOut] = useState<ReturnType<typeof takeHomePay> | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const g = parseNum(gross);
    const s = parseNum(state);
    const p = parseNum(pretax);
    if (g == null || s == null || p == null) return;
    setOut(
      takeHomePay({
        grossAnnual: g,
        stateTaxPct: s,
        pretaxDeduction: p,
      }),
    );
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Gross annual salary"
            value={gross}
            onChange={setGross}
            suffix="$"
          />
          <NumberField
            label="State tax (approx)"
            value={state}
            onChange={setState}
            suffix="%"
          />
          <NumberField
            label="Pretax deductions"
            value={pretax}
            onChange={setPretax}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Take-home (monthly)"
              value={formatMoney(out.monthly)}
            />
            <MetricGrid
              items={[
                { label: "Annual net", value: formatMoney(out.annual) },
                { label: "Biweekly", value: formatMoney(out.biweekly) },
                { label: "Federal", value: formatMoney(out.federal) },
                { label: "FICA", value: formatMoney(out.fica) },
                { label: "State", value: formatMoney(out.state) },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Estimate take-home pay after federal, FICA, and state taxes." />
        )
      }
    />
  );
}

export function SalesTaxCalculatorTool() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("7.25");
  const [out, setOut] = useState<ReturnType<typeof salesTax> | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(amount);
    const r = parseNum(rate);
    if (a == null || r == null) return;
    setOut(salesTax(a, r));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Amount"
            value={amount}
            onChange={setAmount}
            suffix="$"
          />
          <NumberField
            label="Sales tax"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Total with tax" value={formatMoney(out.total)} />
            <MetricGrid
              items={[{ label: "Tax", value: formatMoney(out.tax) }]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Add sales tax to a purchase amount." />
        )
      }
    />
  );
}

export function VatCalculatorTool() {
  return <SalesTaxCalculatorTool />;
}

export function DiscountCalculatorTool() {
  const [price, setPrice] = useState("80");
  const [pct, setPct] = useState("25");
  const [out, setOut] = useState<ReturnType<typeof discount> | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = parseNum(price);
    const d = parseNum(pct);
    if (p == null || d == null) return;
    setOut(discount(p, d));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Original price"
            value={price}
            onChange={setPrice}
            suffix="$"
          />
          <NumberField
            label="Discount"
            value={pct}
            onChange={setPct}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Sale price"
              value={formatMoney(out.finalPrice)}
            />
            <MetricGrid
              items={[{ label: "You save", value: formatMoney(out.saved) }]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Calculate a discounted sale price." />
        )
      }
    />
  );
}

export function MarginCalculatorTool() {
  const [cost, setCost] = useState("40");
  const [margin, setMargin] = useState("35");
  const [out, setOut] = useState<ReturnType<typeof marginFromCost> | null>(
    null,
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const c = parseNum(cost);
    const m = parseNum(margin);
    if (c == null || m == null) return;
    setOut(marginFromCost(c, m));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField label="Cost" value={cost} onChange={setCost} suffix="$" />
          <NumberField
            label="Desired margin"
            value={margin}
            onChange={setMargin}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle label="Sell price" value={formatMoney(out.price)} />
            <MetricGrid
              items={[{ label: "Profit", value: formatMoney(out.profit) }]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Price a product from cost and target margin." />
        )
      }
    />
  );
}

export function CommissionCalculatorTool() {
  const [sales, setSales] = useState("25000");
  const [rate, setRate] = useState("8");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const s = parseNum(sales);
    const r = parseNum(rate);
    if (s == null || r == null) return;
    setOut(commission(s, r));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Sales"
            value={sales}
            onChange={setSales}
            suffix="$"
          />
          <NumberField
            label="Commission rate"
            value={rate}
            onChange={setRate}
            suffix="%"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle label="Commission" value={formatMoney(out)} />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Calculate sales commission." />
        )
      }
    />
  );
}

export function DepreciationCalculatorTool() {
  const [cost, setCost] = useState("30000");
  const [salvage, setSalvage] = useState("3000");
  const [years, setYears] = useState("5");
  const [out, setOut] = useState<ReturnType<
    typeof straightLineDepreciation
  > | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const c = parseNum(cost);
    const s = parseNum(salvage);
    const y = parseNum(years);
    if (c == null || s == null || y == null || y <= 0) return;
    setOut(straightLineDepreciation(c, s, y));
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Asset cost"
            value={cost}
            onChange={setCost}
            suffix="$"
          />
          <NumberField
            label="Salvage value"
            value={salvage}
            onChange={setSalvage}
            suffix="$"
          />
          <NumberField
            label="Useful life"
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
              label="Annual depreciation"
              value={formatMoney(out.annual)}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Straight-line depreciation per year." />
        )
      }
    />
  );
}

export function CurrencyCalculatorTool() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("1.08");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const a = parseNum(amount);
    const r = parseNum(rate);
    if (a == null || r == null) return;
    setOut(a * r);
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Amount"
            value={amount}
            onChange={setAmount}
          />
          <NumberField
            label="Exchange rate"
            value={rate}
            onChange={setRate}
            step="0.0001"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Converted amount"
              value={roundMoney(out, 4).toLocaleString("en-US")}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Convert currency with a rate you provide (no live FX feed)." />
        )
      }
    />
  );
}

export function CollegeCostCalculatorTool() {
  const [tuition, setTuition] = useState("25000");
  const [inflation, setInflation] = useState("4");
  const [yearsAway, setYearsAway] = useState("10");
  const [yearsInCollege, setYearsInCollege] = useState("4");
  const [out, setOut] = useState<number | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const t = parseNum(tuition);
    const inf = parseNum(inflation);
    const away = parseNum(yearsAway);
    const college = parseNum(yearsInCollege);
    if (t == null || inf == null || away == null || college == null) return;
    let total = 0;
    for (let y = 0; y < college; y += 1) {
      total += t * (1 + inf / 100) ** (away + y);
    }
    setOut(total);
  }

  return (
    <CalcShell
      form={
        <FinanceForm onSubmit={onSubmit}>
          <NumberField
            label="Current annual cost"
            value={tuition}
            onChange={setTuition}
            suffix="$"
          />
          <NumberField
            label="Cost inflation"
            value={inflation}
            onChange={setInflation}
            suffix="%"
          />
          <NumberField
            label="Years until college"
            value={yearsAway}
            onChange={setYearsAway}
            suffix="years"
          />
          <NumberField
            label="Years in college"
            value={yearsInCollege}
            onChange={setYearsInCollege}
            suffix="years"
          />
        </FinanceForm>
      }
      result={
        out != null ? (
          <div>
            <ResultTitle
              label="Projected total cost"
              value={formatMoney(out)}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Project multi-year college costs with inflation." />
        )
      }
    />
  );
}

export function BudgetCalculatorTool() {
  const [income, setIncome] = useState("5500");
  const [housing, setHousing] = useState("1650");
  const [food, setFood] = useState("600");
  const [transport, setTransport] = useState("400");
  const [other, setOther] = useState("800");
  const [out, setOut] = useState<{
    expenses: number;
    leftover: number;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const i = parseNum(income);
    const h = parseNum(housing) ?? 0;
    const f = parseNum(food) ?? 0;
    const t = parseNum(transport) ?? 0;
    const o = parseNum(other) ?? 0;
    if (i == null) return;
    const expenses = h + f + t + o;
    setOut({ expenses, leftover: i - expenses });
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
            label="Housing"
            value={housing}
            onChange={setHousing}
            suffix="$"
          />
          <NumberField label="Food" value={food} onChange={setFood} suffix="$" />
          <NumberField
            label="Transport"
            value={transport}
            onChange={setTransport}
            suffix="$"
          />
          <NumberField
            label="Other"
            value={other}
            onChange={setOther}
            suffix="$"
          />
        </FinanceForm>
      }
      result={
        out ? (
          <div>
            <ResultTitle
              label="Left after expenses"
              value={formatMoney(out.leftover)}
            />
            <MetricGrid
              items={[
                { label: "Total expenses", value: formatMoney(out.expenses) },
              ]}
            />
            <FinanceDisclaimer />
          </div>
        ) : (
          <EmptyResult text="Balance monthly income against major expense categories." />
        )
      }
    />
  );
}
