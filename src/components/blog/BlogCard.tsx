import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import type { BlogListItem } from "@/lib/blog/types";
import { categories } from "@/lib/tools";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-line bg-white transition-colors hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#dbeafe,#e5e7eb)]">
        <SafeImage
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
          <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">
            {categories[post.category].label}
          </span>
          {post.featured ? (
            <span className="rounded bg-accent px-1.5 py-0.5 text-white">
              Editor’s pick
            </span>
          ) : null}
        </div>
        <h2 className="mt-3 font-display text-lg font-bold tracking-tight text-ink group-hover:text-accent sm:text-xl">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-ink-faint">
          <span>
            {formatDate(post.publishedAt)} · {post.readingMinutes} min read
          </span>
          <span className="font-semibold text-accent">Read →</span>
        </div>
      </div>
    </Link>
  );
}
