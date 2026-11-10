import { serviceDescription, serviceSchema, serviceUrl } from "@/lib/services";
import { siteConfig, type Service } from "@/lib/site-config";

/**
 * Per-service structured data: a BreadcrumbList, a WebPage, and the Service
 * itself. Linked to the site-wide WebSite / GeneralContractor nodes in
 * JsonLd.tsx by @id; the Service node is the same one makesOffer emits.
 */
export default function ServiceJsonLd({ service }: { service: Service }) {
  const { siteUrl } = siteConfig.contact;
  const url = `${siteUrl}${serviceUrl(service)}`;
  const breadcrumbId = `${url}#breadcrumb`;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: service.seoTitle,
    description: serviceDescription(service),
    inLanguage: "en-MY",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${url}#service` },
    breadcrumb: { "@id": breadcrumbId },
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [breadcrumb, webPage, serviceSchema(service)],
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
