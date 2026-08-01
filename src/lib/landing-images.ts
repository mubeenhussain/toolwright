/** Free Unsplash images for the landing page — https://unsplash.com/license */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const landingHero = {
  src: u("photo-1554224155-6726b3ff858f", 2000),
  alt: "Calculator and notes on a desk — clear numbers, instant answers",
  credit: "Kelly Sikkema",
  creditUrl:
    "https://unsplash.com/photos/black-calculator-beside-white-printer-paper-atNTyTw0W4M",
};

export const landingCategoryImages = {
  finance: {
    src: u("photo-1560518883-ce09059eeffa", 900),
    alt: "Home and mortgage planning",
  },
  fitness: {
    src: u("photo-1517836357463-d25dfeac3438", 900),
    alt: "Fitness and health tracking",
  },
  pregnancy: {
    src: u("photo-1515488042361-ee00e0ddd4e4", 900),
    alt: "Pregnancy planning",
  },
  nutrition: {
    src: u("photo-1512621776951-a57141f2eefd", 900),
    alt: "Healthy nutrition planning",
  },
  calculators: {
    src: u("photo-1581091226825-a6a2a5aee158", 900),
    alt: "Everyday online tools",
  },
} as const;

export const landingStoryImage = {
  src: u("photo-1611974789855-9c2a0a7236a3", 1400),
  alt: "Charts and planning on a screen — decisions backed by numbers",
  credit: "Nick Chong",
  creditUrl:
    "https://unsplash.com/photos/black-and-silver-laptop-computer-N_AIUjvY_bw",
};
