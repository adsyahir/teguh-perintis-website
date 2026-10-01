import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  // 'unsafe-inline' is required: Next.js static export hydrates via inline
  // scripts whose content changes every build (so hashes are impractical).
  // 'unsafe-eval' in dev only: React uses eval() there to rebuild server
  // error stacks. Production builds never use eval, so the export omits it.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  // Ignored by `output: "export"` (static hosts must send these — see
  // public/_headers and README), but applies if deployed to Vercel/Node.
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
