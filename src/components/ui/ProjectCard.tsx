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
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
        <p className="mt-1 text-sm text-slate-500">
          {project.location} &middot; {project.year}
        </p>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-semibold text-secondary-700">Scope</dt>
            <dd className="text-slate-700">{project.scope}</dd>
          </div>
          <div>
            <dt className="font-semibold text-secondary-700">Client</dt>
            <dd className="text-slate-700">{project.client}</dd>
          </div>
          {project.mainContractor && (
            <div>
              <dt className="font-semibold text-secondary-700">
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
