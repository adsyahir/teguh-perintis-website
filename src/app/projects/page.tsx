import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/ui/ProjectCard";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed construction, renovation, and civil works by Teguh Perintis Sdn. Bhd. across Johor, covering residential, commercial, and facility projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="A selection of completed works across Johor, built with quality and delivered on time."
      />

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Want results like these?"
        subtitle="Let's discuss how we can deliver the same quality for your project."
      />
    </>
  );
}
