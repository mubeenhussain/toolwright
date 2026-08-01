import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BlogApiPreview } from "@/components/blog/BlogApiPreview";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { JsonLd } from "@/components/JsonLd";
import { loadBlogList } from "@/lib/blog/api-client";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { ToolCategory } from "@/lib/tools";

/** ISR: rebuild blog index at most once per hour */
export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    page?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;
  const title = category
    ? `${category[0]?.toUpperCase()}${category.slice(1)} guides`
    : "Calculator guides & planning tips";
  const description =
    "Practical blog guides for every Toolwright calculator — mortgage, health, pregnancy, loans, and more — with clear next steps.";
  const url = absoluteUrl(
    category ? `/blog?category=${category}` : "/blog",
  );

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl("/blog") },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
    },
  };
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = (params.category as ToolCategory | "all" | undefined) ?? "all";
  const q = params.q ?? "";
  const page = Number(params.page ?? "1") || 1;

  const data = await loadBlogList({
    category,
    q,
    page,
    pageSize: 18,
  });

  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          itemListJsonLd(
            data.posts.map((p) => ({
              name: p.title,
              slug: `blog/${p.slug}`,
              description: p.excerpt,
            })),
          ),
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
            <li className="text-ink-muted">Blog</li>
          </ol>
        </nav>

        <header className="mt-5 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Guides
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Calculator guides that help you decide
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            Practical plans for real budgets and real decisions. Each guide pairs
            with a free Toolwright calculator so you can run the numbers in one
            tab.
          </p>
        </header>

        <div className="mt-8">
          <Suspense fallback={<div className="h-10" />}>
            <BlogFilters categories={data.categories} />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <BlogApiPreview category={category} q={q} />
        </Suspense>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-ink">
              All guides
            </h2>
            <p className="text-sm text-ink-faint">
              {data.total} article{data.total === 1 ? "" : "s"}
            </p>
          </div>

          {data.posts.length === 0 ? (
            <p className="border border-line bg-white p-8 text-sm text-ink-muted">
              No guides matched that search. Try another category or{" "}
              <Link href="/blog" className="font-semibold text-accent">
                clear filters
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-3 text-sm">
              {page > 1 ? (
                <Link
                  href={`/blog?${new URLSearchParams({
                    ...(category !== "all" ? { category } : {}),
                    ...(q ? { q } : {}),
                    page: String(page - 1),
                  })}`}
                  className="font-semibold text-accent hover:underline"
                >
                  ← Previous
                </Link>
              ) : null}
              <span className="text-ink-faint">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  href={`/blog?${new URLSearchParams({
                    ...(category !== "all" ? { category } : {}),
                    ...(q ? { q } : {}),
                    page: String(page + 1),
                  })}`}
                  className="font-semibold text-accent hover:underline"
                >
                  Next →
                </Link>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}
