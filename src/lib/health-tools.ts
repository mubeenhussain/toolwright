import type { ToolDefinition } from "@/lib/tool-types";

const faqPrivate = {
  question: "Is my health data stored?",
  answer:
    "No. Calculations run in your browser. Nothing you enter is uploaded to our servers.",
};

const faqMedical = {
  question: "Is this medical advice?",
  answer:
    "No. These calculators provide estimates only. For diagnosis or treatment decisions, consult a qualified clinician.",
};

export const healthTools: ToolDefinition[] = [
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    shortName: "BMI",
    description:
      "Free BMI calculator to check body mass index from height and weight in metric or US units.",
    longDescription:
      "Calculate body mass index and see the standard underweight, normal, overweight, or obesity category. Supports kilogram/centimeter and pound/inch inputs.",
    category: "fitness",
    keywords: ["bmi calculator", "body mass index", "bmi chart", "calculate bmi"],
    featured: true,
    faqs: [
      {
        question: "What is a healthy BMI?",
        answer:
          "For many adults, BMI 18.5–24.9 is labeled normal weight. BMI is a screening tool and does not measure body fat directly.",
      },
      faqPrivate,
      faqMedical,
    ],
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    shortName: "Calories",
    description:
      "Daily calorie calculator for weight loss, maintenance, or gain based on BMR and activity level.",
    longDescription:
      "Estimate how many calories to eat each day using Mifflin–St Jeor BMR, activity multipliers, and your goal to lose, maintain, or gain weight.",
    category: "fitness",
    keywords: [
      "calorie calculator",
      "daily calories",
      "calories to lose weight",
      "tdee calorie calculator",
    ],
    featured: true,
    faqs: [
      {
        question: "How big is the weight-loss deficit?",
        answer:
          "This tool uses about a 500 kcal daily deficit for loss (~0.5 kg/week) and a modest surplus for gain. Adjust with a professional if needed.",
      },
      faqMedical,
    ],
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    shortName: "Body Fat",
    description:
      "Estimate body fat percentage with the US Navy circumference method using neck, waist, and hip measurements.",
    longDescription:
      "Enter height and circumference measurements to estimate body fat percentage using the US Navy formula. Hip measurement is required for women.",
    category: "fitness",
    keywords: [
      "body fat calculator",
      "body fat percentage",
      "navy body fat",
      "bf% calculator",
    ],
    faqs: [
      {
        question: "How accurate is the Navy method?",
        answer:
          "It is a practical field estimate. DEXA, Bod Pod, or hydrostatic weighing are more precise clinical methods.",
      },
      faqMedical,
    ],
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    shortName: "BMR",
    description:
      "Basal metabolic rate calculator using the Mifflin–St Jeor equation for men and women.",
    longDescription:
      "Find how many calories your body burns at rest from age, sex, height, and weight — the foundation for TDEE and calorie planning.",
    category: "fitness",
    keywords: ["bmr calculator", "basal metabolic rate", "mifflin st jeor"],
    faqs: [
      {
        question: "What formula do you use?",
        answer:
          "Mifflin–St Jeor, a widely used clinical estimate for resting calorie needs in adults.",
      },
      faqMedical,
    ],
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    shortName: "Ideal Weight",
    description:
      "Ideal body weight calculator using the Devine formula based on height and sex.",
    longDescription:
      "Estimate ideal body weight with the Devine formula, commonly referenced in clinical dosing and healthy-weight discussions.",
    category: "fitness",
    keywords: ["ideal weight calculator", "ideal body weight", "devine formula"],
    faqs: [faqMedical],
  },
  {
    slug: "pace-calculator",
    name: "Pace Calculator",
    shortName: "Pace",
    description:
      "Running pace calculator — convert distance and finish time into pace per kilometer and speed.",
    longDescription:
      "Enter race distance and finish time to get pace per km plus speed in km/h and mph. Useful for training targets and race planning.",
    category: "fitness",
    keywords: ["pace calculator", "running pace", "race pace calculator"],
    faqs: [
      {
        question: "What distance unit is used?",
        answer: "Distance is entered in kilometers. Convert miles × 1.60934 if needed.",
      },
    ],
  },
  {
    slug: "army-body-fat-calculator",
    name: "Army Body Fat Calculator",
    shortName: "Army BF",
    description:
      "Army / DoD body fat calculator using the circumference method for men and women.",
    longDescription:
      "Estimate body fat percentage with the Department of Defense circumference approach used in many military standards contexts.",
    category: "fitness",
    keywords: [
      "army body fat calculator",
      "dod body fat",
      "military body fat calculator",
    ],
    faqs: [faqMedical],
  },
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    shortName: "LBM",
    description:
      "Lean body mass calculator using the Boer formula or weight minus body fat percentage.",
    longDescription:
      "Estimate lean mass with the Boer equation or from a known body-fat percentage — helpful for protein targets and composition tracking.",
    category: "fitness",
    keywords: ["lean body mass calculator", "lbm calculator", "boer formula"],
    faqs: [faqMedical],
  },
  {
    slug: "healthy-weight-calculator",
    name: "Healthy Weight Calculator",
    shortName: "Healthy Weight",
    description:
      "Healthy weight range calculator based on BMI 18.5–24.9 for your height.",
    longDescription:
      "See the weight range that corresponds to a normal BMI for your height, in kilograms or pounds.",
    category: "fitness",
    keywords: ["healthy weight calculator", "healthy weight range", "bmi weight range"],
    faqs: [faqMedical],
  },
  {
    slug: "calories-burned-calculator",
    name: "Calories Burned Calculator",
    shortName: "Burned",
    description:
      "Calories burned calculator using MET values for walking, running, cycling, lifting, and more.",
    longDescription:
      "Estimate energy expenditure from activity type (MET), body weight, and duration. Great for logging workouts.",
    category: "fitness",
    keywords: [
      "calories burned calculator",
      "exercise calorie calculator",
      "met calculator",
    ],
    faqs: [faqMedical],
  },
  {
    slug: "one-rep-max-calculator",
    name: "One Rep Max Calculator",
    shortName: "1RM",
    description:
      "One-rep max calculator using the Epley formula, plus training percentages.",
    longDescription:
      "Estimate your 1RM from a submaximal set and see common training percentages (65–95%) for programming.",
    category: "fitness",
    keywords: ["one rep max calculator", "1rm calculator", "epley formula"],
    faqs: [
      {
        question: "Which formula is used?",
        answer: "Epley: weight × (1 + reps/30). Best for roughly 1–10 reps.",
      },
    ],
  },
  {
    slug: "target-heart-rate-calculator",
    name: "Target Heart Rate Calculator",
    shortName: "Heart Rate",
    description:
      "Target heart rate zone calculator using the Karvonen formula from age and resting HR.",
    longDescription:
      "Find a 50–85% training heart-rate zone with the Karvonen method, plus estimated maximum heart rate.",
    category: "fitness",
    keywords: [
      "target heart rate calculator",
      "karvonen",
      "heart rate zone calculator",
    ],
    faqs: [faqMedical],
  },
  {
    slug: "pregnancy-calculator",
    name: "Pregnancy Calculator",
    shortName: "Pregnancy",
    description:
      "Pregnancy week calculator — gestational age, trimester, and due date from LMP.",
    longDescription:
      "Enter the first day of your last menstrual period to see how many weeks pregnant you are, which trimester you are in, and your estimated due date.",
    category: "pregnancy",
    keywords: ["pregnancy calculator", "how many weeks pregnant", "gestational age"],
    featured: true,
    faqs: [faqMedical, faqPrivate],
  },
  {
    slug: "pregnancy-weight-gain-calculator",
    name: "Pregnancy Weight Gain Calculator",
    shortName: "Pregnancy Gain",
    description:
      "Pregnancy weight gain calculator using IOM guidelines based on pre-pregnancy BMI.",
    longDescription:
      "See the recommended total weight-gain range for a singleton pregnancy from your pre-pregnancy height and weight.",
    category: "pregnancy",
    keywords: [
      "pregnancy weight gain calculator",
      "iom weight gain",
      "pregnancy weight guidelines",
    ],
    faqs: [faqMedical],
  },
  {
    slug: "pregnancy-conception-calculator",
    name: "Pregnancy Conception Calculator",
    shortName: "Conception Date",
    description:
      "Estimate conception date by working backward from a due date (~266 days).",
    longDescription:
      "Enter an estimated due date to calculate a likely conception date for timelines and pregnancy dating discussions.",
    category: "pregnancy",
    keywords: [
      "pregnancy conception calculator",
      "conception date from due date",
      "when did i conceive",
    ],
    faqs: [faqMedical],
  },
  {
    slug: "due-date-calculator",
    name: "Due Date Calculator",
    shortName: "Due Date",
    description:
      "Pregnancy due date calculator using Naegele’s rule from the last menstrual period.",
    longDescription:
      "Estimate your baby’s due date by adding 280 days to the first day of your last period — the standard Naegele approach.",
    category: "pregnancy",
    keywords: ["due date calculator", "edd calculator", "naegele rule"],
    featured: true,
    faqs: [faqMedical],
  },
  {
    slug: "ovulation-calculator",
    name: "Ovulation Calculator",
    shortName: "Ovulation",
    description:
      "Ovulation and fertile window calculator from last period and cycle length.",
    longDescription:
      "Estimate ovulation day, fertile window, and next period start based on your cycle length.",
    category: "pregnancy",
    keywords: ["ovulation calculator", "fertile window", "ovulation calendar"],
    faqs: [faqMedical],
  },
  {
    slug: "conception-calculator",
    name: "Conception Calculator",
    shortName: "Conception",
    description:
      "Conception day calculator aligned with estimated ovulation from LMP and cycle length.",
    longDescription:
      "Find the most likely conception day by estimating ovulation from your last period and average cycle length.",
    category: "pregnancy",
    keywords: ["conception calculator", "conception day", "when did conception occur"],
    faqs: [faqMedical],
  },
  {
    slug: "period-calculator",
    name: "Period Calculator",
    shortName: "Period",
    description:
      "Period tracker calculator — project the next six period start dates from cycle length.",
    longDescription:
      "Enter your last period start and average cycle length to see upcoming period predictions.",
    category: "pregnancy",
    keywords: ["period calculator", "period tracker", "menstrual cycle calculator"],
    faqs: [faqMedical],
  },
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    shortName: "Macros",
    description:
      "Macro calculator — convert calories and protein/carb/fat percentages into daily grams.",
    longDescription:
      "Set a calorie target and macro split to get protein, carbohydrate, and fat grams per day.",
    category: "nutrition",
    keywords: ["macro calculator", "macros calculator", "iifym calculator"],
    featured: true,
    faqs: [
      {
        question: "Do percentages need to add to 100?",
        answer: "Yes. Protein + carbs + fat must equal 100% for a valid split.",
      },
    ],
  },
  {
    slug: "carbohydrate-calculator",
    name: "Carbohydrate Calculator",
    shortName: "Carbs",
    description:
      "Carbohydrate calculator for daily carb grams from calories and percentage target.",
    longDescription:
      "Quickly convert a calorie budget and carbohydrate percentage into grams per day.",
    category: "nutrition",
    keywords: ["carbohydrate calculator", "carb calculator", "daily carbs"],
    faqs: [faqMedical],
  },
  {
    slug: "protein-calculator",
    name: "Protein Calculator",
    shortName: "Protein",
    description:
      "Daily protein calculator based on body weight and training goal (g per kg).",
    longDescription:
      "Estimate protein needs for sedentary, endurance, strength, or high-intake goals using grams per kilogram of body weight.",
    category: "nutrition",
    keywords: ["protein calculator", "protein intake", "how much protein"],
    faqs: [faqMedical],
  },
  {
    slug: "fat-intake-calculator",
    name: "Fat Intake Calculator",
    shortName: "Fat Intake",
    description:
      "Fat intake calculator — daily fat grams from calories and fat percentage.",
    longDescription:
      "Convert your calorie target and desired fat percentage into grams of fat per day.",
    category: "nutrition",
    keywords: ["fat intake calculator", "fat calculator", "daily fat grams"],
    faqs: [faqMedical],
  },
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    shortName: "TDEE",
    description:
      "TDEE calculator — total daily energy expenditure from BMR and activity level.",
    longDescription:
      "Estimate maintenance calories plus mild cut and bulk targets using Mifflin–St Jeor and standard activity multipliers.",
    category: "nutrition",
    keywords: ["tdee calculator", "total daily energy expenditure", "maintenance calories"],
    featured: true,
    faqs: [faqMedical],
  },
  {
    slug: "gfr-calculator",
    name: "GFR Calculator",
    shortName: "GFR",
    description:
      "eGFR calculator using the CKD-EPI equation from creatinine, age, and sex.",
    longDescription:
      "Estimate glomerular filtration rate with a CKD-EPI style equation. For lab interpretation only — not a diagnosis.",
    category: "nutrition",
    keywords: ["gfr calculator", "egfr calculator", "ckd-epi"],
    faqs: [faqMedical],
  },
  {
    slug: "body-type-calculator",
    name: "Body Type Calculator",
    shortName: "Body Type",
    description:
      "Body type calculator estimating ectomorph, mesomorph, or endomorph from frame size.",
    longDescription:
      "Use height-to-wrist ratio for a rough somatotype / frame estimate. This is illustrative, not clinical taxonomy.",
    category: "nutrition",
    keywords: ["body type calculator", "ectomorph mesomorph endomorph", "somatotype"],
    faqs: [faqMedical],
  },
  {
    slug: "body-surface-area-calculator",
    name: "Body Surface Area Calculator",
    shortName: "BSA",
    description:
      "Body surface area calculator using the Mosteller formula from height and weight.",
    longDescription:
      "Compute BSA in square meters with the Mosteller equation, often referenced in clinical dosing contexts.",
    category: "nutrition",
    keywords: ["body surface area calculator", "bsa calculator", "mosteller"],
    faqs: [faqMedical],
  },
  {
    slug: "bac-calculator",
    name: "BAC Calculator",
    shortName: "BAC",
    description:
      "Blood alcohol content calculator using the Widmark estimate from drinks, weight, and time.",
    longDescription:
      "Rough BAC estimate only. Never use this to decide whether it is safe or legal to drive.",
    category: "nutrition",
    keywords: ["bac calculator", "blood alcohol calculator", "widmark"],
    faqs: [
      {
        question: "Can I use this to decide if I can drive?",
        answer:
          "No. This is a rough estimate and must never be used for legal or safety decisions. Do not drink and drive.",
      },
      faqMedical,
    ],
  },
];
