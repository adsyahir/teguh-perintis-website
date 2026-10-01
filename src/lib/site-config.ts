/**
 * Single source of truth for all site content.
 * Edit copy, contact details, services, and projects here — components
 * never hardcode content.
 *
 * Image specs (replace files in /public/images, keep paths in sync here).
 * All images are WebP sized for their slot — see README "Images and logos"
 * for the extraction/conversion workflow:
 *   - Hero:          hero-home-{768,1280,1920}.webp (same photo, 3 widths)
 *   - Service cards: 800px wide
 *   - Project cards: up to 1200px wide (source photos are never upscaled)
 */

// ── FILL IN BEFORE LAUNCH ────────────────────────────────────────────

// Surveyed from the Google Business listing. The lot address ("PTD 5623, ...")
// does not geocode — it pins Ulu Tiram town centre — so the map embed and the
// schema geo node are both derived from these coordinates.
const geo = { latitude: 1.593919, longitude: 103.859758 } as const;

const contact = {
  phoneDisplay: "017-751 9510",
  phoneE164: "+60177519510",
  whatsappE164: "60177519510", // digits only, for wa.me links
  email: "t.perintissb@gmail.com",
  addressLines: [
    "PTD 5623, Sg Tiram, Mukim Sungai Tiram",
    "81800 Ulu Tiram, Johor, Malaysia",
  ],
  postalCode: "81800",
  // Confirmed against the Google Business Profile listing. `hours` is the
  // display string; `openingHours` is the machine-readable form the
  // GeneralContractor schema emits — keep the two in sync.
  hours: "Monday – Saturday, 9:00 AM – 6:00 PM (closed Sunday)",
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  geo,
  googleMapsEmbedUrl: `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}&z=17&output=embed`,
  siteUrl: "https://teguhperintis.com",
  // The Google Business Profile listing, as its stable CID link. Emitted as
  // schema.org sameAs so Google ties this site to the existing map listing.
  googleBusinessUrl: "https://maps.google.com/?cid=800152553011140462",
  whatsappMessage:
    "Hello Teguh Perintis, I would like to enquire about aluminium dome / metal works.",
} as const;
// ─────────────────────────────────────────────────────────────────────

export type ProjectStatus = "completed" | "ongoing";

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  client: string;
  /** Omitted when the main contractor is not confirmed ("TBC" in the portfolio). */
  mainContractor?: string;
  status: ProjectStatus;
  image: string;
  altText: string;
  featured: boolean;
}

