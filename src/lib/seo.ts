import { siteConfig, absoluteUrl } from "@/lib/site";
import type { ToolDefinition } from "@/lib/tools";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    audience: {
      "@type": "Audience",
      geographicArea: siteConfig.markets.map((name) => ({
        "@type": "Country",
        name,
      })),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/tools")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: siteConfig.marketCodes.map((code) => ({
      "@type": "Country",
      name: code,
    })),
    knowsLanguage: ["en-US", "en-GB"],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function toolJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: absoluteUrl(`/${tool.slug}`),
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    inLanguage: siteConfig.language,
    countriesSupported: siteConfig.marketCodes.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqJsonLd(faqs: ToolDefinition["faqs"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  tools: { name: string; slug: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(`/${tool.slug}`),
      description: tool.description,
    })),
  };
}
