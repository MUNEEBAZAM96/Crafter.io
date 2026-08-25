import { ImageResponse } from "next/og";
import { apps, site } from "@/lib/data";

/**
 * Social preview card, generated at build time — no image asset to maintain,
 * and it stays in sync with the brand copy in `lib/data`.
 */
export const alt = `${site.name} — ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0c0d",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bloom */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "rgba(47, 182, 154, 0.20)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "linear-gradient(135deg, #3fbc9f, #0d6759)",
            }}
          />
          {/* Satori requires an explicit display on any element with more
              than one child, hence the flex wrapper around the wordmark. */}
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
            <span style={{ color: "#f2f3f2" }}>Crafter</span>
            <span style={{ color: "#5fd3b8" }}>.io</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#f2f3f2",
              maxWidth: 900,
            }}
          >
            Building apps that solve real problems.
          </div>
          <div style={{ fontSize: 30, color: "#8b939b", maxWidth: 820 }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {apps.map((app) => (
            <div
              key={app.slug}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid #232829",
                fontSize: 24,
                color: "#b6bcc2",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 5,
                  background: `linear-gradient(135deg, ${app.hue.from}, ${app.hue.to})`,
                }}
              />
              {app.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
