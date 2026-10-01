import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * The shared OG card rendered by `src/app/opengraph-image.tsx`, which imports
 * these values so the card and the tags describing it cannot drift apart.
 */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
} as const;

/**
 * Per-page canonical + Open Graph URL.
 *
 * `openGraph` has to be spelled out in full on every page: Next replaces the
 * parent's object wholesale rather than merging into it, so a page setting only
 * `url` would silently drop og:site_name, og:locale, og:type — and the
 * file-convention og:image along with them. Setting `url` on the root layout is
 * not an option either: og:url has no fallback to the canonical, so every page
 * would advertise the homepage and shares of all five would collapse into one
 * object.
 *
 * `image` overrides the shared OG card (project pages use their own cover).
 */
export function pageUrls(
  path: `/${string}`,
  image: { url: string; alt: string } = ogImage,
): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      siteName: siteConfig.company.name,
      locale: "en_MY",
      type: "website",
      url: path,
      images: [image],
    },
  };
}
