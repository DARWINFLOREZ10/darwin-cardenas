import { ImageResponse } from "next/og";

export const alt = "Private page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CommandImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#10110f",
          color: "#e8e4da",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", color: "#c4a574", fontSize: 22, letterSpacing: 4 }}>
          DARWIN CARDENAS
        </div>
        <div style={{ display: "flex", fontSize: 72 }}>Private</div>
        <div style={{ display: "flex", color: "#a39c90", fontSize: 24 }}>This page is not indexed.</div>
      </div>
    ),
    { ...size },
  );
}
