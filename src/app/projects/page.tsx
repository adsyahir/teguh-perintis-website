import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/ui/ProjectCard";
import ClientsList from "@/components/sections/ClientsList";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Aluminium dome, cladding and metal works projects by Teguh Perintis Sdn. Bhd. for mosques, institutions and commercial clients across Malaysia.",
  ...pageUrls("/projects"),
};

// Newest first, so the latest work leads each section.
const byYearDesc = (a: { year: string }, b: { year: string }) =>
  Number(b.year) - Number(a.year);

export default function ProjectsPage() {
  const ongoing = siteConfig.projects
    .filter((p) => p.status === "ongoing")
    .sort(byYearDesc);
  const completed = siteConfig.projects
    .filter((p) => p.status === "completed")
    .sort(byYearDesc);

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="Aluminium domes, cladding and metal works for mosques, institutions and commercial clients across Malaysia."
      />

      <Section
        eyebrow="In Progress"
        title="Ongoing Projects"
        subtitle={`${ongoing.length} projects currently under way.`}
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ongoing.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Track Record"
        title="Completed Projects"
        subtitle={`${completed.length} projects delivered to date.`}
        className="bg-slate-50"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {completed.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Trusted By"
        title="Clients & Agencies"
        subtitle="Government agencies, religious authorities and private developers we have worked with."
      >
        <ClientsList />
      </Section>

      <CtaBanner
        title="Want results like these?"
        subtitle="Let's discuss how we can deliver the same quality for your project."
      />
    </>
  );
}
