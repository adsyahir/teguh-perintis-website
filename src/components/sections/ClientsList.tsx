import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

// Every logo is drawn at roughly the same area rather than the same height,
// so a wide wordmark (Senai Airport, KPRJ) carries the same visual weight as
// a square crest instead of shrinking to a sliver.
const LOGO_AREA = 5600; // px², about a 75px square
const MAX_HEIGHT = 80;

function logoWidth(
  { width, height }: { width: number; height: number },
  maxWidth: number,
) {
  const ratio = width / height;
  const h = Math.min(Math.sqrt(LOGO_AREA / ratio), MAX_HEIGHT);
  return Math.round(Math.min(h * ratio, maxWidth));
}

export default function ClientsList() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {siteConfig.clientGroups.map((group) => (
        <div key={group.category}>
          <h3 className="mb-3 flex items-center gap-4 text-xs font-semibold tracking-wider text-primary-900 uppercase sm:mb-5 sm:text-sm">
            {group.category}
            <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
          </h3>
          {/* 2, 3 and 6 columns; each group's tiles fill whole rows, and
              grid-flow-dense backfills any gap a two-column tile leaves. */}
          <ul className="grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
            {group.organisations.map((org) => {
              const wide = "wide" in org && org.wide;
              const multiple = org.clients.length > 1;
              return (
                <li
                  key={org.logo.src}
                  className={`flex rounded-xl border border-slate-200 bg-white px-3 py-4 transition-[border-color,box-shadow] duration-200 hover:border-primary-200 hover:shadow-md motion-reduce:transition-none sm:flex-col sm:px-4 sm:py-5 ${
                    // Phones: a two-column tile lays out sideways (logo left,
                    // names right) so it isn't a tall box of white space.
                    wide
                      ? "col-span-2 flex-row items-center gap-3 sm:items-stretch sm:gap-0"
                      : "flex-col"
                  }`}
                >
                  {/* The names under the logo say who it is, so the image
                      is decorative. */}
                  <div
                    className={`flex h-14 shrink-0 items-center justify-center sm:h-20 ${
                      wide ? "w-[40%] sm:w-auto" : ""
                    }`}
                  >
                    <Image
                      src={org.logo.src}
                      alt=""
                      width={org.logo.width}
                      height={org.logo.height}
                      style={
                        {
                          "--logo-w": `${logoWidth(org.logo, wide ? 200 : 136)}px`,
                        } as React.CSSProperties
                      }
                      // Phones draw every logo at 75% so the tiles stay short.
                      className="h-auto w-[calc(var(--logo-w)*0.75)] max-w-full sm:w-(--logo-w)"
                    />
                  </div>
                  {/* Several clients under one logo show as separate chips
                      so the names can't run together. */}
                  <ul
                    className={`text-[13px] leading-snug font-medium text-slate-700 sm:mt-4 sm:border-t sm:border-l-0 sm:border-slate-100 sm:pt-4 sm:pl-0 sm:text-center ${
                      wide
                        ? "flex-1 border-l border-slate-100 pl-3 text-left"
                        : "mt-3 border-t border-slate-100 pt-3 text-center"
                    } ${
                      multiple
                        ? `flex flex-wrap gap-1.5 sm:justify-center ${wide ? "" : "justify-center"}`
                        : ""
                    }`}
                  >
                    {org.clients.map((name) => (
                      <li
                        key={name}
                        className={
                          multiple
                            ? "rounded-md bg-slate-50 px-2 py-1 ring-1 ring-slate-200/70 ring-inset"
                            : ""
                        }
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
