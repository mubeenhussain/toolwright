import Link from "next/link";
import { ToolIcon } from "@/components/ToolIcon";
import type { ToolDefinition } from "@/lib/tools";

type ToolLinkProps = {
  tool: ToolDefinition;
};

export function ToolLink({ tool }: ToolLinkProps) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative flex h-full flex-col border border-line bg-white p-4 transition-colors hover:border-accent hover:bg-[#f8faff] sm:p-5"
    >
      {tool.featured ? (
        <span className="absolute right-3 top-3 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Popular
        </span>
      ) : null}

      <div className="flex size-9 items-center justify-center rounded-md bg-accent-soft text-accent">
        <ToolIcon
          slug={tool.slug}
          category={tool.category}
          label={tool.shortName}
        />
      </div>

      <h3 className="mt-3 font-display text-base font-bold tracking-tight text-ink group-hover:text-accent sm:text-lg">
        {tool.name}
      </h3>

      <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {tool.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        Open
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
