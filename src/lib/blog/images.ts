import type { ToolCategory } from "@/lib/tool-types";

export type BlogCoverImage = {
  /** Optimized Unsplash CDN URL */
  src: string;
  alt: string;
  /** Photographer credit (Unsplash License) */
  credit: string;
  creditUrl: string;
};

/** Free Unsplash photos — https://unsplash.com/license */
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const pool = {
  house: {
    src: U("photo-1560518883-ce09059eeffa"),
    alt: "Suburban house exterior",
    credit: "Tierra Mallorca",
    creditUrl: "https://unsplash.com/photos/modern-house-exterior-DEkfWjlMkWI",
  },
  mortgageDocs: {
    src: U("photo-1560520653-9e0e4c89eb11"),
    alt: "Person reviewing home buying documents",
    credit: "Tina Floersch",
    creditUrl: "https://unsplash.com/photos/person-holding-white-printer-paper-LKtr62T-hSs",
  },
  citySkyline: {
    src: U("photo-1486406146926-c627a92ad1ab"),
    alt: "City office buildings",
    credit: "Sean Pollock",
    creditUrl: "https://unsplash.com/photos/bottom-view-of-glass-buildings-PhYq704ffdA",
  },
  savings: {
    src: U("photo-1579621970563-ebec7560ff3e"),
    alt: "Coins and plant growing from savings jar",
    credit: "Fabian Blank",
    creditUrl: "https://unsplash.com/photos/person-holding-coin-mPRQIHIHQsU",
  },
  investing: {
    src: U("photo-1611974789855-9c2a0a7236a3"),
    alt: "Stock market chart on a screen",
    credit: "Nick Chong",
    creditUrl: "https://unsplash.com/photos/black-and-silver-laptop-computer-N_AIUjvY_bw",
  },
  calculatorDesk: {
    src: U("photo-1554224155-6726b3ff858f"),
    alt: "Desk with calculator and financial papers",
    credit: "Kelly Sikkema",
    creditUrl: "https://unsplash.com/photos/black-calculator-beside-white-printer-paper-atNTyTw0W4M",
  },
  paycheck: {
    src: U("photo-1556742049-0cfed4f6a45d"),
    alt: "Person paying at a counter",
    credit: "Blake Wisz",
    creditUrl: "https://unsplash.com/photos/person-holding-bank-card-tE6th1su0LI",
  },
  creditCard: {
    src: U("photo-1556742111-a301076d9d18"),
    alt: "Credit cards on a surface",
    credit: "pickawood",
    creditUrl: "https://unsplash.com/photos/assorted-bank-cards-on-white-surface-a3RhaDG_pIk",
  },
  car: {
    src: U("photo-1492144534655-ae79c964c9d7"),
    alt: "Car on the road",
    credit: "Lars Page",
    creditUrl: "https://unsplash.com/photos/blue-and-black-coupe-parked-near-green-trees-wQ9VuPTAYBk",
  },
  fitness: {
    src: U("photo-1517836357463-d25dfeac3438"),
    alt: "People training in a gym",
    credit: "John Arano",
    creditUrl: "https://unsplash.com/photos/man-wearing-black-tank-top-doing-exercise-h4i9G-de7Po",
  },
  running: {
    src: U("photo-1476480862126-209bfaa8edc8"),
    alt: "Person running outdoors",
    credit: "Andrew Ly",
    creditUrl: "https://unsplash.com/photos/man-running-on-road-near-trees-during-daytime-jFrcXLbh0zY",
  },
  healthyFood: {
    src: U("photo-1512621776951-a57141f2eefd"),
    alt: "Colorful healthy vegetable bowl",
    credit: "Anna Pelzer",
    creditUrl: "https://unsplash.com/photos/vegetable-salad-on-white-ceramic-plate-IGfIGP5ONV0",
  },
  pregnancy: {
    src: U("photo-1515488042361-ee00e0ddd4e4"),
    alt: "Baby shoes on a soft blanket",
    credit: "Christian Bowen",
    creditUrl: "https://unsplash.com/photos/white-and-brown-baby-shoes-I0ItPtIsTE0",
  },
  family: {
    src: U("photo-1476703993599-0035a21b17a9"),
    alt: "Family walking together outdoors",
    credit: "National Cancer Institute",
    creditUrl: "https://unsplash.com/photos/woman-carrying-baby-while-walking-NFvdKIhxYlU",
  },
  coding: {
    src: U("photo-1461749280684-dccba630e2f6"),
    alt: "Code on a computer monitor",
    credit: "Carlos Muza",
    creditUrl: "https://unsplash.com/photos/laptop-computer-on-glass-top-table-hpjSkU2UYSU",
  },
  security: {
    src: U("photo-1563986768609-322da13575f3"),
    alt: "Laptop with security lock concept",
    credit: "FlyD",
    creditUrl: "https://unsplash.com/photos/black-laptop-computer-turned-on-zAhAUSdRMQA",
  },
  writing: {
    src: U("photo-1455390582262-044cdead277a"),
    alt: "Notebook and pen on a desk",
    credit: "Aaron Burden",
    creditUrl: "https://unsplash.com/photos/pen-on-white-paper-y02jEX_B0O0",
  },
  tools: {
    src: U("photo-1581091226825-a6a2a5aee158"),
    alt: "Person working at a laptop",
    credit: "ThisisEngineering",
    creditUrl: "https://unsplash.com/photos/person-using-macbook-pro-Q1p7bh3SHj8",
  },
} as const satisfies Record<string, BlogCoverImage>;

