import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { whatsappHref } from "@/lib/site-config";

export default function Hero({
  eyebrow,
  title,
  subtitle,
  imageBase,
  imageAlt,
  slides = [],
}: {
  /** Optional: skip it when it would only restate the headline. */
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** Path without extension; expects `${imageBase}-{768,1280,1920}.webp` */
  imageBase: string;
  imageAlt: string;
  /** Extra photos that crossfade over the main one; each path is without
   * extension and expects `-768.webp` and `-1440.webp`. Decorative, so they
   * carry no alt text, and they don't show under reduced motion. */
  slides?: readonly string[];
}) {
  return (
    <div className="dark-section relative isolate overflow-hidden bg-primary-900">
      {/* Plain img instead of next/image: static export cannot generate a
          srcset, and this full-bleed LCP image needs responsive sizes plus
          high fetch priority to load fast on mobile. */}
      <div className="absolute inset-0 -z-10 opacity-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${imageBase}-1280.webp`}
          srcSet={`${imageBase}-768.webp 768w, ${imageBase}-1280.webp 1280w, ${imageBase}-1920.webp 1920w`}
          sizes="100vw"
          alt={imageAlt}
          width={1920}
          height={1280}
          fetchPriority="high"
          className="hero-zoom absolute inset-0 h-full w-full object-cover"
        />
        {slides.map((base, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={base}
            src={`${base}-1440.webp`}
            srcSet={`${base}-768.webp 768w, ${base}-1440.webp 1440w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            width={1440}
            height={810}
            fetchPriority="low"
            decoding="async"
            className={`hero-slide hero-slide-${i + 1} hero-zoom absolute inset-0 h-full w-full object-cover`}
          />
        ))}
      </div>
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="hero-rise max-w-3xl">
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
