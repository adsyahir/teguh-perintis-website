import CameraIcon from "@/components/ui/CameraIcon";

/** Stands in for a gallery slot that has no photo yet. Deliberately not an
 * <img> or role="img": there is no picture to describe. */
export default function GalleryPlaceholder({
  labels,
  comingSoon,
}: {
  labels: { en: string; ms: string };
  comingSoon: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-lg border-2 border-dashed border-primary-200 bg-primary-50 p-3 text-center">
      <span className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-700 ring-1 ring-primary-100">
        <CameraIcon className="h-5 w-5" />
      </span>
      <span className="text-sm font-semibold text-primary-900">{labels.en}</span>
      <span lang="ms" className="text-xs text-primary-700 italic">
        {labels.ms}
      </span>
      <span className="mt-1 text-xs text-slate-600">{comingSoon}</span>
    </div>
  );
}
