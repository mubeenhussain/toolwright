import { siteConfig } from "@/lib/site";
import type { ToolDefinition } from "@/lib/tool-types";
import { categories } from "@/lib/tools";

export type ToolSeoCopy = {
  /** Exact-match H1 companion line under the tool name */
  searchIntro: string;
  /** Meta / SERP title fragment (brand added by layout template) */
  title: string;
  /** Unique meta description ~150–160 chars */
  description: string;
  keywords: string[];
  whatIsHeading: string;
  whatIs: string;
  whoUsesHeading: string;
  whoUses: string;
  howHeading: string;
  howSteps: string[];
  benefitsHeading: string;
  benefits: string[];
  extraFaqs: { question: string; answer: string }[];
};

function primary(tool: ToolDefinition) {
  return tool.name;
}

function lower(tool: ToolDefinition) {
  return tool.name.toLowerCase();
}

/** Category-specific search intent language Google users expect. */
function intentBlurb(tool: ToolDefinition): string {
  switch (tool.category) {
    case "finance":
      return "estimate payments, interest, and totals before you talk to a lender";
    case "fitness":
      return "get a clear health-and-fitness estimate you can compare over time";
    case "pregnancy":
      return "plan dates and milestones with a private, browser-based estimate";
    case "nutrition":
      return "set realistic calorie and macro targets for your goals";
    case "text":
      return "transform or analyze text instantly without uploading files";
    case "developer":
      return "format, encode, or debug data locally in your browser";
    case "security":
      return "generate or hash values privately on your device";
    case "converters":
      return "convert formats accurately in seconds";
    case "generators":
      return "create sample data and IDs instantly";
    default:
      return "get an accurate answer in seconds";
  }
}

function whoAudience(tool: ToolDefinition): string {
  switch (tool.category) {
    case "finance":
      return "homebuyers, borrowers, investors, and anyone comparing loan or savings options online";
    case "fitness":
      return "people tracking BMI, training, or weight goals before a clinic visit or new program";
    case "pregnancy":
      return "expecting parents, partners, and anyone planning around an estimated due date";
    case "nutrition":
      return "anyone building a diet, cut, or maintenance plan who needs numbers—not guesswork";
    case "text":
      return "writers, students, marketers, and editors who need fast text metrics or transforms";
    case "developer":
      return "developers and technical users who want a quick local utility without installing software";
    default:
      return "people who need a fast, free answer without creating an account";
  }
}

/**
 * Hand-tuned overrides for high-volume queries (exact SEO priority).
 * Google ranks specific, helpful pages — not duplicate “free online tool” fluff.
 */
