import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

// Poppins is not a variable font, so each weight in use must be listed.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.contact.siteUrl),
  title: {
    default: `${siteConfig.company.name} | Aluminium Dome & Architectural Metal Specialist, Johor`,
    template: `%s | ${siteConfig.company.name}`,
  },
  description: siteConfig.company.description,
  applicationName: siteConfig.company.shortName,
  authors: [{ name: siteConfig.company.name, url: siteConfig.contact.siteUrl }],
  creator: siteConfig.company.name,
  publisher: siteConfig.company.name,
  category: "construction",
  // Declared explicitly rather than left to the file convention, which appends
  // a per-build hash to the URL. Google asks that a favicon's URL stay stable,
  // and a hash that changes every deploy works against it settling on one.
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  keywords: [
    "aluminium dome",
    "aluminium dome contractor Malaysia",
    "kubah aluminium",
    "kontraktor kubah masjid",
    "mosque dome Johor",
    "dome refurbishment",
    "Celuka lattice panel",
    "CNC-cut aluminium panel",
    "aluminium window and ACP cladding",
    "architectural metal works",
    "minaret and pinnacle",
    "kontraktor Johor",
    siteConfig.company.name,
  ],

  // No `url` here: Next resolves og:url only from an explicit value and does
  // not fall back to the canonical, so setting it at the root would stamp the
  // homepage URL onto every page. Each page sets its own alongside its canonical.
  openGraph: {
    siteName: siteConfig.company.name,
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // The phone number is already an explicit tel: link everywhere it appears,
  // so stop iOS Safari re-detecting and restyling it. Address detection is
  // left on: the address renders as plain text with no link of its own, and
  // disabling it would take away the tap-for-directions affordance.
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MY" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-900"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <JsonLd />
      </body>
    </html>
  );
}
