import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import Section from "@/components/ui/Section";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Certifications from "@/components/sections/Certifications";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CtaBanner from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="CIDB G3 Registered Contractor — Bright, Trusted & Compliant"
        title="Building Johor's Future with Strength and Precision"
        subtitle="From roads and civil infrastructure to engineering projects and building construction — Teguh Perintis delivers reliable building, civil engineering, and M&E solutions across Johor and nearby, combining proven site experience with quality workmanship and compliance to Malaysian standards."
        image="/images/hero-home.jpg"
        imageAlt="Construction site managed by Teguh Perintis"
      />

      <StatsBar />

      <Section
        eyebrow="What We Do"
        title="Our Services"
        subtitle="Complete construction capability under one roof — licensed, certified, and built on quality workmanship."
      >
        <ServicesGrid />
      </Section>

      <Section
        eyebrow="Credentials"
        title="Licensed & Certified"
        subtitle="Registered with CIDB Malaysia and certified to undertake government and private projects."
        className="bg-slate-50"
      >
        <Certifications />
      </Section>

      <Section
        eyebrow="How We Work"
        title="Our Process"
        subtitle="A clear, four-step journey from first consultation to final handover."
      >
        <ProcessSteps />
      </Section>

      <Section
        eyebrow="Our Work"
        title="Featured Projects"
        subtitle="A selection of recently completed works across Johor."
        className="bg-slate-50"
      >
        <FeaturedProjects />
      </Section>

      <CtaBanner />
    </>
  );
}
