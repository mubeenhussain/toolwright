import { NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/lib/blog";

export const revalidate = 3600;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

/**
 * GET /api/blog/[slug]
 * Full article JSON for a single post (pre-rendered + ISR).
 */
export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(
    { post },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
