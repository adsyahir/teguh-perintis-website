import { siteConfig } from "@/lib/site-config";

export default function JsonLd() {
  const { company, contact, registration } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    description: company.description,
    url: contact.siteUrl,
    telephone: contact.phoneE164,
    foundingDate: String(company.establishedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLines[0],
      addressLocality: "Ulu Tiram",
      addressRegion: "Johor",
      addressCountry: "MY",
    },
    areaServed: "Johor, Malaysia",
    knowsAbout: registration.categories.map((c) => c.label),
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
