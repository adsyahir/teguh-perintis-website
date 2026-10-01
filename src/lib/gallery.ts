import type { GalleryPhoto, GallerySlot, Project, ShotKind } from "@/lib/site-config";

export const CORE_KINDS = ["far", "close", "interior", "detail"] as const;
export const MIN_SLOTS = 4;
export const MAX_SLOTS = 6;

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
  const rest = p.gallery.filter((s) => !isBeforeAfter(s));
  const cover = rest.find((s) => s.cover)!;
  return {
    main: [
      cover,
      ...rest.filter((s) => s !== cover && s.photo),
      ...rest.filter((s) => !s.photo),
    ],
    beforeAfter: p.gallery.filter(isBeforeAfter),
  };
}

export type LightboxItem = GalleryPhoto & { kind: ShotKind };

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
  if (n < MIN_SLOTS || n > MAX_SLOTS)
    fail(`has ${n} slots, expected ${MIN_SLOTS}-${MAX_SLOTS}`);
  for (const kind of CORE_KINDS) {
    if (p.gallery.filter((s) => s.kind === kind).length !== 1)
      fail(`needs exactly one "${kind}" slot`);
  }
  const covers = p.gallery.filter((s) => s.cover);
  if (covers.length !== 1) fail(`needs exactly one cover, has ${covers.length}`);
  if (!covers[0].photo) fail("cover slot has no photo");
  if (isBeforeAfter(covers[0])) fail("cover cannot be a before/after slot");
}

const LEAD = "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto";
const SMALL = "aspect-square sm:aspect-[4/3] lg:aspect-auto";
const WIDE_MOBILE = "col-span-2 aspect-[2/1] lg:aspect-auto";
const LG_SPANS: Record<number, string[]> = {
  3: ["lg:col-span-2", "", ""],
  4: ["", "", "", ""],
  5: ["lg:col-span-2", "", "", "lg:col-span-2", "lg:col-span-2"],
};

/** Grid classes for tile i of n: the lead tile is 2x2 at lg, and an odd last
 * tile spans the row on phones so no cell is left empty. */
export function tileClass(i: number, n: number) {
  if (i === 0) return LEAD;
  const r = n - 1;
  const oddLast = r % 2 === 1 && i === r;
  let lg = LG_SPANS[r]?.[i - 1] ?? "";
  if (oddLast && lg === "") lg = "lg:col-span-1";
  return `${oddLast ? WIDE_MOBILE : SMALL} ${lg}`.trim();
}
