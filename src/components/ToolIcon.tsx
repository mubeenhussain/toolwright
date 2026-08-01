import type { ReactNode } from "react";
import { CategoryIcon } from "@/components/CategoryVisual";
import type { ToolCategory } from "@/lib/tool-types";

function Svg({
  children,
  label,
  className = "size-5",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      role="img"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

type IconKind =
  | "home"
  | "calendar"
  | "percent"
  | "building"
  | "car"
  | "chart"
  | "trending"
  | "piggy"
  | "wallet"
  | "credit"
  | "tax"
  | "retirement"
  | "scale"
  | "coin"
  | "globe"
  | "discount"
  | "clipboard"
  | "default";

function kindFromSlug(slug: string): IconKind {
  if (
    /mortgage|house|home-equity|heloc|real-estate|rent|down-payment|fha|va-mortgage|refinance|rental|affordability/.test(
      slug,
    )
  ) {
    return "home";
  }
  if (/amortization|payoff|repayment|schedule/.test(slug)) return "calendar";
  if (/apr|interest-rate|margin|vat|sales-tax|inflation/.test(slug))
    return "percent";
  if (/business|commercial/.test(slug)) return "building";
  if (/auto|car|boat|lease|cash-back/.test(slug)) return "car";
  if (
    /compound|investment|mutual|cd-calculator|bond|irr|roi|payback|present-value|future-value|average-return|finance-calculator|interest-calculator|savings|simple-interest/.test(
      slug,
    )
  ) {
    return "chart";
  }
  if (/annuity|pension/.test(slug)) return "trending";
  if (/retirement|401k|ira|roth|rmd|social-security/.test(slug))
    return "retirement";
  if (/credit|debt|consolidation/.test(slug)) return "credit";
  if (/tax|estate-tax|marriage-tax|income-tax/.test(slug)) return "tax";
  if (/salary|paycheck|take-home|commission|budget/.test(slug)) return "wallet";
  if (/loan|payment|personal-loan|student|college/.test(slug)) return "coin";
  if (/currency/.test(slug)) return "globe";
  if (/discount|depreciation/.test(slug)) return "discount";
  if (/bmi|calorie|body|weight|pace|heart|tdee|macro|protein|carb|fat|gfr|bac|army|lean|healthy|one-rep|burned/.test(slug))
    return "default";
  if (/pregnancy|due-date|ovulation|conception|period/.test(slug))
    return "default";
  if (/age-calculator/.test(slug)) return "calendar";
  if (/password|hash|uuid/.test(slug)) return "default";
  if (/json|base64|url-encoder|color/.test(slug)) return "default";
  if (/word|case|lorem/.test(slug)) return "clipboard";
  return "default";
}

function KindIcon({ kind, label }: { kind: IconKind; label: string }) {
  switch (kind) {
    case "home":
      return (
        <Svg label={label}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M10 21v-6h4v6" />
        </Svg>
      );
    case "calendar":
      return (
        <Svg label={label}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </Svg>
      );
    case "percent":
      return (
        <Svg label={label}>
          <path d="M19 5 5 19" />
          <circle cx="7" cy="7" r="2.5" />
          <circle cx="17" cy="17" r="2.5" />
        </Svg>
      );
    case "building":
      return (
        <Svg label={label}>
          <path d="M4 21V7l8-4 8 4v14" />
          <path d="M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
        </Svg>
      );
    case "car":
      return (
        <Svg label={label}>
          <path d="M3 13h18l-1.5-4.5A2 2 0 0 0 17.6 7H6.4a2 2 0 0 0-1.9 1.5L3 13z" />
          <path d="M5 13v5h2v-2h10v2h2v-5" />
          <circle cx="7.5" cy="16" r="1" />
          <circle cx="16.5" cy="16" r="1" />
        </Svg>
      );
    case "chart":
      return (
        <Svg label={label}>
          <path d="M4 19V5M4 19h16" />
          <path d="M8 16v-5M12 16V8M16 16v-3" />
        </Svg>
      );
    case "trending":
      return (
        <Svg label={label}>
          <path d="M3 17 10 10l4 4 7-7" />
          <path d="M14 7h7v7" />
        </Svg>
      );
    case "piggy":
    case "retirement":
      return (
        <Svg label={label}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M9.5 10.5c.8-1 2-1.5 2.5-1.5s1.7.5 2.5 1.5M9.5 13.5c.8 1 2 1.5 2.5 1.5s1.7-.5 2.5-1.5" />
        </Svg>
      );
    case "wallet":
      return (
        <Svg label={label}>
          <path d="M3 7h15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H5a2 2 0 0 1-2-2V7z" />
          <path d="M3 7V6a2 2 0 0 1 2-2h11" />
          <circle cx="16.5" cy="13.5" r="1" />
        </Svg>
      );
    case "credit":
      return (
        <Svg label={label}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20M6 15h4" />
        </Svg>
      );
    case "tax":
      return (
        <Svg label={label}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </Svg>
      );
    case "scale":
      return (
        <Svg label={label}>
          <path d="M12 3v18M5 7h14" />
          <path d="M7 7 4 14h6L7 7zM17 7l-3 7h6l-3-7z" />
        </Svg>
      );
    case "coin":
      return (
        <Svg label={label}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M9.5 10.5c.8-1 2-1.5 2.5-1.5s1.7.5 2.5 1.5M9.5 13.5c.8 1 2 1.5 2.5 1.5s1.7-.5 2.5-1.5" />
        </Svg>
      );
    case "globe":
      return (
        <Svg label={label}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </Svg>
      );
    case "discount":
      return (
        <Svg label={label}>
          <path d="M3 12 12 3l9 9-9 9-9-9z" />
          <path d="M9 12h6M12 9v6" />
        </Svg>
      );
    case "clipboard":
      return (
        <Svg label={label}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3h6v1M8 10h8M8 14h8M8 18h5" />
        </Svg>
      );
    default:
      return (
        <Svg label={label}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h8M8 15h5" />
        </Svg>
      );
  }
}

export function ToolIcon({
  slug,
  category,
  label,
}: {
  slug: string;
  category: ToolCategory;
  label: string;
}) {
  const kind = kindFromSlug(slug);
  if (kind === "default") {
    // Fall back to category icon for health/dev/etc., but keep size consistent
    return (
      <span className="[&_svg]:size-5">
        <CategoryIcon category={category} />
      </span>
    );
  }
  return <KindIcon kind={kind} label={label} />;
}
