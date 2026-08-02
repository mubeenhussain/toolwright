import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f6fa",
    theme_color: "#1d4ed8",
    lang: "en",
    categories: ["utilities", "productivity", "developer"],
    icons: [
      {
        src: "/toolwright-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
