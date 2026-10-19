import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import Section from "@/components/ui/Section";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ClientsList from "@/components/sections/ClientsList";
import CidbCredential from "@/components/sections/CidbCredential";
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
        title="Aluminium Dome & Architectural Metal Specialist"
        subtitle="Design coordination, fabrication and installation for projects across Malaysia."
        imageBase="/images/hero-home"
        imageAlt="Green aluminium dome with a white lattice trim band and gold finial on a mosque roof, with a minaret beside it"
      />

      <StatsBar />

      <Section
        title="Our Services"
        subtitle="Aluminium domes, windows, roofing and architectural metal works, delivered by one in-house team."
      >
        <ServicesGrid />
      </Section>

      <Section
        title="Featured Projects"
        subtitle="A selection of dome and metal works projects across Malaysia."
        className="bg-slate-50"
      >
        <FeaturedProjects />
      </Section>

      <Section
        title="Clients & Agencies"
        subtitle="Government agencies, religious authorities and private developers we have worked with."
      >
        <ClientsList />
      </Section>

      <Section title="Certified Credentials" className="bg-slate-50">
        <CidbCredential />
      </Section>

      <CtaBanner />
    </>
  );
}
