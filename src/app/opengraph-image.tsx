import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Source from China. We handle the rest.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a1733 0%, #102552 60%, #2556e8 140%)",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1, textTransform: "uppercase" }}>{siteConfig.shortName}</div>
          <div style={{ marginLeft: "auto", fontSize: 22, color: "#9a9a9a", letterSpacing: 1, textTransform: "uppercase" }}>
            China → Kenya
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
          <span>Source from China.</span>
          <span style={{ color: "#27c4e8" }}>We handle the rest.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#bdbdbd" }}>
          Send a photo, link or description — get a free sourcing quote.
        </div>
      </div>
    ),
    size,
  );
}
