import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { ogImage } from "@/lib/page-metadata";

// Prerendered once at build time, so it works under `output: "export"`.
export const dynamic = "force-static";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { company, registration, contact } = siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0e2034",
          padding: "72px 80px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 16,
              backgroundColor: "#1b3a5c",
              color: "#f59e0b",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            TP
          </div>
          <div
            style={{
              display: "flex",
              color: "#f59e0b",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            CIDB GRADE {registration.cidbGrade} REGISTERED CONTRACTOR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {company.name}
          </div>
          <div
            style={{
              display: "flex",
              color: "#b8cfe6",
              fontSize: 32,
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            Roads &amp; Civil Infrastructure · Building Construction · M&amp;E
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", width: 96, height: 8, backgroundColor: "#f59e0b" }} />
          <div style={{ display: "flex", color: "#dbe7f3", fontSize: 28 }}>
            {company.location} · {contact.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
