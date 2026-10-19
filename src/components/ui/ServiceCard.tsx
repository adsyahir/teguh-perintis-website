import Image from "next/image";
import Link from "next/link";
import PhotoComingSoon from "@/components/ui/PhotoComingSoon";
import type { Service } from "@/lib/site-config";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <div className="overflow-hidden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.altText}
            width={800}
            height={600}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PhotoComingSoon className="h-48" />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {service.shortDescription}
        </p>
        <Link
          href={`/services#${service.id}`}
          className="mt-4 inline-block text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
        >
          See what&apos;s included
        </Link>
      </div>
    </article>
  );
}
