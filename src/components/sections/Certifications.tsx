import { siteConfig } from "@/lib/site-config";

export default function Certifications() {
  const { registration } = siteConfig;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg bg-primary-700 p-6 text-center">
        <p className="text-3xl font-bold text-accent-400">
          {registration.cidbGrade}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-200">CIDB Grade</p>
        <p className="mt-3 text-xs text-slate-300">
          Reg. No: {registration.cidbRegNo}
          <br />
          Valid until {registration.validUntil}
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
        <p className="text-xl font-bold text-primary-700">
          {registration.certifications.join(" · ")}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-600">
          Certified &amp; Recognized
        </p>
      </div>
      {registration.categories.slice(0, 2).map((cat) => (
        <div
          key={cat.code}
          className="rounded-lg border border-slate-200 bg-white p-6 text-center"
        >
          <p className="text-xl font-bold text-primary-700">{cat.code}</p>
          <p className="mt-1 text-sm font-medium text-slate-600">{cat.label}</p>
        </div>
      ))}
    </div>
  );
}
