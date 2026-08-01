import { siteConfig, absoluteUrl } from "@/lib/site";
import type { ToolDefinition } from "@/lib/tools";
import { categories } from "@/lib/tools";

/** Primary SERP title — keyword first, under ~60 chars before brand template. */
export function buildToolTitle(tool: ToolDefinition) {
  return `Free ${tool.name} Online`;
}

/** Compelling meta description with primary keyword + intent + CTA. */
export function buildToolDescription(tool: ToolDefinition) {
  const base = tool.description.replace(/\.$/, "");
  return `${base}. Instant results, free, no signup — calculate now on ${siteConfig.name}.`;
}

export function buildToolKeywords(tool: ToolDefinition) {
  const extras = [
    `free ${tool.name.toLowerCase()}`,
    `online ${tool.name.toLowerCase()}`,
    `${tool.shortName.toLowerCase()} calculator`,
    `${tool.name.toLowerCase()} USA`,
    `best ${tool.name.toLowerCase()}`,
  ];
  return Array.from(new Set([...tool.keywords, ...extras]));
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["Toolwright Calculators", "Toolwright Tools"],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    audience: {
      "@type": "Audience",
      geographicArea: siteConfig.markets.map((name) => ({
        "@type": "Country",
        name,
      })),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/tools")}?q={search_term_string}`,
      },
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
    email: siteConfig.email,
    areaServed: siteConfig.marketCodes.map((code) => ({
      "@type": "Country",
      name: code,
    })),
    knowsLanguage: ["en-US", "en-GB"],
    sameAs: [] as string[],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
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
  const url = absoluteUrl(`/${tool.slug}`);
  const appCategory =
    tool.category === "finance"
      ? "FinanceApplication"
      : tool.category === "fitness" ||
          tool.category === "pregnancy" ||
          tool.category === "nutrition"
        ? "HealthApplication"
        : "UtilitiesApplication";

  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name: tool.name,
    alternateName: [`Free ${tool.name}`, `Online ${tool.name}`],
    url,
    description: tool.description,
    applicationCategory: appCategory,
    applicationSubCategory: categories[tool.category].label,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    softwareVersion: "1.0",
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    countriesSupported: siteConfig.marketCodes.join(", "),
    keywords: buildToolKeywords(tool).join(", "),
    featureList: [
      "Free to use",
      "No signup required",
      "Instant results",
      "Private browser-side calculation",
      "Mobile friendly",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function howToJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${tool.name}`,
    description: tool.longDescription,
    totalTime: "PT1M",
    tool: {
      "@type": "HowToTool",
      name: tool.name,
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your numbers",
        text: `Open the free ${tool.name} and fill in the required fields with your values.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Calculate",
        text: "Click calculate to get an instant result — no account or download needed.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Review the result",
        text: "Read the estimate and related details. Results are educational; verify important decisions with a professional when needed.",
      },
    ],
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
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(`/${tool.slug}`),
      description: tool.description,
    })),
  };
}
