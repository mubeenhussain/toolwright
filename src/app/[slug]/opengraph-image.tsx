import { ImageResponse } from "next/og";
import { getToolBySlug } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = "Toolwright calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const title = tool?.name ?? "Free Online Calculator";
  const subtitle = tool?.description ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)",
          color: "white",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              opacity: 0.9,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {subtitle.length > 140 ? `${subtitle.slice(0, 137)}...` : subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, opacity: 0.8 }}>
          Free · Instant · No signup
        </div>
      </div>
    ),
    { ...size },
  );
}
