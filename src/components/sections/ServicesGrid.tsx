import ServiceCard from "@/components/ui/ServiceCard";
import { siteConfig } from "@/lib/site-config";

export default function ServicesGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {siteConfig.services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