const overrides: Partial<Record<string, Partial<ToolSeoCopy>>> = {
  "age-calculator": {
    title: "Age Calculator",
    description:
      "Free Age Calculator - exact age from date of birth in years, months and days. Next birthday countdown. Private, instant, no signup.",
    keywords: [
      "age calculator",
      "calculate age",
      "age calculator online",
      "exact age calculator",
      "how old am I",
      "age from date of birth",
      "date of birth age calculator",
      "age calculator years months days",
      "free age calculator",
      "online age calculator",
    ],
    searchIntro:
      "Calculate your exact age online from your date of birth — years, months, days, and more in one click.",
    whatIsHeading: "What is an age calculator?",
    whatIs:
      "An age calculator finds how old someone is between a date of birth and today (or another date you choose). Searchers typing “age calculator” usually want an exact breakdown — not just years — including months and days, plus time lived and next-birthday countdown. Toolwright’s Age Calculator does that privately in your browser using the birthday-based system common in the US and most Western countries.",
    whoUsesHeading: "Who uses this Age Calculator?",
    whoUses:
      "People use an online age calculator for school forms, job applications, passport and visa paperwork, party planning, sports age groups, and “how old am I?” checks. Because everything runs locally, you can calculate age without uploading personal dates to a server.",
    howHeading: "How to use this Age Calculator",
    howSteps: [
      "Enter the date of birth (month, day, and year).",
      "Optionally set “Age at” to any date on or after the birth date.",
      "Read the exact age in years, months, and days — plus weeks, hours, minutes, and seconds lived.",
      "Check time until the next birthday if you are planning an event.",
    ],
    benefits: [
      "Exact age, not a rounded year-only guess",
      "Works for past or future “as of” dates",
      "Private — dates stay in your browser",
      "Free Age Calculator with no signup wall",
    ],
    extraFaqs: [
      {
        question: "What do people mean when they search “age calculator”?",
        answer:
          "They usually want exact age from a date of birth in years, months, and days — often for forms, eligibility, or curiosity — not a rough year estimate.",
      },
      {
        question: "Is this the same as a date of birth calculator?",
        answer:
          "Yes for most users. Enter DOB (and an optional “as of” date) to calculate age the way US and Western forms typically expect.",
      },
      {
        question: "Why choose Toolwright’s Age Calculator?",
        answer:
          "You get a detailed breakdown, next-birthday timing, and private browser math — free, with no account and no date storage.",
      },
    ],
  },
  "bmi-calculator": {
    title: "BMI Calculator",
    description:
      "Free BMI Calculator for adults — check body mass index from height and weight (US or metric). Instant category result, private, no signup.",
    keywords: [
      "bmi calculator",
      "body mass index calculator",
      "bmi calculator online",
      "calculate bmi",
      "bmi chart",
      "free bmi calculator",
    ],
    searchIntro:
      "Calculate BMI online from your height and weight — see the standard underweight, normal, overweight, or obesity category instantly.",
  },
  "mortgage-calculator": {
    title: "Mortgage Calculator",
    description:
      "Free Mortgage Calculator to estimate monthly house payments, total interest, and loan cost. Enter amount, rate & term — instant, no signup.",
    keywords: [
      "mortgage calculator",
      "mortgage payment calculator",
      "home loan calculator",
      "monthly mortgage payment",
      "free mortgage calculator",
    ],
    searchIntro:
      "Estimate your monthly mortgage payment from loan amount, interest rate, and term — principal and interest in seconds.",
  },
  "loan-calculator": {
    title: "Loan Calculator",
    description:
      "Free Loan Calculator for monthly payments, total interest, and total cost. Works for personal loans and amortizing debt — no signup.",
    searchIntro:
      "Calculate loan payments online before you borrow — see the monthly amount and total interest clearly.",
  },
  "calorie-calculator": {
    title: "Calorie Calculator",
    description:
      "Free Calorie Calculator for weight loss, maintenance, or gain using BMR and activity. Daily calorie targets — instant, no signup.",
    searchIntro:
      "Find how many calories to eat per day for loss, maintenance, or gain based on your stats and activity.",
  },
  "compound-interest-calculator": {
    title: "Compound Interest Calculator",
    description:
      "Free Compound Interest Calculator with optional monthly deposits. Project future value, contributions, and interest earned online.",
    searchIntro:
      "See how compound interest grows savings or investments over time — including regular monthly contributions.",
  },
  "due-date-calculator": {
    title: "Due Date Calculator",
    description:
      "Free pregnancy Due Date Calculator from last period or known dates. Estimate your baby’s due date privately — no signup.",
    searchIntro:
      "Estimate your pregnancy due date online and plan appointments, leave, and milestones with a clear target date.",
  },
  "word-counter": {
    title: "Word Counter",
    description:
      "Free online Word Counter — words, characters, sentences, and reading time as you type. Private text analysis, no signup.",
    searchIntro:
      "Count words and characters online instantly for essays, posts, SEO drafts, and captions.",
  },
  "password-generator": {
    title: "Password Generator",
    description:
      "Free strong Password Generator — create secure random passwords in your browser. Custom length and symbols, nothing uploaded.",
    searchIntro:
      "Generate a strong random password online without sending anything to a server.",
  },
  "tdee-calculator": {
    title: "TDEE Calculator",
    description:
      "Free TDEE Calculator to estimate total daily energy expenditure from BMR and activity. Plan calories with confidence.",
    searchIntro:
      "Calculate TDEE (maintenance calories) from your stats and activity level — then plan a surplus or deficit.",
  },
  "macro-calculator": {
    title: "Macro Calculator",
    description:
      "Free Macro Calculator for protein, carbs, and fat targets based on your calorie goal. Flexible dieting numbers in seconds.",
    searchIntro:
      "Get daily macro targets (protein, carbohydrates, and fat) matched to your calorie goal.",
  },
  "auto-loan-calculator": {
    title: "Auto Loan Calculator",
    description:
      "Free Auto Loan Calculator for car payment estimates, total interest, and total cost. Enter price, rate, and term.",
    searchIntro:
      "Estimate your monthly car payment before you finance — compare terms in seconds.",
  },
  "take-home-paycheck-calculator": {
    title: "Paycheck Calculator",
    description:
      "Free take-home Paycheck Calculator — estimate net pay after federal, FICA, and state tax. Monthly and biweekly views.",
    searchIntro:
      "Turn gross salary into estimated take-home pay so rent and budgets use real numbers.",
  },
};

