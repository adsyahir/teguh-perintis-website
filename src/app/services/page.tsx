import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aluminium domes and pinnacles, aluminium windows and ACP cladding, Celuka lattice and CNC-cut panels, minarets and metal works, and dome refurbishment by Teguh Perintis Sdn. Bhd.",
  ...pageUrls("/services"),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Five specialist capabilities in aluminium domes and architectural metal works, from design coordination to installation."
      />

      <div className="py-16 sm:py-24">
        <Container>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            Whether you are building a new mosque or institutional building,
            or restoring an existing dome, we coordinate the design,
            fabricate in-house, and supply and install every component to
            Malaysian standards.
          </p>

          <div className="mt-16 space-y-20">
            {siteConfig.services.map((service, index) => (
              <section
                key={service.id}
                id={service.id}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <Image
                  src={service.image}
                  alt={service.altText}
                  width={800}
                  height={600}
                  className={`rounded-lg ${index % 2 === 1 ? "lg:order-last" : ""}`}
                />
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    {service.fullDescription}
                  </p>
                  <ul className="mt-6 space-y-2">
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
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>

      <Section
        eyebrow="How We Work"
        title="Our Process"
        className="bg-slate-50"
      >
        <ProcessSteps />
      </Section>

      <CtaBanner
        title="Planning a dome or metal works project?"
        subtitle="Send us your drawings or site details and we'll recommend the right approach."
      />
    </>
  );
}
