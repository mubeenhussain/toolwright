import { NextResponse } from "next/server";
import { getBlogList } from "@/lib/blog";
import type { ToolCategory } from "@/lib/tools";

/** Dynamic query API with CDN-friendly cache headers */
export const revalidate = 3600;

/**
 * GET /api/blog
 * Query: category, tool, q, page, pageSize, featured=1
 * Cached static JSON with ISR revalidation (SSG-friendly API).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") ?? "all") as
    | ToolCategory
    | "all";
  const tool = searchParams.get("tool") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "12");
  const featured = searchParams.get("featured") === "1";

  const data = getBlogList({
    category,
    tool,
    q,
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 12,
    featured,
  });

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