function baseCopy(tool: ToolDefinition): ToolSeoCopy {
  const name = primary(tool);
  const l = lower(tool);
  const cat = categories[tool.category].label;

  return {
    title: name,
    description: `Free ${name} online. ${tool.description.replace(/\.$/, "")}. Instant results, private in your browser — no signup.`,
    keywords: Array.from(
      new Set([
        l,
        `free ${l}`,
        `online ${l}`,
        `${l} online`,
        `best ${l}`,
        `${tool.shortName.toLowerCase()} calculator`,
        ...tool.keywords,
      ]),
    ),
    searchIntro: `Free online ${l} to ${intentBlurb(tool)}. No signup — results stay on your device.`,
    whatIsHeading: `What is a ${l}?`,
    whatIs: `A ${l} is an online tool that helps you ${intentBlurb(tool)}. When people search Google for “${l}”, they want a fast, accurate result without creating an account or downloading software. ${tool.longDescription}`,
    whoUsesHeading: `Who searches for a ${l}?`,
    whoUses: `This ${name} is built for ${whoAudience(tool)}. It sits in our ${cat} collection on ${siteConfig.name}, so you can jump to related calculators without leaving the site.`,
    howHeading: `How to use this ${name}`,
    howSteps: [
      `Open the free ${name} on this page.`,
      "Enter the values asked for in the form (amounts, dates, measurements, or text — depending on the tool).",
      "Calculate and review the instant result and any breakdown shown.",
      "Adjust inputs to compare scenarios, then use related tools if you need a full plan.",
    ],
    benefitsHeading: `Why use ${siteConfig.name}’s ${name}`,
    benefits: [
      `Dedicated ${name} URL optimized for the “${l}” search`,
      "Free to use with no signup wall",
      "Private browser-side calculation",
      "Clear results above distracting clutter",
      "Related tools and guides on the same site",
    ],
    extraFaqs: [
      {
        question: `Is this ${name} free?`,
        answer: `Yes. The ${name} on ${siteConfig.name} is free to use with no account required.`,
      },
      {
        question: `Does the ${name} save my data?`,
        answer:
          "No. Calculations run in your browser. We do not upload your inputs to store them for the calculator result.",
      },
      {
        question: `How is this ${name} different from random aggregator sites?`,
        answer: `${siteConfig.name} puts the ${name} first — fast inputs, clear results, and related tools nearby — instead of burying the calculator under pop-ups and signup walls.`,
      },
    ],
  };
}

/** Unique, search-intent copy for every tool page. */
export function getToolSeoCopy(tool: ToolDefinition): ToolSeoCopy {
  const base = baseCopy(tool);
  const over = overrides[tool.slug];
  if (!over) return base;
  return {
    ...base,
    ...over,
    keywords: over.keywords ?? base.keywords,
    howSteps: over.howSteps ?? base.howSteps,
    benefits: over.benefits ?? base.benefits,
    extraFaqs: over.extraFaqs ?? base.extraFaqs,
  };
}

export function buildToolTitle(tool: ToolDefinition) {
  const copy = getToolSeoCopy(tool);
  const t = copy.title.trim();
  // Competitor-style SERP titles: "Free Age Calculator Online"
  if (/^free\b/i.test(t)) {
    return /online$/i.test(t) ? t : `${t} Online`;
  }
  if (t.length <= 36) return `Free ${t} Online`;
  if (t.length <= 48) return `Free ${t}`;
  return t;
}

export function buildToolDescription(tool: ToolDefinition) {
  const d = getToolSeoCopy(tool).description.trim();
  if (d.length <= 158) return d;
  return `${d.slice(0, 155).replace(/\s+\S*$/, "")}…`;
}

export function buildToolKeywords(tool: ToolDefinition) {
  return getToolSeoCopy(tool).keywords;
}

export function mergeFaqs(tool: ToolDefinition) {
  const extra = getToolSeoCopy(tool).extraFaqs;
  const seen = new Set(tool.faqs.map((f) => f.question.toLowerCase()));
  const merged = [...tool.faqs];
  for (const f of extra) {
    if (!seen.has(f.question.toLowerCase())) merged.push(f);
  }
  return merged;
}
