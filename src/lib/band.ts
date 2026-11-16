/**
 * Photos carry a watermark band under them, added by scripts/watermark.py.
 * Pages never show it (BandedImage clips it off); a visitor who opens the
 * file in a new tab or saves it gets the band. Site-config keeps each photo's
 * CLEAN size; these helpers give the file's real size.
 */

/** Keep in sync with band_height() in scripts/watermark.py. */
export function bandHeight(width: number) {
  return Math.max(24, Math.round(width * 0.06));
}

/** The file's height: the clean photo plus its band. */
export function fileHeight(width: number, height: number) {
  return height + bandHeight(width);
}
