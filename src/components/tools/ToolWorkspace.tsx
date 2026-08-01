import { AgeCalculatorTool } from "@/components/tools/AgeCalculatorTool";
import { WordCounterTool } from "@/components/tools/WordCounterTool";
import { CaseConverterTool } from "@/components/tools/CaseConverterTool";
import { LoremIpsumTool } from "@/components/tools/LoremIpsumTool";
import { JsonFormatterTool } from "@/components/tools/JsonFormatterTool";
import { Base64Tool } from "@/components/tools/Base64Tool";
import { UrlEncoderTool } from "@/components/tools/UrlEncoderTool";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { HashGeneratorTool } from "@/components/tools/HashGeneratorTool";
import { UuidGeneratorTool } from "@/components/tools/UuidGeneratorTool";
import { ColorConverterTool } from "@/components/tools/ColorConverterTool";
import {
  ArmyBodyFatCalculatorTool,
  BmiCalculatorTool,
  BmrCalculatorTool,
  BodyFatCalculatorTool,
  CalorieCalculatorTool,
  CaloriesBurnedCalculatorTool,
  HealthyWeightCalculatorTool,
  IdealWeightCalculatorTool,
  LeanBodyMassCalculatorTool,
  OneRepMaxCalculatorTool,
  PaceCalculatorTool,
  TargetHeartRateCalculatorTool,
  TdeeCalculatorTool,
} from "@/components/tools/health/FitnessTools";
import {
  ConceptionCalculatorTool,
  DueDateCalculatorTool,
  OvulationCalculatorTool,
  PeriodCalculatorTool,
  PregnancyCalculatorTool,
  PregnancyConceptionCalculatorTool,
  PregnancyWeightGainCalculatorTool,
} from "@/components/tools/health/PregnancyTools";
import {
  BacCalculatorTool,
  BodySurfaceAreaCalculatorTool,
  BodyTypeCalculatorTool,
  CarbohydrateCalculatorTool,
  FatIntakeCalculatorTool,
  GfrCalculatorTool,
  MacroCalculatorTool,
  ProteinCalculatorTool,
} from "@/components/tools/health/NutritionTools";

const toolComponents = {
  "age-calculator": AgeCalculatorTool,
  "bmi-calculator": BmiCalculatorTool,
  "calorie-calculator": CalorieCalculatorTool,
  "body-fat-calculator": BodyFatCalculatorTool,
  "bmr-calculator": BmrCalculatorTool,
  "ideal-weight-calculator": IdealWeightCalculatorTool,
  "pace-calculator": PaceCalculatorTool,
  "army-body-fat-calculator": ArmyBodyFatCalculatorTool,
  "lean-body-mass-calculator": LeanBodyMassCalculatorTool,
  "healthy-weight-calculator": HealthyWeightCalculatorTool,
  "calories-burned-calculator": CaloriesBurnedCalculatorTool,
  "one-rep-max-calculator": OneRepMaxCalculatorTool,
  "target-heart-rate-calculator": TargetHeartRateCalculatorTool,
  "pregnancy-calculator": PregnancyCalculatorTool,
  "pregnancy-weight-gain-calculator": PregnancyWeightGainCalculatorTool,
  "pregnancy-conception-calculator": PregnancyConceptionCalculatorTool,
  "due-date-calculator": DueDateCalculatorTool,
  "ovulation-calculator": OvulationCalculatorTool,
  "conception-calculator": ConceptionCalculatorTool,
  "period-calculator": PeriodCalculatorTool,
  "macro-calculator": MacroCalculatorTool,
  "carbohydrate-calculator": CarbohydrateCalculatorTool,
  "protein-calculator": ProteinCalculatorTool,
  "fat-intake-calculator": FatIntakeCalculatorTool,
  "tdee-calculator": TdeeCalculatorTool,
  "gfr-calculator": GfrCalculatorTool,
  "body-type-calculator": BodyTypeCalculatorTool,
  "body-surface-area-calculator": BodySurfaceAreaCalculatorTool,
  "bac-calculator": BacCalculatorTool,
  "word-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "lorem-ipsum-generator": LoremIpsumTool,
  "json-formatter": JsonFormatterTool,
  "base64-encoder": Base64Tool,
  "url-encoder": UrlEncoderTool,
  "password-generator": PasswordGeneratorTool,
  "hash-generator": HashGeneratorTool,
  "uuid-generator": UuidGeneratorTool,
  "color-converter": ColorConverterTool,
} as const;

export type ToolSlug = keyof typeof toolComponents;

export function ToolWorkspace({ slug }: { slug: string }) {
  const Component = toolComponents[slug as ToolSlug];
  if (!Component) {
    return <p className="text-ink-muted">This tool is not available yet.</p>;
  }
  return <Component />;
}
