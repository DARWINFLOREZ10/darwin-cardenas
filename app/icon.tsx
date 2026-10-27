import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#10110f",
          color: "#c4a574",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia",
        }}
      >
        D
      </div>
    ),
    { ...size },
  );
}
