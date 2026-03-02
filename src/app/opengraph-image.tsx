import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DoawnLet — Full-Stack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #030c12 0%, #051820 55%, #072030 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent circles */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -80,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(8,131,149,0.25), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(122,178,178,0.2), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(122,178,178,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 10,
          padding: "0 60px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#7AB2B2",
            border: "1px solid rgba(122,178,178,0.3)",
            borderRadius: 9999,
            padding: "8px 24px",
            background: "rgba(8,131,149,0.1)",
          }}
        >
          Full-Stack Developer
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(90deg, #EBF4F6 0%, #7AB2B2 50%, #088395 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          DoawnLet
        </div>

        {/* Underline */}
        <div
          style={{
            width: 480,
            height: 2,
            borderRadius: 2,
            background:
              "linear-gradient(90deg, transparent, #088395, #7AB2B2, transparent)",
          }}
        />

        {/* Skills row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 8,
          }}
        >
          {["React", "Next.js", "TypeScript", "ASP.NET Core", "Three.js"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#EBF4F6",
                  background: "rgba(8,131,149,0.15)",
                  border: "1px solid rgba(8,131,149,0.3)",
                  borderRadius: 8,
                  padding: "6px 16px",
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(8,131,149,0.8), rgba(122,178,178,0.8), transparent)",
        }}
      />
    </div>,
    { ...size },
  );
}
