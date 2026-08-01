export function roundMoney(value: number, digits = 2) {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}

export function formatMoney(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(value: number, digits = 2) {
  return `${roundMoney(value, digits)}%`;
}

/** Standard amortizing loan payment (monthly). */
export function loanPayment(principal: number, annualRatePct: number, years: number) {
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
}

export function loanSummary(principal: number, annualRatePct: number, years: number) {
  const payment = loanPayment(principal, annualRatePct, years);
  const n = years * 12;
  const totalPaid = payment * n;
  return {
    payment,
    totalPaid,
    totalInterest: totalPaid - principal,
    months: n,
  };
}

export type AmortRow = {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  years: number,
  extraMonthly = 0,
): AmortRow[] {
  const r = annualRatePct / 100 / 12;
  let balance = principal;
  const base = loanPayment(principal, annualRatePct, years);
  const payment = base + extraMonthly;
  const rows: AmortRow[] = [];
  let period = 0;
  while (balance > 0.01 && period < years * 12 + 600) {
    period += 1;
    const interest = balance * r;
    let principalPart = payment - interest;
    if (principalPart > balance) principalPart = balance;
    const actualPayment = principalPart + interest;
    balance = Math.max(0, balance - principalPart);
    rows.push({
      period,
      payment: actualPayment,
      principal: principalPart,
      interest,
      balance,
    });
    if (principalPart <= 0 && interest > 0 && extraMonthly <= 0) break;
  }
  return rows;
}

export function remainingBalance(
  principal: number,
  annualRatePct: number,
  years: number,
  paymentsMade: number,
) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  const pmt = loanPayment(principal, annualRatePct, years);
  if (r === 0) return Math.max(0, principal - pmt * paymentsMade);
  return (
    principal * (1 + r) ** paymentsMade -
    (pmt * ((1 + r) ** paymentsMade - 1)) / r
  );
}

export function compoundInterest(params: {
  principal: number;
  annualRatePct: number;
  years: number;
  compoundsPerYear: number;
  monthlyContribution?: number;
}) {
  const { principal, annualRatePct, years, compoundsPerYear } = params;
  const monthly = params.monthlyContribution ?? 0;
  const r = annualRatePct / 100;
  const n = compoundsPerYear;
  const t = years;
  const compoundPart = principal * (1 + r / n) ** (n * t);
  if (monthly <= 0) {
    return { futureValue: compoundPart, totalContrib: principal, interest: compoundPart - principal };
  }
  // Approximate monthly contributions with monthly compounding
  const rm = r / 12;
  const months = years * 12;
  let balance = principal;
  for (let i = 0; i < months; i += 1) {
    balance = balance * (1 + rm) + monthly;
  }
  const totalContrib = principal + monthly * months;
  return {
    futureValue: balance,
    totalContrib,
    interest: balance - totalContrib,
  };
}

export function simpleInterest(principal: number, annualRatePct: number, years: number) {
  const interest = principal * (annualRatePct / 100) * years;
  return { interest, total: principal + interest };
}

export function futureValue(present: number, annualRatePct: number, years: number) {
  return present * (1 + annualRatePct / 100) ** years;
}

export function presentValue(future: number, annualRatePct: number, years: number) {
  return future / (1 + annualRatePct / 100) ** years;
}

export function roi(gain: number, cost: number) {
  if (cost === 0) return 0;
  return ((gain - cost) / cost) * 100;
}

export function paybackPeriod(initialInvestment: number, annualCashFlow: number) {
  if (annualCashFlow <= 0) return Infinity;
  return initialInvestment / annualCashFlow;
}

/** IRR via Newton-Raphson on irregular-period annual cash flows simplified to equal periods */
export function irr(cashFlows: number[], guess = 0.1) {
  let rate = guess;
  for (let i = 0; i < 50; i += 1) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cashFlows.length; t += 1) {
      const denom = (1 + rate) ** t;
      npv += cashFlows[t] / denom;
      if (t > 0) dnpv -= (t * cashFlows[t]) / (1 + rate) ** (t + 1);
    }
    if (Math.abs(dnpv) < 1e-12) break;
    const next = rate - npv / dnpv;
    if (!Number.isFinite(next)) break;
    if (Math.abs(next - rate) < 1e-8) return next * 100;
    rate = next;
  }
  return rate * 100;
}

export function cagr(begin: number, end: number, years: number) {
  if (begin <= 0 || years <= 0) return 0;
  return ((end / begin) ** (1 / years) - 1) * 100;
}

export function inflationAdjust(amount: number, annualInflationPct: number, years: number) {
  const future = amount * (1 + annualInflationPct / 100) ** years;
  const purchasingPower = amount / (1 + annualInflationPct / 100) ** years;
  return { future, purchasingPower };
}

export function salesTax(amount: number, taxPct: number) {
  const tax = amount * (taxPct / 100);
  return { tax, total: amount + tax };
}

export function discount(price: number, discountPct: number) {
  const saved = price * (discountPct / 100);
  return { saved, finalPrice: price - saved };
}

export function marginFromCost(cost: number, marginPct: number) {
  const price = cost / (1 - marginPct / 100);
  return { price, profit: price - cost };
}

export function commission(sales: number, ratePct: number) {
  return sales * (ratePct / 100);
}

export function debtToIncome(monthlyDebt: number, monthlyIncome: number) {
  if (monthlyIncome <= 0) return 0;
  return (monthlyDebt / monthlyIncome) * 100;
}

