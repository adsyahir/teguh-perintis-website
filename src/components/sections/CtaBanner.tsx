import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

export default function CtaBanner({
  title = "Have a project in mind?",
  subtitle = "Get a free consultation and quotation with no obligation.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="dark-section bg-primary-700">
      <Container className="flex flex-col items-center gap-6 py-12 text-center sm:gap-8 sm:py-20">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-200 sm:text-lg">{subtitle}</p>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <WhatsAppLink>WhatsApp Us</WhatsAppLink>
          <Button
            href={`tel:${siteConfig.contact.phoneE164}`}
            variant="secondary"
          >
            Call {siteConfig.contact.phoneDisplay}
          </Button>
        </div>
      </Container>
    </div>
  );
}
