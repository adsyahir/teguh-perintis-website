import { coverOf } from "@/lib/gallery";
import { projectDescription } from "@/lib/projects";
import { siteConfig, type Project } from "@/lib/site-config";

/**
 * Per-project structured data: a BreadcrumbList and a WebPage listing the
 * project's real photos (placeholders are skipped). Emitted as one @graph and
 * linked to the site-wide WebSite / GeneralContractor nodes in JsonLd.tsx by
 * @id.
 */
export default function ProjectJsonLd({ project }: { project: Project }) {
  const { siteUrl } = siteConfig.contact;
  const url = `${siteUrl}/projects/${project.slug}`;
  const breadcrumbId = `${url}#breadcrumb`;
  const abs = (src: string) => `${siteUrl}${src}`;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: project.title,
    description: projectDescription(project),
    inLanguage: "en-MY",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    breadcrumb: { "@id": breadcrumbId },
    primaryImageOfPage: { "@id": abs(coverOf(project).src) },
    image: project.gallery.flatMap((slot) =>
      slot.photo
        ? [
            {
              "@type": "ImageObject",
              "@id": abs(slot.photo.src),
              url: abs(slot.photo.src),
              contentUrl: abs(slot.photo.src),
              width: slot.photo.width,
              height: slot.photo.height,
              caption: slot.photo.alt,
            },
          ]
        : [],
    ),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [breadcrumb, webPage],
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
