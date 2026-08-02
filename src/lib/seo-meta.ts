import { absoluteUrl, siteConfig } from "@/lib/site";

/** Square brand mark for favicon, OG, and schema (not the wide wordmark). */
export const brandIconUrl = absoluteUrl(siteConfig.icon);

export const defaultOgImage = {
  url: brandIconUrl,
  width: 512,
  height: 512,
  alt: `${siteConfig.name} logo`,
} as const;

/**
 * Homepage title fragment (paired with brand).
 * Full SERP: "Toolwright - Free Age, Mortgage, BMI & Online Calculators"
 */
export const homeTitle = "Free Age, Mortgage, BMI & Online Calculators";

/** Unique homepage meta description (~155 chars). Lead with Age Calculator. */
export const homeDescription =
  "Free Age Calculator, mortgage, BMI, calorie, due date and 100+ tools. Instant results, US-ready units, private in your browser - no signup.";

export const homeKeywords = [
  "free online calculator",
  "age calculator",
  "mortgage calculator",
  "bmi calculator",
  "loan calculator",
  "calorie calculator",
  "due date calculator",
  "compound interest calculator",
  "paycheck calculator",
  "tdee calculator",
  "macro calculator",
  "pregnancy calculator",
  "toolwright",
  "toolwright.site",
  "online tools USA",
] as const;