// All 19 projects from the client's portfolio PDF, in portfolio order.
// TODO_CONFIRM: status is inferred from the year (2026 = ongoing, earlier =
// completed) — confirm per project. Photos are extracted from the PDF and
// several are below 1200px wide (see README "Images and logos").
const projects: readonly Project[] = [
  {
    id: "project-01",
    title: "Masjid Habib Hassan Al-Attas",
    category: "Aluminium Dome",
    location: "Jalan Tun Abdul Razak, Johor Bahru, Johor",
    year: "2020",
    scope: "Supply and install aluminium dome",
    client: "Majlis Agama Islam Negeri Johor, JKR Johor",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    status: "completed",
    image: "/images/projects/project-01.webp",
    altText:
      "Close-up of a pale gold aluminium dome clad in overlapping scale-shaped panels, with a highway and buildings behind",
    featured: true,
  },
  {
    id: "project-02",
    title: "Masjid Tuminah Hamidi",
    category: "Aluminium Dome",
    location: "Bagan Datuk, Perak",
    year: "2020",
    scope: "Supply and install aluminium dome",
    client: "Yayasan Al-Falah",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    status: "completed",
    image: "/images/projects/project-02.webp",
    altText:
      "Aerial view of a blue-roofed mosque with a blue dome and twin minarets beside a river",
    featured: false,
  },
  {
    id: "project-03",
    title: "Masjid Bandar Seremban Selatan",
    category: "Aluminium Dome",
    location: "Seremban, Negeri Sembilan",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JHEINS, JKR Negeri Sembilan",
    mainContractor: "Sri Bukti Construction Sdn Bhd",
    status: "completed",
    image: "/images/projects/project-03.webp",
    altText:
      "Triangulated aluminium dome framework with glazed panels on the roof of a grey mosque building, with hills behind",
    featured: true,
  },
  {
    id: "project-04",
    title: "Masjid Baru di Kampung Tok Machang",
    category: "Aluminium Dome",
    location: "Ulu Gali, Raub, Pahang",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JKR Raub",
    mainContractor: "Mercu Buana (M) Sdn Bhd",
    status: "completed",
    image: "/images/projects/project-04.webp",
    altText:
      "Gold aluminium dome with ribbed panel seams on a concrete roof, beside minaret scaffolding and limestone hills",
    featured: false,
  },
  {
    id: "project-05",
    title: "Masjid Baru Taman Saga",
    category: "Aluminium Dome",
    location: "Mentakab, Temerloh, Pahang",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JKR Pahang",
    // TODO_CONFIRM: main contractor is "TBC" in the portfolio, so omitted.
    status: "completed",
    image: "/images/projects/project-05.webp",
    altText:
      "Aerial view of a mosque with red tiled roofs and a small gold aluminium dome with a pinnacle",
    featured: false,
  },
  {
    id: "project-06",
    title: "Masjid Kariah Seri Kendong",
    category: "Aluminium Dome",
    location: "Rembau, Negeri Sembilan",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JKR Negeri Sembilan",
    // TODO_CONFIRM: main contractor is not stated in the portfolio, so omitted.
    status: "completed",
    image: "/images/projects/project-06.webp",
    altText:
      "Aerial view of a mosque under construction with a green aluminium pinnacle on a white minaret tower",
    featured: false,
  },
  {
    id: "project-07",
    title: "Masjid Muhammad Al-Fateh",
    category: "Aluminium Dome",
    location: "Taman Forest Height, Senawang, Negeri Sembilan",
    year: "2024",
    scope: "Design, supply and install aluminium dome",
    client: "JKR Negeri Sembilan",
    // TODO_CONFIRM: main contractor is not stated in the portfolio, so omitted.
    status: "completed",
    image: "/images/projects/project-07.webp",
    altText:
      "Green aluminium dome with a white lattice trim band and gold finial on a white base, with a minaret beside it",
    featured: true,
  },
  {
    id: "project-08",
    title: "Kompleks Pentadbiran Kerajaan Persekutuan",
    category: "Dome Refurbishment",
    location: "Kota Kinabalu, Sabah",
    year: "2024",
    scope: "Dome refurbishment",
    client: "Kementerian Kerja Raya Malaysia",
    mainContractor: "Pembinaan Kekal Mewah Sdn Bhd",
    status: "completed",
    image: "/images/projects/project-08.webp",
    altText:
      "Workers on a scaffold platform refurbishing a large teal-green aluminium dome",
    featured: true,
  },
  {
    id: "project-09",
    title: "Tunku Mahkota Ismail Youth Centre (TMIYC)",
    category: "Aluminium Dome",
    location: "Pasir Gudang, Johor",
    year: "2024",
    scope: "Design, supply and install aluminium dome",
    client: "Kerajaan Negeri Johor",
    mainContractor: "OKA Marketing Sdn Bhd",
    status: "completed",
    image: "/images/projects/project-09.webp",
    altText:
      "Three dark grey aluminium domes on the roof of a white building, with scaffolding along its walls",
    featured: true,
  },
  {
    id: "project-10",
    title: "Composite Panel Cladding to Existing Domes",
    category: "Dome Cladding",
    location: "Shah Alam, Selangor",
    year: "2025",
    scope: "Design, supply and install aluminium dome to existing GFRC dome",
    client: "Pentadbir Masjid An-Nur Temasya Glenmarie",
    mainContractor: "Teguh Perintis Sdn Bhd",
    status: "completed",
    image: "/images/projects/project-10.webp",
    altText:
      "Clad mosque dome with calligraphy, lit in green at dusk beside a minaret",
    featured: true,
  },
  {
    id: "project-11",
    title: "Masjid Jalan Bayu Damai",
    category: "Aluminium Dome",
    location: "Klang, Selangor",
    year: "2026",
    scope: "Design, supply and install aluminium dome",
    client: "SP Setia / Kota Bayuemas Sdn Bhd",
    mainContractor: "Canggih Kilat Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-11.webp",
    altText:
      "Aerial view of a large grey aluminium dome with ribbed panels and a pinnacle on a mosque roof",
    featured: false,
  },
  {
    id: "project-12",
    title: "Maahad Tahfidz Sains",
    category: "Aluminium Dome",
    location: "Kuala Langat, Selangor",
    year: "2026",
    scope: "Design, supply and install aluminium dome",
    client: "Majlis Agama Islam Negeri Selangor",
    mainContractor: "Jutabina Sempurna Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-12.webp",
    altText:
      "Aerial view of a four-storey school block under construction with red roofs and gold domes at its corners",
    featured: false,
  },
  {
    id: "project-13",
    title: "Asrama Semai Bakti",
    category: "Aluminium Windows",
    location: "Johor Bahru, Johor",
    year: "2026",
    scope: "Supply and install aluminium window",
    client: "Lembaga Kemajuan Tanah Persekutuan (FELDA)",
    mainContractor: "Mutual Premium Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-13.webp",
    altText:
      "Hostel building facade with dark aluminium window frames and orange cladding trim",
    featured: false,
  },
  {
    id: "project-14",
    title: "Masjid Taman Bayu Damai",
    category: "Aluminium Dome",
    location: "Pengerang, Johor",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "JKR Johor",
    mainContractor: "AHA Gemilang Enterprise / QNE Teguh Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-14.webp",
    altText:
      "Dark grey aluminium dome with a gold finial on a white tower being installed with a crane",
    featured: false,
  },
  {
    id: "project-15",
    title: "Kompleks Masjid",
    category: "Dome & Windows",
    location: "Duyong, Melaka",
    year: "2026",
    scope: "Supply and install aluminium dome and window",
    client: "ICU JPM",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-15.webp",
    altText:
      "Gold aluminium dome with a pinnacle and crescent on a concrete plinth, with houses and trees behind",
    featured: false,
  },
  {
    id: "project-16",
    title: "Masjid Kampung Baru",
    category: "Aluminium Dome",
    location: "Kemaman, Terengganu",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "JKR Terengganu",
    mainContractor: "Zulqarnain Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-16.webp",
    altText:
      "Gold aluminium dome surrounded by scaffolding on a roof, with forested hills behind",
    featured: false,
  },
  {
    id: "project-17",
    title: "Perimeter Fencing for Cargo Warehouse",
    category: "Perimeter Fencing",
    location: "Senai, Johor",
    year: "2026",
    scope: "Supply and install perimeter fence",
    client: "Senai Airport Terminal Services Sdn Bhd",
    mainContractor: "Anylink Holding Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-17.webp",
    altText:
      "Interior of a cargo warehouse with a perimeter fence of white-framed mesh panels",
    featured: false,
  },
  {
    id: "project-18",
    title: "Proposed Public Facilities, Landscape and Restoration",
    category: "Aluminium Dome",
    location: "Kota Kinabalu, Sabah",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "Tanjung Aru Eco Development Sdn Bhd",
    mainContractor: "MP Perdana Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-18.webp",
    // TODO_CONFIRM: the portfolio shows an architectural drawing for this
    // project, not a site photo. Replace with a photo when available.
    altText:
      "Architectural elevation drawing of a domed public building with grid references and dimensions",
    featured: false,
  },
  {
    id: "project-19",
    title: "Majlis Agama Islam",
    category: "Aluminium Dome",
    location: "Johor Bahru, Johor",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "Majlis Agama Islam Johor",
    mainContractor: "OKA Marketing Sdn Bhd",
    status: "ongoing",
    image: "/images/projects/project-19.webp",
    // TODO_CONFIRM: the portfolio shows an architectural drawing for this
    // project, not a site photo. Replace with a photo when available.
    altText:
      "Architectural elevation drawing of a multi-storey building with an arched ground floor and a tiled roof",
    featured: false,
  },
];

