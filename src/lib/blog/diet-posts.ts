import type { BlogCover, BlogPost } from "@/lib/blog/types";

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const covers = {
  guidelines: {
    src: u("photo-1498837167922-ddd27525d352"),
    alt: "Fresh vegetables and healthy groceries on a table",
    credit: "Anna Pelzer",
    creditUrl: "https://unsplash.com/photos/vegetable-and-meat-on-chopping-board-IGfIGP5ONV0",
  } satisfies BlogCover,
  protein: {
    src: u("photo-1546069901-ba9599a7e63c"),
    alt: "Balanced bowl with protein, greens, and grains",
    credit: "Anh Nguyen",
    creditUrl: "https://unsplash.com/photos/vegetable-salad-in-white-round-ceramic-bowl-kcA-c3f_3FE",
  } satisfies BlogCover,
  weekPlan: {
    src: u("photo-1512621776951-a57141f2eefd"),
    alt: "Colorful salad bowl with healthy ingredients",
    credit: "Anna Pelzer",
    creditUrl: "https://unsplash.com/photos/vegetable-salad-on-white-ceramic-plate-IGfIGP5ONV0",
  } satisfies BlogCover,
  macros: {
    src: u("photo-1504674900247-0877df9cc836"),
    alt: "Plated meal with vegetables and protein",
    credit: "Brooke Lark",
    creditUrl: "https://unsplash.com/photos/cooked-food-on-white-ceramic-plate-jUPOICA3eIc",
  } satisfies BlogCover,
  budget: {
    src: u("photo-1542838132-92c53300491e"),
    alt: "Grocery shopping cart in a US supermarket aisle",
    credit: "nrd",
    creditUrl: "https://unsplash.com/photos/assorted-produce-in-grocery-store-LJrIcAomNIM",
  } satisfies BlogCover,
  deskJob: {
    src: u("photo-1484480974693-6ca0a78fb36b"),
    alt: "Person working at a laptop with coffee",
    credit: "Andrew Neel",
    creditUrl: "https://unsplash.com/photos/person-using-macbook-pro-on-white-table-QLjdPY_7QvA",
  } satisfies BlogCover,
};

/**
 * SEO diet / meal-plan guides for US readers.
 * Extra posts (not one-per-tool) — merged in blog index by unique slug.
 */
