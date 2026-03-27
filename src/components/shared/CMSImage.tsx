import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  IMAGE_SLOTS,
  sanityImageUrl,
  intrinsicHeight,
  parseAspectRatio,
} from "@/lib/sanity/image"
import type { ImageSlot } from "@/lib/sanity/image"
import type { ImageWithAltData } from "@/lib/sanity/types"
import { shimmerDataUrl } from "./shimmer"

type SlotName = keyof typeof IMAGE_SLOTS

interface CMSImageProps {
  /** Sanity image object with `asset`, optional `hotspot`, optional `alt` */
  image: ImageWithAltData | null | undefined
  /** Which IMAGE_SLOT to use for sizing, quality, and responsive hints */
  slot: SlotName
  /** Override the alt text (falls back to image.alt, then "") */
  alt?: string
  /** Additional classes applied to the outer wrapper div */
  className?: string
  /** Additional classes applied to the <img> element */
  imgClassName?: string
  /**
   * Override slot's `priority` setting.
   * When true: preload={true} + loading="eager".
   * When false: placeholder="blur" shimmer.
   */
  priority?: boolean
}

/**
 * CMSImage — the primary component for rendering Sanity-sourced images.
 *
 * - Reads sizing/quality strategy from IMAGE_SLOTS.
 * - Uses `preload` + `loading="eager"` (Next.js 16) for above-fold images.
 * - Uses shimmer blurDataURL placeholder for below-fold images.
 * - Wraps in an aspect-ratio container when the slot defines `aspectRatio`.
 * - Returns null for missing/null images.
 */
export function CMSImage({
  image,
  slot: slotName,
  alt,
  className,
  imgClassName,
  priority: priorityProp,
}: CMSImageProps) {
  if (!image?.image?.asset) return null

  const slot: ImageSlot = IMAGE_SLOTS[slotName]
  const isPreload = priorityProp ?? slot.priority ?? false

  // Intrinsic dimensions: largest candidate width + derived height
  const widths = slot.widths as readonly number[]
  const maxWidth = widths[widths.length - 1] ?? widths[0] ?? 800
  const intrinsicW = maxWidth
  const intrinsicH = slot.aspectRatio
    ? intrinsicHeight(maxWidth, slot.aspectRatio)
    : maxWidth

  // Build src via Sanity image URL builder
  const src = sanityImageUrl(image.image, intrinsicW, { quality: slot.quality })

  const altText = alt ?? image.alt ?? ""

  const imgProps = {
    src,
    alt: altText,
    width: intrinsicW,
    height: intrinsicH,
    sizes: slot.sizes,
    quality: slot.quality,
    className: cn(
      "h-full w-full",
      slot.objectFit === "cover" ? "object-cover" : "object-contain",
      imgClassName
    ),
    ...(isPreload
      ? { preload: true as const, loading: "eager" as const }
      : { placeholder: "blur" as const, blurDataURL: shimmerDataUrl(intrinsicW, intrinsicH) }),
  }

  // When slot has an aspectRatio, wrap in a sized container so the image
  // fills the allocated space and the layout does not shift.
  if (slot.aspectRatio) {
    const ratio = parseAspectRatio(slot.aspectRatio)
    const paddingBottom = ratio
      ? `${((ratio.h / ratio.w) * 100).toFixed(4)}%`
      : "56.25%" // fallback 16/9

    return (
      <div
        className={cn("relative w-full overflow-hidden", className)}
        style={{ paddingBottom }}
      >
        <Image {...imgProps} className={cn("absolute inset-0", imgProps.className)} fill={false} />
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image {...imgProps} />
    </div>
  )
}
