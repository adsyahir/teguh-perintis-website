import Container from "@/components/ui/Container";

export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-primary-900">
      <Container className="py-16 sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">{subtitle}</p>
      </Container>
    </div>
  );
}
