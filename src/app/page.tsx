import Link from "next/link";
import { CategoryVisual } from "@/components/CategoryVisual";
import { JsonLd } from "@/components/JsonLd";
import {
  organizationJsonLd,
  websiteJsonLd,
  itemListJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { getToolBySlug, tools } from "@/lib/tools";
import type { ToolCategory } from "@/lib/tool-types";

const popularSlugs = [
  "bmi-calculator",
  "due-date-calculator",
  "calorie-calculator",
  "age-calculator",
  "tdee-calculator",
  "ovulation-calculator",
  "macro-calculator",
  "password-generator",
] as const;

const categoryBrowse: {
  category: ToolCategory;
  href: string;
  label: string;
  blurb: string;
}[] = [
  {
    category: "fitness",
    href: "/tools?category=fitness",
    label: "Fitness & Health",
    blurb: "BMI, calories, body fat, heart rate",
  },
  {
    category: "pregnancy",
    href: "/tools?category=pregnancy",
    label: "Pregnancy",
    blurb: "Due date, ovulation, weeks pregnant",
  },
  {
    category: "nutrition",
    href: "/tools?category=nutrition",
    label: "Nutrition",
    blurb: "TDEE, macros, protein targets",
  },
  {
    category: "calculators",
    href: "/tools?category=calculators",
    label: "Everyday",
    blurb: "Age and daily calculators",
  },
];

const whyBest = [
  {
    title: "The calculator comes first",
    body: "Other sites bury the tool under ads and pop-ups. On Toolwright, you land on the answer — inputs at the top, results right beside them.",
  },
  {
    title: "Made for American users",
    body: "US units by default, American English, and the formulas people already trust: Mifflin–St Jeor, Naegele’s rule, Navy body fat, and more.",
  },
  {
    title: "Private by design",
    body: "Your weight, dates, and passwords stay on your device. We don’t need an account — and we don’t sell your inputs.",
  },
  {
    title: "One toolkit, not a scavenger hunt",
    body: "Fitness, pregnancy, nutrition, and everyday tools in one place. Stop hopping between five mediocre sites for five answers.",
  },
] as const;

const compareRows = [
  { label: "Tool above the fold", us: true, them: false },
  { label: "No signup wall", us: true, them: false },
  { label: "US units & English", us: true, them: false },
  { label: "Private browser math", us: true, them: false },
  { label: "Free forever", us: true, them: false },
] as const;

export default function HomePage() {
  const popular = popularSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);
  const toolCount = tools.length;

  return (
    <>
      <JsonLd
        data={[websiteJsonLd(), organizationJsonLd(), itemListJsonLd(tools)]}
      />

      <section className="border-b border-line bg-bg-elevated">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            <span className="brand-underline">{siteConfig.name}</span>
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            The best free calculator site for clear, instant answers
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Skip the junk. {toolCount}+ free tools for BMI, pregnancy, calories,
            age, and more — built so you get the number fast, without signup or
            spam.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/tools" className="btn btn-primary">
              Explore the toolkit
            </Link>
            <Link href="/bmi-calculator" className="btn btn-secondary">
              Try BMI Calculator
            </Link>
          </div>
          <p className="mt-5 text-sm text-ink-faint">
            Free · No account · US-ready units · Works in your browser
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Why {siteConfig.name} beats typical calculator sites
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted sm:text-base">
            Most “free calculator” pages are ad farms. We built the opposite:
            useful first, quiet by default, serious about accuracy.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line bg-accent text-white">
              <p className="px-4 py-3 text-sm font-semibold">What you get</p>
              <p className="px-4 py-3 text-center text-sm font-semibold">
                {siteConfig.name}
              </p>
              <p className="px-4 py-3 text-center text-sm font-semibold text-white/75">
                Typical sites
              </p>
            </div>
            {compareRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line bg-white last:border-b-0"
              >
                <p className="px-4 py-3 text-sm text-ink">{row.label}</p>
                <p className="px-4 py-3 text-center text-sm font-semibold text-accent">
                  Yes
                </p>
                <p className="px-4 py-3 text-center text-sm text-ink-faint">
                  Often no
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-bg-elevated">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Built to be the tool you actually keep using
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {whyBest.map((item, index) => (
              <div key={item.title}>
                <p className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Start with a top tool
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                High-demand calculators people search for every day.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-sm font-semibold text-accent hover:underline"
            >
              See every tool →
            </Link>
          </div>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {popular.map((tool) =>
              tool ? (
                <li key={tool.slug} className="bg-white">
                  <Link
                    href={`/${tool.slug}`}
                    className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-accent-soft"
                  >
                    <span>
                      <span className="block font-semibold text-ink">
                        {tool.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        Instant · free · no signup
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-accent">
                      Open →
                    </span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-bg-elevated">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Everything in one toolkit
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Browse the category you need — then open the exact calculator.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categoryBrowse.map((item) => (
              <Link
                key={item.category}
                href={item.href}
                className="border border-line bg-white p-4 hover:border-accent"
              >
                <CategoryVisual category={item.category} />
                <p className="font-display text-base font-bold text-ink">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{item.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-14">
          <div className="max-w-xl text-white">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Ready for the better calculator experience?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
              Open any tool, enter your numbers, get a clear result — the way
              online calculators should have worked all along.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/bmi-calculator"
              className="btn bg-white text-[#1d4ed8] hover:bg-accent-soft"
            >
              Start with BMI
            </Link>
            <Link
              href="/tools"
              className="btn border border-white bg-transparent text-white hover:bg-white/10"
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
