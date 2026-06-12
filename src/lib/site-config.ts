/**
 * Single source of truth for all site content.
 * Edit copy, contact details, services, and projects here — components
 * never hardcode content.
 *
 * Image specs (replace files in /public/images, keep paths in sync here):
 *   - Heroes:        1920 × 900
 *   - Service cards:  800 × 600
 *   - Project cards: 1200 × 800
 */

// ── FILL IN BEFORE LAUNCH ────────────────────────────────────────────
const contact = {
  phoneDisplay: "017-751 9510",
  phoneE164: "+60177519510",
  whatsappE164: "60177519510", // digits only, for wa.me links
  email: "TODO_EMAIL", // e.g. "info@teguhperintis.com"
  addressLines: [
    "PTD 5623, Mukim, Kampung Sungai Tiram",
    "Ulu Tiram, Johor, Malaysia",
  ],
  hours: "Daily until 6:00 PM", // TODO: confirm opening time
  // Targets the company's Google Business listing near Kampung Sungai Tiram.
  // The lot address ("PTD 5623, ...") does not geocode — it pins the wrong
  // spot (Ulu Tiram town center) — so query the business name instead.
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Teguh Perintis, Ulu Tiram, Johor, Malaysia") +
    "&output=embed",
  siteUrl: "https://teguhperintis.example.com", // TODO: production URL
  whatsappMessage:
    "Hello Teguh Perintis, I would like to request a consultation.",
} as const;
// ─────────────────────────────────────────────────────────────────────

