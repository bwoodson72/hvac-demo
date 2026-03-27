import type { Metadata } from "next"
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio"

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Sanity Studio",
}

export const viewport = studioViewport

/**
 * Dedicated layout for /studio — bypasses the root layout so the Studio
 * gets the full viewport with no site chrome (header, footer, etc.).
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
