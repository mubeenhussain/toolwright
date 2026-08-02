import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/tools"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.92,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: absoluteUrl(`/${tool.slug}`),
    lastModified,
    changeFrequency: tool.featured ? ("weekly" as const) : ("monthly" as const),
    priority: tool.featured ? 0.9 : 0.75,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    blogRoutes = getAllBlogPosts().map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: post.featured
        ? ("weekly" as const)
        : ("monthly" as const),
      priority: post.featured ? 0.85 : 0.7,
    }));
  } catch {
    // Prefer a tools-only sitemap over a 500 if blog generation fails.
    blogRoutes = [];
  }

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
