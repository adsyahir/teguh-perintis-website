import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageUrls } from "@/lib/page-metadata";
import { coverOf, gallerySections, photoCount } from "@/lib/gallery";
import {
  getProjectBySlug,
  projectDescription,
  projectsInDisplayOrder,
} from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BackToProjects from "@/components/ui/BackToProjects";
import ProjectGallery from "@/components/sections/ProjectGallery";
import CtaBanner from "@/components/sections/CtaBanner";
import ProjectJsonLd from "@/components/seo/ProjectJsonLd";

// Static export: only the slugs below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return {
    title: project.title,
    description: projectDescription(project),
    ...pageUrls(`/projects/${slug}`, {
      url: `/images/projects/og/${project.id}.jpg`,
      alt: coverOf(project).alt,
    }),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const copy = siteConfig.projectPage;
  const { main, beforeAfter } = gallerySections(project);
  const count = photoCount(project);

  const ordered = projectsInDisplayOrder();
  const at = ordered.findIndex((p) => p.id === project.id);
  const prev = ordered[at - 1];
  const next = ordered[at + 1];

  const details = [
    ["Scope", project.scope],
    ["Client", project.client],
    ...(project.mainContractor
      ? [["Main Contractor", project.mainContractor]]
      : []),
    ["Location", project.location],
    ["Year", project.year],
  ];

  const neighbour =
    "rounded-lg border border-slate-200 p-4 hover:border-primary-300 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";
  const neighbourLabel =
    "block text-xs font-semibold tracking-wider text-secondary-700 uppercase";

  return (
    <>
      <div className="bg-primary-900">
        <Container className="py-8 sm:py-14">
          <BackToProjects label={copy.backLabel} />
          <p className="mt-5">
            <span className="rounded bg-accent-500 px-2 py-0.5 text-xs font-semibold text-primary-900">
              {project.category}
            </span>
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-base text-slate-300 sm:text-lg">
            {project.location} &middot; {project.year}
          </p>
        </Container>
      </div>

      <Section>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {copy.galleryHeading}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {count} {count === 1 ? "photo" : "photos"}
        </p>
        <ProjectGallery
          title={project.title}
          main={main}
          beforeAfter={beforeAfter}
          labels={{
            shotLabels: copy.shotLabels,
            beforeAfterHeading: copy.beforeAfterHeading,
            comingSoon: copy.comingSoon,
          }}
        />

        <h2 className="mt-12 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {copy.detailsHeading}
        </h2>
        <dl className="mt-4 grid gap-x-8 gap-y-5 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold tracking-wider text-secondary-700 uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-sm text-slate-800 sm:text-base">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <nav
          aria-label="More projects"
          className="mt-12 grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className={neighbour}>
              <span className={neighbourLabel}>{copy.prevLabel}</span>
              <span className="mt-1 block font-semibold text-slate-900">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className={`${neighbour} sm:text-right`}
            >
              <span className={neighbourLabel}>{copy.nextLabel}</span>
              <span className="mt-1 block font-semibold text-slate-900">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </Section>

      <CtaBanner title={copy.ctaTitle} />
      <ProjectJsonLd project={project} />
    </>
  );
}
