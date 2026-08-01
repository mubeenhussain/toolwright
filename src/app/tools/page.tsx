import type { Metadata } from "next";
import Link from "next/link";
import { CategoryVisual } from "@/components/CategoryVisual";
import { JsonLd } from "@/components/JsonLd";
import { ToolLink } from "@/components/ToolLink";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { categories, tools, type ToolCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All Free Online Tools",
  description:
    "Browse free online tools from Toolwright: mortgage, loan, BMI, calorie, pregnancy, TDEE, age calculator, and more.",
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  openGraph: {
    title: `All Free Online Tools | ${siteConfig.name}`,
    description:
      "Browse free browser-based utilities for text, development, security, and conversion tasks.",
    url: absoluteUrl("/tools"),
  },
};

const order: ToolCategory[] = [
  "finance",
  "fitness",
  "pregnancy",
  "nutrition",
  "calculators",
  "text",
  "developer",
  "security",
  "converters",
  "generators",
];

function isCategory(value: string): value is ToolCategory {
  return order.includes(value as ToolCategory);
}

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ToolsIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selected =
    params.category && isCategory(params.category) ? params.category : null;

  const categoryCards = order
    .map((category) => {
      const list = tools.filter((tool) => tool.category === category);
      if (list.length === 0) return null;
      return { category, count: list.length, ...categories[category] };
    })
    .filter(Boolean) as {
    category: ToolCategory;
    count: number;
    label: string;
    description: string;
  }[];

  if (selected) {
    const list = tools.filter((tool) => tool.category === selected);
    const meta = categories[selected];
    const featured = list.filter((tool) => tool.featured);
    const rest = list.filter((tool) => !tool.featured);

    return (
      <>
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Tools", path: "/tools" },
              { name: meta.label, path: `/tools?category=${selected}` },
            ]),
            itemListJsonLd(list),
          ]}
        />
        <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/tools" className="hover:text-accent">
                  Tools
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink-muted">{meta.label}</li>
            </ol>
          </nav>

          <div className="mt-5">
            <Link
              href="/tools"
              className="text-sm font-semibold text-accent hover:underline"
            >
              ← All categories
            </Link>
          </div>

          <header className="mt-4 overflow-hidden rounded-xl border border-line bg-white">
            <div className="flex flex-col gap-4 bg-[linear-gradient(135deg,#f8faff_0%,#ffffff_55%,#eef5ff_100%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
              <div className="max-w-2xl">
                <CategoryVisual category={selected} />
                <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {meta.label}
                </h1>
                <p className="mt-2 text-base text-ink-muted">
                  {meta.description}
                </p>
              </div>
              <div className="shrink-0 rounded-lg border border-line bg-white px-4 py-3 text-center">
                <p className="font-display text-2xl font-bold text-accent">
                  {list.length}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  tools
                </p>
              </div>
            </div>
          </header>

          {featured.length > 0 ? (
            <section className="mt-8">
              <h2 className="mb-3 font-display text-lg font-bold text-ink">
                Popular in this category
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((tool) => (
                  <ToolLink key={`featured-${tool.slug}`} tool={tool} />
                ))}
              </div>
            </section>
          ) : null}

          {rest.length > 0 ? (
            <section className="mt-8">
              <h2 className="mb-3 font-display text-lg font-bold text-ink">
                {featured.length > 0
                  ? "More tools"
                  : `All ${meta.label.toLowerCase()}`}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((tool) => (
                  <ToolLink key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]),
          itemListJsonLd(tools),
        ]}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink-muted">Tools</li>
          </ol>
        </nav>

        <header className="mt-5 max-w-3xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Free online tools
          </h1>
          <p className="mt-2 text-base text-ink-muted">
            Choose a category to see its tools.
          </p>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((card) => (
            <Link
              key={card.category}
              href={`/tools?category=${card.category}`}
              className="group flex flex-col border border-line bg-white p-5 hover:border-accent"
            >
              <CategoryVisual category={card.category} />
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-accent">
                  {card.label}
                </h2>
                <span className="shrink-0 rounded bg-bg-elevated px-2 py-0.5 text-xs font-semibold text-ink-muted">
                  {card.count}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {card.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-accent">
                View tools →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
