import { siteConfig } from "@/lib/site-config";

export default function ProcessSteps() {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {siteConfig.process.map((item) => (
        <li key={item.step} className="relative">
          <p className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 text-xl font-bold text-primary-900">
            {item.step}
          </p>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
