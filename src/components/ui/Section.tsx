import Container from "@/components/ui/Container";

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className = "",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-12 sm:py-24 ${className}`}>
      <Container>
        {(eyebrow || title || subtitle) && (
          <div className="mb-8 max-w-3xl sm:mb-12">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold tracking-wider text-secondary-700 uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-slate-600 sm:mt-4 sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
