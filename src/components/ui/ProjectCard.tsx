import Image from "next/image";
import Link from "next/link";
import CameraIcon from "@/components/ui/CameraIcon";
import { coverOf, photoCount, thumbSrc } from "@/lib/gallery";
import type { Project } from "@/lib/site-config";

export default function ProjectCard({
  project,
  viewLabel,
}: {
  project: Project;
  /** "View project", read from siteConfig by the server-side parent. */
  viewLabel: string;
}) {
  const cover = coverOf(project);
  const n = photoCount(project);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-lg has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent-500">
      <div className="relative overflow-hidden">
        <Image
          src={thumbSrc(cover.src)}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          className="aspect-video w-full object-cover sm:aspect-[3/2] transition-transform duration-300 motion-safe:group-hover:scale-105"
        />
        <p className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="rounded bg-accent-500 px-2 py-0.5 text-xs font-semibold text-primary-900">
            {project.category}
          </span>
        </p>
        <p className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded bg-primary-950/80 px-2 py-0.5 text-xs font-medium text-white">
          <CameraIcon className="h-3.5 w-3.5" />
          {n} {n === 1 ? "photo" : "photos"}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          {/* Stretched link: the whole card is the click target. */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-slate-500 sm:mt-1">
          {project.location} &middot; {project.year}
        </p>
        {/* On phones each label sits beside its value (a two-column grid), which
            roughly halves the card's text height; from sm up it stacks. */}
        <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5 text-sm sm:mt-4 sm:block sm:space-y-2">
          <div className="contents sm:block">
            <dt className="font-semibold text-secondary-700 max-sm:text-xs max-sm:leading-5">Scope</dt>
            <dd className="text-slate-700">{project.scope}</dd>
          </div>
          {project.client && (
            <div className="contents sm:block">
              <dt className="font-semibold text-secondary-700 max-sm:text-xs max-sm:leading-5">Client</dt>
              <dd className="text-slate-700">{project.client}</dd>
            </div>
          )}
          {project.mainContractor && (
            <div className="contents sm:block">
              <dt className="font-semibold text-secondary-700 max-sm:text-xs max-sm:leading-5">
                Main Contractor
              </dt>
              <dd className="text-slate-700">{project.mainContractor}</dd>
            </div>
          )}
        </dl>
        <p
          aria-hidden="true"
          className="mt-auto pt-4 text-sm font-semibold text-primary-700 group-hover:text-primary-900"
        >
          {viewLabel}
        </p>
      </div>
    </article>
  );
}
