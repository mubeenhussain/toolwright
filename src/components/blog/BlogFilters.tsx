"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import type { ToolCategory } from "@/lib/tools";

const filters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "finance", label: "Finance" },
  { value: "fitness", label: "Fitness" },
  { value: "pregnancy", label: "Pregnancy" },
  { value: "nutrition", label: "Nutrition" },
  { value: "calculators", label: "Everyday" },
];

export function BlogFilters({
  categories,
}: {
  categories: ToolCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [pending, startTransition] = useTransition();

  const category = searchParams.get("category") ?? "all";

  const push = useCallback(
    (next: { category?: string; q?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      const cat = next.category ?? category;
      if (!cat || cat === "all") params.delete("category");
      else params.set("category", cat);
      const query = next.q !== undefined ? next.q : q;
      if (!query.trim()) params.delete("q");
      else params.set("q", query.trim());
      params.delete("page");
      startTransition(() => {
        router.push(`/blog?${params.toString()}`);
      });
    },
    [router, searchParams, category, q],
  );

  const visible = filters.filter(
    (f) => f.value === "all" || categories.includes(f.value as ToolCategory),
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {visible.map((f) => {
          const active = category === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => push({ category: f.value })}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white text-ink-muted hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <form
        className="flex w-full max-w-sm gap-2 sm:w-auto"
        onSubmit={(e) => {
          e.preventDefault();
          push({ q });
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search guides…"
          className="field min-w-0 flex-1 text-sm"
          aria-label="Search blog"
        />
        <button
          type="submit"
          className="btn btn-primary shrink-0 px-3 text-sm"
          disabled={pending}
        >
          Search
        </button>
      </form>
    </div>
  );
}
