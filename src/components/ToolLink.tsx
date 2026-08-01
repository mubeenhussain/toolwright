import Link from "next/link";
import { categories, type ToolDefinition } from "@/lib/tools";

type ToolLinkProps = {
  tool: ToolDefinition;
};

export function ToolLink({ tool }: ToolLinkProps) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block border-b border-line py-5 hover:border-accent"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
            {categories[tool.category].label}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink group-hover:text-accent">
            {tool.name}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {tool.description}
          </p>
        </div>
        <span className="hidden shrink-0 text-sm font-semibold text-accent sm:inline">
          Open tool →
        </span>
      </div>
    </Link>
  );
}
