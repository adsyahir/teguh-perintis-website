import { projectsInDisplayOrder } from "@/lib/projects";
import { siteConfig, type Service } from "@/lib/site-config";

// Fail the build on a duplicate service slug.
const slugs = new Set<string>();
for (const s of siteConfig.services) {
  if (slugs.has(s.slug)) throw new Error(`Duplicate service slug: ${s.slug}`);
  slugs.add(s.slug);
}

export function getServiceBySlug(slug: string) {
  return siteConfig.services.find((s) => s.slug === slug);
}

export function serviceUrl(service: Service) {
  return `/services/${service.slug}` as const;
}

/** Projects in this service's category, newest first. */
export function relatedProjects(service: Service) {
  const category: string | null = service.projectCategory;
  if (!category) return [];
  return projectsInDisplayOrder().filter((p) => p.category === category);
}

/** Meta description, also used as the Service description in JSON-LD. */
export function serviceDescription(service: Service) {
  return `${service.shortDescription} Johor-based contractor working across Malaysia (${service.malayName}).`;
}

/**
 * The schema.org Service node. Both the site-wide graph (makesOffer in
 * JsonLd.tsx) and the service page use it, so the two nodes sharing this @id
 * never disagree.
 */
export function serviceSchema(service: Service) {
  const { siteUrl } = siteConfig.contact;
  const url = `${siteUrl}${serviceUrl(service)}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name: service.title,
    alternateName: service.malayName,
    description: serviceDescription(service),
    serviceType: service.title,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "Malaysia" },
    ...(service.image && { image: `${siteUrl}${service.image}` }),
  };
}
