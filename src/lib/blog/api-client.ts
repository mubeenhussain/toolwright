import {
  getBlogList,
  getBlogPostBySlug,
} from "@/lib/blog";
import type { BlogListResponse, BlogPost } from "@/lib/blog/types";
import type { ToolCategory } from "@/lib/tools";
import { absoluteUrl } from "@/lib/site";

type ListOpts = {
  category?: ToolCategory | "all";
  tool?: string;
  q?: string;
  page?: number;
  pageSize?: number;
  featured?: boolean;
};

/**
 * Hybrid loader:
 * - Default: shared module (reliable SSG / ISR)
 * - Optional HTTP: hits /api/blog when BLOG_USE_HTTP=1 (runtime SSR demos)
 */
export async function loadBlogList(
  opts: ListOpts = {},
): Promise<BlogListResponse> {
  if (process.env.BLOG_USE_HTTP === "1") {
    try {
      const params = new URLSearchParams();
      if (opts.category && opts.category !== "all")
        params.set("category", opts.category);
      if (opts.tool) params.set("tool", opts.tool);
      if (opts.q) params.set("q", opts.q);
      if (opts.page) params.set("page", String(opts.page));
      if (opts.pageSize) params.set("pageSize", String(opts.pageSize));
      if (opts.featured) params.set("featured", "1");

      const res = await fetch(absoluteUrl(`/api/blog?${params}`), {
        next: { revalidate: 3600, tags: ["blog-list"] },
      });
      if (res.ok) return (await res.json()) as BlogListResponse;
    } catch {
      // fall through to module
    }
  }
  return getBlogList(opts);
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  if (process.env.BLOG_USE_HTTP === "1") {
    try {
      const res = await fetch(absoluteUrl(`/api/blog/${slug}`), {
        next: { revalidate: 3600, tags: ["blog-post", `blog-${slug}`] },
      });
      if (res.status === 404) return null;
      if (res.ok) {
        const data = (await res.json()) as { post: BlogPost };
        return data.post;
      }
    } catch {
      // fall through
    }
  }
  return getBlogPostBySlug(slug);
}
