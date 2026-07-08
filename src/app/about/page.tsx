import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Teguh Perintis Sdn. Bhd., a CIDB G3 registered contractor in Ulu Tiram, Johor, covering building, civil, and M&E works.",
};

const whyChooseUs = [
  "CIDB G3 registered and fully licensed for government and private projects",
  "Experienced in-house team covering roads, civil, building, and M&E works",
  "Compliant IBS & QA practices with a safety-first culture",
  "On-time delivery backed by disciplined project management",
];

export default function AboutPage() {
  const { company, registration, values } = siteConfig;

  return (
    <>
      <PageHero
        title="About Us"
        subtitle="A CIDB-registered contractor combining proven site experience with quality workmanship and compliance to Malaysian standards."
      />

      <Section eyebrow="Who We Are" title={company.name}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-slate-600">
            <p>
              {company.name} is a construction company based in Ulu Tiram,
              Johor. The company was incorporated in {company.establishedYear}{" "}
              and has been registered with CIDB since 2023, holding an active
              Grade {registration.cidbGrade} certification. We carry out
              building, civil engineering, and mechanical &amp; electrical
              works, all in compliance with Malaysian standards.
            </p>
            <p>
              Our registered scope of work covers construction of roads,
              buildings, and other engineering projects. We handle the full
              job, from site preparation and structural works through to
              finishing and scheduled maintenance, for clients in Johor and
              nearby areas.
            </p>
            <p>
              We keep it simple: give honest advice, follow proper IBS and QA
              practices, finish on time, and hand over work we are happy to
              put our name on.
            </p>
          </div>
          <Image
            src="/images/about-company.webp"
            alt="Reviewing construction drawings at the drafting table"
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      </Section>

      <Section
        eyebrow="Our Values"
        title="What We Stand For"
        className="bg-slate-50"
      >
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
        eyebrow="Credentials"
        title="Registration & Certifications"
        subtitle="Fully registered with the Construction Industry Development Board (CIDB) Malaysia."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <dl className="space-y-4 rounded-lg border border-slate-200 p-8">
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                SSM Registration No.
              </dt>
              <dd className="text-lg font-bold text-slate-900">
                {registration.ssmRegNo}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                CIDB Registration No.
              </dt>
              <dd className="text-lg font-bold text-slate-900">
                {registration.cidbRegNo}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">Grade</dt>
              <dd className="text-lg font-bold text-slate-900">
                {registration.cidbGrade}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                CIDB Member Since
              </dt>
              <dd className="text-lg font-bold text-slate-900">
                {registration.memberSince}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                Valid Until
              </dt>
              <dd className="text-lg font-bold text-slate-900">
                {registration.validUntil}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                Certifications
              </dt>
              <dd className="text-lg font-bold text-slate-900">
                {registration.certifications.join(" · ")}
              </dd>
            </div>
          </dl>
          <div className="space-y-8">
            <div className="rounded-lg border border-slate-200 p-8">
              <h3 className="text-sm font-semibold text-slate-500">
                Registered Categories
              </h3>
              <ul className="mt-4 space-y-3">
                {registration.categories.map((cat) => (
                  <li key={cat.code} className="flex items-center gap-3">
                    <span className="rounded bg-primary-700 px-2 py-1 text-xs font-bold text-white">
                      {cat.code}
                    </span>
                    <span className="font-medium text-slate-900">
                      {cat.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 p-8">
              <h3 className="text-sm font-semibold text-slate-500">
                Nature of Business
              </h3>
              <ul className="mt-4 list-inside list-disc space-y-2 text-slate-900">
                {registration.natureOfBusiness.map((item) => (
                  <li key={item} className="font-medium">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                Service area: {registration.serviceArea}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Why Choose Us"
        title="Built on Trust"
        className="bg-slate-50"
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {whyChooseUs.map((reason) => (
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
