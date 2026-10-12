import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import Section from "@/components/ui/Section";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Certifications from "@/components/sections/Certifications";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CtaBanner from "@/components/sections/CtaBanner";

// Title and description are inherited from the root layout — only the
// canonical needs pinning so "/" and "/index.html" do not compete.
export const metadata: Metadata = {
  ...pageUrls("/"),
};

export default function HomePage() {
  return (
    <>
      <Hero
        title="Aluminium Domes Built with Strength and Precision"
        subtitle="From design coordination and in-house fabrication to installation and refurbishment, we deliver aluminium domes and architectural metal works for mosque, institutional and commercial projects across Malaysia."
        imageBase="/images/hero-home"
        imageAlt="Green aluminium dome with a white lattice trim band and gold finial on a mosque roof, with a minaret beside it"
      />

      <StatsBar />

      <Section
        title="Our Services"
        subtitle="Five specialist capabilities, from aluminium domes to architectural metal works, delivered by one in-house team."
      >
        <ServicesGrid />
      </Section>

      <Section
        title="Licensed & Certified"
        subtitle="CIDB G3 registered and certified to undertake government and private projects."
        className="bg-slate-50"
      >
        <Certifications />
      </Section>

      <Section
        title="Our Process"
        subtitle="Four steps from site survey to final handover."
      >
        <ProcessSteps />
      </Section>

      <Section
        title="Featured Projects"
        subtitle="A selection of dome and metal works projects across Malaysia."
        className="bg-slate-50"
      >
        <FeaturedProjects />
      </Section>

      <CtaBanner />
    </>
  );
}
