import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  breadcrumbJsonLd,
  buildToolDescription,
  buildToolKeywords,
  buildToolTitle,
  faqJsonLd,
  getToolSeoCopy,
  howToJsonLd,
  mergeFaqs,
  toolJsonLd,
} from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getBlogPostsByTool } from "@/lib/blog";
import {
  categories,
  getAllToolSlugs,
  getRelatedTools,
  getToolBySlug,
} from "@/lib/tools";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const reserved = new Set([
  "tools",
  "about",
  "privacy",
  "terms",
  "blog",
  "api",
  "sitemap.xml",
  "robots.txt",
]);

export function generateStaticParams() {
  return getAllToolSlugs()
    .filter((slug) => !reserved.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (reserved.has(slug)) {
    return { title: "Not found", robots: { index: false } };
  }
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { title: "Tool not found", robots: { index: false } };
  }

  const title = buildToolTitle(tool);
  const description = buildToolDescription(tool);
  const url = absoluteUrl(`/${tool.slug}`);
  const keywords = buildToolKeywords(tool);

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: categories[tool.category].label,
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        en: url,
      },
    },
    openGraph: {
      title: `${tool.name} | Free Online Calculator`,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | Free Online Calculator`,
      description,
      creator: siteConfig.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "geo.region": "US",
      "content-language": "en-US",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  if (reserved.has(slug)) notFound();

  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool, 8);
  const categoryHref = `/tools?category=${tool.category}`;
  const categoryLabel = categories[tool.category].label;
  const guides = getBlogPostsByTool(tool.slug)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .slice(0, 3);
  const seo = getToolSeoCopy(tool);
  const faqs = mergeFaqs(tool);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: categoryLabel, path: categoryHref },
            { name: tool.name, path: `/${tool.slug}` },
          ]),
          toolJsonLd(tool),
          howToJsonLd(tool),
          faqJsonLd(faqs),
        ]}
      />

      <article className="mx-auto w-full max-w-5xl px-5 py-5 sm:px-8 sm:py-6">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/tools" className="hover:text-ink">
                Tools
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={categoryHref} className="hover:text-ink">
                {categoryLabel}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{tool.name}</li>
          </ol>
        </nav>

        <header className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Free online {tool.name.toLowerCase()}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {seo.searchIntro}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-faint">
            <li>Free · No signup</li>
            <li>Instant results</li>
            <li>Private in your browser</li>
            <li>Works on mobile</li>
          </ul>
        </header>

        <section aria-label={`${tool.name} workspace`} className="mt-6">
          <ToolWorkspace slug={tool.slug} />
        </section>

        {guides.length > 0 ? (
          <aside className="mt-6 max-w-3xl border border-line bg-bg-elevated p-4 text-sm">
            <p className="font-semibold text-ink">
              {guides.length > 1
                ? "Related guides & diet plans"
                : "Read the planning guide"}
            </p>
            <p className="mt-1 text-ink-muted">
              Practical articles that pair with this calculator.
            </p>
            <ul className="mt-2 space-y-1.5">
              {guides.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="font-semibold text-accent hover:underline"
                  >
                    {item.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            {seo.whatIsHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{seo.whatIs}</p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            {seo.whoUsesHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{seo.whoUses}</p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            {seo.howHeading}
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink-muted">
            {seo.howSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            {seo.benefitsHeading}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            {seo.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Results are for education and planning. Confirm important financial,
            tax, or health decisions with a qualified professional when needed.
          </p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            {tool.name} FAQ
          </h2>
          <div className="mt-4 divide-y divide-line border-t border-line">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-4">
                <h3 className="text-sm font-semibold text-ink">{faq.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 ? (
          <nav
            aria-label="Related tools"
            className="mt-12 border-t border-line pt-8"
          >
            <h2 className="font-display text-xl font-bold tracking-tight text-ink">
              Related free calculators
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              More {categoryLabel.toLowerCase()} tools people search for on{" "}
              {siteConfig.name}.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    className="group flex h-full flex-col border border-line bg-white p-4 hover:border-accent"
                  >
                    <span className="font-semibold text-ink group-hover:text-accent">
                      {item.name}
                    </span>
                    <span className="mt-1 line-clamp-2 text-sm text-ink-muted">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link
                href={categoryHref}
                className="font-semibold text-accent hover:underline"
              >
                Browse all {categoryLabel.toLowerCase()} →
              </Link>
            </p>
          </nav>
        ) : null}
      </article>
    </>
  );
}
