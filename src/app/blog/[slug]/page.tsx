import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getAllBlogSlugs } from "@/lib/blog";
import { loadBlogPost } from "@/lib/blog/api-client";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { categories, getToolBySlug } from "@/lib/tools";

/** SSG all posts at build; ISR refresh hourly */
export const revalidate = 3600;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadBlogPost(slug);
  if (!post) return { title: "Guide not found", robots: { index: false } };

  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      siteName: siteConfig.name,
      images: [
        {
          url: post.cover.src,
          width: 1200,
          height: 630,
          alt: post.cover.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover.src],
    },
  };
}

function articleJsonLd(post: NonNullable<Awaited<ReturnType<typeof loadBlogPost>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: [post.cover.src],
    keywords: post.keywords.join(", "),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await loadBlogPost(slug);
  if (!post) notFound();

  const tool = getToolBySlug(post.toolSlug);
  const published = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const faqFromTakeaways = post.takeaways.map((t, i) => ({
    question: `Key takeaway ${i + 1} from the ${tool?.name ?? "calculator"} guide`,
    answer: t,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleJsonLd(post),
          faqJsonLd(faqFromTakeaways),
        ]}
      />

      <article className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="line-clamp-1 text-ink-muted">{post.title}</li>
          </ol>
        </nav>

        <header className="mt-5">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">
              {categories[post.category].label}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            {post.excerpt}
          </p>
          <p className="mt-4 text-xs text-ink-faint">
            By {post.author} · {published} · {post.readingMinutes} min read
          </p>
        </header>

        <figure className="relative mt-8 aspect-[16/9] overflow-hidden border border-line bg-bg-elevated">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-[11px] text-white/90">
            Photo:{" "}
            <a
              href={post.cover.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              {post.cover.credit}
            </a>{" "}
            /{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              Unsplash
            </a>
          </figcaption>
        </figure>

        {tool ? (
          <aside className="mt-8 border border-accent/30 bg-[#f8faff] p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Free calculator
            </p>
            <p className="mt-1 font-display text-lg font-bold text-ink">
              {tool.name}
            </p>
            <p className="mt-1 text-sm text-ink-muted">{tool.description}</p>
            <Link
              href={`/${tool.slug}`}
              className="btn btn-primary mt-4 inline-flex text-sm"
            >
              {post.ctaLabel}
            </Link>
          </aside>
        ) : null}

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-[15px]"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-xl font-bold text-ink">
            Key takeaways
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            {post.takeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        {tool ? (
          <section className="mt-10 border border-line bg-white p-5 text-center">
            <h2 className="font-display text-lg font-bold text-ink">
              Ready to run your numbers?
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Use the free {tool.name} — private, instant, no signup.
            </p>
            <Link
              href={`/${tool.slug}`}
              className="btn btn-primary mt-4 inline-flex"
            >
              {post.ctaLabel}
            </Link>
          </section>
        ) : null}

        <p className="mt-10 text-sm">
          <Link href="/blog" className="font-semibold text-accent hover:underline">
            ← All guides
          </Link>
        </p>
      </article>
    </>
  );
}
