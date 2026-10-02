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

export type ShotKind =
  | "far"
  | "close"
  | "interior"
  | "detail"
  | "progress"
  | "before"
  | "after"
  | "drawing";

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

/** One gallery position. A slot with no `photo` renders as a placeholder. */
export interface GallerySlot {
  kind: ShotKind;
  cover?: true;
  photo?: GalleryPhoto;
}

export interface Project {
  /** Internal key and image-file stem (project-NN). */
  id: string;
  /** URL segment: /projects/<slug>. */
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  client: string;
  /** Omitted when the main contractor is not confirmed ("TBC" in the portfolio). */
  mainContractor?: string;
  /** 4-6 slots: the 4 core kinds, exactly one cover (see lib/gallery.ts). */
  gallery: readonly GallerySlot[];
  featured: boolean;
}

// All 19 projects from the client's portfolio PDF, in portfolio order.
// Photos are extracted from the PDF and several are below 1200px wide (see
// README "Images and logos").
const projects: readonly Project[] = [
  {
    id: "project-01",
    slug: "masjid-habib-hassan-al-attas",
    title: "Masjid Habib Hassan Al-Attas",
    category: "Aluminium Dome",
    location: "Jalan Tun Abdul Razak, Johor Bahru, Johor",
    year: "2020",
    scope: "Supply and install aluminium dome",
    client: "Majlis Agama Islam Negeri Johor, JKR Johor",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    gallery: [
      { kind: "far" },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-01.webp",
          width: 1200,
          height: 806,
          alt:
            "Close-up of a pale gold aluminium dome clad in overlapping scale-shaped panels, with a highway and buildings behind",
        },
      },
      { kind: "interior" },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/project-01-detail.webp",
          width: 518,
          height: 1007,
          alt:
            "Overlapping scale-shaped aluminium panels on a small dome with a gold finial, with the main dome behind",
        },
      },
    ],
    featured: true,
  },
  {
    id: "project-02",
    slug: "masjid-tuminah-hamidi",
    title: "Masjid Tuminah Hamidi",
    category: "Aluminium Dome",
    location: "Bagan Datuk, Perak",
    year: "2020",
    scope: "Supply and install aluminium dome",
    client: "Yayasan Al-Falah",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-02.webp",
          width: 1200,
          height: 806,
          alt:
            "Aerial view of a blue-roofed mosque with a blue dome and twin minarets beside a river",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/project-02-close.webp",
          width: 554,
          height: 1078,
          alt:
            "Minaret with calligraphy panels in front of the mosque's blue aluminium dome",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-03",
    slug: "masjid-bandar-seremban-selatan",
    title: "Masjid Bandar Seremban Selatan",
    category: "Aluminium Dome",
    location: "Seremban, Negeri Sembilan",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JHEINS, JKR Negeri Sembilan",
    mainContractor: "Sri Bukti Construction Sdn Bhd",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-03.webp",
          width: 1200,
          height: 806,
          alt:
            "Triangulated aluminium dome framework with glazed panels on the roof of a grey mosque building, with hills behind",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/project-03-close.webp",
          width: 518,
          height: 1007,
          alt:
            "Triangulated dome framework with protective film still on its glazed panels, on a concrete roof",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: true,
  },
  {
    id: "project-04",
    slug: "masjid-kampung-tok-machang",
    title: "Masjid Baru di Kampung Tok Machang",
    category: "Aluminium Dome",
    location: "Ulu Gali, Raub, Pahang",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JKR Raub",
    mainContractor: "Mercu Buana (M) Sdn Bhd",
    gallery: [
      { kind: "far" },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-04.webp",
          width: 1200,
          height: 806,
          alt:
            "Gold aluminium dome with ribbed panel seams on a concrete roof, beside minaret scaffolding and limestone hills",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/project-04-progress.webp",
          width: 518,
          height: 1007,
          alt:
            "Worker on scaffolding beside a tall gold aluminium pinnacle being fitted onto a concrete minaret base",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-05",
    slug: "masjid-taman-saga-mentakab",
    title: "Masjid Baru Taman Saga",
    category: "Aluminium Dome",
    location: "Mentakab, Temerloh, Pahang",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JKR Pahang",
    // TODO_CONFIRM: main contractor is "TBC" in the portfolio, so omitted.
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-05.webp",
          width: 1200,
          height: 806,
          alt:
            "Aerial view of a mosque with red tiled roofs and a small gold aluminium dome with a pinnacle",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/project-05-close.webp",
          width: 1417,
          height: 999,
          alt:
            "Gold aluminium dome with a pointed finial on a grey roof platform, with trees behind",
        },
      },
      { kind: "interior" },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/project-05-detail.webp",
          width: 398,
          height: 774,
          alt:
            "Ribbed gold aluminium dome rising to a tall pointed finial, with forested hills behind",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-06",
    slug: "masjid-kariah-seri-kendong",
    title: "Masjid Kariah Seri Kendong",
    category: "Aluminium Dome",
    location: "Rembau, Negeri Sembilan",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JKR Negeri Sembilan",
    // TODO_CONFIRM: main contractor is not stated in the portfolio, so omitted.
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-06.webp",
          width: 1022,
          height: 720,
          alt:
            "Aerial view of a mosque under construction with a green aluminium pinnacle on a white minaret tower",
        },
      },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/project-06-progress.webp",
          width: 370,
          height: 720,
          alt:
            "Crane lifting a green aluminium dome onto a white minaret while a harnessed worker guides it",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-07",
    slug: "masjid-muhammad-al-fateh",
    title: "Masjid Muhammad Al-Fateh",
    category: "Aluminium Dome",
    location: "Taman Forest Height, Senawang, Negeri Sembilan",
    year: "2024",
    scope: "Design, supply and install aluminium dome",
    client: "JKR Negeri Sembilan",
    // TODO_CONFIRM: main contractor is not stated in the portfolio, so omitted.
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/project-07-far.webp",
          width: 314,
          height: 608,
          alt:
            "Aerial view of the mosque with its green aluminium dome and white lattice trim above green tiled roofs, beside a highway",
        },
      },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-07.webp",
          width: 1200,
          height: 846,
          alt:
            "Green aluminium dome with a white lattice trim band and gold finial on a white base, with a minaret beside it",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: true,
  },
  {
    id: "project-08",
    slug: "kompleks-pentadbiran-kerajaan-persekutuan-kota-kinabalu",
    title: "Kompleks Pentadbiran Kerajaan Persekutuan",
    category: "Dome Refurbishment",
    location: "Kota Kinabalu, Sabah",
    year: "2024",
    scope: "Dome refurbishment",
    client: "Kementerian Kerja Raya Malaysia",
    mainContractor: "Pembinaan Kekal Mewah Sdn Bhd",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-08.webp",
          width: 1072,
          height: 720,
          alt:
            "Workers on a scaffold platform refurbishing a large teal-green aluminium dome",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/project-08-close.webp",
          width: 371,
          height: 720,
          alt:
            "Workers on ropes refurbishing the panels of a large teal aluminium dome",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
      { kind: "before" },
      { kind: "after" },
    ],
    featured: true,
  },
  {
    id: "project-09",
    slug: "tmiyc-pasir-gudang",
    title: "Tunku Mahkota Ismail Youth Centre (TMIYC)",
    category: "Aluminium Dome",
    location: "Pasir Gudang, Johor",
    year: "2024",
    scope: "Design, supply and install aluminium dome",
    client: "Kerajaan Negeri Johor",
    mainContractor: "OKA Marketing Sdn Bhd",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-09.webp",
          width: 1200,
          height: 809,
          alt:
            "Three dark grey aluminium domes on the roof of a white building, with scaffolding along its walls",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/project-09-close.webp",
          width: 740,
          height: 1440,
          alt:
            "Dark grey aluminium dome with ribbed panel seams and a bulb finial, with two more domes beside it",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: true,
  },
  {
    id: "project-10",
    slug: "masjid-an-nur-glenmarie-dome-cladding",
    title: "Composite Panel Cladding to Existing Domes",
    category: "Dome Cladding",
    location: "Shah Alam, Selangor",
    year: "2025",
    scope: "Design, supply and install aluminium dome to existing GFRC dome",
    client: "Pentadbir Masjid An-Nur Temasya Glenmarie",
    mainContractor: "Teguh Perintis Sdn Bhd",
    gallery: [
      { kind: "far" },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-10.webp",
          width: 1080,
          height: 766,
          alt:
            "Clad mosque dome with calligraphy, lit in green at dusk beside a minaret",
        },
      },
      { kind: "interior" },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/project-10-detail.webp",
          width: 494,
          height: 960,
          alt:
            "Calligraphy on a clad dome lit green at dusk, beneath a crescent-and-star finial",
        },
      },
      { kind: "before" },
      { kind: "after" },
    ],
    featured: true,
  },
  {
    id: "project-11",
    slug: "masjid-jalan-bayu-damai-klang",
    title: "Masjid Jalan Bayu Damai",
    category: "Aluminium Dome",
    location: "Klang, Selangor",
    year: "2026",
    scope: "Design, supply and install aluminium dome",
    client: "SP Setia / Kota Bayuemas Sdn Bhd",
    mainContractor: "Canggih Kilat Sdn Bhd",
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/project-11-far.webp",
          width: 314,
          height: 608,
          alt:
            "Aerial view of the mosque with a grey aluminium dome on its roof, beside a road and trees",
        },
      },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-11.webp",
          width: 906,
          height: 608,
          alt:
            "Aerial view of a large grey aluminium dome with ribbed panels and a pinnacle on a mosque roof",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-12",
    slug: "maahad-tahfidz-sains-kuala-langat",
    title: "Maahad Tahfidz Sains",
    category: "Aluminium Dome",
    location: "Kuala Langat, Selangor",
    year: "2026",
    scope: "Design, supply and install aluminium dome",
    client: "Majlis Agama Islam Negeri Selangor",
    mainContractor: "Jutabina Sempurna Sdn Bhd",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-12.webp",
          width: 906,
          height: 608,
          alt:
            "Aerial view of a four-storey school block under construction with red roofs and gold domes at its corners",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/project-12-close.webp",
          width: 314,
          height: 608,
          alt:
            "Gold aluminium dome with a spire on a concrete base, against a blue sky",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-13",
    slug: "asrama-semai-bakti",
    title: "Asrama Semai Bakti",
    category: "Aluminium Windows",
    location: "Johor Bahru, Johor",
    year: "2026",
    scope: "Supply and install aluminium window",
    client: "Lembaga Kemajuan Tanah Persekutuan (FELDA)",
    mainContractor: "Mutual Premium Sdn Bhd",
    gallery: [
      { kind: "far" },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-13.webp",
          width: 1200,
          height: 851,
          alt:
            "Hostel building facade with dark aluminium window frames and orange cladding trim",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/project-13-progress.webp",
          width: 509,
          height: 988,
          alt:
            "Dark aluminium window frames being installed behind scaffolding, below an orange cladding band",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-14",
    slug: "masjid-taman-bayu-damai-pengerang",
    title: "Masjid Taman Bayu Damai",
    category: "Aluminium Dome",
    location: "Pengerang, Johor",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "JKR Johor",
    mainContractor: "AHA Gemilang Enterprise / QNE Teguh Sdn Bhd",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/project-14.webp",
          width: 888,
          height: 600,
          alt:
            "Dark grey aluminium dome with a gold finial on a white tower being installed with a crane",
        },
      },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/project-14-progress.webp",
          width: 308,
          height: 600,
          alt:
            "Worker fitting a gold crescent finial on a dark grey aluminium dome atop a white tower",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-15",
    slug: "kompleks-masjid-duyong",
    title: "Kompleks Masjid",
    category: "Dome & Windows",
    location: "Duyong, Melaka",
    year: "2026",
    scope: "Supply and install aluminium dome and window",
    client: "ICU JPM",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/project-15-far.webp",
          width: 307,
          height: 600,
          alt:
            "Aerial view of a gold aluminium dome on a mosque roof, with the surrounding town behind",
        },
      },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-15.webp",
          width: 888,
          height: 600,
          alt:
            "Gold aluminium dome with a pinnacle and crescent on a concrete plinth, with houses and trees behind",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-16",
    slug: "masjid-kampung-baru-kemaman",
    title: "Masjid Kampung Baru",
    category: "Aluminium Dome",
    location: "Kemaman, Terengganu",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "JKR Terengganu",
    mainContractor: "Zulqarnain Sdn Bhd",
    gallery: [
      { kind: "far" },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
      {
        kind: "progress",
        cover: true,
        photo: {
          src: "/images/projects/project-16.webp",
          width: 888,
          height: 600,
          alt:
            "Gold aluminium dome surrounded by scaffolding on a roof, with forested hills behind",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/project-16-progress.webp",
          width: 308,
          height: 600,
          alt:
            "Top-down view of scaffolding boards over the crown ring of a gold aluminium dome under construction",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-17",
    slug: "senai-cargo-warehouse-fencing",
    title: "Perimeter Fencing for Cargo Warehouse",
    category: "Perimeter Fencing",
    location: "Senai, Johor",
    year: "2026",
    scope: "Supply and install perimeter fence",
    client: "Senai Airport Terminal Services Sdn Bhd",
    mainContractor: "Anylink Holding Sdn Bhd",
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/project-17-far.webp",
          width: 509,
          height: 988,
          alt:
            "Inside the cargo warehouse: the corner of the mesh perimeter fence beside electrical cabinets",
        },
      },
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/project-17.webp",
          width: 1200,
          height: 851,
          alt:
            "Interior of a cargo warehouse with a perimeter fence of white-framed mesh panels",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-18",
    slug: "tanjung-aru-public-facilities",
    title: "Proposed Public Facilities, Landscape and Restoration",
    category: "Aluminium Dome",
    location: "Kota Kinabalu, Sabah",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "Tanjung Aru Eco Development Sdn Bhd",
    mainContractor: "MP Perdana Sdn Bhd",
    // TODO_CONFIRM: the portfolio shows an architectural drawing for this
    // project, not a site photo. Replace with a photo when available.
    gallery: [
      { kind: "far" },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
      {
        kind: "drawing",
        cover: true,
        photo: {
          src: "/images/projects/project-18.webp",
          width: 977,
          height: 547,
          alt:
            "Architectural elevation drawing of a domed public building with grid references and dimensions",
        },
      },
      {
        kind: "drawing",
        photo: {
          src: "/images/projects/project-18-drawing.webp",
          width: 689,
          height: 374,
          alt:
            "Front elevation drawing of the domed building, with a scalloped parapet and arched windows",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-19",
    slug: "majlis-agama-islam-johor",
    title: "Majlis Agama Islam",
    category: "Aluminium Dome",
    location: "Johor Bahru, Johor",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "Majlis Agama Islam Johor",
    mainContractor: "OKA Marketing Sdn Bhd",
    // TODO_CONFIRM: the portfolio shows an architectural drawing for this
    // project, not a site photo. Replace with a photo when available.
    gallery: [
      { kind: "far" },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
      {
        kind: "drawing",
        cover: true,
        photo: {
          src: "/images/projects/project-19.webp",
          width: 1097,
          height: 573,
          alt:
            "Architectural elevation drawing of a multi-storey building with an arched ground floor and a tiled roof",
        },
      },
      {
        kind: "drawing",
        photo: {
          src: "/images/projects/project-19-drawing.webp",
          width: 813,
          height: 573,
          alt:
            "Side elevation drawing of the building's arched ground floor and gabled upper storeys, with construction notes",
        },
      },
    ],
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
  // Copy for the per-project detail pages (/projects/<slug>).
  projectPage: {
    galleryHeading: "Project photos",
    beforeAfterHeading: "Before & after",
    comingSoon: "Photo coming soon",
    backLabel: "All projects",
    prevLabel: "Previous project",
    nextLabel: "Next project",
    viewProject: "View project",
    ctaTitle: "Planning a similar project?",
    shotLabels: {
      far: { en: "Wide view", ms: "Pandangan jauh" },
      close: { en: "Close-up", ms: "Pandangan dekat" },
      interior: { en: "Interior view", ms: "Pandangan dalam" },
      detail: { en: "Pattern detail", ms: "Detail corak" },
      progress: { en: "During construction", ms: "Semasa pembinaan" },
      before: { en: "Before", ms: "Sebelum" },
      after: { en: "After", ms: "Selepas" },
      drawing: { en: "Drawing", ms: "Lukisan" },
    } satisfies Record<ShotKind, { en: string; ms: string }>,
  },
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
  // Names verbatim from the portfolio's project experience summary (PDF p3);
  // logos are cut from that same page and trimmed to their content, so
  // width/height are the files' real pixel sizes (used for optical sizing).
  // Clients that share a logo are listed together under it, so each logo
  // shows once. `wide` gives a tile two grid columns: JKR for its five
  // offices, KPRJ and Tanjung Aru for their wide wordmarks. The tile counts
  // (6, 6, 4 grid cells) fill whole rows at 2, 3 and 6 columns.
  clientGroups: [
    {
      category: "Federal Government",
      organisations: [
        {
          logo: { src: "/images/clients/jkr.webp", width: 214, height: 160 },
          wide: true,
          clients: [
            "JKR Johor",
            "JKR Negeri Sembilan",
            "JKR Pahang",
            "Pejabat Pembangunan Negeri Pahang, JKR Raub",
            "JKR Terengganu",
          ],
        },
        {
          logo: { src: "/images/clients/kkr.webp", width: 152, height: 121 },
          clients: ["Kementerian Kerja Raya Malaysia"],
        },
        {
          logo: { src: "/images/clients/icu-jpm.webp", width: 147, height: 103 },
          clients: [
            "ICU Jabatan Perdana Menteri",
            "Pentadbir Masjid An-Nur Temasya Glenmarie / ICU JPM",
          ],
        },
        {
          logo: { src: "/images/clients/felda.webp", width: 126, height: 160 },
          clients: ["Lembaga Kemajuan Tanah Persekutuan (FELDA)"],
        },
        {
          logo: { src: "/images/clients/upnm.webp", width: 153, height: 153 },
          clients: ["Mindef / UPNM"],
        },
      ],
    },
    {
      category: "State Government & Religious Authorities",
      organisations: [
        {
          logo: { src: "/images/clients/jais.webp", width: 138, height: 152 },
          clients: ["Jabatan Agama Islam Selangor"],
        },
        {
          logo: { src: "/images/clients/mais.webp", width: 102, height: 151 },
          clients: ["Majlis Agama Islam Negeri Selangor / JKR Kuala Langat"],
        },
        {
          logo: { src: "/images/clients/jain-johor.webp", width: 191, height: 160 },
          clients: ["Majlis Agama Islam Negeri Johor, JKR Johor"],
        },
        {
          logo: { src: "/images/clients/mbpg.webp", width: 184, height: 160 },
          clients: ["Kerajaan Negeri Johor / MBPG Pasir Gudang"],
        },
        {
          logo: { src: "/images/clients/jheains.webp", width: 280, height: 160 },
          clients: ["JHEINS, JKR Negeri Sembilan"],
        },
        {
          logo: { src: "/images/clients/al-falah.webp", width: 124, height: 137 },
          clients: ["Yayasan Al-Falah, Perak"],
        },
      ],
    },
    {
      category: "Private Sector",
      organisations: [
        {
          logo: { src: "/images/clients/kprj.webp", width: 303, height: 72 },
          wide: true,
          clients: ["Majlis Agama Islam Johor / JKR Johor / KPRJ E&C Sdn Bhd"],
        },
        {
          logo: { src: "/images/clients/setia-bayuemas.webp", width: 215, height: 92 },
          clients: ["SP Setia / Kota Bayuemas Sdn Bhd"],
        },
        {
          logo: { src: "/images/clients/tanjung-aru.webp", width: 320, height: 146 },
          wide: true,
          clients: ["Tanjung Aru Eco Development Sdn Bhd"],
        },
        {
          logo: { src: "/images/clients/senai-airport.webp", width: 320, height: 80 },
          clients: ["Senai Airport Terminal Services Sdn Bhd"],
        },
      ],
    },
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
