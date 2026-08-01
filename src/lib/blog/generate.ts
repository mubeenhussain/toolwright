import { coverForTool } from "@/lib/blog/images";
import type { BlogPost, BlogSection } from "@/lib/blog/types";
import type { ToolDefinition } from "@/lib/tool-types";

function stableDayOffset(seed: string, max = 200) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % max;
}

function datesFor(slug: string) {
  const base = new Date("2025-11-01T12:00:00.000Z");
  base.setUTCDate(base.getUTCDate() + stableDayOffset(slug, 240));
  const publishedAt = base.toISOString();
  const updated = new Date(base);
  updated.setUTCDate(updated.getUTCDate() + 14 + (stableDayOffset(slug, 40)));
  return { publishedAt, updatedAt: updated.toISOString() };
}

function readingMinutes(sections: BlogSection[]) {
  const words = sections
    .flatMap((s) => [s.heading, ...s.paragraphs])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(4, Math.min(12, Math.round(words / 220)));
}

function regionalBlocks(tool: ToolDefinition): BlogSection[] {
  const name = tool.name;
  const lower = tool.name.toLowerCase();

  if (tool.category === "finance") {
    return [
      {
        heading: "United States: what usually matters",
        paragraphs: [
          `In the US, people often open a ${lower} while comparing lender quotes, paycheck deductions, or monthly cash flow. Think in dollars, APR (not just “interest”), and how the payment fits beside rent or a mortgage.`,
          `Credit scores, debt-to-income ratios, and employer benefits (like a 401(k) match) change the plan. Use the numbers as a planning draft, then confirm fees and underwriting rules with your bank or advisor.`,
        ],
      },
      {
        heading: "United Kingdom: pounds, APRC, and household budgets",
        paragraphs: [
          `In the UK, the same ${lower} idea applies, but you’ll usually think in pounds sterling and look at APRC or product fees on top of the headline rate. Many households also budget around council tax, energy bills, and fixed-rate mortgage resets.`,
          `If you’re self-employed or on a variable income, stress-test a higher rate than today’s quote. A quick Toolwright estimate helps you decide whether to remortgage, overpay, or wait.`,
        ],
      },
      {
        heading: "Europe: euro planning and local rules",
        paragraphs: [
          `Across the EU/EEA, borrowers and savers often work in euros (or a local currency) and face different consumer-credit disclosures by country. VAT, local income tax, and mortgage products can change what “affordable” means even when the formula looks familiar.`,
          `Treat the ${name} as a cross-border planning aid: convert to your currency, then check your country’s lender rules, early-repayment fees, and tax treatment before you commit.`,
        ],
      },
    ];
  }

  if (tool.category === "fitness" || tool.category === "nutrition") {
    return [
      {
        heading: "US readers: pounds, inches, and clinic habits",
        paragraphs: [
          `Most Americans track weight in pounds and height in feet/inches. Insurance forms and primary-care visits often reference BMI or calorie targets, so a clear ${lower} helps you prepare questions for your clinician — it is not a diagnosis.`,
          `Activity levels vary widely (desk jobs vs shift work). Re-run the numbers when your routine changes instead of chasing one “perfect” daily target.`,
        ],
      },
      {
        heading: "UK & Ireland: NHS-style framing",
        paragraphs: [
          `In the UK and Ireland, metric units are common in clinical settings, while many people still think in stones and pounds at home. Use whichever units you understand, then translate the result into habits you can keep.`,
          `NHS guidance emphasises sustainable changes over crash approaches. Pair the calculator with sleep, steps, and protein — not just a single score.`,
        ],
      },
      {
        heading: "Europe: metric defaults and local lifestyles",
        paragraphs: [
          `Continental Europe almost always uses kilograms and centimetres. Food labels lean on kilocalories and kilojoules, and walking/cycling culture can raise maintenance calories without “gym time.”`,
          `Use the ${name} as a baseline, then adjust for local food culture — long lunches, smaller plates, or higher bread intake — rather than copying a US meal plan that does not fit your life.`,
        ],
      },
    ];
  }

  if (tool.category === "pregnancy") {
    return [
      {
        heading: "US prenatal timelines",
        paragraphs: [
          `US prenatal care often schedules visits by gestational weeks. A ${lower} helps you estimate dates for planning leave, travel, and appointments — always confirm with your obstetric provider.`,
          `Insurance paperwork and workplace leave policies may ask for an estimated due date. Keep a screenshot or note of your inputs so you can explain how you calculated it.`,
        ],
      },
      {
        heading: "UK maternity planning",
        paragraphs: [
          `In the UK, dating scans and midwife pathways usually lock in dates later in the first trimester. Early home estimates are still useful for booking leave and understanding trimester milestones.`,
          `NHS resources talk in weeks pregnant. Use the calculator to orient yourself, then rely on clinical dating when it is available.`,
        ],
      },
      {
        heading: "Europe: leave rules differ by country",
        paragraphs: [
          `Parental leave length and pay vary across Europe. An estimated due date from a ${lower} helps you talk to HR early, especially if you work across borders or travel often.`,
          `Local maternity units may use slightly different dating conventions. Treat online estimates as preparation, not a substitute for ultrasound dating.`,
        ],
      },
    ];
  }

  return [
    {
      heading: "Same tool, local context",
      paragraphs: [
        `The ${name} is built to give a fast, private answer in your browser — wherever you are planning from.`,
        `Unit systems and regulations differ by country — use the result as a practical starting point, then apply local rules (tax, clinical, or workplace) where they matter.`,
      ],
    },
  ];
}

