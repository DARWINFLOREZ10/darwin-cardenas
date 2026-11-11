import { ImageResponse } from "next/og";

export const alt = "Darwin Cardenas resume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ResumeImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const label = locale === "es" ? "Hoja de vida" : "Resume";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f6f4ef",
          color: "#1c1b17",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", color: "#6f624c", fontSize: 22, letterSpacing: 4 }}>
          DARWIN CARDENAS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72 }}>{label}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#6f624c" }}>
            Backend Software Engineer · Medellín
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#6f624c" }}>darwin-cardenas.vercel.app</div>
      </div>
    ),
    { ...size },
  );
}
