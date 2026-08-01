import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/${tool.slug}`,
    lastModified,
    changeFrequency: tool.featured ? ("weekly" as const) : ("monthly" as const),
    priority: tool.featured ? 0.9 : 0.75,
  }));

  return [...staticRoutes, ...toolRoutes];
}
