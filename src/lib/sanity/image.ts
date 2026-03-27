import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url"
import { sanityClient } from "./client"

const builder = imageUrlBuilder(sanityClient)

/**
 * Returns an image URL builder pre-seeded with the project credentials.
 *
 * @example
 * urlFor(image).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── Image slot definitions ────────────────────────────────────────────────────

export interface ImageSlot {
  /** CSS aspect-ratio value, e.g. "16/9". Omit for unconstrained slots. */
  aspectRatio?: string
  /** Value for the <img> sizes attribute — drives srcset selection. */
  sizes: string
  quality?: number
  /** True for above-the-fold / LCP images. Maps to preload + loading="eager". */
  priority?: boolean
  objectFit?: "cover" | "contain"
  /**
   * Candidate widths for the Sanity image URL builder.
   * The largest value is used as the intrinsic width for Next.js Image.
   */
  widths: number[]
}

export const IMAGE_SLOTS = {
  hero: {
    aspectRatio: "16/9",
    sizes: "100vw",
    quality: 80,
    priority: true,
    objectFit: "cover",
    widths: [640, 828, 1080, 1280, 1536, 1920],
  },
  heroMobile: {
    aspectRatio: "4/3",
    sizes: "100vw",
    quality: 75,
    priority: true,
    objectFit: "cover",
    widths: [360, 640, 750],
  },
  sectionFeature: {
    aspectRatio: "3/2",
    sizes: "(min-width: 1024px) 50vw, 100vw",
    quality: 75,
    objectFit: "cover",
    widths: [384, 640, 828, 1080],
  },
  serviceCard: {
    aspectRatio: "3/2",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    quality: 70,
    objectFit: "cover",
    widths: [256, 384, 512, 640],
  },
  testimonialAvatar: {
    aspectRatio: "1/1",
    sizes: "64px",
    quality: 70,
    objectFit: "cover",
    widths: [64, 128],
  },
  teamPortrait: {
    aspectRatio: "3/4",
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
    quality: 75,
    objectFit: "cover",
    widths: [256, 384, 512],
  },
  galleryLandscape: {
    aspectRatio: "16/9",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    quality: 75,
    objectFit: "cover",
    widths: [384, 512, 640, 828],
  },
  galleryPortrait: {
    aspectRatio: "3/4",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    quality: 75,
    objectFit: "cover",
    widths: [256, 384, 512, 640],
  },
  logo: {
    sizes: "200px",
    quality: 90,
    objectFit: "contain",
    widths: [128, 256],
  },
  ogImage: {
    aspectRatio: "1200/630",
    sizes: "1200px",
    quality: 80,
    widths: [1200],
  },
} as const satisfies Record<string, ImageSlot>

// ── URL helpers ───────────────────────────────────────────────────────────────

/**
 * Generates a Sanity CDN image URL at a specific width with quality, auto
 * format, and hotspot-aware cropping applied.
 */
export function sanityImageUrl(
  source: SanityImageSource,
  width: number,
  options?: { quality?: number; height?: number }
): string {
  let b = urlFor(source).width(width).auto("format").fit("crop")

  if (options?.height) b = b.height(options.height)
  if (options?.quality) b = b.quality(options.quality)

  return b.url()
}

/**
 * Generates a tiny blurred Sanity URL suitable for use as a shimmer
 * placeholder. The URL itself is not a data: URL — to use it as
 * `blurDataURL` in Next.js Image you must fetch it server-side and
 * base64-encode it. See CMSImage for the shimmer SVG approach instead.
 */
export function getBlurPlaceholder(source: SanityImageSource): string {
  return urlFor(source).width(20).quality(20).blur(50).auto("format").url()
}

// ── Aspect ratio helpers ──────────────────────────────────────────────────────

/**
 * Parses an aspect ratio string like "16/9" or "3/2" into a numeric ratio.
 * Returns undefined for invalid or missing values.
 */
export function parseAspectRatio(
  aspectRatio: string | undefined
): { w: number; h: number } | undefined {
  if (!aspectRatio) return undefined
  const parts = aspectRatio.split("/")
  const w = Number(parts[0])
  const h = Number(parts[1])
  if (!w || !h || isNaN(w) || isNaN(h)) return undefined
  return { w, h }
}

/**
 * Derives the intrinsic height for a Next.js Image component given a target
 * width and an aspect ratio string.
 */
export function intrinsicHeight(width: number, aspectRatio: string): number {
  const ratio = parseAspectRatio(aspectRatio)
  if (!ratio) return width // fallback to square
  return Math.round((width * ratio.h) / ratio.w)
}
