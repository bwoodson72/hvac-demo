import Image from "next/image"
import { cn } from "@/lib/utils"
import { IMAGE_SLOTS, sanityImageUrl } from "@/lib/sanity/image"
import type { ImageSlot } from "@/lib/sanity/image"
import type { ImageWithAltData } from "@/lib/sanity/types"
import { shimmerDataUrl } from "./shimmer"

type SlotName = keyof typeof IMAGE_SLOTS

interface CMSImageFillProps {
  /** Sanity image object with `asset`, optional `hotspot`, optional `alt` */
  image: ImageWithAltData | null | undefined
  /** Which IMAGE_SLOT to use for sizing, quality, and responsive hints */
  slot: SlotName
  /** Override the alt text (falls back to image.alt, then "") */
  alt?: string
  /** Classes applied to the <img> element (object-fit etc.) */
  className?: string
  /**
   * Override slot's `priority` setting.
   * When true: preload={true} + loading="eager".
   */
  priority?: boolean
}

/**
 * CMSImageFill — fill-mode variant of CMSImage.
 *
 * Use this when the parent container controls dimensions (e.g., a hero section
 * with a fixed height, or a card thumbnail with `position: relative`).
 * The parent **must** have `position: relative` (or absolute/fixed).
 *
 * - Returns null for missing/null images.
 * - Uses `fill` prop so Next.js generates a full responsive srcset.
 * - Applies object-fit from the slot definition.
 */
export function CMSImageFill({
  image,
  slot: slotName,
  alt,
  className,
  priority: priorityProp,
}: CMSImageFillProps) {
  if (!image?.image?.asset) return null

  const slot: ImageSlot = IMAGE_SLOTS[slotName]
  const isPreload = priorityProp ?? slot.priority ?? false

  // Use the largest slot width for the base src
  const widths = slot.widths as readonly number[]
  const maxWidth = widths[widths.length - 1] ?? widths[0] ?? 1920
  const src = sanityImageUrl(image.image, maxWidth, { quality: slot.quality })

  const altText = alt ?? image.alt ?? ""

  return (
    <Image
      fill
      src={src}
      alt={altText}
      sizes={slot.sizes}
      quality={slot.quality}
      className={cn(
        slot.objectFit === "cover" ? "object-cover" : "object-contain",
        className
      )}
      {...(isPreload
        ? { preload: true as const, loading: "eager" as const }
        : { placeholder: "blur" as const, blurDataURL: shimmerDataUrl(maxWidth, Math.round(maxWidth * 0.5625)) })}
    />
  )
}
