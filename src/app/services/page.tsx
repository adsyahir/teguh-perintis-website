import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import Image from "next/image";
import Link from "next/link";
import PhotoComingSoon from "@/components/ui/PhotoComingSoon";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import { serviceUrl } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aluminium domes and pinnacles, aluminium windows, Celuka lattice and CNC-cut panels, architectural metal works, dome refurbishment and roofing by Teguh Perintis Sdn. Bhd.",
  ...pageUrls("/services"),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Aluminium domes, windows, roofing and architectural metal works, from design coordination to installation."
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
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.altText}
                    width={800}
                    height={600}
                    className={`rounded-lg ${index % 2 === 1 ? "lg:order-last" : ""}`}
                  />
                ) : (
                  <PhotoComingSoon
                    className={`aspect-[4/3] rounded-lg ${index % 2 === 1 ? "lg:order-last" : ""}`}
                  />
                )}
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
                  <Link
                    href={serviceUrl(service)}
                    className="mt-6 inline-block text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                  >
                    View service
                    <span className="sr-only">: {service.title}</span>
                  </Link>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>

      <Section
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
