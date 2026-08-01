export type ToolCategory =
  | "calculators"
  | "fitness"
  | "pregnancy"
  | "nutrition"
  | "text"
  | "developer"
  | "security"
  | "converters"
  | "generators";

export type ToolDefinition = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
};
