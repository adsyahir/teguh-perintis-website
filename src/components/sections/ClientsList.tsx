import { siteConfig } from "@/lib/site-config";

export default function ClientsList() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {siteConfig.clients.map((client) => (
        <li
          key={client}
          className="rounded-lg border border-l-4 border-slate-200 border-l-secondary-700 bg-white px-5 py-4 text-sm font-medium text-slate-800"
        >
          {client}
        </li>
      ))}
    </ul>
  );
}
