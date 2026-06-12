import Image from "next/image";
import type { Project } from "@/lib/site-config";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-lg">
      <Image
        src={project.image}
        alt={project.altText}
        width={1200}
        height={800}
        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent p-5">
        <p className="mb-1 inline-flex">
          <span className="rounded bg-accent-500 px-2 py-0.5 text-xs font-semibold text-primary-900">
            {project.category}
          </span>
        </p>
        <h3 className="text-lg font-bold text-white">{project.title}</h3>
        <p className="text-sm text-slate-300">
          {project.location} &middot; {project.year}
        </p>
      </div>
    </article>
  );
}
