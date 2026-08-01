import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/${tool.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolRoutes];
}
