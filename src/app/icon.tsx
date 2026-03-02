donimport { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 12,
        background: "linear-gradient(135deg, #030c12 0%, #072030 100%)",
        border: "2px solid rgba(8,131,149,0.55)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        gap: 0,
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: -10,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(8,131,149,0.4)",
          filter: "blur(10px)",
        }}
      />
      {/* "MinDev" line */}
      <span
        style={{
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontFamily: "monospace",
          color: "#EBF4F6",
          zIndex: 1,
        }}
      >
        MinDev
      </span>
      {/* "<>" line */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: "0.05em",
          lineHeight: 1,
          fontFamily: "monospace",
          color: "#088395",
          zIndex: 1,
          marginTop: 1,
        }}
      >
        {"<>"}
      </span>
      {/* Bottom shimmer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(8,131,149,0.8), transparent)",
        }}
      />
    </div>,
    { ...size },
  );
}
