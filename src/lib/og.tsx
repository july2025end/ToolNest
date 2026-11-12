import { ImageResponse } from "next/og";
import { site } from "@/site.config";

export const ogSize = { width: 1200, height: 630 };

/** One template for every OG image: brand row, big title, subtitle, privacy line. */
export function ogImage(title: string, subtitle: string, eyebrow?: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f5f5f7", padding: 72, borderBottom: "16px solid #0071e3", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 26 26">
            <rect x="1" y="1" width="24" height="24" rx="7" fill="#0071e3" />
            <path d="M7 15.5 13 19l6-3.5M7 11.5 13 15l6-3.5L13 8l-6 3.5Z" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#1d1d1f" }}>{site.name}<span style={{ marginLeft: 12, fontSize: 26, fontWeight: 400, color: "#6e6e73" }}>by {site.maker}</span></span>
          {eyebrow && <span style={{ marginLeft: 16, fontSize: 26, color: "#6e6e73" }}>{eyebrow}</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: title.length > 34 ? 68 : 84, fontWeight: 700, color: "#1d1d1f", lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#6e6e73", lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 28, color: "#0071e3", fontWeight: 600 }}>Free · No sign-up · Files stay on your device</div>
      </div>
    ),
    ogSize,
  );
}
