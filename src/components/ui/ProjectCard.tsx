import Image from "next/image";
import type { Project } from "@/lib/site-config";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.altText}
          width={1200}
          height={800}
          className="aspect-video w-full object-cover sm:aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
        />
        <p className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="rounded bg-accent-500 px-2 py-0.5 text-xs font-semibold text-primary-900">
            {project.category}
          </span>
          {project.status === "ongoing" && (
            <span className="rounded bg-secondary-700 px-2 py-0.5 text-xs font-semibold text-white">
              Ongoing
            </span>
          )}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">{project.title}</h3>
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
          <div className="contents sm:block">
            <dt className="font-semibold text-secondary-700 max-sm:text-xs max-sm:leading-5">Client</dt>
            <dd className="text-slate-700">{project.client}</dd>
          </div>
          {project.mainContractor && (
            <div className="contents sm:block">
              <dt className="font-semibold text-secondary-700 max-sm:text-xs max-sm:leading-5">
                Main Contractor
              </dt>
              <dd className="text-slate-700">{project.mainContractor}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}
