import { absoluteUrl, siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url.replace(/\/$/, ""),
  };
}
