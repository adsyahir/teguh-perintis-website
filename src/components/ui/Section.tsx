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
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        {(eyebrow || title || subtitle) && (
          <div className="mb-12 max-w-3xl">
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
            {subtitle && <p className="mt-4 text-lg text-slate-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
