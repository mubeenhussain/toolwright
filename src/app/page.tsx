import Link from "next/link";
import { CategoryIcon } from "@/components/CategoryVisual";
import { JsonLd } from "@/components/JsonLd";
import { SafeImage } from "@/components/SafeImage";
import { ToolIcon } from "@/components/ToolIcon";
import { dietPosts } from "@/lib/blog/diet-posts";
import {
  organizationJsonLd,
  websiteJsonLd,
  itemListJsonLd,
} from "@/lib/seo";
import {
  landingCategoryImages,
  landingHero,
} from "@/lib/landing-images";
import { siteConfig } from "@/lib/site";
import {
  getToolBySlug,
  getToolsByCategory,
  tools,
  categories,
} from "@/lib/tools";
import type { ToolCategory } from "@/lib/tool-types";

const popularSlugs = [
  "age-calculator",
  "mortgage-calculator",
  "bmi-calculator",
  "calorie-calculator",
  "compound-interest-calculator",
  "due-date-calculator",
  "loan-calculator",
  "macro-calculator",
] as const;

const quickStart: {
  category: keyof typeof landingCategoryImages | "developer";
  label: string;
  blurb: string;
}[] = [
  {
    category: "finance",
    label: "Financial",
    blurb: "Mortgage, loans, investing, taxes",
  },
  {
    category: "fitness",
    label: "Fitness & Health",
    blurb: "BMI, calories, heart rate, pace",
  },
  {
    category: "pregnancy",
    label: "Pregnancy",
    blurb: "Due date, ovulation, weeks",
  },
  {
    category: "nutrition",
    label: "Nutrition",
    blurb: "TDEE, macros, protein",
  },
  {
    category: "calculators",
    label: "Everyday",
    blurb: "Age and daily math",
  },
  {
    category: "developer",
    label: "Developer",
    blurb: "JSON, Base64, URL encode",
  },
];

const directory: { category: ToolCategory; limit: number }[] = [
  { category: "finance", limit: 12 },
  { category: "fitness", limit: 9 },
  { category: "pregnancy", limit: 6 },
  { category: "nutrition", limit: 8 },
  { category: "calculators", limit: 6 },
  { category: "text", limit: 6 },
];

