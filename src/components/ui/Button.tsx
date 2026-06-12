import Link from "next/link";

const variants = {
  primary:
    "bg-accent-500 text-primary-900 hover:bg-accent-400 active:bg-accent-600",
  secondary:
    "border-2 border-current text-primary-700 hover:bg-primary-50 [.dark-section_&]:text-white [.dark-section_&]:hover:bg-white/10",
} as const;

export default function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  // Internal routes go through Link; tel:/mailto: render as plain anchors.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
