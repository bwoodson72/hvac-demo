/**
 * Generates an inline SVG shimmer as a base64 data URL, suitable for use as
 * `blurDataURL` in Next.js Image's `placeholder="blur"` prop.
 *
 * This avoids the need for a server-side fetch to convert a Sanity blur URL
 * into a data: URI. The shimmer is a generic grey gradient that matches the
 * image's aspect ratio.
 */
export function shimmerDataUrl(w: number, h: number): string {
  const svg = shimmerSvg(w, h)
  const base64 = Buffer.from(svg).toString("base64")
  return `data:image/svg+xml;base64,${base64}`
}

function shimmerSvg(w: number, h: number): string {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e5e7eb" stop-opacity="1" />
      <stop offset="50%" stop-color="#f3f4f6" stop-opacity="1" />
      <stop offset="100%" stop-color="#e5e7eb" stop-opacity="1" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`
}
