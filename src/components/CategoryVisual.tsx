import type { ReactNode } from "react";
import type { ToolCategory } from "@/lib/tool-types";

function Svg({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden
      role="img"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

export function CategoryIcon({ category }: { category: ToolCategory }) {
  switch (category) {
    case "finance":
      return (
        <Svg label="Finance">
          <path d="M12 3v18M8 8h6.5a2.5 2.5 0 0 1 0 5H9.5a2.5 2.5 0 0 0 0 5H16" />
        </Svg>
      );
    case "fitness":
      return (
        <Svg label="Fitness">
          <path d="M6.5 6.5v11M17.5 6.5v11M6.5 12h11M4 9v6M20 9v6" />
        </Svg>
      );
    case "pregnancy":
      return (
        <Svg label="Pregnancy">
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M12 11v2" />
        </Svg>
      );
    case "nutrition":
      return (
        <Svg label="Nutrition">
          <path d="M12 3c-2 4-5 6.5-5 10a5 5 0 0 0 10 0c0-3.5-3-6-5-10z" />
          <path d="M12 21v-3" />
        </Svg>
      );
    case "calculators":
      return (
        <Svg label="Calculators">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8M8 11h2M12 11h2M16 11h1M8 15h2M12 15h2M16 15h1M8 18h2M12 18h2" />
        </Svg>
      );
    case "text":
      return (
        <Svg label="Text tools">
          <path d="M4 7V5h16v2M12 5v14M9 19h6" />
        </Svg>
      );
    case "developer":
      return (
        <Svg label="Developer tools">
          <path d="M8 8 4 12l4 4M16 8l4 4-4 4M14 6l-4 12" />
        </Svg>
      );
    case "security":
      return (
        <Svg label="Security">
          <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" />
          <path d="M9.5 12.5 11 14l3.5-3.5" />
        </Svg>
      );
    case "converters":
      return (
        <Svg label="Converters">
          <path d="M7 7h11M15 4l3 3-3 3M17 17H6M9 14l-3 3 3 3" />
        </Svg>
      );
    case "generators":
      return (
        <Svg label="Generators">
          <path d="M13 2 6 13h5l-1 9 8-12h-5l1-8z" />
        </Svg>
      );
    default:
      return null;
  }
}

const tones: Record<ToolCategory, string> = {
  finance: "bg-[#ecfdf5] text-[#047857]",
  fitness: "bg-[#e8f0fe] text-[#1d4ed8]",
  pregnancy: "bg-[#ffe4e6] text-[#be123c]",
  nutrition: "bg-[#fff7ed] text-[#c2410c]",
  calculators: "bg-accent-soft text-accent",
  text: "bg-[#e2e8f0] text-[#334155]",
  developer: "bg-[#f1f5f9] text-[#334155]",
  security: "bg-[#fef2f2] text-[#b91c1c]",
  converters: "bg-[#ecfeff] text-[#0e7490]",
  generators: "bg-[#fffbeb] text-[#b45309]",
};

export function CategoryVisual({ category }: { category: ToolCategory }) {
  return (
    <div
      className={`mb-4 flex size-12 items-center justify-center rounded-lg ${tones[category]}`}
      aria-hidden
    >
      <CategoryIcon category={category} />
    </div>
  );
}
