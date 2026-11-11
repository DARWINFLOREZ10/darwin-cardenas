import { ImageResponse } from "next/og";
import { formatUsd, offer } from "@/lib/offer";

export const alt = `${offer.title}. ${formatUsd(offer.priceUsd)}, half to start.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, maxWidth: 980 }}>{offer.title}</div>
          <div style={{ display: "flex", marginTop: 28, color: "#c4a574", fontSize: 36 }}>
            {formatUsd(offer.priceUsd)} · half to start
          </div>
        </div>
        <div style={{ display: "flex", color: "#a39c90", fontSize: 24 }}>
          One workflow step off the HTTP request. Written scope before the work starts.
        </div>
      </div>
    ),
    { ...size },
  );
}