export function houseAffordability(params: {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  annualRatePct: number;
  years: number;
  dtiLimit?: number;
}) {
  const dti = params.dtiLimit ?? 36;
  const maxHousing = (params.annualIncome / 12) * (dti / 100) - params.monthlyDebts;
  if (maxHousing <= 0) return { maxPayment: 0, maxLoan: 0, maxHome: 0 };
  const r = params.annualRatePct / 100 / 12;
  const n = params.years * 12;
  const maxLoan =
    r === 0
      ? maxHousing * n
      : maxHousing * ((1 + r) ** n - 1) / (r * (1 + r) ** n);
  return {
    maxPayment: maxHousing,
    maxLoan,
    maxHome: maxLoan + params.downPayment,
  };
}

export function downPayment(homePrice: number, percent: number) {
  const down = homePrice * (percent / 100);
  return { down, loan: homePrice - down };
}

export function creditCardPayoff(
  balance: number,
  aprPct: number,
  monthlyPayment: number,
) {
  const r = aprPct / 100 / 12;
  let bal = balance;
  let months = 0;
  let interest = 0;
  if (monthlyPayment <= bal * r) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  while (bal > 0.01 && months < 1200) {
    const i = bal * r;
    interest += i;
    bal = bal + i - monthlyPayment;
    months += 1;
  }
  return {
    months,
    totalInterest: interest,
    totalPaid: balance + interest,
  };
}

export function minPaymentEstimate(balance: number, aprPct: number, minPct = 2) {
  const interest = balance * (aprPct / 100 / 12);
  return Math.max(25, balance * (minPct / 100), interest + 1);
}

/** Straight-line depreciation */
export function straightLineDepreciation(cost: number, salvage: number, years: number) {
  const annual = (cost - salvage) / years;
  return { annual, schedule: Array.from({ length: years }, (_, i) => ({
    year: i + 1,
    expense: annual,
    book: cost - annual * (i + 1),
  })) };
}

export function annuityPayment(principal: number, annualRatePct: number, years: number) {
  return loanPayment(principal, annualRatePct, years);
}

export function annuityFutureValue(
  monthlyContribution: number,
  annualRatePct: number,
  years: number,
) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyContribution * n;
  return monthlyContribution * (((1 + r) ** n - 1) / r);
}

/** IRS Uniform Lifetime Table approximation factor by age (simplified) */
export function rmdFactor(age: number) {
  const table: Record<number, number> = {
    72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0,
    79: 21.1, 80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0,
    86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8,
    93: 10.1, 94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4,
  };
  if (table[age]) return table[age];
  if (age < 72) return 27.4;
  return Math.max(5, 27.4 - (age - 72) * 0.9);
}

export function rmd(balance: number, age: number) {
  const factor = rmdFactor(age);
  return balance / factor;
}

/** Very simplified US federal tax estimate (single, 2024-ish brackets) */
export function estimateFederalTax(taxableIncome: number) {
  const brackets = [
    { upTo: 11600, rate: 0.1 },
    { upTo: 47150, rate: 0.12 },
    { upTo: 100525, rate: 0.22 },
    { upTo: 191950, rate: 0.24 },
    { upTo: 243725, rate: 0.32 },
    { upTo: 609350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ];
  let remaining = taxableIncome;
  let prev = 0;
  let tax = 0;
  for (const b of brackets) {
    const chunk = Math.min(remaining, b.upTo - prev);
    if (chunk <= 0) break;
    tax += chunk * b.rate;
    remaining -= chunk;
    prev = b.upTo;
  }
  return tax;
}

export function takeHomePay(params: {
  grossAnnual: number;
  filingSingle?: boolean;
  stateTaxPct?: number;
  pretaxDeduction?: number;
}) {
  const gross = params.grossAnnual;
  const pretax = params.pretaxDeduction ?? 0;
  const taxable = Math.max(0, gross - pretax - 14600); // rough standard deduction single
  const federal = estimateFederalTax(taxable);
  const fica = Math.min(gross, 168600) * 0.062 + gross * 0.0145;
  const state = gross * ((params.stateTaxPct ?? 5) / 100);
  const annual = gross - pretax - federal - fica - state;
  return {
    annual,
    monthly: annual / 12,
    biweekly: annual / 26,
    federal,
    fica,
    state,
  };
}

export function leasePayment(params: {
  capCost: number;
  residualValue: number;
  moneyFactor: number;
  months: number;
  fees?: number;
}) {
  const dep = (params.capCost - params.residualValue) / params.months;
  const finance = (params.capCost + params.residualValue) * params.moneyFactor;
  return dep + finance + (params.fees ?? 0) / params.months;
}

export function bondPrice(params: {
  face: number;
  couponPct: number;
  ytmPct: number;
  years: number;
  frequency?: number;
}) {
  const freq = params.frequency ?? 2;
  const n = params.years * freq;
  const c = (params.face * (params.couponPct / 100)) / freq;
  const y = params.ytmPct / 100 / freq;
  let pvCoupons = 0;
  for (let t = 1; t <= n; t += 1) {
    pvCoupons += c / (1 + y) ** t;
  }
  const pvFace = params.face / (1 + y) ** n;
  return pvCoupons + pvFace;
}

export function parseNum(value: string) {
  const n = Number(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
