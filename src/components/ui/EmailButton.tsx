import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const { email, emailSubject } = siteConfig.contact;
const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/** Opens the visitor's mail app with the address and subject filled in. */
export default function EmailButton({
  children = "Email Us",
}: {
  children?: React.ReactNode;
}) {
  return (
    <Button href={mailtoHref} variant="secondary">
      <EmailIcon />
      {children}
    </Button>
  );
}
