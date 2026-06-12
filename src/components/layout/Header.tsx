import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import MobileNav from "@/components/layout/MobileNav";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between">
        <Link
          href="/"
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
        >
          <Image
            src="/images/logo.svg"
            alt={`${siteConfig.company.name} logo`}
            width={200}
            height={48}
            priority
          />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-accent-500 px-4 py-2.5 text-sm font-semibold text-primary-900 transition-colors hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