const trustPoints = [
  {
    title: "Calculator first",
    body: "Land on the tool — not an ad farm. Inputs up top, results beside them.",
  },
  {
    title: "Private by design",
    body: "Math runs in your browser. No account wall for core calculators.",
  },
  {
    title: "US-ready defaults",
    body: "Imperial units and American English where health tools need them.",
  },
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

      <section className="relative isolate overflow-hidden border-b border-line bg-[#0f172a]">
        <SafeImage
          src={landingHero.src}
          alt={landingHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-55"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(29,78,216,0.45),transparent_55%),linear-gradient(180deg,rgba(15,23,42,0.35)_0%,rgba(15,23,42,0.82)_70%,#f4f6fa_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <p className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            <span className="border-b-2 border-[#93c5fd] pb-1">
              {siteConfig.name}
            </span>
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Free calculators for clear, instant answers
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {toolCount}+ tools for money, health, pregnancy, and everyday math —
            open any calculator and get the number fast.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="btn bg-white text-[#1d4ed8] hover:bg-accent-soft"
            >
              Browse all tools
            </Link>
            <Link
              href="/age-calculator"
              className="btn border border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              Try Age Calculator
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-300">
            {toolCount}+ free tools · No signup · Private in your browser
          </p>
        </div>
      </section>

      <section className="-mt-8 relative z-20 border-b border-line pb-10 sm:pb-12">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Quick start
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Choose a category — then open the calculator you need.
                </p>
              </div>
              <Link
                href="/tools"
                className="text-sm font-semibold text-accent hover:underline"
              >
                Full toolkit →
              </Link>
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickStart.map((item) => {
                const count = getToolsByCategory(item.category).length;
                const img =
                  item.category in landingCategoryImages
                    ? landingCategoryImages[
                        item.category as keyof typeof landingCategoryImages
                      ]
                    : null;
                return (
                  <li key={item.category}>
                    <Link
                      href={`/tools?category=${item.category}`}
                      className="group flex overflow-hidden rounded-xl border border-line bg-bg-elevated transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_10px_28px_rgba(29,78,216,0.12)]"
                    >
                      <div className="relative w-[5.5rem] shrink-0 self-stretch bg-[linear-gradient(135deg,#dbeafe,#93c5fd)] sm:w-28">
                        {img ? (
                          <SafeImage
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="112px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center text-accent">
                            <CategoryIcon category={item.category} />
                          </span>
                        )}
                      </div>
                      <span className="flex min-w-0 flex-1 flex-col justify-center p-3.5 sm:p-4">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-display text-base font-bold text-ink group-hover:text-accent">
                            {item.label}
                          </span>
                          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent">
                            {count}
                          </span>
                        </span>
                        <span className="mt-1 text-sm text-ink-muted">
                          {item.blurb}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Popular tools — visible names first */}
      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Popular calculators
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                High-intent tools people open first.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-sm font-semibold text-accent hover:underline"
            >
              See every tool →
            </Link>
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((tool) =>
              tool ? (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="group flex h-full flex-col border border-line bg-white p-4 transition-colors hover:border-accent hover:bg-[#f8faff]"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <ToolIcon
                        slug={tool.slug}
                        category={tool.category}
                        label={tool.shortName}
                      />
                    </span>
                    <span className="mt-3 font-display text-base font-bold text-ink group-hover:text-accent">
                      {tool.name}
                    </span>
                    <span className="mt-1 line-clamp-2 flex-1 text-sm text-ink-muted">
                      {tool.description}
                    </span>
                    <span className="mt-3 text-sm font-semibold text-accent">
                      Open →
                    </span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>

      {/* Tool directories by category — inspired clarity, calculator-native */}
      <section className="border-b border-line bg-bg-elevated">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Browse tools by category
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Every calculator has its own page — search-friendly names, free to
            use.
          </p>

          <div className="mt-8 space-y-10">
            {directory.map(({ category, limit }) => {
              const list = getToolsByCategory(category).slice(0, limit);
              const meta = categories[category];
              return (
                <div key={category}>
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-md bg-white text-accent">
                        <CategoryIcon category={category} />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-ink">
                          {meta.label}
                        </h3>
                        <p className="text-sm text-ink-muted">
                          {meta.description}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/tools?category=${category}`}
                      className="text-sm font-semibold text-accent hover:underline"
                    >
                      View all →
                    </Link>
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/${tool.slug}`}
                          className="group flex items-center justify-between gap-3 border border-line bg-white px-3.5 py-3 hover:border-accent"
                        >
                          <span className="min-w-0">
                            <span className="block truncate font-semibold text-ink group-hover:text-accent">
                              {tool.name}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-ink-muted">
                              {tool.shortName} · free · instant
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Why people keep {siteConfig.name} open
          </h2>
          <ul className="mt-7 grid gap-6 sm:grid-cols-3">
            {trustPoints.map((item) => (
              <li key={item.title}>
                <h3 className="font-display text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-bg-elevated">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                From the blog
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Diet plans and guides that link back to free calculators.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent hover:underline"
            >
              All guides →
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {dietPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block border border-line bg-white p-4 hover:border-accent"
                >
                  <h3 className="font-display text-base font-bold text-ink group-hover:text-accent line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-accent">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-14">
          <div className="max-w-xl text-white">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Find your calculator in seconds
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
              {toolCount}+ free tools. No signup. Clear results.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/tools"
              className="btn bg-white text-[#1d4ed8] hover:bg-accent-soft"
            >
              Open toolkit
            </Link>
            <Link
              href="/blog"
              className="btn border border-white bg-transparent text-white hover:bg-white/10"
            >
              Read guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
