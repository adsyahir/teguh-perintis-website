import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { whatsappHref } from "@/lib/site-config";

export default function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="dark-section relative isolate overflow-hidden bg-primary-900">
      <Image
        src={image}
        alt={imageAlt}
        width={1920}
        height={900}
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold tracking-wider text-accent-400 uppercase">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-200">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={whatsappHref} external>
              Request a Consultation
            </Button>
            <Button href="/projects" variant="secondary">
              View Our Projects
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
