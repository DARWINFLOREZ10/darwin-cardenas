import { ImageResponse } from "next/og";
import { cv } from "@/lib/cv";

export const alt = `${cv.identity.name} — ${cv.identity.title}. ${cv.identity.stackLine}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { name, title, stackLine, location, timezone, availability } = cv.identity;

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
          {`${location.toUpperCase()} · ${timezone} · ${availability.toUpperCase()}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, maxWidth: 1000 }}>{name}</div>
          <div style={{ display: "flex", marginTop: 24, color: "#c4a574", fontSize: 40 }}>{title}</div>
        </div>
        <div style={{ display: "flex", color: "#a39c90", fontSize: 26 }}>{stackLine}</div>
      </div>
    ),
    { ...size },
  );
}
