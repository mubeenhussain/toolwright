import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type BrandLogoProps = {
  href?: string;
  /** Compact header mark */
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  /** When false, renders the mark without a home link */
  linked?: boolean;
};

const heights = {
  sm: 32,
  md: 40,
  lg: 56,
} as const;

export function BrandLogo({
  href = "/",
  size = "md",
  className = "",
  priority = false,
  linked = true,
}: BrandLogoProps) {
  const h = heights[size];
  const w = Math.round(h * 3.6);

  const mark = (
    <Image
      src={siteConfig.logo}
      alt={siteConfig.name}
      width={w}
      height={h}
      priority={priority}
      className={`object-contain object-left ${className}`}
      style={{ height: h, width: "auto" }}
    />
  );

  if (!linked || href === "") return mark;

  return (
    <Link
      href={href}
      className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`${siteConfig.name} home`}
    >
      {mark}
    </Link>
  );
}
