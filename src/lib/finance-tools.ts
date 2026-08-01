import type { ToolDefinition } from "@/lib/tool-types";

const faqPrivate = {
  question: "Is my financial data stored?",
  answer:
    "No. Calculations run in your browser. Nothing you enter is uploaded to our servers.",
};

const faqAdvice = {
  question: "Is this financial advice?",
  answer:
    "No. These calculators provide educational estimates only. For decisions about loans, taxes, or investments, consult a qualified professional.",
};

function fin(
  partial: Omit<ToolDefinition, "category" | "faqs"> & {
    faqs?: ToolDefinition["faqs"];
    featured?: boolean;
  },
): ToolDefinition {
  return {
    ...partial,
    category: "finance",
    faqs: [
      ...(partial.faqs ?? [
        {
          question: `How does the ${partial.shortName} calculator work?`,
          answer: partial.description,
        },
      ]),
      faqPrivate,
      faqAdvice,
    ],
  };
}

export const financeTools: ToolDefinition[] = [
  fin({
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    shortName: "Mortgage",
    description:
      "Free mortgage calculator to estimate monthly principal and interest payments for a home loan.",
    longDescription:
      "Enter loan amount, interest rate, and term to estimate monthly mortgage payments, total interest, and total amount paid over the life of the loan.",
    keywords: ["mortgage calculator", "home loan payment", "monthly mortgage"],
    featured: true,
  }),
  fin({
    slug: "amortization-calculator",
    name: "Amortization Calculator",
    shortName: "Amortization",
    description:
      "Build a loan amortization schedule and preview principal, interest, and remaining balance by month.",
    longDescription:
      "See how each payment splits between interest and principal, and how your balance declines over time.",
    keywords: ["amortization calculator", "amortization schedule", "loan schedule"],
  }),
  fin({
    slug: "mortgage-payoff-calculator",
    name: "Mortgage Payoff Calculator",
    shortName: "Payoff",
    description:
      "See how extra monthly payments can shorten your mortgage and reduce total interest.",
    longDescription:
      "Compare standard payoff time against a plan with extra principal payments to estimate months and interest saved.",
    keywords: ["mortgage payoff", "extra payment calculator", "pay off mortgage faster"],
  }),
  fin({
    slug: "house-affordability-calculator",
    name: "House Affordability Calculator",
    shortName: "Affordability",
    description:
      "Estimate how much house you can afford based on income, debts, rate, and down payment.",
    longDescription:
      "Uses a common debt-to-income guideline to estimate maximum monthly payment, loan size, and home price.",
    keywords: ["house affordability", "how much house can I afford", "home budget"],
    featured: true,
  }),
  fin({
    slug: "rent-calculator",
    name: "Rent Calculator",
    shortName: "Rent",
    description:
      "Budget an affordable rent from monthly income using a rent-to-income percentage.",
    longDescription:
      "Apply a customizable percentage of income (often around 30%) to estimate a rent budget.",
    keywords: ["rent calculator", "rent budget", "how much rent can I afford"],
  }),
  fin({
    slug: "debt-to-income-ratio-calculator",
    name: "Debt-to-Income Ratio Calculator",
    shortName: "DTI",
    description:
      "Calculate your debt-to-income ratio from monthly debt payments and gross income.",
    longDescription:
      "DTI is widely used by lenders. Enter monthly obligations and income to see your ratio as a percentage.",
    keywords: ["debt to income", "DTI calculator", "debt ratio"],
  }),
  fin({
    slug: "real-estate-calculator",
    name: "Real Estate Calculator",
    shortName: "Real Estate",
    description:
      "Estimate home buying power for real estate planning using income and loan assumptions.",
    longDescription:
      "A practical affordability-style calculator for buyers estimating purchase capacity.",
    keywords: ["real estate calculator", "home buying calculator"],
  }),
  fin({
    slug: "refinance-calculator",
    name: "Refinance Calculator",
    shortName: "Refinance",
    description:
      "Compare current vs new mortgage payments and estimate refinance break-even months.",
    longDescription:
      "Enter balance, rates, term, and closing costs to see monthly savings and when costs are recovered.",
    keywords: ["refinance calculator", "mortgage refinance", "refi break even"],
  }),
  fin({
    slug: "rental-property-calculator",
    name: "Rental Property Calculator",
    shortName: "Rental",
    description:
      "Estimate rental property cap rate and monthly cash flow from rent, expenses, and price.",
    longDescription:
      "Quick investment screening for landlords comparing income properties.",
    keywords: ["rental property calculator", "cap rate calculator", "cash flow rental"],
  }),
  fin({
    slug: "apr-calculator",
    name: "APR Calculator",
    shortName: "APR",
    description:
      "Estimate payments for a loan using an APR-style annual interest rate and term.",
    longDescription:
      "Useful for comparing financed purchases when you know the APR and amount financed.",
    keywords: ["APR calculator", "annual percentage rate", "loan APR"],
  }),
  fin({
    slug: "fha-loan-calculator",
    name: "FHA Loan Calculator",
    shortName: "FHA",
    description:
      "Estimate monthly payments for an FHA-style home loan amount, rate, and term.",
    longDescription:
      "Educational payment estimate for FHA purchase scenarios. MIP and fees are not fully modeled.",
    keywords: ["FHA loan calculator", "FHA mortgage payment"],
  }),
  fin({
    slug: "va-mortgage-calculator",
    name: "VA Mortgage Calculator",
    shortName: "VA",
    description:
      "Estimate VA mortgage principal and interest payments from loan amount, rate, and term.",
    longDescription:
      "Educational VA loan payment estimate. Funding fee and eligibility rules are not included.",
    keywords: ["VA mortgage calculator", "VA loan payment"],
  }),
  fin({
    slug: "home-equity-loan-calculator",
    name: "Home Equity Loan Calculator",
    shortName: "HEL",
    description:
      "Estimate monthly payments on a fixed home equity loan.",
    longDescription:
      "Enter amount, rate, and term to project payments and total interest for a HEL.",
    keywords: ["home equity loan calculator", "HEL payment"],
  }),
  fin({
    slug: "heloc-calculator",
    name: "HELOC Calculator",
    shortName: "HELOC",
    description:
      "Estimate payments on a drawn HELOC balance using rate and repayment term assumptions.",
    longDescription:
      "Models a drawn balance as an amortizing loan for educational payment estimates.",
    keywords: ["HELOC calculator", "home equity line of credit"],
  }),
  fin({
    slug: "down-payment-calculator",
    name: "Down Payment Calculator",
    shortName: "Down Payment",
    description:
      "Convert home price and down-payment percent into cash needed and loan amount.",
    longDescription:
      "Quickly see how much you need at closing for a given down-payment percentage.",
    keywords: ["down payment calculator", "how much down payment"],
  }),
  fin({
    slug: "rent-vs-buy-calculator",
    name: "Rent vs. Buy Calculator",
    shortName: "Rent vs Buy",
    description:
      "Compare monthly rent against estimated mortgage principal and interest.",
    longDescription:
      "A first-pass comparison of renting versus buying using payment estimates (excludes taxes, insurance, maintenance).",
    keywords: ["rent vs buy", "rent or buy calculator"],
  }),
  fin({
    slug: "auto-loan-calculator",
    name: "Auto Loan Calculator",
    shortName: "Auto Loan",
    description:
      "Estimate car loan monthly payments, total interest, and total cost.",
    longDescription:
      "Enter vehicle loan amount, APR, and term to plan a car purchase or refinance.",
    keywords: ["auto loan calculator", "car payment calculator", "vehicle loan"],
    featured: true,
  }),
  fin({
    slug: "cash-back-or-low-interest-calculator",
    name: "Cash Back or Low Interest Calculator",
    shortName: "Cash Back vs APR",
    description:
      "Compare dealer cash-back plus higher APR versus a low-interest financing offer.",
    longDescription:
      "See which auto finance deal costs less over the full term.",
    keywords: ["cash back or low interest", "dealer rebate vs APR"],
  }),
  fin({
    slug: "auto-lease-calculator",
    name: "Auto Lease Calculator",
    shortName: "Auto Lease",
    description:
      "Estimate a car lease payment from cap cost, residual value, money factor, and term.",
    longDescription:
      "Uses a standard depreciation + finance fee lease payment model.",
    keywords: ["auto lease calculator", "car lease payment"],
  }),
  fin({
    slug: "interest-calculator",
    name: "Interest Calculator",
    shortName: "Interest",
    description:
      "Project interest growth on savings or investments with optional monthly deposits.",
    longDescription:
      "Compound interest projection for planning savings goals.",
    keywords: ["interest calculator", "interest growth"],
  }),
  fin({
    slug: "investment-calculator",
    name: "Investment Calculator",
    shortName: "Investment",
    description:
      "Estimate future investment value from starting balance, return rate, and contributions.",
    longDescription:
      "Simple portfolio growth model for long-term investing scenarios.",
    keywords: ["investment calculator", "investment growth"],
    featured: true,
  }),
  fin({
    slug: "finance-calculator",
    name: "Finance Calculator",
    shortName: "Finance",
    description:
      "General-purpose finance growth calculator for balances with recurring deposits.",
    longDescription:
      "Model compound growth for personal finance planning.",
    keywords: ["finance calculator", "personal finance calculator"],
  }),
  fin({
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    shortName: "Compound Interest",
    description:
      "Calculate compound interest and future value with monthly contributions.",
    longDescription:
      "See how compounding and regular deposits grow money over time.",
    keywords: ["compound interest calculator", "compound growth"],
    featured: true,
  }),
  fin({
    slug: "interest-rate-calculator",
    name: "Interest Rate Calculator",
    shortName: "Rate",
    description:
      "Solve for annualized growth rate (CAGR) between a start and end value.",
    longDescription:
      "Useful for reverse-engineering the rate earned over a period of years.",
    keywords: ["interest rate calculator", "CAGR calculator"],
  }),
  fin({
    slug: "savings-calculator",
    name: "Savings Calculator",
    shortName: "Savings",
    description:
      "Project savings balance with starting amount, return, and monthly deposits.",
    longDescription:
      "Plan emergency funds and savings goals with compound growth.",
    keywords: ["savings calculator", "savings goal calculator"],
  }),
  fin({
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    shortName: "Simple Interest",
    description:
      "Calculate simple interest using principal × rate × time.",
    longDescription:
      "Classic I = PRT calculator for short-term or non-compounding scenarios.",
    keywords: ["simple interest calculator", "I=PRT"],
  }),
  fin({
    slug: "cd-calculator",
    name: "CD Calculator",
    shortName: "CD",
    description:
      "Estimate certificate of deposit maturity value from rate and term.",
    longDescription:
      "Educational CD growth estimate using compound interest assumptions.",
    keywords: ["CD calculator", "certificate of deposit calculator"],
  }),
  fin({
    slug: "bond-calculator",
    name: "Bond Calculator",
    shortName: "Bond",
    description:
      "Price a bond from face value, coupon rate, yield to maturity, and years.",
    longDescription:
      "Present-value bond pricing with semi-annual coupon assumptions.",
    keywords: ["bond calculator", "bond price", "YTM"],
  }),
  fin({
    slug: "mutual-fund-calculator",
    name: "Mutual Fund Calculator",
    shortName: "Mutual Fund",
    description:
      "Project mutual fund growth from contributions and assumed annual return.",
    longDescription:
      "Long-term mutual fund savings projection for educational planning.",
    keywords: ["mutual fund calculator", "fund growth"],
  }),
  fin({
    slug: "average-return-calculator",
    name: "Average Return Calculator",
    shortName: "Avg Return",
    description:
      "Calculate annualized average return between beginning and ending portfolio values.",
    longDescription:
      "Uses CAGR to express multi-year performance as a yearly rate.",
    keywords: ["average return calculator", "annualized return"],
  }),
  fin({
    slug: "irr-calculator",
    name: "IRR Calculator",
    shortName: "IRR",
    description:
      "Estimate internal rate of return from a series of yearly cash flows.",
    longDescription:
      "Enter year 0 investment (negative) and subsequent returns to solve IRR.",
    keywords: ["IRR calculator", "internal rate of return"],
  }),
  fin({
    slug: "roi-calculator",
    name: "ROI Calculator",
    shortName: "ROI",
    description:
      "Measure return on investment as a percentage of cost.",
    longDescription:
      "Compare gain versus original investment cost.",
    keywords: ["ROI calculator", "return on investment"],
  }),
  fin({
    slug: "payback-period-calculator",
    name: "Payback Period Calculator",
    shortName: "Payback",
    description:
      "Estimate how many years until an investment is recovered from annual cash flow.",
    longDescription:
      "Simple payback period for projects and capital purchases.",
    keywords: ["payback period calculator", "investment payback"],
  }),
  fin({
    slug: "present-value-calculator",
    name: "Present Value Calculator",
    shortName: "PV",
    description:
      "Discount a future amount to present value at a chosen rate.",
    longDescription:
      "Time-value-of-money calculator for lump-sum present values.",
    keywords: ["present value calculator", "PV calculator"],
  }),
  fin({
    slug: "future-value-calculator",
    name: "Future Value Calculator",
    shortName: "FV",
    description:
      "Grow a present amount to future value at a constant annual rate.",
    longDescription:
      "Classic future value calculator for lump-sum compounding.",
    keywords: ["future value calculator", "FV calculator"],
  }),
  fin({
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    shortName: "Retirement",
    description:
      "Project retirement savings from current balance, contributions, and expected return.",
    longDescription:
      "Educational nest-egg projection for retirement planning.",
    keywords: ["retirement calculator", "retirement savings"],
    featured: true,
  }),
  fin({
    slug: "401k-calculator",
    name: "401K Calculator",
    shortName: "401(k)",
    description:
      "Estimate 401(k) growth from balance, monthly contributions, and return assumptions.",
    longDescription:
      "Workplace retirement account growth projection (does not model employer match details).",
    keywords: ["401k calculator", "401(k) calculator"],
  }),
  fin({
    slug: "pension-calculator",
    name: "Pension Calculator",
    shortName: "Pension",
    description:
      "Project pension-style savings growth with contributions and assumed return.",
    longDescription:
      "Simplified pension accumulation estimate for educational use.",
    keywords: ["pension calculator", "pension estimate"],
  }),
  fin({
    slug: "social-security-calculator",
    name: "Social Security Calculator",
    shortName: "Social Security",
    description:
      "Rough educational estimate of Social Security benefits from earnings and claim age.",
    longDescription:
      "Not an official SSA calculator — use for ballpark planning only.",
    keywords: ["social security calculator", "SS benefit estimate"],
  }),
  fin({
    slug: "annuity-calculator",
    name: "Annuity Calculator",
    shortName: "Annuity",
    description:
      "Calculate the future value of regular annuity contributions.",
    longDescription:
      "Grow monthly deposits into an estimated annuity balance.",
    keywords: ["annuity calculator", "annuity future value"],
  }),
  fin({
    slug: "annuity-payout-calculator",
    name: "Annuity Payout Calculator",
    shortName: "Annuity Payout",
    description:
      "Convert a lump sum into estimated monthly annuity payouts over a term.",
    longDescription:
      "Educational payout estimate using amortizing payment math.",
    keywords: ["annuity payout calculator", "annuity payment"],
  }),
  fin({
    slug: "roth-ira-calculator",
    name: "Roth IRA Calculator",
    shortName: "Roth IRA",
    description:
      "Project Roth IRA growth from contributions and assumed market return.",
    longDescription:
      "Educational Roth IRA accumulation estimate (contribution limits not enforced).",
    keywords: ["roth ira calculator", "roth ira growth"],
  }),
  fin({
    slug: "ira-calculator",
    name: "IRA Calculator",
    shortName: "IRA",
    description:
      "Estimate traditional IRA growth with deposits and expected return.",
    longDescription:
      "Long-term IRA balance projection for planning.",
    keywords: ["ira calculator", "traditional ira"],
  }),
  fin({
    slug: "rmd-calculator",
    name: "RMD Calculator",
    shortName: "RMD",
    description:
      "Estimate required minimum distribution using a simplified life-expectancy factor.",
    longDescription:
      "Educational RMD estimate — verify with current IRS tables and a tax advisor.",
    keywords: ["RMD calculator", "required minimum distribution"],
  }),
  fin({
    slug: "income-tax-calculator",
    name: "Income Tax Calculator",
    shortName: "Income Tax",
    description:
      "Rough US federal income tax estimate for a single filer using simplified brackets.",
    longDescription:
      "Educational tax ballpark only — not a substitute for tax software or a CPA.",
    keywords: ["income tax calculator", "federal tax estimator"],
  }),
  fin({
    slug: "salary-calculator",
    name: "Salary Calculator",
    shortName: "Salary",
    description:
      "Estimate take-home salary after federal, FICA, and approximate state taxes.",
    longDescription:
      "Convert gross annual pay into estimated net monthly and biweekly pay.",
    keywords: ["salary calculator", "net salary", "take home salary"],
  }),
  fin({
    slug: "marriage-tax-calculator",
    name: "Marriage Tax Calculator",
    shortName: "Marriage Tax",
    description:
      "Simplified federal tax estimate useful for comparing household income scenarios.",
    longDescription:
      "Educational estimate using simplified single-filer style brackets — verify filing jointly vs separately with a professional.",
    keywords: ["marriage tax calculator", "married filing tax"],
  }),
  fin({
    slug: "estate-tax-calculator",
    name: "Estate Tax Calculator",
    shortName: "Estate Tax",
    description:
      "Simple estate tax estimate above an exemption at a flat rate.",
    longDescription:
      "Educational model — actual estate tax rules are complex and change over time.",
    keywords: ["estate tax calculator", "inheritance tax estimate"],
  }),
  fin({
    slug: "take-home-paycheck-calculator",
    name: "Take-Home Paycheck Calculator",
    shortName: "Paycheck",
    description:
      "Estimate take-home paycheck amounts after taxes and pretax deductions.",
    longDescription:
      "See annual, monthly, and biweekly net pay estimates for US-style withholding.",
    keywords: ["paycheck calculator", "take home pay", "net pay calculator"],
    featured: true,
  }),
  fin({
    slug: "loan-calculator",
    name: "Loan Calculator",
    shortName: "Loan",
    description:
      "General loan payment calculator for principal, rate, and term.",
    longDescription:
      "Estimate monthly payment, total interest, and total cost for amortizing loans.",
    keywords: ["loan calculator", "loan payment calculator"],
    featured: true,
  }),
  fin({
    slug: "payment-calculator",
    name: "Payment Calculator",
    shortName: "Payment",
    description:
      "Calculate monthly payments for a financed purchase or personal loan.",
    longDescription:
      "Quick payment estimator from amount, APR, and years.",
    keywords: ["payment calculator", "monthly payment"],
  }),
  fin({
    slug: "currency-calculator",
    name: "Currency Calculator",
    shortName: "Currency",
    description:
      "Convert currency amounts using an exchange rate you provide.",
    longDescription:
      "No live FX feed — paste the rate you want to apply.",
    keywords: ["currency calculator", "currency converter", "exchange rate"],
  }),
  fin({
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    shortName: "Inflation",
    description:
      "See how inflation changes the future value and purchasing power of money.",
    longDescription:
      "Project inflated prices and eroded purchasing power over years.",
    keywords: ["inflation calculator", "purchasing power"],
  }),
  fin({
    slug: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    shortName: "Sales Tax",
    description:
      "Add sales tax to a purchase and see tax amount plus total.",
    longDescription:
      "Enter price and local tax rate for a quick checkout total.",
    keywords: ["sales tax calculator", "tax on purchase"],
  }),
  fin({
    slug: "credit-card-calculator",
    name: "Credit Card Calculator",
    shortName: "Credit Card",
    description:
      "Estimate credit card payoff time and interest from balance, APR, and payment.",
    longDescription:
      "See how long it takes to clear a balance at a fixed monthly payment.",
    keywords: ["credit card calculator", "credit card interest"],
    featured: true,
  }),
  fin({
    slug: "credit-cards-payoff-calculator",
    name: "Credit Cards Payoff Calculator",
    shortName: "Card Payoff",
    description:
      "Plan credit card debt payoff months and total interest paid.",
    longDescription:
      "Educational payoff timeline for revolving credit balances.",
    keywords: ["credit card payoff calculator", "pay off credit card"],
  }),
  fin({
    slug: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    shortName: "Debt Payoff",
    description:
      "Estimate months and interest to pay off high-interest debt.",
    longDescription:
      "Model fixed monthly payments against an APR until the balance is cleared.",
    keywords: ["debt payoff calculator", "pay off debt"],
  }),
  fin({
    slug: "debt-consolidation-calculator",
    name: "Debt Consolidation Calculator",
    shortName: "Consolidation",
    description:
      "Compare interest cost of existing debt APR versus a consolidation loan.",
    longDescription:
      "See potential interest savings if you refinance multiple debts into one rate.",
    keywords: ["debt consolidation calculator", "consolidate debt"],
  }),
  fin({
    slug: "repayment-calculator",
    name: "Repayment Calculator",
    shortName: "Repayment",
    description:
      "See how extra payments accelerate loan repayment and cut interest.",
    longDescription:
      "Useful for mortgages and other amortizing loans with optional extras.",
    keywords: ["repayment calculator", "loan repayment"],
  }),
  fin({
    slug: "student-loan-calculator",
    name: "Student Loan Calculator",
    shortName: "Student Loan",
    description:
      "Estimate student loan monthly payments and total interest.",
    longDescription:
      "Plan repayment for federal or private student loan balances using amortizing math.",
    keywords: ["student loan calculator", "student loan payment"],
  }),
  fin({
    slug: "college-cost-calculator",
    name: "College Cost Calculator",
    shortName: "College Cost",
    description:
      "Project multi-year college costs with tuition inflation.",
    longDescription:
      "Estimate total future college spend from current annual cost and years until enrollment.",
    keywords: ["college cost calculator", "tuition calculator"],
  }),
  fin({
    slug: "vat-calculator",
    name: "VAT Calculator",
    shortName: "VAT",
    description:
      "Add value-added tax (or similar) to a price and see tax plus total.",
    longDescription:
      "Works like a sales-tax adder for VAT-inclusive checkout math.",
    keywords: ["VAT calculator", "value added tax"],
  }),
  fin({
    slug: "depreciation-calculator",
    name: "Depreciation Calculator",
    shortName: "Depreciation",
    description:
      "Straight-line depreciation expense per year from cost, salvage, and useful life.",
    longDescription:
      "Simple accounting-style depreciation schedule estimate.",
    keywords: ["depreciation calculator", "straight line depreciation"],
  }),
  fin({
    slug: "margin-calculator",
    name: "Margin Calculator",
    shortName: "Margin",
    description:
      "Set a sell price from cost and desired profit margin percentage.",
    longDescription:
      "Retail and wholesale pricing helper for target margins.",
    keywords: ["margin calculator", "profit margin"],
  }),
  fin({
    slug: "discount-calculator",
    name: "Discount Calculator",
    shortName: "Discount",
    description:
      "Calculate sale price and savings from an original price and discount percent.",
    longDescription:
      "Quick markdown math for shopping and retail.",
    keywords: ["discount calculator", "sale price calculator"],
  }),
  fin({
    slug: "business-loan-calculator",
    name: "Business Loan Calculator",
    shortName: "Business Loan",
    description:
      "Estimate business loan payments, interest, and total cost.",
    longDescription:
      "Amortizing payment model for small business financing scenarios.",
    keywords: ["business loan calculator", "commercial loan payment"],
  }),
  fin({
    slug: "personal-loan-calculator",
    name: "Personal Loan Calculator",
    shortName: "Personal Loan",
    description:
      "Calculate personal loan monthly payments and total interest.",
    longDescription:
      "Plan installment loan costs before you borrow.",
    keywords: ["personal loan calculator", "personal loan payment"],
  }),
  fin({
    slug: "boat-loan-calculator",
    name: "Boat Loan Calculator",
    shortName: "Boat Loan",
    description:
      "Estimate boat loan payments from amount, rate, and term.",
    longDescription:
      "Marine financing payment estimate using standard amortizing math.",
    keywords: ["boat loan calculator", "boat payment"],
  }),
  fin({
    slug: "lease-calculator",
    name: "Lease Calculator",
    shortName: "Lease",
    description:
      "Estimate lease payments from capitalized cost, residual, money factor, and months.",
    longDescription:
      "General lease payment model suitable for auto and equipment leases.",
    keywords: ["lease calculator", "lease payment"],
  }),
  fin({
    slug: "budget-calculator",
    name: "Budget Calculator",
    shortName: "Budget",
    description:
      "Balance monthly income against housing, food, transport, and other expenses.",
    longDescription:
      "Simple household budget leftover calculator.",
    keywords: ["budget calculator", "monthly budget"],
  }),
  fin({
    slug: "commission-calculator",
    name: "Commission Calculator",
    shortName: "Commission",
    description:
      "Calculate sales commission from sales volume and commission rate.",
    longDescription:
      "Quick earnings estimate for sales roles and affiliate payouts.",
    keywords: ["commission calculator", "sales commission"],
  }),
];