export const dietPosts: BlogPost[] = [
  {
    slug: "us-dietary-guidelines-2025-2030-simple-plan",
    title:
      "New U.S. Dietary Guidelines 2025–2030: a simple eating plan Americans can actually follow",
    excerpt:
      "Federal nutrition guidance just got a loud “eat real food” reset. Here’s what it means for your plate, protein, and calories — plus free calculators to personalize the plan.",
    toolSlug: "calorie-calculator",
    category: "nutrition",
    regions: ["US", "UK", "EU"],
    readingMinutes: 9,
    publishedAt: "2026-07-28T14:00:00.000Z",
    updatedAt: "2026-08-01T14:00:00.000Z",
    author: "Toolwright Editors",
    cover: covers.guidelines,
    featured: true,
    ctaLabel: "Find your daily calories",
    keywords: [
      "US dietary guidelines 2025",
      "Dietary Guidelines for Americans",
      "eat real food diet plan",
      "American healthy eating plan",
      "calorie calculator USA",
      "how many calories should I eat",
    ],
    takeaways: [
      "The 2025–2030 U.S. guidelines push whole, nutrient-dense foods and less ultra-processed junk.",
      "Protein goals are higher than many people remember — roughly 1.2–1.6 g per kg body weight.",
      "Calories still matter: eat the right amount for your age, size, and activity.",
      "Personalize with a free calorie calculator before you buy another meal plan PDF.",
    ],
    sections: [
      {
        heading: "Why Americans are talking about this again",
        paragraphs: [
          "In January 2026, USDA and HHS released the Dietary Guidelines for Americans, 2025–2030 — framed around a blunt message: prioritize real, nutrient-dense food and cut back hard on highly processed products packed with refined carbs, added sugars, and additives. News coverage called it one of the biggest federal nutrition resets in years.",
          "You do not need a policy briefing to use the idea. If your week looks like drive-thru lunches, sweet coffee drinks, and “healthy” bars that are basically candy, this guide is your reset button — without a celebrity detox.",
        ],
      },
      {
        heading: "The American plate, simplified",
        paragraphs: [
          "Build most meals around protein + produce, then add dairy (including full-fat options without added sugar, if you tolerate dairy), healthy fats from foods like eggs, nuts, olive oil, avocado, and seafood, and fiber-rich whole grains in sensible portions.",
          "What to shrink: white-flour snacks, sugary breakfast kits, deep-fried defaults, and ultra-processed “meal replacements” that leave you hungry an hour later. Water and unsweetened drinks beat soda for the long game.",
          "Federal guidance still talks about portion awareness and keeping saturated fat in a reasonable share of total calories. Think pattern, not perfection — one pizza night does not erase a solid week.",
        ],
      },
      {
        heading: "Step 1: know your calorie ballpark",
        paragraphs: [
          "The guidelines repeat something diet culture loves to skip: needs depend on age, sex, height, weight, and activity. A 28-year-old warehouse worker and a 45-year-old desk employee should not clone the same 1,200-calorie influencer plan.",
          "Start with Toolwright’s free Calorie Calculator to estimate a daily target for loss, maintenance, or gain. Then sanity-check with the TDEE Calculator if you want a maintenance baseline before you create a deficit.",
        ],
      },
      {
        heading: "A one-day “real food” template (U.S. grocery friendly)",
        paragraphs: [
          "Breakfast: eggs or Greek yogurt, fruit, and a slice of whole-grain toast or oats. Lunch: grilled chicken or beans, big salad or leftover roasted vegetables, olive oil. Dinner: salmon or turkey, potatoes or brown rice, and a pile of vegetables. Snacks: cottage cheese, fruit, nuts — not a vending-machine scavenger hunt.",
          "Shop the perimeter of a typical American supermarket first (produce, dairy, meat/seafood), then hit the aisle for oats, rice, beans, and frozen vegetables. Frozen produce counts. Busy parents already know this; the guidelines are finally saying it out loud.",
        ],
      },
      {
        heading: "How Toolwright helps you stick the landing",
        paragraphs: [
          "Use the Calorie Calculator for your daily energy target, the Protein Calculator for a gram goal that matches newer higher-protein guidance, and the Macro Calculator if you want protein/carbs/fat split without downloading another app.",
          "Educational only — not medical advice. If you have diabetes, kidney disease, or other conditions, talk with a clinician or registered dietitian before big diet changes.",
        ],
      },
    ],
  },
  {
    slug: "high-protein-diet-plan-american",
    title:
      "High-protein diet plan for Americans: how much you need and what to eat",
    excerpt:
      "U.S. guidance now highlights higher protein targets. Here’s a practical day of eating, grocery list ideas, and a free protein calculator so you’re not guessing grams.",
    toolSlug: "protein-calculator",
    category: "nutrition",
    regions: ["US", "UK", "EU"],
    readingMinutes: 8,
    publishedAt: "2026-07-30T15:00:00.000Z",
    updatedAt: "2026-08-01T15:00:00.000Z",
    author: "Toolwright Editors",
    cover: covers.protein,
    featured: true,
    ctaLabel: "Calculate your protein target",
    keywords: [
      "high protein diet plan",
      "protein diet USA",
      "how much protein per day",
      "protein calculator",
      "1.2 g protein per kg",
      "American meal plan protein",
    ],
    takeaways: [
      "Many Americans under-eat protein at breakfast and overdo refined snacks later.",
      "A common planning range discussed with the new guidelines is about 1.2–1.6 g protein per kg body weight.",
      "Spread protein across meals — don’t save it all for dinner.",
      "Confirm your number with a free protein calculator, then build meals around it.",
    ],
    sections: [
      {
        heading: "Protein stopped being an afterthought",
        paragraphs: [
          "Coverage of the 2025–2030 Dietary Guidelines for Americans put protein front and center: prioritize protein foods at every meal, mix animal and plant sources, and aim higher than the old “bare minimum” mindset many textbooks taught.",
          "For weight management, higher protein often helps with fullness. That does not mean chicken-breast-only misery. Eggs, Greek yogurt, beef, poultry, seafood, beans, lentils, tofu, and cottage cheese all count in a normal U.S. kitchen.",
        ],
      },
      {
        heading: "Find your number before you meal-prep",
        paragraphs: [
          "Convert pounds to kilograms (divide by 2.2), then multiply by 1.2–1.6 for a planning range — or skip the arithmetic and use Toolwright’s Protein Calculator. Someone at 180 lb (~82 kg) might land roughly in the 100–130 g/day neighborhood depending on goals and calories.",
          "If you are cutting calories, keep protein high so you hang onto muscle while fat comes off. Pair with the Calorie Calculator so your protein goal still fits your energy budget.",
        ],
      },
      {
        heading: "Sample high-protein American day (~140–160 g)",
        paragraphs: [
          "Breakfast: 3 eggs + Greek yogurt (~40 g). Lunch: turkey sandwich on whole grain + side of edamame or cottage cheese (~45 g). Snack: protein shake or leftover chicken (~25 g). Dinner: salmon or sirloin with beans and vegetables (~45 g). Adjust portions up or down to hit your calculator target.",
          "Eating out tip: Chipotle bowls, grilled chicken salads, and “double meat” strategies beat fried combo meals when you care about protein density per dollar.",
        ],
      },
      {
        heading: "Next step on Toolwright",
        paragraphs: [
          "Open the Protein Calculator, then lock carbs and fats with the Macro Calculator if you want a full split. Educational content only — not a prescription for medical diets.",
        ],
      },
    ],
  },
  {
    slug: "7-day-american-diet-plan-weight-loss",
    title: "7-day American diet plan for weight loss (realistic, grocery-store food)",
    excerpt:
      "A week of U.S.-style meals that still feel like food — breakfasts, lunches, dinners, and snacks — built around a calorie target you can calculate free online.",
    toolSlug: "calorie-calculator",
    category: "nutrition",
    regions: ["US", "UK", "EU"],
    readingMinutes: 10,
    publishedAt: "2026-07-25T12:00:00.000Z",
    updatedAt: "2026-07-31T12:00:00.000Z",
    author: "Toolwright Editors",
    cover: covers.weekPlan,
    featured: true,
    ctaLabel: "Set your calorie target",
    keywords: [
      "7 day diet plan",
      "American diet plan for weight loss",
      "weekly meal plan USA",
      "calorie deficit meal plan",
      "simple diet plan Americans",
      "weight loss meal plan grocery store",
    ],
    takeaways: [
      "Pick a calorie target first; the meal plan is just a template.",
      "Repeat meals you like — variety is optional, consistency is not.",
      "Include protein and produce at most meals to stay fuller.",
      "Use free calculators so the plan matches your body, not a magazine average.",
    ],
    sections: [
      {
        heading: "Rules of a plan you’ll finish",
        paragraphs: [
          "Viral 7-day cleanses fail because they fight American life: kids, shifts, road trips, and Costco runs. This plan uses familiar foods — chicken, eggs, oats, frozen veggies, rice, tortillas, ground turkey — and assumes you’ll reuse leftovers.",
          "Before day one, run the Calorie Calculator for a modest deficit (often ~500 kcal below maintenance). Extreme cuts rebound. If maintenance is unclear, check the TDEE Calculator first.",
        ],
      },
      {
        heading: "The week at a glance",
        paragraphs: [
          "Days 1–2: egg breakfasts, turkey or tuna lunches, sheet-pan chicken dinners. Days 3–4: overnight oats, burrito bowls, salmon or turkey chili. Days 5–7: Greek yogurt parfaits, leftover bowls, grilled protein + microwave frozen vegetables. Snacks: fruit, string cheese, carrots + hummus, air-popped popcorn.",
          "Swap freely: beef for turkey, tofu for chicken, corn tortillas for rice. Keep the structure — protein + produce + a smart carb — even when brands change.",
        ],
      },
      {
        heading: "Sample day (about 1,800 calories — scale to your number)",
        paragraphs: [
          "Breakfast: oatmeal cooked in milk, berries, scoop of peanut butter. Lunch: grilled chicken salad with olive oil and feta. Snack: apple + cheese stick. Dinner: turkey taco bowl (lean turkey, black beans, salsa, lettuce, a little cheese). Dessert optional: Greek yogurt with cinnamon.",
          "If your calculator says 2,200, add a banana, extra rice, or larger protein portions. If it says 1,500, shrink oils and snack size first — not vegetables.",
        ],
      },
      {
        heading: "Track without obsessing",
        paragraphs: [
          "Weigh yourself weekly, not hourly. If hunger is brutal, raise calories slightly or bump protein using the Protein Calculator. Toolwright stays private in your browser — no food-log account required.",
        ],
      },
    ],
  },
  {
    slug: "macro-diet-plan-for-beginners-usa",
    title: "Macro diet for beginners in the U.S.: protein, carbs, and fat without the spiral",
    excerpt:
      "Macros are just calories with labels. Learn a beginner American approach — flexible dieting vibes, not spreadsheet trauma — and set targets with a free macro calculator.",
    toolSlug: "macro-calculator",
    category: "nutrition",
    regions: ["US", "UK", "EU"],
    readingMinutes: 7,
    publishedAt: "2026-07-20T11:00:00.000Z",
    updatedAt: "2026-07-29T11:00:00.000Z",
    author: "Toolwright Editors",
    cover: covers.macros,
    featured: true,
    ctaLabel: "Open the Macro Calculator",
    keywords: [
      "macro diet plan",
      "macros for beginners",
      "IIFYM American diet",
      "macro calculator",
      "protein carbs fat calculator",
      "flexible dieting USA",
    ],
    takeaways: [
      "Hit protein first, then fill carbs and fats to your calorie budget.",
      "You can eat foods you like if the weekly average works.",
      "Beginners should track 2–3 weeks, then loosen up.",
      "Use a macro calculator so targets match your calorie goal.",
    ],
    sections: [
      {
        heading: "Macros, in plain English",
        paragraphs: [
          "Protein, carbohydrates, and fat are the three energy macros. Americans who “count macros” usually want body composition results without banning pizza forever. That style — sometimes called flexible dieting — works when calories and protein are honest.",
          "With newer U.S. guidance emphasizing protein and whole foods, a smart macro plan still prefers eggs and produce over refined snack foods — but it does not pretend birthday cake never happens.",
        ],
      },
      {
        heading: "Set targets in three clicks",
        paragraphs: [
          "1) Get calories from the Calorie Calculator. 2) Open the Macro Calculator and choose a goal (lose, maintain, gain). 3) Cross-check protein with the Protein Calculator if you want a gram target tied to body weight.",
          "A common starting pattern: higher protein, moderate fat, and enough carbs to train and think. Exact percentages matter less than consistency for 80% of people.",
        ],
      },
      {
        heading: "American foods that make macros easy",
        paragraphs: [
          "Protein anchors: rotisserie chicken, 93% lean beef, canned tuna, egg whites + yolks, Greek yogurt, cottage cheese, protein powder. Carb anchors: rice, potatoes, oats, fruit, beans. Fat anchors: olive oil, nuts, cheese, avocado — measure the pourable ones; they add up fast.",
          "Restaurant hack: ask for sauces on the side and prioritize grilled protein + a carb you can estimate (rice, potato). Perfect logging is optional; better averages beat abandoned apps.",
        ],
      },
    ],
  },
  {
    slug: "budget-diet-plan-american-family",
    title: "Budget diet plan for American households: eat better without blowing the grocery bill",
    excerpt:
      "Inflation-aware meal ideas using Costco-style staples, frozen produce, and beans — plus calorie and macro tools so “cheap” still matches your goals.",
    toolSlug: "calorie-calculator",
    category: "nutrition",
    regions: ["US", "UK", "EU"],
    readingMinutes: 8,
    publishedAt: "2026-07-18T16:00:00.000Z",
    updatedAt: "2026-07-28T16:00:00.000Z",
    author: "Toolwright Editors",
    cover: covers.budget,
    featured: true,
    ctaLabel: "Plan calories on a budget",
    keywords: [
      "budget diet plan",
      "cheap healthy meals USA",
      "grocery budget meal plan",
      "healthy eating on a budget America",
      "family diet plan cheap",
    ],
    takeaways: [
      "Protein + frozen vegetables + bulk carbs beat delivery for cost per calorie.",
      "Store brands and sales cycles matter more than organic labels for most goals.",
      "Cook once, eat twice — leftovers are a budget feature.",
      "Still set a calorie target so “cheap” doesn’t mean accidental surplus.",
    ],
    sections: [
      {
        heading: "Healthy and broke can coexist",
        paragraphs: [
          "American grocery prices made “eat clean” feel elite. It doesn’t have to. Dry beans, eggs, chicken thighs, canned tuna, oats, rice, potatoes, and frozen broccoli are still among the best dollars-per-nutrient plays in a U.S. supermarket.",
          "Ultra-processed snacks look cheap per package but expensive per full stomach. The new federal push toward real food quietly lines up with old-school thrift.",
        ],
      },
      {
        heading: "A $50-ish starter cart (prices vary by city)",
        paragraphs: [
          "Eggs, a family pack of chicken, a bag of frozen mixed vegetables, oats, rice or potatoes, canned beans, peanut butter, bananas, carrots, store-brand yogurt. Season with salt, pepper, garlic powder, and salsa. That’s a week of repeats for one adult — scale up for kids.",
          "Warehouse clubs help if you share food or freeze portions. No warehouse membership? Watch midweek meat markdowns at regular chains.",
        ],
      },
      {
        heading: "Keep goals honest",
        paragraphs: [
          "Budget meals still need a calorie ceiling if weight loss is the goal. Use the Calorie Calculator, then the Macro Calculator so cheap peanut butter doesn’t silently erase your deficit. Educational only — not financial or medical advice.",
        ],
      },
    ],
  },
  {
    slug: "desk-job-diet-plan-sedentary-american",
    title: "Desk-job diet plan: how sedentary Americans should eat without “earning” every snack",
    excerpt:
      "Office and remote workers often overestimate movement. Here’s a calm U.S. desk-job eating plan tied to TDEE and calorie math — not guilt.",
    toolSlug: "tdee-calculator",
    category: "nutrition",
    regions: ["US", "UK", "EU"],
    readingMinutes: 7,
    publishedAt: "2026-07-22T10:00:00.000Z",
    updatedAt: "2026-07-30T10:00:00.000Z",
    author: "Toolwright Editors",
    cover: covers.deskJob,
    featured: true,
    ctaLabel: "Calculate your TDEE",
    keywords: [
      "desk job diet plan",
      "sedentary diet plan",
      "TDEE calculator office worker",
      "work from home diet",
      "calorie needs sedentary",
    ],
    takeaways: [
      "Most desk jobs are “sedentary” or “lightly active” — don’t pick athlete multipliers.",
      "Structure meals so the 3 p.m. vending machine isn’t the main character.",
      "Walking meetings and step goals help, but food still drives the math.",
      "Start with TDEE, then set calories and protein.",
    ],
    sections: [
      {
        heading: "Your Fitbit is not a free pizza coupon",
        paragraphs: [
          "Americans love rewarding a 4,000-step day with a 700-calorie latte-and-muffin combo. Desk work burns less than we hope. That’s why TDEE (total daily energy expenditure) beats vibes.",
          "Open the TDEE Calculator with a conservative activity level. Then use the Calorie Calculator to set a cut or maintenance target you can live with on Zoom-heavy weeks.",
        ],
      },
      {
        heading: "A desk-day rhythm that works",
        paragraphs: [
          "Breakfast with 25–40 g protein (eggs, Greek yogurt). Lunch pre-decided the night before so DoorDash isn’t the default. Afternoon snack planned (not discovered). Dinner protein + vegetables + a carb you portion on purpose.",
          "Hydration: keep a water bottle in camera view. Unsweetened coffee/tea is fine; sugar bombs are sneaky.",
        ],
      },
      {
        heading: "Move a little, measure a lot less stress",
        paragraphs: [
          "A 10-minute walk after lunch helps blood sugar and mood. Strength training two days a week protects muscle while you diet. Pair habits with numbers from Toolwright — private, free, no signup.",
        ],
      },
    ],
  },
];
