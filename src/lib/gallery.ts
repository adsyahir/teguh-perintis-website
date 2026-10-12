import type { GalleryPhoto, GallerySlot, Project, ShotKind } from "@/lib/site-config";

export const CORE_KINDS = ["far", "close", "interior", "detail"] as const;
// Every core kind has a slot (a photo, or a placeholder until one arrives);
// beyond that a project can carry as many photos as the client supplies.
export const MAX_SLOTS = 16;

// "Photo coming soon" tiles for missing core shots. Hidden while the client
// gathers more photos; the placeholder slots stay in the data, so setting this
// back to true brings them back.
export const SHOW_PLACEHOLDERS = false;

const isBeforeAfter = (s: GallerySlot) =>
  s.kind === "before" || s.kind === "after";

/** The cover photo. assertGallery guarantees the cover slot has one. */
export function coverOf(p: Project): GalleryPhoto {
  return p.gallery.find((s) => s.cover)!.photo!;
}

/** Slots with a real photo; placeholders are not counted. */
export function photoCount(p: Project) {
  return p.gallery.filter((s) => s.photo).length;
}

/** Cover first, then the other real photos, then placeholders (never in the
 * lead tile). Before/after slots are split off for their own block. */
export function gallerySections(p: Project): {
  main: GallerySlot[];
  beforeAfter: GallerySlot[];
} {
  const shown = SHOW_PLACEHOLDERS
    ? p.gallery
    : p.gallery.filter((s) => s.photo);
  const rest = shown.filter((s) => !isBeforeAfter(s));
  const cover = rest.find((s) => s.cover)!;
  return {
    main: [
      cover,
      ...rest.filter((s) => s !== cover && s.photo),
      ...rest.filter((s) => !s.photo),
    ],
    beforeAfter: shown.filter(isBeforeAfter),
  };
}

export type LightboxItem = GalleryPhoto & { kind: ShotKind };

/** Width of the small copies in each project's thumb/ folder. */
export const THUMB_WIDTH = 800;

/** The small copy of a project photo, for cards and ordinary gallery tiles.
 * images are `unoptimized` (static export), so next/image can't resize; these
 * keep phones from downloading 1440px files for ~180px tiles. The full file is
 * still used by the lightbox and by tiles that span the grid. */
export function thumbSrc(src: string) {
  // /images/projects/<slug>/<file> -> /images/projects/<slug>/thumb/<file>
  return src.replace(/\/([^/]+)$/, "/thumb/$1");
}

/** Real photos in the order the lightbox steps through them. */
export function lightboxItems(sections: {
  main: readonly GallerySlot[];
  beforeAfter: readonly GallerySlot[];
}): LightboxItem[] {
  return [...sections.main, ...sections.beforeAfter].flatMap((s) =>
    s.photo ? [{ ...s.photo, kind: s.kind }] : [],
  );
}

/** Build-time check of the gallery rules (see README "Adding a gallery photo"). */
export function assertGallery(p: Project) {
  const fail = (why: string) => {
    throw new Error(`${p.id}: gallery ${why}`);
  };
  const n = p.gallery.length;
  if (n > MAX_SLOTS) fail(`has ${n} slots, at most ${MAX_SLOTS} allowed`);
  for (const kind of CORE_KINDS) {
    if (!p.gallery.some((s) => s.kind === kind))
      fail(`needs a "${kind}" slot (a photo or a placeholder)`);
  }
  const covers = p.gallery.filter((s) => s.cover);
  if (covers.length !== 1) fail(`needs exactly one cover, has ${covers.length}`);
  if (!covers[0].photo) fail("cover slot has no photo");
  if (isBeforeAfter(covers[0])) fail("cover cannot be a before/after slot");
}

const LEAD = "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto";
const SMALL = "aspect-square sm:aspect-[4/3] lg:aspect-auto";
const WIDE_MOBILE = "col-span-2 aspect-[2/1] lg:aspect-auto";
/** lg spans that soak up the empty cells left after the 4-column grid fills,
 * keyed by how many cells would be empty. Applied to the last tiles. */
const LG_FILL: Record<number, string[]> = {
  0: [],
  1: ["lg:col-span-2"],
  2: ["lg:col-span-2", "lg:col-span-2"],
  3: ["lg:col-span-4 lg:row-span-2"],
};

/** Grid classes for tile i of n. The lead tile is 2x2 at lg; the tiles after
 * it fill 4-column rows, and the last few widen so no cell is left empty. On
 * phones an odd last tile spans the row for the same reason. */
export function tileClass(i: number, n: number) {
  const r = n - 1;
  // A lone photo takes the full width; a single partner matches the lead.
  if (i === 0) return r === 0 ? `${LEAD} lg:col-span-4` : LEAD;
  if (r === 1) return `${WIDE_MOBILE} lg:row-span-2`;
  const fill = LG_FILL[(4 - (r % 4)) % 4];
  const fromEnd = r - i; // 0 for the last tile
  const oddLast = r % 2 === 1 && i === r;
  // WIDE_MOBILE spans 2 columns; reset that at lg unless a fill span applies.
  const lg =
    fill[fill.length - 1 - fromEnd] ?? (oddLast ? "lg:col-span-1" : "");
  return `${oddLast ? WIDE_MOBILE : SMALL} ${lg}`.trim();
}
