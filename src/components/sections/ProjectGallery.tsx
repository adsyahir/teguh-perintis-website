"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import GalleryPlaceholder from "@/components/ui/GalleryPlaceholder";
import { lightboxItems, tileClass } from "@/lib/gallery";
import type { GallerySlot, ShotKind } from "@/lib/site-config";

type Labels = {
  shotLabels: Record<ShotKind, { en: string; ms: string }>;
  beforeAfterHeading: string;
  comingSoon: string;
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

const arrowButton = `absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${focusRing} sm:h-12 sm:w-12`;

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d={d} />
    </svg>
  );
}

export default function ProjectGallery({
  title,
  main,
  beforeAfter,
  labels,
}: {
  title: string;
  main: GallerySlot[];
  beforeAfter: GallerySlot[];
  labels: Labels;
}) {
  const items = lightboxItems({ main, beforeAfter });
  const N = items.length;
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Last photo viewed: where focus returns when the dialog closes.
  const lastRef = useRef(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const item = index === null ? null : items[index];

  function open(k: number) {
    lastRef.current = k;
    setIndex(k);
    dialogRef.current?.showModal();
  }

  function go(to: number) {
    lastRef.current = to;
    setIndex(to);
  }

  function step(d: number) {
    go(((index ?? 0) + d + N) % N);
  }

  // Fires for every close, including Esc, which the browser handles natively.
  function handleClose() {
    setIndex(null);
    tileRefs.current[lastRef.current]?.focus();
  }

  function onKey(e: React.KeyboardEvent) {
    const to =
      e.key === "ArrowLeft"
        ? ((index ?? 0) - 1 + N) % N
        : e.key === "ArrowRight"
          ? ((index ?? 0) + 1) % N
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? N - 1
              : null;
    if (to === null) return;
    e.preventDefault();
    go(to);
  }

  // Each real tile's position in the lightbox: main first, then before/after.
  const lightboxIndex = new Map<GallerySlot, number>();
  for (const slot of [...main, ...beforeAfter]) {
    if (slot.photo) lightboxIndex.set(slot, lightboxIndex.size);
  }

  function tile(slot: GallerySlot, first: boolean) {
    const label = labels.shotLabels[slot.kind];
    const { photo } = slot;
    if (!photo) {
      return <GalleryPlaceholder labels={label} comingSoon={labels.comingSoon} />;
    }
    const at = lightboxIndex.get(slot)!;
    return (
      <button
        ref={(el) => {
          tileRefs.current[at] = el;
        }}
        type="button"
        aria-haspopup="dialog"
        onClick={() => open(at)}
        className={`group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-lg bg-slate-100 ${focusRing}`}
      >
        <Image
          src={photo.src}
          fill
          alt={photo.alt}
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
          {...(first && { loading: "eager", fetchPriority: "high" })}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-2 rounded bg-primary-950/75 px-2 py-0.5 text-xs font-medium text-white"
        >
          {label.en}
        </span>
        <span className="sr-only">, open larger view</span>
      </button>
    );
  }

  return (
    <>
      <ul className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 lg:auto-rows-[12rem] lg:grid-cols-4 lg:gap-4">
        {main.map((slot, i) => (
          <li key={i} className={tileClass(i, main.length)}>
            {tile(slot, i === 0)}
          </li>
        ))}
      </ul>

      {beforeAfter.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {labels.beforeAfterHeading}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {beforeAfter.map((slot, i) => (
              <li key={i} className="aspect-[4/3]">
                {tile(slot, false)}
              </li>
            ))}
          </ul>
        </>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`${title}: photos`}
        onClose={handleClose}
        onKeyDown={onKey}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-primary-950/95 p-0 text-white backdrop:bg-black/60 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p
            aria-live="polite"
            className="text-sm font-medium text-primary-100 tabular-nums"
          >
            Photo {(index ?? 0) + 1} of {N}
          </p>
          <button
            autoFocus
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close photo viewer"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 ${focusRing}`}
          >
            <Icon d="M6 6l12 12M18 6L6 18" />
          </button>
        </div>
        <div
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 pb-6 sm:px-20"
          onPointerDown={(e) => {
            swipe.current =
              e.pointerType === "mouse" ? null : { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const s = swipe.current;
            swipe.current = null;
            if (!s) return;
            const dx = e.clientX - s.x;
            const dy = e.clientY - s.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
              step(dx < 0 ? 1 : -1);
            }
          }}
          onPointerCancel={() => (swipe.current = null)}
        >
          {item && (
            <figure className="flex max-h-full flex-col items-center">
              <Image
                key={item.src}
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                draggable={false}
                className="h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded object-contain motion-safe:animate-fade-in"
              />
              <figcaption className="mt-3 text-center text-sm text-primary-100">
                <span className="font-semibold text-white">
                  {labels.shotLabels[item.kind].en}
                </span>
                {item.caption && ` · ${item.caption}`}
              </figcaption>
            </figure>
          )}
          {N > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className={`${arrowButton} left-2 sm:left-4`}
              >
                <Icon d="M12 15l-5-5 5-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className={`${arrowButton} right-2 sm:right-4`}
              >
                <Icon d="M8 5l5 5-5 5" />
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