export const siteConfig = {
  company: {
    name: "Teguh Perintis Sdn. Bhd.",
    shortName: "Teguh Perintis",
    tagline:
      "Specialist Contractor for Aluminium Domes & Architectural Metal Works",
    description:
      "Teguh Perintis Sdn. Bhd. is a Johor-based specialist contractor and supplier established in 2022, focusing on aluminium dome construction and architectural metal works for mosque, institutional and commercial projects across Malaysia.",
    establishedYear: 2022,
    // TODO_CONFIRM: the year the predecessor business started trading (2014),
    // shown as "Track Record Since" in stats and on the About timeline.
    trackRecordSince: 2014,
    predecessors: [
      "Teguh Aluminium Kreatif",
      "Teguh Aluminium and Construction Sdn. Bhd.",
    ],
    location: "Ulu Tiram, Johor, Malaysia",
  },
  // CIDB / SSM details are legal facts and stay as registered. natureOfBusiness
  // and categories are the registered codes — shown only as credentials on the
  // About page, not as the company's service offering.
  registration: {
    ssmRegNo: "202201029581 (1475278-V)",
    cidbGrade: "G3",
    cidbRegNo: "0120230711-JH121222",
    memberSince: "11 July 2023",
    validUntil: "20 August 2026",
    // TODO_CONFIRM: projects span Peninsular Malaysia and Sabah.
    serviceArea: "Nationwide — Peninsular Malaysia & Sabah",
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
    // TODO_CONFIRM_STATS: "since 2014" and the counts come from the portfolio
    // (19 projects across 8 states) — confirm with the client.
    { value: "2014", label: "Track Record Since" },
    { value: "19", label: "Portfolio Projects" },
    { value: "8", label: "States Served" },
    { value: "G3", label: "CIDB Grade" },
  ],
  services: [
    {
      id: "aluminium-domes",
      title: "Aluminium Domes & Pinnacles",
      shortDescription:
        "Design coordination, fabrication and installation of aluminium domes, structural framing, cladding and pinnacles.",
      fullDescription:
        "Aluminium domes are our core work. We coordinate the design, fabricate in-house, and supply and install complete dome systems, from structural framing and panel cladding to the pinnacle, for mosques and institutional buildings.",
      bullets: [
        "Aluminium dome supply and installation",
        "Structural framing and support",
        "Panel cladding in a range of finishes",
        "Pinnacle and finial works",
      ],
      image: "/images/services/service-domes.webp",
      altText:
        "Three dark grey aluminium domes with ribbed panels on the roof of a white building",
    },
    {
      id: "windows-glazing-cladding",
      title: "Aluminium Windows, Glazing & ACP Cladding",
      shortDescription:
        "Aluminium windows, glazing, ACP cladding and aluminium capping for institutional and commercial buildings.",
      fullDescription:
        "Alongside domes, we supply and install aluminium windows and glazing, aluminium composite panel (ACP) cladding and aluminium capping, fabricated to suit the architect's details and installed to a clean, weather-tight finish.",
      bullets: [
        "Aluminium windows and glazing",
        "ACP facade cladding",
        "Aluminium capping and trim",
        "Supply and installation to drawings",
      ],
      image: "/images/services/service-windows-cladding.webp",
      altText:
        "Building facade with dark aluminium window frames and orange cladding trim",
    },
    {
      id: "decorative-panels",
      title: "Celuka Lattice & CNC-Cut Panels",
      shortDescription:
        "Decorative Celuka lattice composite and CNC-cut aluminium panels for facades and Islamic architectural detailing.",
      fullDescription:
        "We produce decorative Celuka lattice composite panels and CNC-cut aluminium panels, adding intricate patterns and calligraphy to facades, domes and screens, with cutting and finishing carried out in-house.",
      bullets: [
        "Celuka lattice composite panels",
        "CNC-cut aluminium panels",
        "Calligraphy and pattern detailing",
        "Facade and screen applications",
      ],
      // TODO_CONFIRM: photo shows a dome with calligraphy detailing; swap for
      // a clear shot of Celuka/CNC panels when the client has one.
      image: "/images/services/service-decorative-panels.webp",
      altText:
        "Mosque dome with calligraphy detailing, lit in green at dusk beside a minaret",
    },
    {
      id: "minarets-metalworks",
      title: "Minarets & Architectural Metal Works",
      shortDescription:
        "Minaret steel structures, stainless-steel pinnacles, perimeter fencing and other architectural metal works.",
      fullDescription:
        "We fabricate and install minaret steel structures, stainless-steel pinnacles and other architectural metal works, including perimeter fencing for commercial and industrial sites.",
      bullets: [
        "Minaret steel structures",
        "Stainless-steel pinnacles",
        "Perimeter fencing",
        "Custom architectural metal works",
      ],
      // TODO_CONFIRM: photo shows perimeter fencing; swap for a minaret or
      // pinnacle photo when the client has a high-resolution one.
      image: "/images/services/service-metalworks.webp",
      altText:
        "Perimeter fence of white-framed mesh panels inside a cargo warehouse",
    },
    {
      id: "dome-refurbishment",
      title: "Dome Refurbishment & Waterproofing",
      shortDescription:
        "Refurbishment, repair and waterproofing of existing domes, including re-cladding in aluminium or composite panels.",
      fullDescription:
        "Existing domes weather, leak and fade. We inspect, repair, waterproof and re-clad them, including cladding over existing GFRC domes, so the building keeps its landmark without a full rebuild.",
      bullets: [
        "Dome inspection and repair",
        "Waterproofing and leak rectification",
        "Re-cladding of existing domes",
        "Cladding over existing GFRC domes",
      ],
      image: "/images/services/service-refurbishment.webp",
      altText:
        "Workers on scaffolding refurbishing a large teal-green aluminium dome",
    },
  ],
  process: [
    {
      step: 1,
      title: "Consultation & Site Survey",
      description:
        "We discuss your requirements, survey the site, and give honest, practical advice on scope, materials and budget.",
    },
    {
      step: 2,
      title: "Design Coordination",
      description:
        "We coordinate shop drawings, finishes and structural details with your architect and main contractor before fabrication starts.",
    },
    {
      step: 3,
      title: "In-House Fabrication",
      description:
        "Domes, panels and metal components are fabricated in our own workshop, so quality and lead times stay in our hands.",
    },
    {
      step: 4,
      title: "Supply, Installation & Handover",
      description:
        "Our crew installs on site, we complete final inspections, and we stay available for after-sales support.",
    },
  ],
  projects,
  about: {
    // Paragraphs 1-3 are the portfolio overview, verbatim, split by sentence.
    intro: [
      "Teguh Perintis Sdn. Bhd. is a Johor-based specialist contractor and supplier established in 2022, focusing on aluminium dome construction and architectural metal works.",
      "The company represents the continuation and further development of the businesses formerly operated under Teguh Aluminium Kreatif and Teguh Aluminium and Construction Sdn. Bhd.",
      "Building on the experience, expertise and track record developed through these earlier entities, Teguh Perintis Sdn. Bhd. undertakes design coordination, in-house fabrication, supply, installation, refurbishment and associated specialist works for mosque, institutional and commercial projects.",
    ],
    cidbNote:
      "The company has been registered with CIDB since 2023 at Grade G3.", // TODO_CONFIRM: renewal after the 20 Aug 2026 validUntil
    whyChooseUs: [
      "Dome specialists with a track record on mosque, institutional and commercial projects across Malaysia",
      "In-house fabrication of domes, panels and metal components for tighter quality control",
      "Design coordination with architects and main contractors, from shop drawings to handover",
      "CIDB G3 registered, with refurbishment and waterproofing support after installation",
    ],
    // TODO_CONFIRM: the year Teguh Aluminium and Construction Sdn. Bhd. was
    // formed is not in the source files, so its entry carries no year.
    history: [
      {
        period: "2014",
        title: "Teguh Aluminium Kreatif",
        description:
          "The track record begins with Teguh Aluminium Kreatif, building experience in aluminium works.",
      },
      {
        period: "Expansion",
        title: "Teguh Aluminium and Construction Sdn. Bhd.",
        description:
          "The business continues as Teguh Aluminium and Construction Sdn. Bhd.",
      },
      {
        period: "2022",
        title: "Teguh Perintis Sdn. Bhd.",
        description:
          "Teguh Perintis is established as the continuation of these earlier businesses, focused on aluminium domes and architectural metal works.",
      },
      {
        period: "2023",
        title: "CIDB G3 registration",
        description:
          "Teguh Perintis is registered with CIDB at Grade G3.",
      },
    ],
  },
  // Client and agency names, verbatim from the portfolio summary page.
  clients: [
    "Jabatan Agama Islam Selangor",
    "ICU Jabatan Perdana Menteri",
    "JKR Johor",
    "Kerajaan Negeri Johor / MBPG Pasir Gudang",
    "Tanjung Aru Eco Development Sdn Bhd",
    "Lembaga Kemajuan Tanah Persekutuan (FELDA)",
    "Kementerian Kerja Raya Malaysia",
    "Mindef / UPNM",
    "Majlis Agama Islam Johor / JKR Johor / KPRJ E&C Sdn Bhd",
    "Majlis Agama Islam Negeri Selangor / JKR Kuala Langat",
    "JHEINS, JKR Negeri Sembilan",
    "JKR Negeri Sembilan",
    "Majlis Agama Islam Negeri Johor, JKR Johor",
    "Senai Airport Terminal Services Sdn Bhd",
    "JKR Pahang",
    "SP Setia / Kota Bayuemas Sdn Bhd",
    "Yayasan Al-Falah, Perak",
    "Pejabat Pembangunan Negeri Pahang, JKR Raub",
    "Pentadbir Masjid An-Nur Temasya Glenmarie / ICU JPM",
    "JKR Terengganu",
  ],
  values: [
    {
      title: "Integrity",
      description:
        "Clear quotations, honest timelines, and work that matches what we promised.",
    },
    {
      title: "Quality & Safety",
      description:
        "In-house fabrication, certified workmanship, and strict adherence to Malaysian construction and safety standards, especially for works at height.",
    },
    {
      title: "Timely Delivery",
      description:
        "Disciplined project management that keeps your project on schedule and within budget.",
    },
  ],
} as const;

export type Service = (typeof siteConfig.services)[number];

export const whatsappHref = `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(contact.whatsappMessage)}`;
