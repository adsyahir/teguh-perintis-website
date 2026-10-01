import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import ClientsList from "@/components/sections/ClientsList";
import ProjectBrowser from "@/components/sections/ProjectBrowser";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";
import { projectsInDisplayOrder } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Aluminium dome, cladding and metal works projects by Teguh Perintis Sdn. Bhd. for mosques, institutions and commercial clients across Malaysia.",
  ...pageUrls("/projects"),
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="Aluminium domes, cladding and metal works for mosques, institutions and commercial clients across Malaysia."
      />

      {/* No visible heading: it would only repeat the hero's "Our Projects",
          and the type filter already shows the project counts. */}
      <Section className="bg-slate-50">
        <h2 className="sr-only">Project portfolio</h2>
        <ProjectBrowser
          projects={projectsInDisplayOrder()}
          viewLabel={siteConfig.projectPage.viewProject}
        />
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
