import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageUrls } from "@/lib/page-metadata";
import {
  getServiceBySlug,
  relatedProjects,
  serviceDescription,
  serviceUrl,
} from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BackLink from "@/components/ui/BackLink";
import Button from "@/components/ui/Button";
import PhotoComingSoon from "@/components/ui/PhotoComingSoon";
import ProjectCard from "@/components/ui/ProjectCard";
import CtaBanner from "@/components/sections/CtaBanner";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";

// Static export: only the slugs below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

/** Related projects shown before the "view all" link. */
const PROJECT_LIMIT = 6;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return {
    title: service.seoTitle,
    description: serviceDescription(service),
    // The shared OG card: service photos are WebP, which WhatsApp and some
    // crawlers don't preview reliably.
    ...pageUrls(serviceUrl(service)),
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const copy = siteConfig.servicePage;
  const projects = relatedProjects(service);
  const shown = projects.slice(0, PROJECT_LIMIT);
  const category = service.projectCategory;
  const others = siteConfig.services.filter((s) => s.id !== service.id);

  return (
    <>
      <div className="bg-primary-900">
        <Container className="py-8 sm:py-14">
          <BackLink href="/services" label={copy.backLabel} />
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-300 sm:text-lg">
            {service.shortDescription}
          </p>
        </Container>
      </div>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.altText}
              width={800}
              height={600}
              priority
              className="rounded-lg"
            />
          ) : (
            <PhotoComingSoon className="aspect-[4/3] rounded-lg" />
          )}
          <div>
            <p className="leading-relaxed text-slate-600 sm:text-lg">
              {service.fullDescription}
            </p>
            <h2 className="mt-8 text-xl font-bold text-slate-900">
              {copy.includedHeading}
            </h2>
            <ul className="mt-4 space-y-2">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-primary-900"
                  >
                    &#10003;
                  </span>
                  <span className="text-slate-700">{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              {copy.locationNote}
            </p>
          </div>
        </div>
      </Section>

      {shown.length > 0 && (
        <Section
          title={copy.relatedHeading}
          subtitle={`${projects.length} ${projects.length === 1 ? "project" : "projects"} in our portfolio.`}
          className="bg-slate-50"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewLabel={siteConfig.projectPage.viewProject}
              />
            ))}
          </div>
          {projects.length > shown.length && category && (
            <div className="mt-10 text-center">
              <Button
                href={`/projects?type=${encodeURIComponent(category)}`}
                variant="secondary"
              >
                View all {projects.length} projects
              </Button>
            </div>
          )}
        </Section>
      )}

      <Section title={copy.otherHeading}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <li key={s.id}>
              <Link
                href={serviceUrl(s)}
                className="block h-full rounded-lg border border-slate-200 p-4 hover:border-primary-300 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <span className="block font-semibold text-slate-900">
                  {s.title}
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  {s.shortDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner title={siteConfig.projectPage.ctaTitle} />
      <ServiceJsonLd service={service} />
    </>
  );
}
