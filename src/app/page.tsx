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
        eyebrow="CIDB G3 Registered Contractor"
        title="Building Johor's Future with Strength and Precision"
        subtitle="We build roads, infrastructure, and buildings across Johor and nearby areas. From site preparation to handover, our work is done properly and complies with Malaysian standards."
        image="/images/hero-home.jpg"
        imageAlt="Construction site managed by Teguh Perintis"
      />

      <StatsBar />

      <Section
        eyebrow="What We Do"
        title="Our Services"
        subtitle="Licensed and certified, with complete construction capability under one roof."
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
