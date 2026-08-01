import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SafeImage } from "@/components/SafeImage";
import { ToolIcon } from "@/components/ToolIcon";
import { coverForTool } from "@/lib/blog/images";
import {
  organizationJsonLd,
  websiteJsonLd,
  itemListJsonLd,
} from "@/lib/seo";
import {
  landingCategoryImages,
  landingHero,
  landingStoryImage,
} from "@/lib/landing-images";
import { siteConfig } from "@/lib/site";
import { getToolBySlug, tools } from "@/lib/tools";

const popularSlugs = [
  "mortgage-calculator",
  "compound-interest-calculator",
  "bmi-calculator",
  "loan-calculator",
  "due-date-calculator",
  "auto-loan-calculator",
  "calorie-calculator",
  "take-home-paycheck-calculator",
] as const;

const categoryBrowse: {
  category: keyof typeof landingCategoryImages;
  href: string;
  label: string;
  blurb: string;
}[] = [
  {
    category: "finance",
    href: "/tools?category=finance",
    label: "Financial",
    blurb: "Mortgage, loans, investing, taxes",
  },
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
    body: "Fitness, pregnancy, nutrition, finance, and everyday tools in one place. Stop hopping between five mediocre sites for five answers.",
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

      <section className="relative isolate min-h-[78vh] overflow-hidden border-b border-line">
        <SafeImage
          src={landingHero.src}
          alt={landingHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-[hero-fade_1.1s_ease-out]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.72)_42%,rgba(29,78,216,0.35)_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
          <p className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl animate-[rise_0.8s_ease-out]">
            <span className="border-b-2 border-white/90 pb-1">
              {siteConfig.name}
            </span>
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl animate-[rise_0.9s_ease-out]">
            Clear calculators. Instant answers.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg animate-[rise_1s_ease-out]">
            {toolCount}+ free tools for money, health, pregnancy, and everyday
            math — no signup, no clutter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-[rise_1.1s_ease-out]">
            <Link
              href="/tools"
              className="btn bg-white text-[#1d4ed8] hover:bg-accent-soft"
            >
              Explore the toolkit
            </Link>
            <Link
              href="/mortgage-calculator"
              className="btn border border-white/80 bg-transparent text-white hover:bg-white/10"
            >
              Try Mortgage Calculator
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden border border-line bg-bg-elevated">
            <SafeImage
              src={landingStoryImage.src}
              alt={landingStoryImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Why {siteConfig.name} beats typical calculator sites
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              Most “free calculator” pages are ad farms. We built the opposite:
              useful first, quiet by default, serious about accuracy.
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-line">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line bg-accent text-white">
                <p className="px-3 py-2.5 text-xs font-semibold sm:px-4 sm:text-sm">
                  What you get
                </p>
                <p className="px-2 py-2.5 text-center text-xs font-semibold sm:px-4 sm:text-sm">
                  {siteConfig.name}
                </p>
                <p className="px-2 py-2.5 text-center text-xs font-semibold text-white/75 sm:px-4 sm:text-sm">
                  Typical sites
                </p>
              </div>
              {compareRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line bg-white last:border-b-0"
                >
                  <p className="px-3 py-2.5 text-xs text-ink sm:px-4 sm:text-sm">
                    {row.label}
                  </p>
                  <p className="px-2 py-2.5 text-center text-xs font-semibold text-accent sm:px-4 sm:text-sm">
                    Yes
                  </p>
                  <p className="px-2 py-2.5 text-center text-xs text-ink-faint sm:px-4 sm:text-sm">
                    Often no
                  </p>
                </div>
              ))}
            </div>
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

      <section className="border-b border-line bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fa_100%)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Start with a top tool
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Pick a calculator and get a clear answer in seconds.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-sm font-semibold text-accent hover:underline"
            >
              See every tool →
            </Link>
          </div>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((tool) => {
              if (!tool) return null;
              const cover = coverForTool(tool.slug, tool.category);
              return (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)] transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_10px_28px_rgba(29,78,216,0.12)]"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-[linear-gradient(135deg,#dbeafe,#e5e7eb)]">
                      <SafeImage
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                        aria-hidden
                      />
                      <span className="absolute bottom-3 left-3 flex size-9 items-center justify-center rounded-lg bg-white/95 text-accent shadow-sm">
                        <ToolIcon
                          slug={tool.slug}
                          category={tool.category}
                          label={tool.shortName}
                        />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-base font-bold tracking-tight text-ink group-hover:text-accent">
                        {tool.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
                        {tool.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        Open free
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
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
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryBrowse.map((item) => {
              const img = landingCategoryImages[item.category];
              return (
                <Link
                  key={item.category}
                  href={item.href}
                  className="group overflow-hidden border border-line bg-white hover:border-accent"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#dbeafe,#e5e7eb)]">
                    <SafeImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                      aria-hidden
                    />
                    <p className="absolute bottom-3 left-3 font-display text-lg font-bold text-white">
                      {item.label}
                    </p>
                  </div>
                  <p className="p-4 text-sm text-ink-muted">{item.blurb}</p>
                </Link>
              );
            })}
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
