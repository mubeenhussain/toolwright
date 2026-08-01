export const siteConfig = {
  name: "Toolwright",
  tagline: "The best free calculator site for clear, instant answers",
  description:
    "Free online calculators for mortgage, loans, BMI, pregnancy, calories, taxes, and more. Instant results, US units, no signup — Toolwright.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolwright.site",
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
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
