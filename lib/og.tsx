import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

type OgProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  metric?: { value: string; label: string };
};

/** Shared 1200×630 Open Graph card: dark HUD layout with the portrait in a glowing ring. */
export async function renderOg({ eyebrow, title, subtitle, metric }: OgProps) {
  const photo = await readFile(join(process.cwd(), "public/images/nabil-takiyuddin.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const titleSize = title.length > 70 ? 46 : title.length > 40 ? 56 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#04080f",
          backgroundImage:
            "radial-gradient(900px 520px at 88% 0%, rgba(34,110,190,0.55), transparent 65%), radial-gradient(700px 500px at 0% 100%, rgba(104,84,220,0.3), transparent 65%)",
          color: "#e8f1ff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            display: "flex",
            border: "1px solid rgba(125,211,252,0.3)",
            borderRadius: 24,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 0 72px 80px",
            width: 730,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 22, letterSpacing: 5, color: "#4fe3ff" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: "#2ee6c5", marginRight: 16 }} />
            {eyebrow.toUpperCase()}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: -2,
                color: "#ffffff",
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 28, lineHeight: 1.35, color: "#b4c4dc" }}>
              {subtitle}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            {metric ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#7df0ff", lineHeight: 1 }}>
                  {metric.value}
                </div>
                <div style={{ display: "flex", marginTop: 10, fontSize: 20, letterSpacing: 2, color: "#94a7c4" }}>
                  {metric.label.toUpperCase()}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#94a7c4" }}>
                MARTECH · ANALYTICS · DATA ENGINEERING · APPLIED AI
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 372,
              height: 372,
              borderRadius: 372,
              border: "2px solid rgba(79,227,255,0.85)",
              boxShadow: "0 0 90px rgba(79,227,255,0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              src={src}
              width={340}
              height={340}
              style={{ borderRadius: 340, objectFit: "cover", objectPosition: "50% 20%" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 70,
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              color: "#e8f1ff",
              backgroundColor: "rgba(4,8,15,0.85)",
              border: "1px solid rgba(125,211,252,0.4)",
              borderRadius: 40,
              padding: "10px 22px",
            }}
          >
            NABIL TAKIYUDDIN
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