const byCategory: Record<ToolCategory, BlogCoverImage[]> = {
  finance: [
    pool.calculatorDesk,
    pool.investing,
    pool.savings,
    pool.citySkyline,
    pool.paycheck,
  ],
  fitness: [pool.fitness, pool.running, pool.healthyFood],
  pregnancy: [pool.pregnancy, pool.family],
  nutrition: [pool.healthyFood, pool.fitness],
  calculators: [pool.calculatorDesk, pool.tools],
  text: [pool.writing, pool.tools],
  developer: [pool.coding, pool.tools],
  security: [pool.security, pool.coding],
  converters: [pool.tools, pool.coding],
  generators: [pool.tools, pool.writing],
};

function pick(list: BlogCoverImage[], seed: string): BlogCoverImage {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  return list[h % list.length]!;
}

/** Topic-aware Unsplash cover for a tool blog post. */
export function coverForTool(toolSlug: string, category: ToolCategory): BlogCoverImage {
  if (/mortgage|house|home|rent|real-estate|heloc|fha|va-|down-payment|refinance|rental|affordability/.test(toolSlug)) {
    return pick([pool.house, pool.mortgageDocs], toolSlug);
  }
  if (/auto|car|boat|lease|cash-back/.test(toolSlug)) return pool.car;
  if (/credit|debt|payoff|consolidation/.test(toolSlug)) return pool.creditCard;
  if (/compound|invest|interest|roi|irr|bond|cd-|savings|retirement|401k|ira|annuity|rmd/.test(toolSlug)) {
    return pick([pool.investing, pool.savings], toolSlug);
  }
  if (/salary|paycheck|tax|budget|commission/.test(toolSlug)) return pool.paycheck;
  if (/bmi|calorie|pace|heart|body|weight|tdee|macro|protein|carb|fat|gfr/.test(toolSlug)) {
    return pick(byCategory.fitness, toolSlug);
  }
  if (/pregnan|due-date|ovulation|conception|period/.test(toolSlug)) {
    return pick(byCategory.pregnancy, toolSlug);
  }
  return pick(byCategory[category], toolSlug);
}

export const curatedCoverByTool: Record<string, BlogCoverImage> = {
  "mortgage-calculator": pool.house,
  "compound-interest-calculator": pool.investing,
  "bmi-calculator": pool.fitness,
  "take-home-paycheck-calculator": pool.paycheck,
  "due-date-calculator": pool.pregnancy,
  "loan-calculator": pool.calculatorDesk,
};