/** Human-toned post scaffold for every tool (overridable by curated posts). */
export function generateToolPost(tool: ToolDefinition): BlogPost {
  const { publishedAt, updatedAt } = datesFor(tool.slug);
  const slug = `${tool.slug}-guide`;
  const lower = tool.name.toLowerCase();

  const sections: BlogSection[] = [
    {
      heading: `Why people search for a ${lower}`,
      paragraphs: [
        `Most of us do not open a ${lower} for fun — we open it because a decision is sitting on the table. Maybe a lender asked for numbers, a clinic form wants a quick estimate, or you are comparing two plans before you spend money.`,
        tool.longDescription,
        `On Toolwright, the calculator stays above the clutter: enter your figures, get a clear result, and keep your data on your device. No account wall.`,
      ],
    },
    {
      heading: "A simple plan you can actually follow",
      paragraphs: [
        `Start with honest inputs. Rounded guesses are fine for a first pass, but if a bank, tax form, or clinician will see the number, double-check the raw data.`,
        `Run two or three scenarios — a cautious case, a base case, and an optimistic case. The gap between them is often more useful than a single “perfect” answer.`,
        `Write down the one action you will take next (call a lender, adjust a budget line, book an appointment). Tools are only helpful when they change what you do this week.`,
      ],
    },
    ...regionalBlocks(tool),
    {
      heading: `How to use the free ${tool.name} on Toolwright`,
      paragraphs: [
        `Open the ${tool.name}, fill in the fields, and calculate. You can change inputs immediately to compare options — useful when rates, weights, or dates are still moving.`,
        `When you are ready, bookmark the tool or share the page with a partner. If you want the math without creating yet another login, you are in the right place.`,
      ],
    },
  ];

  const takeaways = [
    `Use the ${tool.name} for a fast first estimate, then verify high-stakes decisions with a professional when needed.`,
    "Compare at least two scenarios before you lock a plan.",
    "Apply your local currency, units, and rules to the result.",
    "Your inputs stay in the browser on Toolwright.",
  ];

  return {
    slug,
    title: `${tool.name}: a practical guide`,
    excerpt: `A clear guide to using a free ${lower} — what to enter, how to compare scenarios, and how to turn the result into a simple plan.`,
    toolSlug: tool.slug,
    category: tool.category,
    regions: ["US", "UK", "EU"],
    readingMinutes: readingMinutes(sections),
    publishedAt,
    updatedAt,
    author: "Toolwright Editors",
    cover: coverForTool(tool.slug, tool.category),
    sections,
    takeaways,
    ctaLabel: `Open the free ${tool.name}`,
    keywords: [
      ...tool.keywords.slice(0, 4),
      `${tool.name.toLowerCase()} guide`,
      `free ${tool.name.toLowerCase()}`,
    ],
    featured: tool.featured,
  };
}
