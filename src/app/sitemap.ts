import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projectsInDisplayOrder } from "@/lib/projects";

export const dynamic = "force-static";

/**
 * Date of the last commit, resolved once at build time.
 *
 * Not `new Date()`: that stamps the build time, so every deploy would claim
 * all five pages had just changed even when nothing did, and Google learns to
 * ignore a lastmod that is always "now". Returns undefined if git is not
 * available (the field is optional, and omitting it beats publishing a wrong
 * date) — which also covers hosts that build from a tarball rather than a
 * clone.
 */
function lastCommitDate(): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

const lastModified = lastCommitDate();

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = siteConfig.contact;
  const pages: MetadataRoute.Sitemap = siteConfig.nav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const projects: MetadataRoute.Sitemap = projectsInDisplayOrder().map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
    // Real photos only; placeholders have no file.
    images: p.gallery.flatMap((s) => (s.photo ? [`${siteUrl}${s.photo.src}`] : [])),
  }));
  return [...pages, ...projects];
}
