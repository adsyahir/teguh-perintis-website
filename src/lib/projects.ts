import { assertGallery } from "@/lib/gallery";
import { siteConfig, type Project } from "@/lib/site-config";

// Fail the build on a malformed gallery or a duplicate slug.
const slugs = new Set<string>();
for (const p of siteConfig.projects) {
  assertGallery(p);
  if (slugs.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
  slugs.add(p.slug);
}

/** Newest first; the sort is stable, so ties keep portfolio order. */
export function projectsInDisplayOrder() {
  return [...siteConfig.projects].sort(
    (a, b) => Number(b.year) - Number(a.year),
  );
}

/** Meta description, also used as the WebPage description in JSON-LD. */
export function projectDescription(p: Project) {
  const client = p.client ? ` Client: ${p.client}.` : "";
  return `${p.scope}: ${p.title}, ${p.location}, completed ${p.year}.${client}`;
}

export function getProjectBySlug(slug: string) {
  return siteConfig.projects.find((p) => p.slug === slug);
}
