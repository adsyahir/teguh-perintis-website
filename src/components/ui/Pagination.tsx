const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

/** Page numbers to show: all of them when few, else first, last and the
 * current page's neighbours, with gaps marked "gap". */
function pageItems(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  // Near either end, show one more neighbour so the row length stays even.
  if (current <= 3) pages.add(2).add(3).add(4);
  if (current >= total - 2)
    pages
      .add(total - 1)
      .add(total - 2)
      .add(total - 3);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push("gap");
    items.push(p);
  });
  return items;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "left" ? "M12 15l-5-5 5-5" : "M8 5l5 5-5 5"}
      />
    </svg>
  );
}

/**
 * Toolbar-sized pager: Previous/Next icon buttons with numbered pages from sm
 * up; on phones the numbers collapse to a compact "2 / 4". Tap targets stay
 * 44px on phones. `variant="compact"` keeps the "2 / 4" form at every width. Renders nothing when there is a single page.
 */
export default function Pagination({
  page,
  pageCount,
  onChange,
  label,
  variant = "full",
  className = "",
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  /** Names the nav landmark, e.g. "Project pages". */
  label: string;
  /** "full" shows page numbers from sm up; "compact" is always "2 / 4". */
  variant?: "full" | "compact";
  className?: string;
}) {
  if (pageCount <= 1) return null;
  const compact = variant === "compact";

  const step = `inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-50 disabled:pointer-events-none disabled:opacity-40 sm:h-9 sm:min-w-9 ${focusRing}`;

  return (
    <nav
      aria-label={label}
      className={`flex items-center gap-2 sm:gap-1.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={step}
      >
        <Chevron direction="left" />
        <span className="sr-only">Previous page</span>
      </button>

      {/* Phones: compact position readout instead of number buttons. */}
      <p
        className={`min-w-12 text-center text-sm font-semibold text-slate-700 tabular-nums ${compact ? "" : "sm:hidden"}`}
      >
        <span className="sr-only">Page </span>
        {page}
        <span aria-hidden="true" className="px-1 font-normal text-slate-400">
          /
        </span>
        <span className="sr-only"> of </span>
        {pageCount}
      </p>

      {!compact && (
        <ol className="hidden items-center gap-1 sm:flex">
          {pageItems(page, pageCount).map((item, i) =>
            item === "gap" ? (
              <li
                key={`gap-${i}`}
                aria-hidden="true"
                className="w-6 text-center text-slate-400"
              >
                &hellip;
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => onChange(item)}
                  aria-current={item === page ? "page" : undefined}
                  aria-label={`Page ${item}`}
                  className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-semibold tabular-nums transition-colors ${focusRing} ${
                    item === page
                      ? "bg-primary-900 text-white"
                      : "text-slate-700 hover:bg-primary-50 hover:text-primary-900"
                  }`}
                >
                  {item}
                </button>
              </li>
            ),
          )}
        </ol>
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        className={step}
      >
        <span className="sr-only">Next page</span>
        <Chevron direction="right" />
      </button>
    </nav>
  );
}
