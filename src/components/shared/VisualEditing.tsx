"use client"

/**
 * Wrapper around @sanity/visual-editing's VisualEditing component.
 * Renders the click-to-edit overlay that lets editors jump from any element
 * on the preview page directly to the correct field in Sanity Studio's
 * Presentation Tool.
 *
 * `portal={false}` renders the overlay inline rather than in a React portal.
 * This is safe here because the component is placed at the root of the layout.
 *
 * Rendered only when draft mode is active (see the marketing layout).
 */
import { VisualEditing as SanityVisualEditing } from "@sanity/visual-editing/react"

export function VisualEditing() {
  return <SanityVisualEditing portal={false} />
}
