"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import Pagination from "@/components/ui/Pagination";
import { RETURN_KEY, encodeReturn } from "@/lib/return-to-projects";
import type { Project } from "@/lib/site-config";

// Two rows at desktop width. Paging keeps the section the same length
// however many projects are added.
const PAGE_SIZE = 6;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

// The type filter and current page live in the URL (?type=…&page=2) so a view
// can be linked, survives a refresh, and is restored by Back from a project
// page. It is read through useSyncExternalStore rather than
// useSearchParams: under `output: "export"` useSearchParams would turn this
// whole tree into client-only rendering, dropping the cards from the static
// HTML. The server snapshot is empty (all types, page 1), which is what the HTML shows.
const URL_EVENT = "projectpagechange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}

/** pushState for a page the visitor chose (Back returns to the previous
 * page); replaceState when a filter change resets it to 1. Next.js syncs its
 * router with both. */
function writeParams(
  { type, page }: { type: string | null; page: number },
  mode: "push" | "replace",
) {
  const url = new URL(window.location.href);
  if (type) url.searchParams.set("type", type);
  else url.searchParams.delete("type");
  if (page > 1) url.searchParams.set("page", String(page));
  else url.searchParams.delete("page");
  if (url.href === window.location.href) return;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(URL_EVENT));
}

export default function ProjectBrowser({
  projects,
  viewLabel,
}: {
  /** Already in display order. */
  projects: readonly Project[];
  viewLabel: string;
}) {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const selectId = useId();

  // Only the project types present, most common first.
  const categoryCounts = new Map<string, number>();
  for (const p of projects) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
  }
  const categories = [...categoryCounts].sort((a, b) => b[1] - a[1]);

  // An unknown ?type= shows everything.
  const t = params.get("type");
  const category = t && categoryCounts.has(t) ? t : null;
  const n = Number(params.get("page"));
  const urlPage = Number.isInteger(n) && n > 1 ? n : 1;

  const matching = category
    ? projects.filter((p) => p.category === category)
    : projects;
  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  // A stale or hand-typed ?page= beyond the end shows the last page.
  const page = Math.min(urlPage, pageCount);
  const first = (page - 1) * PAGE_SIZE;
  const visible = matching.slice(first, first + PAGE_SIZE);
  const visibleIds = new Set(visible.map((p) => p.id));

  // Back from a project page lands here with the URL intact; the saved
  // query is only needed while a project page is open.
  useEffect(() => {
    try {
      sessionStorage.removeItem(RETURN_KEY);
    } catch {}
  }, []);

  function chooseCategory(next: string | null) {
    writeParams({ type: next, page: 1 }, "replace");
  }

  function goToPage(next: number, { scroll }: { scroll: boolean }) {
    writeParams({ type: category, page: next }, "push");
    // The top pager sits above the cards, so it never scrolls. The bottom one
    // brings the results bar back into view. Focus stays on the button that
    // was pressed, unless it has just become disabled (Previous on page 1,
    // Next on the last page), which drops focus to the body; then it moves to
    // the results count instead. After a scroll it always goes to the count.
    if (scroll) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      barRef.current?.scrollIntoView({
        block: "start",
        behavior: reduce ? "auto" : "smooth",
      });
    }
    requestAnimationFrame(() => {
      if (scroll) {
        summaryRef.current?.focus({ preventScroll: true });
        return;
      }
      const active = document.activeElement;
      if (
        !active ||
        active === document.body ||
        (active as HTMLButtonElement).disabled
      ) {
        summaryRef.current?.focus({ preventScroll: true });
      }
    });
  }

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${focusRing} ${
      active
        ? "border-primary-900 bg-primary-900 text-white"
        : "border-slate-200 bg-white text-slate-700 hover:border-primary-300 hover:text-primary-900"
    }`;

  return (
    <div>
      <div className="mb-4 flex flex-col items-start gap-3 sm:mb-6 sm:gap-4">
        {/* Phones: a native select (the OS picker, accessible by default)
            instead of chips that would wrap to three rows. Both controls
            write the same URL parameter. */}
        <div className="w-full sm:hidden">
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
          >
            Project type
          </label>
          <div className="relative">
            <select
              id={selectId}
              value={category ?? ""}
              onChange={(e) => chooseCategory(e.target.value || null)}
              className={`h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white pr-10 pl-3.5 text-base font-medium text-primary-900 ${focusRing}`}
            >
              <option value="">All types ({projects.length})</option>
              {categories.map(([name, count]) => (
                <option key={name} value={name}>
                  {name} ({count})
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-primary-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 8l5 5 5-5"
              />
            </svg>
          </div>
        </div>

        <div
          role="group"
          aria-label="Project type"
          className="hidden flex-wrap gap-2 sm:flex"
        >
          <button
            type="button"
            aria-pressed={category === null}
            onClick={() => chooseCategory(null)}
            className={chip(category === null)}
          >
            All types
          </button>
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => chooseCategory(name)}
              className={chip(category === name)}
            >
              {name} <span className="tabular-nums opacity-70">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results bar: the count (the one live region) with a compact pager
          beside it, so changing page never needs a scroll to the bottom. */}
      <div
        ref={barRef}
        className="mb-4 flex min-h-11 items-center justify-between gap-3 sm:mb-6"
      >
        <p
          ref={summaryRef}
          tabIndex={-1}
          aria-live="polite"
          className="min-w-0 text-sm text-slate-500 focus:outline-none"
        >
          <span className="max-sm:sr-only">Showing </span>
          <span className="font-semibold text-slate-700 tabular-nums">
            {matching.length === 0
              ? 0
              : `${first + 1}–${first + visible.length}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700 tabular-nums">
            {matching.length}
          </span>{" "}
          <span className="max-sm:sr-only">
            {matching.length === 1 ? "project" : "projects"}
          </span>
        </p>
        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={(n) => goToPage(n, { scroll: false })}
          label="Project pages (top)"
          variant="compact"
          className="shrink-0"
        />
      </div>

      {/* Every project stays in the HTML (crawlable); the ones outside the
          current filter or page are hidden rather than left unrendered. */}
      <ul
        className="grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        onClickCapture={(e) => {
          const link = (e.target as Element).closest("a");
          if (link)
            try {
              const slug = new URL(link.href).pathname.split("/").pop() ?? "";
              sessionStorage.setItem(
                RETURN_KEY,
                encodeReturn(slug, window.location.search),
              );
            } catch {}
        }}
      >
        {projects.map((project) => (
          <li
            key={project.id}
            hidden={!visibleIds.has(project.id)}
            className="grid"
          >
            <ProjectCard project={project} viewLabel={viewLabel} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center sm:mt-10">
        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={(n) => goToPage(n, { scroll: true })}
          label="Project pages (bottom)"
          variant="full"
        />
      </div>
    </div>
  );
}
