import { ImageResponse } from "next/og";
import config from "../../portfolio.config";
import { resolveColors } from "@/lib/config";

const colors = resolveColors(config);

export const alt = `${config.personal.name} — ${config.personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const nameParts = config.personal.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `radial-gradient(ellipse at top left, ${colors.bgCard} 0%, ${colors.bg} 60%)`,
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            letterSpacing: "6px",
            color: colors.accent,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "2px",
              background: colors.accent,
            }}
          />
          {config.personal.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "136px",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-4px",
              display: "flex",
            }}
          >
            <span style={{ color: colors.accent }}>{firstName.toUpperCase()}&nbsp;</span>
            <span>{lastName.toUpperCase()}</span>
          </div>
          <div
            style={{
              marginTop: "36px",
              fontSize: "34px",
              color: "#d4d4d4",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            {config.personal.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>{config.seo.serviceTypes.join(" · ")}</span>
          <span style={{ color: colors.accent }}>
            {config.seo.siteUrl.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
