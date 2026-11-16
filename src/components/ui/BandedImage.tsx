import Image from "next/image";
import type { CSSProperties } from "react";
import { fileHeight } from "@/lib/band";

/**
 * A photo whose file carries the watermark band (src/lib/band.ts), shown with
 * the band clipped off. `width`/`height` are the clean photo's size.
 *
 * - "flow": the frame takes the photo's own shape at the given width.
 * - "cover": the photo fills the frame `className` sizes (like object-cover),
 *   using container units to scale the clean area, not the whole file.
 *
 * The frame is two pixel rows shorter than the photo, so rounding never lets
 * a sliver of the band show. `zoomClassName` goes on the moving layer (hover
 * zoom) in cover mode.
 */
export default function BandedImage({
  src,
  alt,
  width,
  height,
  fit = "flow",
  className = "",
  zoomClassName = "",
  style,
  loading,
  fetchPriority,
  draggable,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "flow" | "cover";
  className?: string;
  zoomClassName?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  draggable?: boolean;
}) {
  const ratio = width / (height - 2);
  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={fileHeight(width, height)}
      loading={loading}
      fetchPriority={fetchPriority}
      draggable={draggable}
      className="block h-auto w-full"
    />
  );

  if (fit === "cover") {
    // The inner layer is absolutely placed, so the frame must be positioned;
    // keep the caller's `absolute` (gallery tiles) instead of overriding it.
    const position = /\babsolute\b/.test(className) ? "" : "relative";
    return (
      <div
        className={`${position} overflow-hidden [container-type:size] ${className}`}
        style={style}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden ${zoomClassName}`}
          style={{ aspectRatio: ratio, width: `max(100cqw, 100cqh * ${ratio})` }}
        >
          {img}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      {img}
    </div>
  );
}
