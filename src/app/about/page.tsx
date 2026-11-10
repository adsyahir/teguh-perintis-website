import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Teguh Perintis Sdn. Bhd., a Johor-based specialist contractor for aluminium domes and architectural metal works, registered with CIDB at Grade G3.",
  ...pageUrls("/about"),
};

export default function AboutPage() {
  const { company, values, about } = siteConfig;

  return (
    <>
      <PageHero
        title="About Us"
        subtitle="A specialist contractor for aluminium domes and architectural metal works, building on a track record that began in 2014."
      />

      <Section eyebrow="Who We Are" title={company.name}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-slate-600">
            {about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>{about.cidbNote}</p>
          </div>
          <Image
            src="/images/about-company.webp"
            alt="Scaffolding platforms around a gold aluminium dome, seen from above during dome works"
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      </Section>

      <Section
        eyebrow="Our History"
        title="From Teguh Aluminium to Teguh Perintis"
        className="bg-slate-50"
      >
        <ol className="space-y-8 border-l-2 border-secondary-700 pl-6">
          {about.history.map((item) => (
            <li key={item.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[1.9rem] h-3 w-3 rounded-full bg-accent-500 ring-4 ring-slate-50"
              />
              <p className="text-sm font-semibold tracking-wider text-secondary-700 uppercase">
                {item.period}
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-1 text-slate-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="What We Stand For">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-lg border border-slate-200 bg-white p-8"
            >
              <h3 className="text-lg font-bold text-slate-900">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Why Choose Us"
        title="Specialists You Can Rely On"
        className="bg-slate-50"
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {about.whyChooseUs.map((reason) => (
            <li key={reason} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-primary-900"
              >
                &#10003;
              </span>
              <span className="text-slate-700">{reason}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner />
    </>
  );
}
