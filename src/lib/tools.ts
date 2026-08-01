import { healthTools } from "@/lib/health-tools";
import type { ToolCategory, ToolDefinition } from "@/lib/tool-types";

export type { ToolCategory, ToolDefinition };

export const categories: Record<
  ToolCategory,
  { label: string; description: string }
> = {
  calculators: {
    label: "Calculators",
    description: "Date, age, and everyday math utilities that answer fast.",
  },
  fitness: {
    label: "Fitness & Health",
    description: "BMI, calories, body fat, pace, heart rate, and training tools.",
  },
  pregnancy: {
    label: "Pregnancy",
    description: "Due dates, ovulation, conception, and pregnancy progress tools.",
  },
  nutrition: {
    label: "Nutrition & Body",
    description: "Macros, TDEE, protein, GFR, BSA, and related estimators.",
  },
  text: {
    label: "Text Tools",
    description: "Count, transform, and clean writing with free text utilities.",
  },
  developer: {
    label: "Developer Tools",
    description: "Format, encode, and debug data without leaving the browser.",
  },
  security: {
    label: "Security Tools",
    description: "Generate strong secrets and hashes locally on your device.",
  },
  converters: {
    label: "Converters",
    description: "Convert colors, encodings, and formats in seconds.",
  },
  generators: {
    label: "Generators",
    description: "Create IDs, sample text, and random values instantly.",
  },
};