export const siteConfig = {
  company: {
    name: "Teguh Perintis Sdn. Bhd.",
    shortName: "Teguh Perintis",
    tagline:
      "CIDB G3 Registered Contractor — Roads, Civil Engineering & Building Construction",
    description:
      "Teguh Perintis Sdn. Bhd. is a CIDB G3 registered construction company based in Ulu Tiram, Johor, specialising in roads and infrastructure works, civil engineering projects, and building construction.",
    establishedYear: 2022,
    location: "Ulu Tiram, Johor, Malaysia",
  },
  registration: {
    ssmRegNo: "202201029581 (1475278-V)",
    cidbGrade: "G3",
    cidbRegNo: "0120230711-JH121222",
    memberSince: "11 July 2023",
    validUntil: "20 August 2026",
    serviceArea: "Johor & nearby",
    certifications: ["PPK", "SPKK", "STB"],
    natureOfBusiness: [
      "Construction of roads and railways",
      "Construction of other engineering projects",
      "Construction of buildings",
    ],
    categories: [
      { code: "B04", label: "Building Works" },
      { code: "CE21", label: "Civil Engineering" },
      { code: "M15", label: "Mechanical & Electrical" },
      { code: "FM", label: "Facility Management" },
    ],
  },
  contact,
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  stats: [
    // TODO_CONFIRM_STATS: confirm project/client counts with the client
    { value: "2022", label: "Established" },
    { value: "30+", label: "Projects Completed" },
    { value: "25+", label: "Satisfied Clients" },
    { value: "G3", label: "CIDB Grade" },
  ],
  services: [
    {
      id: "civil-infrastructure",
      title: "Roads & Civil Infrastructure",
      shortDescription:
        "Construction of roads, drainage, and infrastructure works for public and private development.",
      fullDescription:
        "Our core registered business is the construction of roads, railways-related works, and civil infrastructure. Registered under CIDB category CE21, we undertake roadworks, drainage systems, earthworks, and external infrastructure for public and private projects — executed to specification and on schedule.",
      bullets: [
        "Roadworks, pavements, and upgrading",
        "Drainage and culvert systems",
        "Earthworks and site infrastructure",
        "Retaining walls and slope works",
      ],
      image: "/images/services/service-civil.jpg",
      altText: "Site crew carrying out civil infrastructure works",
    },
    {
      id: "engineering-projects",
      title: "Engineering Projects",
      shortDescription:
        "General engineering construction works supporting industrial, utility, and development projects.",
      fullDescription:
        "Beyond roads and buildings, we carry out other engineering construction projects — structural works, utility-related construction, and specialised engineering packages — combining proven site experience with compliance to Malaysian engineering standards.",
      bullets: [
        "Structural and engineering works",
        "Utility and supporting infrastructure",
        "Specialised construction packages",
        "Site preparation and enabling works",
      ],
      image: "/images/services/service-building.jpg",
      altText: "Engineering construction site with tower cranes",
    },
    {
      id: "building-construction",
      title: "Building Construction",
      shortDescription:
        "End-to-end building works for residential and commercial projects, from site preparation to handover.",
      fullDescription:
        "As a CIDB-registered contractor under category B04, we deliver complete building construction services. From earthworks and foundations to structural works and architectural finishing, our team manages every stage with quality workmanship and full compliance to Malaysian standards.",
      bullets: [
        "Residential and commercial buildings",
        "Structural and architectural works",
        "Site preparation and earthworks",
        "Extensions and refurbishment",
      ],
      image: "/images/services/service-aluminium.jpg",
      altText: "Completed commercial buildings with modern facades",
    },
    {
      id: "mechanical-electrical",
      title: "Mechanical & Electrical",
      shortDescription:
        "M&E installation and servicing for buildings — wiring, lighting, ventilation, and more.",
      fullDescription:
        "Under category M15, we provide mechanical and electrical engineering services for new builds and existing premises. We handle electrical wiring and distribution, lighting, ventilation, and mechanical installations with certified workmanship and safety-first practices.",
      bullets: [
        "Electrical wiring and distribution",
        "Lighting and power installations",
        "Ventilation and mechanical systems",
        "Testing and commissioning",
      ],
      image: "/images/services/service-me.jpg",
      altText: "Electrician installing electrical distribution equipment",
    },
    {
      id: "renovation-finishing",
      title: "Renovation & Finishing",
      shortDescription:
        "Interior and exterior renovation, upgrades, and quality finishing works.",
      fullDescription:
        "From single-room upgrades to full premises renovation, we transform existing spaces with quality finishing works — tiling, plastering, painting, ceiling works, and carpentry — delivered with minimal disruption to your home or business.",
      bullets: [
        "Interior and exterior renovation",
        "Tiling, plastering, and painting",
        "Ceiling and partition works",
        "Built-in carpentry and fittings",
      ],
      image: "/images/services/service-maintenance.jpg",
      altText: "Wall painting in progress during renovation works",
    },
    {
      id: "maintenance-facility",
      title: "Maintenance & Facility Management",
      shortDescription:
        "Scheduled maintenance and facility management to keep your property in top condition.",
      fullDescription:
        "We provide scheduled maintenance and facility management services for residential, commercial, and institutional properties — preventive maintenance programmes, repair works, and building upkeep that protect your asset over the long term.",
      bullets: [
        "Scheduled preventive maintenance",
        "Repair and rectification works",
        "Building and compound upkeep",
        "Facility management programmes",
      ],
      image: "/images/services/service-facility.jpg",
      altText: "Maintenance technician servicing building facilities",
    },
  ],
  process: [
    {
      step: 1,
      title: "Consultation",
      description:
        "We discuss your requirements, assess the site, and provide honest, practical advice on scope and budget.",
    },
    {
      step: 2,
      title: "Planning & Design",
      description:
        "We prepare detailed plans, schedules, and quotations so you know exactly what to expect before work begins.",
    },
    {
      step: 3,
      title: "Construction",
      description:
        "Our team executes the works with quality materials, certified workmanship, and strict safety practices.",
    },
    {
      step: 4,
      title: "Handover & Support",
      description:
        "We complete final inspections, hand over a clean finished project, and stay available for after-sales support.",
    },
  ],
  projects: [
    // TODO_PROJECT: example entries with stock photos — replace with real
    // project details and the client's own photos before launch.
    {
      id: "project-01",
      title: "Double-Storey House Renovation",
      category: "Residential",
      location: "Ulu Tiram, Johor",
      year: "2025",
      image: "/images/projects/project-01.jpg",
      altText: "Renovated double-storey house exterior",
      featured: true,
    },
    {
      id: "project-02",
      title: "Glass & Aluminium Facade Works",
      category: "Commercial",
      location: "Johor Bahru, Johor",
      year: "2025",
      image: "/images/projects/project-02.jpg",
      altText: "Commercial building with glass and aluminium curtain wall facade",
      featured: true,
    },
    {
      id: "project-03",
      title: "Commercial Block Structural Works",
      category: "Commercial",
      location: "Pasir Gudang, Johor",
      year: "2024",
      image: "/images/projects/project-03.jpg",
      altText: "High-rise commercial block under construction with tower cranes",
      featured: true,
    },
    {
      id: "project-04",
      title: "Apartment External Repair & Repaint",
      category: "Facility Management",
      location: "Kota Tinggi, Johor",
      year: "2024",
      image: "/images/projects/project-04.jpg",
      altText: "Apartment block exterior after repair and repainting works",
      featured: false,
    },
    {
      id: "project-05",
      title: "Office Interior Fit-Out",
      category: "Commercial",
      location: "Johor Bahru, Johor",
      year: "2024",
      image: "/images/projects/project-05.jpg",
      altText: "Modern office interior with partitions and finishing",
      featured: false,
    },
    {
      id: "project-06",
      title: "Bungalow Renovation & Landscaping",
      category: "Residential",
      location: "Ulu Tiram, Johor",
      year: "2023",
      image: "/images/projects/project-06.jpg",
      altText: "Renovated bungalow with pool and landscaped garden",
      featured: false,
    },
  ],
  values: [
    {
      title: "Integrity",
      description:
        "Transparent quotations, honest timelines, and work that matches what we promise — every time.",
    },
    {
      title: "Quality & Safety",
      description:
        "Certified workmanship, quality materials, and strict adherence to Malaysian construction and safety standards.",
    },
    {
      title: "Timely Delivery",
      description:
        "Disciplined project management that keeps your project on schedule and within budget.",
    },
  ],
} as const;

export type Service = (typeof siteConfig.services)[number];
export type Project = (typeof siteConfig.projects)[number];

export const whatsappHref = `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(contact.whatsappMessage)}`;
