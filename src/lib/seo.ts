import { siteConfig, absoluteUrl } from "@/lib/site";
import type { ToolDefinition } from "@/lib/tools";
import { categories } from "@/lib/tools";
import {
  buildToolDescription,
  buildToolKeywords,
  buildToolTitle,
  getToolSeoCopy,
  mergeFaqs,
} from "@/lib/seo-copy";

export {
  buildToolDescription,
  buildToolKeywords,
  buildToolTitle,
  getToolSeoCopy,
  mergeFaqs,
};

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
  const seo = getToolSeoCopy(tool);
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
    alternateName: [`Free ${tool.name}`, `Online ${tool.name}`, `${tool.name} Online`],
    url,
    description: seo.description,
    applicationCategory: appCategory,
    applicationSubCategory: categories[tool.category].label,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    softwareVersion: "1.0",
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    countriesSupported: siteConfig.marketCodes.join(", "),
    keywords: seo.keywords.join(", "),
    featureList: seo.benefits,
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
  const seo = getToolSeoCopy(tool);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: seo.howHeading,
    description: seo.whatIs,
    totalTime: "PT1M",
    tool: {
      "@type": "HowToTool",
      name: tool.name,
    },
    step: seo.howSteps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
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
