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
      <Container className="py-10 sm:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-300 sm:mt-4 sm:text-lg">{subtitle}</p>
      </Container>
    </div>
  );
}
