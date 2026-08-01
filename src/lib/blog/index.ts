import { curatedByToolSlug, curatedPosts } from "@/lib/blog/curated";
import { generateToolPost } from "@/lib/blog/generate";
import { coverForTool, curatedCoverByTool } from "@/lib/blog/images";
import type { BlogListItem, BlogPost } from "@/lib/blog/types";
import { tools, type ToolCategory } from "@/lib/tools";

function withCover(post: BlogPost): BlogPost {
  return {
    ...post,
    cover:
      post.cover ??
      curatedCoverByTool[post.toolSlug] ??
      coverForTool(post.toolSlug, post.category),
  };
}

function toListItem(post: BlogPost): BlogListItem {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    toolSlug: post.toolSlug,
    category: post.category,
    regions: post.regions,
    readingMinutes: post.readingMinutes,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    featured: post.featured,
    keywords: post.keywords,
    cover: post.cover,
  };
}

/** One post per tool: curated flagship articles win when present. */
export function getAllBlogPosts(): BlogPost[] {
  const generated = tools.map((tool) => {
    const curated = curatedByToolSlug.get(tool.slug);
    return withCover(curated ?? generateToolPost(tool));
  });

  // Include any curated posts whose toolSlug might be missing (safety)
  const slugs = new Set(generated.map((p) => p.slug));
  for (const post of curatedPosts) {
    if (!slugs.has(post.slug)) generated.push(withCover(post));
  }

  return generated.sort(
    (a, b) =>
      +new Date(b.publishedAt).getTime() - +new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPostBySlug(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug) ?? null;
}

export function getBlogPostsByTool(toolSlug: string) {
  return getAllBlogPosts().filter((post) => post.toolSlug === toolSlug);
}

export function getBlogList(options?: {
  category?: ToolCategory | "all";
  tool?: string;
  q?: string;
  page?: number;
  pageSize?: number;
  featured?: boolean;
}) {
  const page = Math.max(1, options?.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, options?.pageSize ?? 12));
  let posts = getAllBlogPosts();

  if (options?.category && options.category !== "all") {
    posts = posts.filter((p) => p.category === options.category);
  }
  if (options?.tool) {
    posts = posts.filter((p) => p.toolSlug === options.tool);
  }
  if (options?.featured) {
    posts = posts.filter((p) => p.featured);
  }
  if (options?.q?.trim()) {
    const q = options.q.trim().toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }

  const total = posts.length;
  const start = (page - 1) * pageSize;
  const slice = posts.slice(start, start + pageSize).map(toListItem);

  return {
    posts: slice,
    total,
    page,
    pageSize,
    categories: Array.from(new Set(getAllBlogPosts().map((p) => p.category))),
  };
}

export function getAllBlogSlugs() {
  return getAllBlogPosts().map((post) => post.slug);
}
