/** Stands in for a service photo the client hasn't supplied yet. */
export default function PhotoComingSoon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-primary-50 text-center ${className}`}
    >
      <span className="text-sm font-medium text-primary-900">Coming soon</span>
    </div>
  );
}
