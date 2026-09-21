import type { Metadata } from "next";
import { pageUrls } from "@/lib/page-metadata";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import CtaBanner from "@/components/sections/CtaBanner";
import { WhatsAppLink } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Teguh Perintis Sdn. Bhd. in Ulu Tiram, Johor. Call, WhatsApp, or visit us to discuss your construction, renovation, or maintenance project.",
  ...pageUrls("/contact"),
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch for a free consultation. We usually reply within the same working day."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <address className="space-y-6 not-italic">
              <div>
                <h2 className="text-sm font-semibold tracking-wider text-accent-600 uppercase">
                  Address
                </h2>
                <p className="mt-2 text-lg text-slate-900">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold tracking-wider text-accent-600 uppercase">
                  Phone
                </h2>
                <p className="mt-2">
                  <a
                    href={`tel:${contact.phoneE164}`}
                    className="text-lg font-semibold text-primary-700 hover:text-primary-600"
                  >
                    {contact.phoneDisplay}
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold tracking-wider text-accent-600 uppercase">
                  Business Hours
                </h2>
                <p className="mt-2 text-lg text-slate-900">{contact.hours}</p>
              </div>
            </address>

            <div>
              <h2 className="text-sm font-semibold tracking-wider text-accent-600 uppercase">
                Prefer instant messaging?
              </h2>
              <div className="mt-3">
                <WhatsAppLink>Chat on WhatsApp</WhatsAppLink>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <iframe
              src={contact.googleMapsEmbedUrl}
              title="Teguh Perintis office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full min-h-96 w-full border-0"
            />
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Ready to start your project?"
        subtitle="One message is all it takes to get a free consultation."
      />
    </>
  );
}
