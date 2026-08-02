import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";
import type { MetadataRoute } from "next";

/** Build-time static sitemap — avoids Netlify cold-start 500/timeouts for Googlebot. */
export const dynamic = "force-static";
export const revalidate = false;

function entry(
  path: string,
  opts: {
    lastModified?: Date | string;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  } = {},
): MetadataRoute.Sitemap[number] {
  const base = siteConfig.url.replace(/\/$/, "");
  // Prefer bare origin for home (matches canonical / older GSC property URLs)
  const url =
    path === "/" || path === ""
      ? base
      : path.startsWith("http")
        ? path
        : absoluteUrl(path);

  return {
    url,
    lastModified: opts.lastModified
      ? new Date(opts.lastModified)
      : new Date("2026-08-02"),
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.7,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", { changeFrequency: "daily", priority: 1 }),
    entry("/tools", { changeFrequency: "daily", priority: 0.95 }),
    entry("/blog", { changeFrequency: "daily", priority: 0.92 }),
    entry("/about", { changeFrequency: "monthly", priority: 0.4 }),
    entry("/privacy", { changeFrequency: "yearly", priority: 0.2 }),
    entry("/terms", { changeFrequency: "yearly", priority: 0.2 }),
  ];

  // Featured / high-intent tools first (helps crawlers prioritize age, mortgage, BMI…)
  const sortedTools = [...tools].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.slug.localeCompare(b.slug);
  });

  const toolRoutes: MetadataRoute.Sitemap = sortedTools.map((tool) =>
    entry(`/${tool.slug}`, {
      changeFrequency: tool.featured ? "weekly" : "monthly",
      priority: tool.featured ? 0.9 : 0.75,
    }),
  );

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) =>
    entry(`/blog/${post.slug}`, {
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: post.featured ? "weekly" : "monthly",
      priority: post.featured ? 0.85 : 0.7,
    }),
  );

  const all = [...staticRoutes, ...toolRoutes, ...blogRoutes];

  // Deduplicate by URL (Google rejects duplicate locs)
  const seen = new Set<string>();
  const unique = all.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });

  // Guard: never emit wrong property host
  return unique.filter((item) => item.url.startsWith(siteConfig.url));
}
