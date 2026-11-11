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
  hours: "Monday to Saturday, 9:00 AM to 6:00 PM (closed Sunday)",
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
  // Pre-filled subject for the "Email Us" button on the contact page.
  emailSubject: "Project enquiry",
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
  /** Omitted when the year is not confirmed. */
  year?: string;
  scope: string;
  /** Omitted when the client is not confirmed. */
  client?: string;
  /** Omitted when the main contractor is not confirmed ("TBC" in the portfolio). */
  mainContractor?: string;
  /** Real photos plus a placeholder for any core kind still missing, with
   * exactly one cover (see lib/gallery.ts). */
  gallery: readonly GallerySlot[];
  featured: boolean;
}

// Projects 01-19 come from the client's portfolio PDF, in portfolio order;
// 20 arrived later with the docs/Website photo folders, and 21-26 with
// docs/update. Names, categories and photos follow those folders (see README
// "Images and logos"). 18 and 19 have no folder yet, so they still show the
// portfolio's drawings. Every location must end with its state: the
// "States Served" stat counts the last part of each one.
const projects: readonly Project[] = [
  {
    id: "project-01",
    slug: "masjid-wadi-hassan-johor-bahru",
    title: "Masjid Wadi Hassan",
    category: "Supply and Install Aluminium Dome",
    location: "Johor Bahru, Johor",
    year: "2020",
    scope: "Supply and install aluminium dome",
    client: "Majlis Agama Islam Negeri Johor, JKR Johor",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    gallery: [
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/masjid-wadi-hassan-johor-bahru/project-01-02.webp",
          width: 1440,
          height: 810,
          alt: "Gold aluminium dome clad in overlapping scale-shaped panels, seen from above with the highway behind",
        },
      },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/masjid-wadi-hassan-johor-bahru/project-01-detail.webp",
          width: 518,
          height: 1007,
          alt:
            "Overlapping scale-shaped aluminium panels on a small dome with a gold finial, with the main dome behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-wadi-hassan-johor-bahru/project-01-01.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of Masjid Wadi Hassan's white prayer hall with two gold scale-clad domes and a minaret, beside a highway",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-wadi-hassan-johor-bahru/project-01-04.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of the mosque and its car park between the highway and the river",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-wadi-hassan-johor-bahru/project-01-05.webp",
          width: 1440,
          height: 810,
          alt: "The mosque from a distance with the Johor Bahru skyline behind",
        },
      },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/masjid-wadi-hassan-johor-bahru/project-01-03.webp",
          width: 1440,
          height: 810,
          alt: "Smaller scale-clad gold dome in front of the main dome, framed by the building's arched windows",
        },
      },
      { kind: "interior" },
    ],
    featured: true,
  },
  {
    id: "project-02",
    slug: "masjid-tuminah-hamidi-bagan-datuk",
    title: "Masjid Tuminah Hamidi",
    category: "Supply and Install Aluminium Dome",
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
          src: "/images/projects/masjid-tuminah-hamidi-bagan-datuk/project-02-01.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of Masjid Tuminah Hamidi, a white mosque with blue domes and two minarets, standing in the river",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-tuminah-hamidi-bagan-datuk/project-02-close.webp",
          width: 554,
          height: 1078,
          alt:
            "Minaret with calligraphy panels in front of the mosque's blue aluminium dome",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-tuminah-hamidi-bagan-datuk/project-02-02.webp",
          width: 1440,
          height: 810,
          alt: "The mosque from the landward side, with a roundabout and a paved walkway leading out across the water",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-03",
    slug: "masjid-seremban-selatan",
    title: "Masjid Seremban Selatan",
    category: "Supply and Install Aluminium Dome",
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
          src: "/images/projects/masjid-seremban-selatan/project-03-01.webp",
          width: 1440,
          height: 810,
          alt: "Geodesic aluminium dome with triangular glazed panels on the roof of Masjid Seremban Selatan",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-seremban-selatan/project-03-close.webp",
          width: 518,
          height: 1007,
          alt:
            "Triangulated dome framework with protective film still on its glazed panels, on a concrete roof",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-seremban-selatan/project-03-03.webp",
          width: 1440,
          height: 810,
          alt: "Top-down view of the glazed dome on the flat roof beside green metal roofing",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-seremban-selatan/project-03-02.webp",
          width: 1440,
          height: 810,
          alt: "Triangulated glazed dome on the concrete roof, with earthworks and hills behind",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: true,
  },
  {
    id: "project-04",
    slug: "masjid-kg-tok-machang-raub",
    title: "Masjid Kg Tok Machang",
    category: "Supply and Install Aluminium Dome",
    location: "Ulu Gali, Raub, Pahang",
    year: "2023",
    scope: "Supply and install aluminium dome",
    client: "JKR Raub",
    mainContractor: "Mercu Buana (M) Sdn Bhd",
    gallery: [
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04.webp",
          width: 1200,
          height: 806,
          alt:
            "Gold aluminium dome with ribbed panel seams on a concrete roof, beside minaret scaffolding and limestone hills",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04-progress.webp",
          width: 518,
          height: 1007,
          alt:
            "Worker on scaffolding beside a tall gold aluminium pinnacle being fitted onto a concrete minaret base",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04-02.webp",
          width: 1440,
          height: 810,
          alt: "Gold aluminium dome and finial on the roof, with the scaffolded minaret and limestone hills behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04-01.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of Masjid Kg Tok Machang under construction, with its gold dome and a minaret in scaffolding",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04-03.webp",
          width: 1440,
          height: 810,
          alt: "Gold dome on the mosque roof against limestone hills and palm trees",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04-04.webp",
          width: 1440,
          height: 810,
          alt: "Workers fitting the gold aluminium dome, one at the finial on top",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04-05.webp",
          width: 1440,
          height: 810,
          alt: "Crane beside the minaret as the gold pinnacle is lifted into place",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-tok-machang-raub/project-04-06.webp",
          width: 1280,
          height: 960,
          alt: "Dome and pinnacle assembled on the ground before lifting, the dome still in protective film",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-05",
    slug: "masjid-taman-saga-mentakab",
    title: "Masjid Taman Saga",
    category: "Supply and Install Aluminium Dome",
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
          src: "/images/projects/masjid-taman-saga-mentakab/project-05-02.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of the red-roofed mosque and its gold dome, with the town behind",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-taman-saga-mentakab/project-05-03.webp",
          width: 1440,
          height: 810,
          alt: "Ribbed gold aluminium dome with finial on the roof, overlooking a pond",
        },
      },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/masjid-taman-saga-mentakab/project-05-detail.webp",
          width: 398,
          height: 774,
          alt:
            "Ribbed gold aluminium dome rising to a tall pointed finial, with forested hills behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-taman-saga-mentakab/project-05-01.webp",
          width: 1440,
          height: 810,
          alt: "Masjid Taman Saga, a red-roofed mosque with a gold dome, seen across the construction site",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-taman-saga-mentakab/project-05-04.webp",
          width: 1440,
          height: 810,
          alt: "Gold dome with a crescent finial on the flat roof, with neighbouring buildings behind",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-taman-saga-mentakab/project-05-05.webp",
          width: 1280,
          height: 960,
          alt: "Workers assembling the aluminium dome frame on the ground",
        },
      },
      { kind: "interior" },
    ],
    featured: false,
  },
  {
    id: "project-06",
    slug: "masjid-kendong",
    title: "Masjid Kendong",
    category: "Supply and Install Aluminium Dome",
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
          src: "/images/projects/masjid-kendong/project-06.webp",
          width: 1022,
          height: 720,
          alt:
            "Aerial view of a mosque under construction with a green aluminium pinnacle on a white minaret tower",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kendong/project-06-progress.webp",
          width: 370,
          height: 720,
          alt:
            "Crane lifting a green aluminium dome onto a white minaret while a harnessed worker guides it",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-kendong/project-06-03.webp",
          width: 1280,
          height: 720,
          alt: "Aerial view of Masjid Kendong with its green-domed minaret, the grounds still under construction",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kendong/project-06-01.webp",
          width: 1280,
          height: 720,
          alt: "Crane lifting the green aluminium dome onto the minaret of Masjid Kendong",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kendong/project-06-02.webp",
          width: 1280,
          height: 720,
          alt: "Crane beside the mosque as the green dome is set on its minaret",
        },
      },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-07",
    slug: "masjid-muhammad-al-fateh",
    title: "Masjid Muhammad Al-Fateh",
    category: "Supply and Install Aluminium Dome",
    location: "Taman Forest Height, Senawang, Negeri Sembilan",
    year: "2024",
    scope: "Design, supply and install aluminium dome",
    client: "JKR Negeri Sembilan",
    // TODO_CONFIRM: main contractor is not stated in the portfolio, so omitted.
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-far.webp",
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
          src: "/images/projects/masjid-muhammad-al-fateh/project-07.webp",
          width: 1200,
          height: 846,
          alt:
            "Green aluminium dome with a white lattice trim band and gold finial on a white base, with a minaret beside it",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-01.webp",
          width: 1440,
          height: 810,
          alt: "Green aluminium dome with white lattice trim and a gold finial, beside the white minaret",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-02.webp",
          width: 1080,
          height: 608,
          alt: "Front of Masjid Muhammad Al-Fateh with its green dome and tall white minaret",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-03.webp",
          width: 1080,
          height: 608,
          alt: "Aerial view of the mosque complex and car park, with the green dome at its centre",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-04.webp",
          width: 1440,
          height: 810,
          alt: "Aluminium dome frame assembled on the ground before cladding",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-05.webp",
          width: 1440,
          height: 810,
          alt: "The mosque under construction, with a silver dome frame on the roof and the minaret in scaffolding",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-06.webp",
          width: 1440,
          height: 810,
          alt: "Green dome being fitted on top of the minaret, wrapped in green safety netting",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-muhammad-al-fateh/project-07-07.webp",
          width: 1440,
          height: 810,
          alt: "Minaret top with its green dome being installed, the main dome frame behind",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: true,
  },
  {
    id: "project-08",
    slug: "kompleks-pentadbiran-kerajaan-persekutuan-sabah",
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
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08.webp",
          width: 1072,
          height: 720,
          alt: "Workers on a scaffold tower refurbishing the dome panels",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-close.webp",
          width: 371,
          height: 720,
          alt:
            "Workers on ropes refurbishing the panels of a large teal aluminium dome",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-03.webp",
          width: 1440,
          height: 810,
          alt: "Pale green dome from above, with the complex's main dome and car park behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-04.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of the curved administration complex and its green domes",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-07.webp",
          width: 1440,
          height: 810,
          alt: "Pale green dome in front of the multi-storey administration building",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-01.webp",
          width: 1280,
          height: 720,
          alt: "Rope-access workers refurbishing the teal dome of Kompleks Pentadbiran Kerajaan Persekutuan Sabah",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-02.webp",
          width: 686,
          height: 386,
          alt: "Refurbished teal aluminium domes with mountains behind",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-08.webp",
          width: 1440,
          height: 810,
          alt: "Streaked teal dome with its finial, mountains on the horizon",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-10.webp",
          width: 691,
          height: 389,
          alt: "Refurbished teal dome above a smaller half-dome on the roof, beside a clock tower",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-05.webp",
          width: 1440,
          height: 810,
          alt: "Dome with weathered, streaked panels above its ring beam, before re-cladding",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-pentadbiran-kerajaan-persekutuan-sabah/project-08-06.webp",
          width: 1440,
          height: 810,
          alt: "Weathered teal dome above the ring beam, with the highway and river behind",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: true,
  },
  {
    id: "project-09",
    slug: "tunku-mahkota-ismail-youth-club-pasir-gudang",
    title: "Tunku Mahkota Ismail Youth Club",
    category: "Supply and Install Aluminium Dome",
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
          src: "/images/projects/tunku-mahkota-ismail-youth-club-pasir-gudang/project-09.webp",
          width: 1200,
          height: 809,
          alt:
            "Three dark grey aluminium domes on the roof of a white building, with scaffolding along its walls",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/tunku-mahkota-ismail-youth-club-pasir-gudang/project-09-close.webp",
          width: 740,
          height: 1440,
          alt:
            "Dark grey aluminium dome with ribbed panel seams and a bulb finial, with two more domes beside it",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/tunku-mahkota-ismail-youth-club-pasir-gudang/project-09-03.webp",
          width: 1440,
          height: 810,
          alt: "Row of three ribbed dark grey domes along the roof edge",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/tunku-mahkota-ismail-youth-club-pasir-gudang/project-09-01.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of the Tunku Mahkota Ismail Youth Club site, with three dark domes on the roof and a minaret in scaffolding",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/tunku-mahkota-ismail-youth-club-pasir-gudang/project-09-04.webp",
          width: 1440,
          height: 810,
          alt: "Wide view of the building with domes at both ends and the scaffolded minaret in the middle",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/tunku-mahkota-ismail-youth-club-pasir-gudang/project-09-02.webp",
          width: 1440,
          height: 810,
          alt: "Three dark grey aluminium domes on the rooftop, the minaret wrapped in green netting behind",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/tunku-mahkota-ismail-youth-club-pasir-gudang/project-09-05.webp",
          width: 1440,
          height: 810,
          alt: "Dome frame on top of the minaret inside scaffolding and safety netting",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: true,
  },
  {
    id: "project-10",
    slug: "masjid-an-nur-temasya-glenmarie",
    title: "Masjid An-Nur Temasya Glenmarie",
    category: "Supply and Install Aluminium Dome",
    location: "Shah Alam, Selangor",
    year: "2025",
    scope: "Design, supply and install aluminium dome to existing GFRC dome",
    client: "Pentadbir Masjid An-Nur Temasya Glenmarie",
    mainContractor: "Teguh Perintis Sdn Bhd",
    gallery: [
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10.webp",
          width: 1080,
          height: 766,
          alt:
            "Clad mosque dome with calligraphy, lit in green at dusk beside a minaret",
        },
      },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-detail.webp",
          width: 494,
          height: 960,
          alt:
            "Calligraphy on a clad dome lit green at dusk, beneath a crescent-and-star finial",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-01.webp",
          width: 1440,
          height: 1080,
          alt: "White Masjid An-Nur with its silver-white dome and calligraphy band, beside a minaret",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-02.webp",
          width: 1440,
          height: 1080,
          alt: "Masjid An-Nur's courtyard with its two white domes and arched colonnade",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-03.webp",
          width: 1440,
          height: 1080,
          alt: "The mosque's domes framed through an arched opening at dusk",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-04.webp",
          width: 1280,
          height: 960,
          alt: "White aluminium-clad dome with a calligraphy band, workers on the roof",
        },
      },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-09.webp",
          width: 810,
          height: 1080,
          alt: "White pinnacle beside the dome's calligraphy panels",
        },
      },
      {
        kind: "interior",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-05.webp",
          width: 1280,
          height: 960,
          alt: "Inside the dome: aluminium frame ribs with a scaffold tower in the middle",
        },
      },
      {
        kind: "interior",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-06.webp",
          width: 1440,
          height: 1080,
          alt: "Looking up into the dome frame, with ribs radiating from the crown",
        },
      },
      {
        kind: "interior",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-07.webp",
          width: 1440,
          height: 1080,
          alt: "Inside the dome looking up, frame ribs and cladding panels against the sky",
        },
      },
      {
        kind: "interior",
        photo: {
          src: "/images/projects/masjid-an-nur-temasya-glenmarie/project-10-08.webp",
          width: 1440,
          height: 1080,
          alt: "The dome frame from below, ribs meeting at the crown, workers at the top",
        },
      },
    ],
    featured: true,
  },
  {
    id: "project-11",
    slug: "masjid-setia-bayuemas-klang",
    title: "Masjid Setia Bayuemas",
    category: "Supply and Install Aluminium Dome",
    location: "Klang, Selangor",
    year: "2026",
    scope: "Design, supply and install aluminium dome",
    client: "SP Setia / Kota Bayuemas Sdn Bhd",
    mainContractor: "Canggih Kilat Sdn Bhd",
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-far.webp",
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
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11.webp",
          width: 906,
          height: 608,
          alt:
            "Aerial view of a large grey aluminium dome with ribbed panels and a pinnacle on a mosque roof",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-03.webp",
          width: 1080,
          height: 608,
          alt: "Ribbed grey aluminium dome on the flat roof",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-01.webp",
          width: 1080,
          height: 810,
          alt: "Masjid Setia Bayuemas from the roadside, with its grey dome and open-frame minaret",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-02.webp",
          width: 1080,
          height: 608,
          alt: "Aerial view of the mosque, its grey dome, car park and landscaped grounds",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-05.webp",
          width: 1080,
          height: 608,
          alt: "The mosque and minaret with new housing behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-06.webp",
          width: 1080,
          height: 608,
          alt: "The mosque with its minaret in the foreground, seen from above the car park",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-07.webp",
          width: 1080,
          height: 608,
          alt: "Front of the mosque and its grey dome, from the entrance driveway",
        },
      },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/masjid-setia-bayuemas-klang/project-11-04.webp",
          width: 810,
          height: 1080,
          alt: "Top of the open-frame steel minaret with its crescent finial",
        },
      },
      { kind: "interior" },
    ],
    featured: false,
  },
  {
    id: "project-12",
    slug: "maahad-tahfiz-sains-dan-teknologi-kuala-langat",
    title: "Maahad Tahfiz Sains dan Teknologi Istana Bandar",
    category: "Supply and Install Aluminium Dome",
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
          src: "/images/projects/maahad-tahfiz-sains-dan-teknologi-kuala-langat/project-12.webp",
          width: 906,
          height: 608,
          alt:
            "Aerial view of a four-storey school block under construction with red roofs and gold domes at its corners",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/maahad-tahfiz-sains-dan-teknologi-kuala-langat/project-12-close.webp",
          width: 314,
          height: 608,
          alt:
            "Gold aluminium dome with a spire on a concrete base, against a blue sky",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/maahad-tahfiz-sains-dan-teknologi-kuala-langat/project-12-03.webp",
          width: 1080,
          height: 608,
          alt: "Ribbed gold aluminium dome on the red tiled roof",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/maahad-tahfiz-sains-dan-teknologi-kuala-langat/project-12-01.webp",
          width: 1080,
          height: 608,
          alt: "Front of the Maahad Tahfiz building, with gold domes on the roof",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/maahad-tahfiz-sains-dan-teknologi-kuala-langat/project-12-02.webp",
          width: 1080,
          height: 608,
          alt: "Aerial view of the four-storey building with red roofs and gold domes at the corners",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/maahad-tahfiz-sains-dan-teknologi-kuala-langat/project-12-05.webp",
          width: 1080,
          height: 608,
          alt: "Aerial view of the building's inner courtyard, with gold domes on three corners",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/maahad-tahfiz-sains-dan-teknologi-kuala-langat/project-12-04.webp",
          width: 1080,
          height: 608,
          alt: "Gold dome with a pointed finial on its square roof base",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-13",
    slug: "asrama-semai-bakti-felda",
    title: "Asrama Semai Bakti (FELDA)",
    category: "Supply and Install Aluminium Window",
    location: "Johor Bahru, Johor",
    year: "2026",
    scope: "Supply and install aluminium window",
    client: "Lembaga Kemajuan Tanah Persekutuan (FELDA)",
    mainContractor: "Mutual Premium Sdn Bhd",
    gallery: [
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/asrama-semai-bakti-felda/project-13-04.webp",
          width: 1440,
          height: 1080,
          alt: "Upper-floor aluminium window frames inside the orange cladding frame",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/asrama-semai-bakti-felda/project-13-progress.webp",
          width: 509,
          height: 988,
          alt:
            "Dark aluminium window frames being installed behind scaffolding, below an orange cladding band",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/asrama-semai-bakti-felda/project-13-01.webp",
          width: 1440,
          height: 1080,
          alt: "Front of Asrama Semai Bakti with dark aluminium window frames and orange trim, scaffolding still up",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/asrama-semai-bakti-felda/project-13-02.webp",
          width: 1440,
          height: 1080,
          alt: "Ground-floor aluminium windows and glazed doors below the orange band",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/asrama-semai-bakti-felda/project-13-03.webp",
          width: 1440,
          height: 1080,
          alt: "Corner of the building with dark aluminium window frames on three floors",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-14",
    slug: "masjid-taman-bayu-damai-pengerang",
    title: "Masjid Taman Bayu Damai",
    category: "Supply and Install Aluminium Dome",
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
          src: "/images/projects/masjid-taman-bayu-damai-pengerang/project-14-02.webp",
          width: 1080,
          height: 608,
          alt: "Crane lifting the dark grey dome onto the minaret beside the two-storey mosque",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-taman-bayu-damai-pengerang/project-14-progress.webp",
          width: 308,
          height: 600,
          alt:
            "Worker fitting a gold crescent finial on a dark grey aluminium dome atop a white tower",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-taman-bayu-damai-pengerang/project-14-01.webp",
          width: 1080,
          height: 608,
          alt: "Crane beside the minaret as its dark grey dome is installed, a housing estate behind",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-taman-bayu-damai-pengerang/project-14-03.webp",
          width: 1080,
          height: 608,
          alt: "Mobile crane on site lifting the minaret dome, red-roofed houses behind",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-taman-bayu-damai-pengerang/project-14-04.webp",
          width: 1080,
          height: 608,
          alt: "Worker fixing the dark grey dome and finial on top of the minaret",
        },
      },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-15",
    slug: "masjid-laksamana-hang-tuah-melaka",
    title: "Masjid Laksamana Hang Tuah",
    category: "Supply and Install Aluminium Dome",
    location: "Duyong, Melaka",
    year: "2026",
    scope: "Supply and install aluminium dome and window",
    client: "ICU JPM",
    mainContractor: "Nobel Energy Construction Sdn Bhd",
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-laksamana-hang-tuah-melaka/project-15-far.webp",
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
          src: "/images/projects/masjid-laksamana-hang-tuah-melaka/project-15.webp",
          width: 888,
          height: 600,
          alt:
            "Gold aluminium dome with a pinnacle and crescent on a concrete plinth, with houses and trees behind",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-laksamana-hang-tuah-melaka/project-15-01.webp",
          width: 1080,
          height: 608,
          alt: "Ribbed gold dome on the roof of Masjid Laksamana Hang Tuah, the town behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-laksamana-hang-tuah-melaka/project-15-03.webp",
          width: 1080,
          height: 608,
          alt: "Aerial view of the mosque with its gold dome and minaret among nearby houses",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-laksamana-hang-tuah-melaka/project-15-04.webp",
          width: 1080,
          height: 608,
          alt: "The mosque from above: the gold dome, red tiled roof and a white minaret",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-laksamana-hang-tuah-melaka/project-15-02.webp",
          width: 1080,
          height: 608,
          alt: "Gold aluminium dome with a pointed finial, with trees and a road behind",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-16",
    slug: "masjid-kg-baru-kertih",
    title: "Masjid Kg Baru Kertih",
    category: "Supply and Install Aluminium Dome",
    location: "Kertih, Kemaman, Terengganu",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "JKR Terengganu",
    mainContractor: "Zulqarnain Sdn Bhd",
    gallery: [
      {
        kind: "progress",
        cover: true,
        photo: {
          src: "/images/projects/masjid-kg-baru-kertih/project-16.webp",
          width: 888,
          height: 600,
          alt:
            "Gold aluminium dome surrounded by scaffolding on a roof, with forested hills behind",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-baru-kertih/project-16-progress.webp",
          width: 308,
          height: 600,
          alt:
            "Top-down view of scaffolding boards over the crown ring of a gold aluminium dome under construction",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-baru-kertih/project-16-01.webp",
          width: 1440,
          height: 810,
          alt: "Gold dome of Masjid Kg Baru Kertih inside scaffolding, workers at the finial",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-kg-baru-kertih/project-16-05.webp",
          width: 1440,
          height: 810,
          alt: "Close view of the gold dome's panels, a worker at the finial and scaffolding around",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-baru-kertih/project-16-03.webp",
          width: 1440,
          height: 810,
          alt: "Workers on scaffolding beside the gold dome, seen from above",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-baru-kertih/project-16-04.webp",
          width: 1440,
          height: 810,
          alt: "Scaffolding around the gold dome on the roof, seen from above",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-kg-baru-kertih/project-16-06.webp",
          width: 1440,
          height: 810,
          alt: "The gold dome in scaffolding, with the cleared site and forest behind",
        },
      },
      { kind: "far" },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-17",
    slug: "senai-airport-warehouse",
    title: "Senai Airport Warehouse",
    category: "Metal Work",
    location: "Senai, Johor",
    year: "2026",
    scope: "Supply and install perimeter fence",
    client: "Senai Airport Terminal Services Sdn Bhd",
    mainContractor: "Anylink Holding Sdn Bhd",
    gallery: [
      {
        kind: "far",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-far.webp",
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
          src: "/images/projects/senai-airport-warehouse/project-17-08.webp",
          width: 1440,
          height: 1080,
          alt: "Fenced area along the warehouse wall, with a cone at the corner",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-03.webp",
          width: 1440,
          height: 1080,
          alt: "Long run of white-framed mesh fencing across the warehouse floor",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-02.webp",
          width: 1440,
          height: 1080,
          alt: "Mesh fence enclosure along the warehouse floor, the open hangar door behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-04.webp",
          width: 1440,
          height: 1080,
          alt: "Fenced enclosure in the warehouse with stacked boxes beside it",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-05.webp",
          width: 1440,
          height: 1080,
          alt: "Mesh fence line leading toward the open warehouse door",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-07.webp",
          width: 1440,
          height: 1080,
          alt: "Completed fenced enclosure with safety cones at its entrance",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-01.webp",
          width: 1440,
          height: 1080,
          alt: "White-framed mesh fence panels being installed inside the cargo warehouse",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-06.webp",
          width: 1440,
          height: 1080,
          alt: "Worker on a mobile scaffold fixing the top of the fence frame",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/senai-airport-warehouse/project-17-09.webp",
          width: 1440,
          height: 1080,
          alt: "Workers fitting a mesh gate panel, one on a ladder",
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
    category: "Supply and Install Aluminium Dome",
    location: "Kota Kinabalu, Sabah",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "Tanjung Aru Eco Development Sdn Bhd",
    mainContractor: "MP Perdana Sdn Bhd",
    // TODO_CONFIRM: the portfolio shows an architectural drawing for this
    // project, not a site photo. Replace with a photo when available.
    gallery: [
      {
        kind: "drawing",
        cover: true,
        photo: {
          src: "/images/projects/tanjung-aru-public-facilities/project-18.webp",
          width: 977,
          height: 547,
          alt:
            "Architectural elevation drawing of a domed public building with grid references and dimensions",
        },
      },
      {
        kind: "drawing",
        photo: {
          src: "/images/projects/tanjung-aru-public-facilities/project-18-drawing.webp",
          width: 689,
          height: 374,
          alt:
            "Front elevation drawing of the domed building, with a scalloped parapet and arched windows",
        },
      },
      { kind: "far" },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-19",
    slug: "majlis-agama-islam-johor",
    title: "Majlis Agama Islam",
    category: "Supply and Install Aluminium Dome",
    location: "Johor Bahru, Johor",
    year: "2026",
    scope: "Supply and install aluminium dome",
    client: "Majlis Agama Islam Johor",
    mainContractor: "OKA Marketing Sdn Bhd",
    // TODO_CONFIRM: the portfolio shows an architectural drawing for this
    // project, not a site photo. Replace with a photo when available.
    gallery: [
      {
        kind: "drawing",
        cover: true,
        photo: {
          src: "/images/projects/majlis-agama-islam-johor/project-19.webp",
          width: 1097,
          height: 573,
          alt:
            "Architectural elevation drawing of a multi-storey building with an arched ground floor and a tiled roof",
        },
      },
      {
        kind: "drawing",
        photo: {
          src: "/images/projects/majlis-agama-islam-johor/project-19-drawing.webp",
          width: 813,
          height: 573,
          alt:
            "Side elevation drawing of the building's arched ground floor and gabled upper storeys, with construction notes",
        },
      },
      { kind: "far" },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-20",
    slug: "masjid-jumhuriyyah-taman-datuk-haron",
    title: "Masjid Jumhuriyyah",
    category: "Dome Refurbishment",
    // TODO_CONFIRM: location, year (taken from the photo dates) and client
    // are not in the portfolio; this project only arrived with the photos.
    location: "Taman Datuk Haron, Petaling Jaya, Selangor",
    year: "2022",
    scope: "Dome refurbishment",
    gallery: [
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-06.webp",
          width: 1440,
          height: 810,
          alt: "The gold dome from the side, with the minaret and city behind",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-03.webp",
          width: 1440,
          height: 810,
          alt: "Aerial view of the mosque's dome and minaret above the surrounding rooftops, workers at the dome base",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-02.webp",
          width: 1440,
          height: 810,
          alt: "Partly re-clad dome with its blue zigzag band, the city skyline behind",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-05.webp",
          width: 1440,
          height: 810,
          alt: "Re-clad gold dome with its blue zigzag band and crescent finial",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-01.webp",
          width: 1440,
          height: 810,
          alt: "Masjid Jumhuriyyah's dome mid-refurbishment, half re-clad in gold beside the old panels",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-04.webp",
          width: 1440,
          height: 810,
          alt: "Weathered silver and gold dome before re-cladding, beside a gold minaret top",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-07.webp",
          width: 1440,
          height: 810,
          alt: "Crane lifting the gold minaret cap into place",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-08.webp",
          width: 1440,
          height: 810,
          alt: "Crane at the minaret as its gold cap is fitted, the re-clad dome beside it",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-jumhuriyyah-taman-datuk-haron/project-20-09.webp",
          width: 1440,
          height: 810,
          alt: "Worker on a ladder fixing new gold panels over the old dome cladding",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-21",
    slug: "kompleks-ibu-pejabat-mahkamah-syariah-pahang",
    title: "Kompleks Ibu Pejabat Mahkamah Syariah Pahang",
    // TODO_CONFIRM: category, scope, year and client. Only photos arrived
    // (docs/update), so the year and client are left out.
    category: "Supply and Install Aluminium Dome",
    location: "Pahang",
    scope: "Supply and install aluminium dome",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/kompleks-ibu-pejabat-mahkamah-syariah-pahang/project-21-01.webp",
          width: 1080,
          height: 810,
          alt: "Aerial view of the completed court complex with its large gold main dome and two smaller gold domes",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/kompleks-ibu-pejabat-mahkamah-syariah-pahang/project-21-02.webp",
          width: 960,
          height: 720,
          alt: "Aluminium dome frames standing on the roof while the building is still wrapped in scaffolding",
        },
      },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-22",
    slug: "kompleks-islam-daerah-kuala-selangor",
    title: "Kompleks Islam Daerah Kuala Selangor",
    // TODO_CONFIRM: category, scope, year and client. Only photos arrived
    // (docs/update), so the year and client are left out.
    category: "Supply and Install Aluminium Dome",
    location: "Kuala Selangor, Selangor",
    scope: "Supply and install aluminium dome",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/kompleks-islam-daerah-kuala-selangor/project-22-01.webp",
          width: 1440,
          height: 820,
          alt: "Front of the complex with its gold dome rising above the central entrance block",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/kompleks-islam-daerah-kuala-selangor/project-22-02.webp",
          width: 1440,
          height: 1435,
          alt: "Aerial view of the gold dome over the central block, between green roofs",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-23",
    slug: "masjid-al-falah-shah-alam",
    title: "Masjid Al Falah",
    // TODO_CONFIRM: category, scope, year and client. Only photos arrived
    // (docs/update), so the year and client are left out.
    category: "Supply and Install Aluminium Dome",
    location: "Shah Alam, Selangor",
    scope: "Supply and install aluminium dome",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/masjid-al-falah-shah-alam/project-23-01.webp",
          width: 960,
          height: 640,
          alt: "Masjid Al Falah with its gold dome and tall minaret",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-al-falah-shah-alam/project-23-02.webp",
          width: 1440,
          height: 1920,
          alt: "Inside the dome during construction, scaffolding below the patterned ceiling",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-al-falah-shah-alam/project-23-03.webp",
          width: 1440,
          height: 1920,
          alt: "Finished gold dome while the minaret is still under scaffolding",
        },
      },
      { kind: "close" },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-24",
    slug: "masjid-al-badr-pulau-pangkor",
    title: "Masjid Al-Badr (1000 Selawat)",
    // TODO_CONFIRM: category, scope, year and client. Only photos arrived
    // (docs/update), so the year and client are left out.
    category: "Supply and Install Aluminium Dome",
    location: "Pulau Pangkor, Perak",
    scope: "Supply and install aluminium dome",
    gallery: [
      {
        kind: "close",
        cover: true,
        photo: {
          src: "/images/projects/masjid-al-badr-pulau-pangkor/project-24-01.webp",
          width: 1280,
          height: 720,
          alt: "Masjid Al-Badr on stilts over the sea, its blue patterned dome beside the minaret",
        },
      },
      {
        kind: "interior",
        photo: {
          src: "/images/projects/masjid-al-badr-pulau-pangkor/project-24-03.webp",
          width: 960,
          height: 1280,
          alt: "Underside of the dome, patterned in blue and gold with calligraphy around the rim",
        },
      },
      {
        kind: "detail",
        photo: {
          src: "/images/projects/masjid-al-badr-pulau-pangkor/project-24-04.webp",
          width: 461,
          height: 665,
          alt: "Blue dome with white pattern and a gold band, the minaret behind it",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-al-badr-pulau-pangkor/project-24-02.webp",
          width: 1280,
          height: 720,
          alt: "Aerial view of the mosque standing over the water off Pulau Pangkor",
        },
      },
    ],
    featured: false,
  },
  {
    id: "project-25",
    slug: "masjid-darul-halim-sibu",
    title: "Masjid Darul Halim",
    // TODO_CONFIRM: category, scope, year and client. Only photos arrived
    // (docs/update), so the year and client are left out.
    category: "Supply and Install Aluminium Dome",
    location: "Sibu, Sarawak",
    scope: "Supply and install aluminium dome",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/masjid-darul-halim-sibu/project-25-01.webp",
          width: 960,
          height: 720,
          alt: "Front of Masjid Darul Halim with its gold dome above the entrance",
        },
      },
      {
        kind: "far",
        photo: {
          src: "/images/projects/masjid-darul-halim-sibu/project-25-02.webp",
          width: 960,
          height: 720,
          alt: "The mosque from the car park, the gold dome above the yellow facade",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-darul-halim-sibu/project-25-03.webp",
          width: 960,
          height: 720,
          alt: "Side entrance of the mosque with the gold dome above",
        },
      },
      { kind: "interior" },
      { kind: "detail" },
    ],
    featured: false,
  },
  {
    id: "project-26",
    slug: "masjid-lama-kg-sura-dungun",
    title: "Masjid Lama Kg Sura",
    // TODO_CONFIRM: category, scope, year and client. Only photos arrived
    // (docs/update), so the year and client are left out.
    category: "Supply and Install Aluminium Dome",
    location: "Dungun, Terengganu",
    scope: "Supply and install aluminium dome",
    gallery: [
      {
        kind: "far",
        cover: true,
        photo: {
          src: "/images/projects/masjid-lama-kg-sura-dungun/project-26-01.webp",
          width: 959,
          height: 543,
          alt: "Masjid Lama Kg Sura with its green and white dome and minaret",
        },
      },
      {
        kind: "interior",
        photo: {
          src: "/images/projects/masjid-lama-kg-sura-dungun/project-26-04.webp",
          width: 752,
          height: 1368,
          alt: "Inside the dome: a green lattice pattern ringed by small windows above the prayer hall",
        },
      },
      {
        kind: "progress",
        photo: {
          src: "/images/projects/masjid-lama-kg-sura-dungun/project-26-03.webp",
          width: 1024,
          height: 768,
          alt: "Construction work at the front of the mosque, the green dome already in place",
        },
      },
      {
        kind: "close",
        photo: {
          src: "/images/projects/masjid-lama-kg-sura-dungun/project-26-02.webp",
          width: 1024,
          height: 768,
          alt: "Front of the mosque with its green dome, cars parked outside",
        },
      },
      { kind: "detail" },
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
    serviceArea: "Nationwide: Peninsular Malaysia, Sabah and Sarawak",
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
    // TODO_CONFIRM_STATS: "since 2014" comes from the portfolio; confirm with
    // the client. The project and state counts follow the project list (the
    // state is the last part of each location).
    { value: "2014", label: "Track Record Since" },
    { value: String(projects.length), label: "Projects" },
    {
      value: String(
        new Set(projects.map((p) => p.location.split(", ").at(-1))).size,
      ),
      label: "States Served",
    },
    { value: "G3", label: "CIDB Grade" },
  ],
  // Each service has its own page at /services/<slug>. `seoTitle` is the
  // page <title>; `malayName` goes only into the meta description and
  // JSON-LD for Malay searches, never on the page (TODO_CONFIRM: have the
  // client check the wording);
  // `projectCategory` picks the related projects listed on the page (null
  // hides the section).
  services: [
    {
      id: "aluminium-domes",
      slug: "aluminium-dome",
      seoTitle: "Aluminium Dome Contractor in Malaysia (Kubah Aluminium)",
      malayName: "Kubah Aluminium Masjid",
      projectCategory: "Supply and Install Aluminium Dome",
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
        "Large gold aluminium dome on a mosque roof, with two installers working on it",
    },
    {
      id: "windows-glazing-cladding",
      slug: "aluminium-windows",
      seoTitle: "Aluminium Windows Supply and Installation (Tingkap Aluminium)",
      malayName: "Tingkap Aluminium",
      projectCategory: "Supply and Install Aluminium Window",
      title: "Aluminium Windows",
      shortDescription:
        "Aluminium windows for institutional and commercial buildings.",
      fullDescription:
        "Alongside domes, we supply and install aluminium windows, fabricated to suit the architect's details and installed to a clean, weather-tight finish.",
      bullets: [
        "Aluminium windows",
        "Fabricated to the architect's details",
        "Supply and installation to drawings",
        "Clean, weather-tight finish",
      ],
      image: "/images/services/service-windows-cladding.webp",
      altText:
        "Building facade with dark aluminium window frames",
    },
    {
      id: "decorative-panels",
      slug: "celuka-cnc-panels",
      seoTitle: "Celuka Lattice Composite and CNC-Cut Aluminium Panels",
      malayName: "Panel Celuka dan Panel Potongan CNC",
      projectCategory: null,
      title: "Celuka Lattice Composite & CNC-Cut Panels",
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
      // No photo yet: the card and the services page show "Coming soon".
      // TODO_CONFIRM: add a clear shot of Celuka/CNC panels from the client.
      image: null,
      altText: "",
    },
    {
      id: "minarets-metalworks",
      slug: "metal-works",
      seoTitle: "Metal Works and Steel Fabrication (Kerja Logam)",
      malayName: "Kerja Logam",
      projectCategory: "Metal Work",
      title: "Metal Works",
      shortDescription: "Custom steel and architectural metal fabrication.",
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
      slug: "dome-refurbishment",
      seoTitle: "Dome Refurbishment and Waterproofing (Baik Pulih Kubah)",
      malayName: "Baik Pulih dan Kalis Air Kubah",
      projectCategory: "Dome Refurbishment",
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
    {
      // TODO_CONFIRM: roofing scope and copy with the client. The photo is the
      // Kompleks Pentadbiran Kerajaan Persekutuan Sabah roof from docs/Website.
      id: "roofing",
      slug: "roofing",
      seoTitle: "Metal Roofing Supply and Installation (Bumbung Logam)",
      malayName: "Bumbung Logam",
      projectCategory: null,
      title: "Roofing",
      shortDescription: "Metal roofing supply and installation.",
      fullDescription: "We supply and install metal roofing.",
      bullets: ["Metal roofing supply and installation"],
      image: "/images/services/service-roofing.webp",
      altText:
        "Aerial view of a government complex with green metal roofs and domes",
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
  servicePage: {
    backLabel: "All services",
    includedHeading: "What's included",
    locationNote: "Based in Johor, working across Malaysia.",
    relatedHeading: "Related projects",
    otherHeading: "Other services",
  },
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
