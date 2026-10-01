import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ogImage } from "@/lib/page-metadata";

// Prerendered once at build time, so it works under `output: "export"`.
export const dynamic = "force-static";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

// Inlined as a data URI: satori cannot fetch a relative URL at build time, and
// under `output: "export"` there is no server to fetch it from either.
const logo = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/images/logo-mark-white.png"),
).toString("base64")}`;

// Satori needs the font files themselves (it cannot use next/font), so the
// brand's Poppins TTFs are kept in /assets/fonts and read at build time.
const font = (file: string) =>
  readFileSync(join(process.cwd(), "assets/fonts", file));
const poppinsRegular = font("Poppins-Regular.ttf");
const poppinsBold = font("Poppins-Bold.ttf");

export default function OpengraphImage() {
  const { company, contact } = siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#022662",
          padding: "72px 80px",
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img src={logo} width={127} height={80} alt="" />
          <div
            style={{
              display: "flex",
              color: "#ffba00",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            ALUMINIUM DOME SPECIALIST
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {company.name}
          </div>
          <div
            style={{
              display: "flex",
              color: "#adc1e1",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 940,
            }}
          >
            Aluminium Domes &amp; Architectural Metal Works
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", width: 96, height: 8, backgroundColor: "#8b0304" }} />
          <div style={{ display: "flex", color: "#d6e0f0", fontSize: 26 }}>
            {company.location} · {contact.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: poppinsRegular, weight: 400, style: "normal" },
        { name: "Poppins", data: poppinsBold, weight: 700, style: "normal" },
      ],
    },
  );
}
