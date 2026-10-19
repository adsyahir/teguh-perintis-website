import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const { cidbGrade, cidbRegNo } = siteConfig.registration;

// Official logo from cidb.gov.my. CIDB asks registered contractors to apply
// for permission before displaying it (see README).
export default function CidbCredential() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border border-slate-200 bg-white p-6 text-center sm:flex-row sm:gap-10 sm:p-8 sm:text-left">
      <Image
        src="/images/cidb-malaysia.webp"
        alt="CIDB Malaysia"
        width={480}
        height={146}
        className="h-14 w-auto sm:h-16"
      />
      <div>
        <p className="text-lg font-bold text-slate-900">
          CIDB Grade {cidbGrade}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Registered with the Construction Industry Development Board Malaysia
          for government and private projects.
        </p>
        <p className="mt-2 text-sm text-slate-600 tabular-nums">
          Registration No. {cidbRegNo}
        </p>
      </div>
    </div>
  );
}
