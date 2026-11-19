import { ImageResponse } from "next/og";

// iPhone/iPad home-screen icon. iOS ignores SVG icons (it shows a letter tile instead) and rounds the
// corners itself, so this is a full-bleed, opaque PNG of the same layers mark as icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #1a86f0 0%, #0071e3 55%, #005bbf 100%)",
        }}
      >
        <svg width="112" height="112" viewBox="6 7 14 13" fill="none">
          <path
            d="M7 15.5 13 19l6-3.5M7 11.5 13 15l6-3.5L13 8l-6 3.5Z"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
