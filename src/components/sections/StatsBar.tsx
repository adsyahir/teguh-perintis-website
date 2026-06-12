import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export default function StatsBar() {
  return (
    <div className="bg-primary-800">
      <Container className="grid grid-cols-2 gap-8 py-12 text-center md:grid-cols-4">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold text-accent-400 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-300">
              {stat.label}
            </p>
          </div>
        ))}
      </Container>
    </div>
  );
}
