import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const { company, registration, contact, nav } = siteConfig;

  return (
    <footer className="border-t-4 border-secondary-700 bg-primary-900 text-slate-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Image
            src="/images/logo-mark-white.png"
            alt=""
            width={101}
            height={64}
            className="h-12 w-auto"
          />
          <p className="mt-4 text-lg font-bold text-white">{company.name}</p>
          <p className="mt-3 text-sm leading-relaxed">{company.description}</p>
          <p className="mt-4 text-sm">
            SSM Reg. No: {registration.ssmRegNo}
            <br />
            CIDB Reg. No: {registration.cidbRegNo}
            <br />
            Grade {registration.cidbGrade} &middot;{" "}
            {registration.certifications.join(" / ")}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wider text-white uppercase">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm transition-colors hover:text-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wider text-white uppercase">
            Contact Us
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <a
                href={`tel:${contact.phoneE164}`}
                className="transition-colors hover:text-accent-400"
              >
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-accent-400"
              >
                {contact.email}
              </a>
            </p>
            <p>{contact.hours}</p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights
            reserved.
          </p>
          <p>
            Aluminium Dome &amp; Architectural Metal Specialist &middot;{" "}
            {company.location}
          </p>
        </Container>
      </div>
    </footer>
  );
}
