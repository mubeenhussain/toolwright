export const siteConfig = {
  name: "Toolwright",
  tagline: "Useful tools. Simple solutions.",
  description:
    "Free Age Calculator, mortgage, BMI, calorie, due date and 100+ online tools. Instant results, US-ready units, private in your browser - no signup.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolwright.site",
  /** Full lockup (header / footer) */
  logo: "/toolwright.png",
  /** Square app icon (favicon, OG, schema) */
  icon: "/toolwright-icon.png",
  locale: "en_US",
  language: "en-US",
  /** Primary markets for search & content */
  markets: ["United States", "Canada", "United Kingdom", "Australia", "Ireland", "New Zealand"],
  marketCodes: ["US", "CA", "GB", "AU", "IE", "NZ"],
  twitter: "@toolwright",
  email: "hello@toolwright.site",
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (path === "/" || path === "") return base;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
