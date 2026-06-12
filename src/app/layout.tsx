import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.contact.siteUrl),
  title: {
    default: `${siteConfig.company.name} | CIDB G3 Contractor in Ulu Tiram, Johor`,
    template: `%s | ${siteConfig.company.name}`,
  },
  description: siteConfig.company.description,
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
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
