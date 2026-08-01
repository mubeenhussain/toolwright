import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  toolJsonLd,
} from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import {
  categories,
  getAllToolSlugs,
  getToolBySlug,
  tools,
} from "@/lib/tools";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const reserved = new Set([
  "tools",
  "about",
  "privacy",
  "terms",
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
    return { title: "Not found" };
  }
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { title: "Tool not found" };
  }

  const title = `${tool.name} — Free Online ${tool.shortName} Tool`;
  const url = absoluteUrl(`/${tool.slug}`);

  return {
    title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: tool.description,
      url,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  if (reserved.has(slug)) notFound();

  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = tools
    .filter((item) =>
      item.category === tool.category
        ? item.slug !== tool.slug
        : item.featured && item.slug !== tool.slug,
    )
    .slice(0, 4);

  const categoryHref = `/tools?category=${tool.category}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: categories[tool.category].label, path: categoryHref },
            { name: tool.name, path: `/${tool.slug}` },
          ]),
          toolJsonLd(tool),
          faqJsonLd(tool.faqs),
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
              <Link href={categoryHref} className="hover:text-ink">
                {categories[tool.category].label}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{tool.name}</li>
          </ol>
        </nav>

        <header className="mt-4">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
            {tool.name}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-ink-muted">
            {tool.description}
          </p>
        </header>

        <section aria-label={`${tool.name} workspace`} className="mt-5">
          <ToolWorkspace slug={tool.slug} />
        </section>

        {related.length > 0 ? (
          <nav
            aria-label="Related tools"
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm"
          >
            <span className="text-ink-faint">Also try</span>
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="font-medium text-ink hover:text-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        ) : null}

        <section className="mt-12 max-w-2xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            How it works
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {tool.longDescription}
          </p>
        </section>

        <section className="mt-8 max-w-2xl">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink">
            FAQ
          </h2>
          <div className="mt-4 divide-y divide-line border-t border-line">
            {tool.faqs.map((faq) => (
              <div key={faq.question} className="py-4">
                <h3 className="text-sm font-semibold text-ink">{faq.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
