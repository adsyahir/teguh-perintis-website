import { siteConfig } from "@/lib/site-config";

/**
 * Site-wide structured data, emitted once from the root layout as a single
 * @graph so the nodes can cross-reference each other by @id:
 *   - GeneralContractor — the local-business entity Google uses for the map
 *     pack and the knowledge panel.
 *   - WebSite — ties the domain to the business.
 *   - Service — one node per registered service, linked back to the provider.
 */
export default function JsonLd() {
  const { company, contact, registration, services } = siteConfig;

  const businessId = `${contact.siteUrl}/#organization`;
  const websiteId = `${contact.siteUrl}/#website`;

  const business = {
    "@type": "GeneralContractor",
    "@id": businessId,
    name: company.name,
    alternateName: company.shortName,
    description: company.description,
    slogan: company.tagline,
    url: contact.siteUrl,
    telephone: contact.phoneE164,
    image: `${contact.siteUrl}/images/hero-home-1280.webp`,
    logo: `${contact.siteUrl}/images/logo.svg`,
    foundingDate: String(company.establishedYear),
    // SSM company number — the identifier the registry and CIDB both use.
    identifier: registration.ssmRegNo,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLines[0],
      addressLocality: "Ulu Tiram",
      addressRegion: "Johor",
      addressCountry: "MY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    hasMap: contact.googleBusinessUrl,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Johor, Malaysia",
    },
    sameAs: [contact.googleBusinessUrl],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: contact.openingHours.days.map(
          (day) => `https://schema.org/${day}`,
        ),
        opens: contact.openingHours.opens,
        closes: contact.openingHours.closes,
      },
    ],
    knowsAbout: registration.categories.map((c) => c.label),
    hasCredential: registration.categories.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "CIDB Registration",
      name: `CIDB ${c.code} — ${c.label}`,
      identifier: registration.cidbRegNo,
    })),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${contact.siteUrl}/services#${service.id}`,
        name: service.title,
        description: service.shortDescription,
        serviceType: service.title,
        provider: { "@id": businessId },
        areaServed: "Johor, Malaysia",
      },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: contact.siteUrl,
    name: company.name,
    inLanguage: "en-MY",
    publisher: { "@id": businessId },
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [business, website],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
