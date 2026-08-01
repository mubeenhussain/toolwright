export const siteConfig = {
  name: "Toolwright",
  tagline: "The best free calculator site for clear, instant answers",
  description:
    "Toolwright is the free calculator toolkit that puts the answer first — BMI, due dates, calories, age, macros, and more. No signup, US units, private by design.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolwright.app",
  locale: "en_US",
  language: "en-US",
  /** Primary markets for search & content */
  markets: ["United States", "Canada", "United Kingdom", "Australia", "Ireland", "New Zealand"],
  marketCodes: ["US", "CA", "GB", "AU", "IE", "NZ"],
  twitter: "@toolwright",
  email: "hello@toolwright.app",
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