export const tools: ToolDefinition[] = [
  ...healthTools,
  {
    slug: "age-calculator",
    name: "Age Calculator",
    shortName: "Age",
    description:
      "Free age calculator to find exact age between two dates in years, months, weeks, days, hours, minutes, and seconds.",
    longDescription:
      "Enter a date of birth and an optional “age at” date to calculate age the way most Western countries count it — age increases on your birthday. Get a clear breakdown in years, months, and days, plus total weeks, days, hours, minutes, and seconds lived, and see how long until the next birthday. Different cultures count age differently; this tool follows the common birthday-based system used across most Western countries.",
    category: "calculators",
    keywords: [
      "age calculator",
      "calculate age",
      "age from date of birth",
      "how old am I",
      "exact age calculator",
      "date of birth calculator",
    ],
    featured: true,
    faqs: [
      {
        question: "How does this age calculator count age?",
        answer:
          "It uses the common Western age system: your age increases on your birthday. For example, someone who has lived 3 years and 11 months is 3 years old until the next birthday.",
      },
      {
        question: "Can I calculate age on a past or future date?",
        answer:
          "Yes. Set “Age at the date of” to any day on or after the date of birth to find age as of that date — useful for forms, milestones, and eligibility checks.",
      },
      {
        question: "Why can month and day results look confusing?",
        answer:
          "Months have uneven lengths. We count calendar months from the birth day (for example Feb 20 → Mar 20 is one month). When the start day is near month-end, remaining days follow that same day-based method.",
      },
      {
        question: "Is my date of birth stored?",
        answer:
          "No. Age is calculated entirely in your browser. Nothing is uploaded or saved on our servers.",
      },
    ],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortName: "Word Count",
    description:
      "Free online word counter that counts words, characters, sentences, and reading time instantly.",
    longDescription:
      "Paste or type any text to get live word count, character count (with and without spaces), sentence and paragraph totals, and estimated reading time. Ideal for essays, social posts, SEO drafts, and content briefs.",
    category: "text",
    keywords: [
      "word counter",
      "character counter",
      "word count tool",
      "online word counter",
      "reading time calculator",
    ],
    featured: true,
    faqs: [
      {
        question: "Does this word counter store my text?",
        answer:
          "No. Counting runs entirely in your browser. Nothing you paste is uploaded or saved on our servers.",
      },
      {
        question: "How is reading time calculated?",
        answer:
          "Reading time uses an average of 200 words per minute, a common estimate for general web content.",
      },
    ],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    shortName: "Case Convert",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case, camelCase, and snake_case online.",
    longDescription:
      "Transform any string into the casing style you need for writing, code, or filenames. Switch between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case with one click.",
    category: "text",
    keywords: [
      "case converter",
      "uppercase converter",
      "title case converter",
      "camelcase converter",
      "snake case converter",
    ],
    featured: true,
    faqs: [
      {
        question: "What is Title Case?",
        answer:
          "Title Case capitalizes the first letter of each major word. Small connector words like “a”, “and”, and “the” stay lowercase unless they start the phrase.",
      },
    ],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    shortName: "Lorem Ipsum",
    description:
      "Generate placeholder lorem ipsum paragraphs, sentences, and words for mockups and wireframes.",
    longDescription:
      "Create classic lorem ipsum filler text for design comps, CMS demos, and layout testing. Choose paragraphs, sentences, or words and copy the result in one click.",
    category: "generators",
    keywords: [
      "lorem ipsum generator",
      "placeholder text generator",
      "dummy text generator",
      "lorem ipsum",
    ],
    faqs: [
      {
        question: "Is lorem ipsum real Latin?",
        answer:
          "It is derived from classical Latin passages, scrambled into nonsensical placeholder text so readers focus on layout instead of meaning.",
      },
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortName: "JSON Format",
    description:
      "Format, beautify, and validate JSON online. Pretty-print or minify JSON with instant error feedback.",
    longDescription:
      "Paste messy JSON to validate syntax, beautify with indentation, or minify for production. Errors highlight quickly so you can fix payloads, API responses, and config files faster.",
    category: "developer",
    keywords: [
      "json formatter",
      "json beautifier",
      "json validator",
      "pretty print json",
      "minify json",
    ],
    featured: true,
    faqs: [
      {
        question: "Is my JSON uploaded?",
        answer:
          "No. Formatting and validation happen locally in your browser for privacy and speed.",
      },
    ],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder & Decoder",
    shortName: "Base64",
    description:
      "Encode text to Base64 or decode Base64 strings online. Fast, private, browser-based conversion.",
    longDescription:
      "Convert plain text to Base64 and decode Base64 back to readable text. Useful for data URIs, tokens, email attachments, and debugging encoded payloads.",
    category: "converters",
    keywords: [
      "base64 encoder",
      "base64 decoder",
      "base64 encode online",
      "decode base64",
    ],
    featured: true,
    faqs: [
      {
        question: "Is Base64 encryption?",
        answer:
          "No. Base64 is an encoding scheme for representing binary data as text. It is reversible and not a security control.",
      },
    ],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder & Decoder",
    shortName: "URL Encode",
    description:
      "URL-encode and decode query strings and path segments online with percent-encoding support.",
    longDescription:
      "Encode reserved characters for safe URLs, or decode percent-encoded strings back to readable text. Handy for query parameters, redirects, and API debugging.",
    category: "converters",
    keywords: [
      "url encoder",
      "url decoder",
      "percent encoding",
      "encode url online",
    ],
    faqs: [
      {
        question: "When should I URL-encode text?",
        answer:
          "Encode characters that are reserved or unsafe in URLs — spaces, ampersands, equals signs, and non-ASCII characters — before placing them in query strings.",
      },
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortName: "Passwords",
    description:
      "Generate strong random passwords online. Customize length, symbols, numbers, and pronounceable options.",
    longDescription:
      "Create cryptographically strong passwords with customizable length and character sets. Generation uses the Web Crypto API in your browser so secrets never leave your device.",
    category: "security",
    keywords: [
      "password generator",
      "strong password generator",
      "random password",
      "secure password generator",
    ],
    featured: true,
    faqs: [
      {
        question: "Are generated passwords stored?",
        answer:
          "Never. Passwords are created locally with secure random values and are not logged or transmitted.",
      },
      {
        question: "How long should a password be?",
        answer:
          "For most accounts, 16+ characters with mixed character types is a strong baseline. Prefer a password manager when possible.",
      },
    ],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    shortName: "Hash",
    description:
      "Generate SHA-256, SHA-384, and SHA-512 hashes from text online using the Web Crypto API.",
    longDescription:
      "Hash any text string with modern SHA algorithms entirely in your browser. Useful for checksums, integrity checks, and learning how hashing works — without sending data to a server.",
    category: "security",
    keywords: [
      "hash generator",
      "sha256 hash",
      "sha512 online",
      "checksum generator",
    ],
    faqs: [
      {
        question: "Can I reverse a hash?",
        answer:
          "No. Cryptographic hashes are one-way. Matching a hash requires guessing or looking up the original input.",
      },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    shortName: "UUID",
    description:
      "Generate UUID v4 identifiers online. Create one or many random UUIDs for databases and APIs.",
    longDescription:
      "Produce RFC 4122 version 4 UUIDs instantly. Generate a single ID or a batch for seeding databases, testing APIs, and assigning unique keys.",
    category: "generators",
    keywords: [
      "uuid generator",
      "guid generator",
      "uuid v4",
      "random uuid online",
    ],
    featured: true,
    faqs: [
      {
        question: "What is UUID v4?",
        answer:
          "UUID version 4 is a randomly generated 128-bit identifier. Collision risk is extremely low for typical application use.",
      },
    ],
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    shortName: "Colors",
    description:
      "Convert HEX, RGB, and HSL colors online. Preview swatches and copy CSS-ready values.",
    longDescription:
      "Translate colors between HEX, RGB, and HSL formats with a live preview. Copy CSS snippets for design systems, Tailwind configs, and style guides.",
    category: "converters",
    keywords: [
      "color converter",
      "hex to rgb",
      "rgb to hex",
      "hsl converter",
      "color picker tool",
    ],
    faqs: [
      {
        question: "Does this support alpha / opacity?",
        answer:
          "The converter focuses on solid HEX, RGB, and HSL values. Add alpha in CSS with / opacity or rgba() as needed.",
      },
    ],
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getFeaturedTools() {
  return tools.filter((tool) => tool.featured);
}

export function getToolsByCategory(category: ToolCategory) {
  return tools.filter((tool) => tool.category === category);
}

export function getAllToolSlugs() {
  return tools.map((tool) => tool.slug);
}
