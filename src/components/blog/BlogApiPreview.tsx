"use client";

import { useEffect, useState } from "react";
import type { BlogListItem } from "@/lib/blog/types";
import { BlogCard } from "@/components/blog/BlogCard";

/**
 * Optional client layer that reads live JSON from /api/blog
 * (demonstrates Next.js Route Handlers + client hydration).
 */
export function BlogApiPreview({
  category,
  q,
}: {
  category?: string;
  q?: string;
}) {
  const [posts, setPosts] = useState<BlogListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("pageSize", "3");
    params.set("featured", "1");
    if (category && category !== "all") params.set("category", category);
    if (q) params.set("q", q);

    let cancelled = false;
    fetch(`/api/blog?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data: { posts: BlogListItem[] }) => {
        if (!cancelled) setPosts(data.posts);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load API preview");
      });

    return () => {
      cancelled = true;
    };
  }, [category, q]);

  if (error || !posts || posts.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-3 font-display text-lg font-bold text-ink">
        Editor’s picks
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={`api-${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}
