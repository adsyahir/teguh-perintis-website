import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { whatsappHref } from "@/lib/site-config";

export default function Hero({
  eyebrow,
  title,
  subtitle,
  imageBase,
  imageAlt,
}: {
  /** Optional: skip it when it would only restate the headline. */
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** Path without extension; expects `${imageBase}-{768,1280,1920}.webp` */
  imageBase: string;
  imageAlt: string;
}) {
  return (
    <div className="dark-section relative isolate overflow-hidden bg-primary-900">
      {/* Plain img instead of next/image: static export cannot generate a
          srcset, and this full-bleed LCP image needs responsive sizes plus
          high fetch priority to load fast on mobile. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${imageBase}-1280.webp`}
        srcSet={`${imageBase}-768.webp 768w, ${imageBase}-1280.webp 1280w, ${imageBase}-1920.webp 1920w`}
        sizes="100vw"
        alt={imageAlt}
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold tracking-wider text-accent-400 uppercase">
              {eyebrow}
            </p>
          )}
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
