import type { LinkData } from "../types"

/** Resolved link ready for use in an <a> or Next.js <Link> */
export interface ResolvedLink {
  href: string
  target?: "_blank"
  rel?: string
  label: string
  variant: "default" | "button" | "buttonOutline"
}

/**
 * Resolves a Sanity `LinkData` object into a concrete href + anchor attributes.
 *
 * Priority:
 *   1. `internalRef` — a referenced document's slug, mapped to its route prefix
 *   2. `href` — a raw URL or path stored directly on the link object
 *   3. Falls back to `"#"` so the component never renders a broken href
 */
export function resolveLink(link: LinkData): ResolvedLink {
  const href = deriveHref(link)
  const isExternal = href.startsWith("http://") || href.startsWith("https://")

  return {
    href,
    label: link.label,
    variant: link.variant ?? "default",
    ...(link.openInNewTab || isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
  }
}

function deriveHref(link: LinkData): string {
  if (link.internalRef?.slug) {
    return routeForType(link.internalRef._type, link.internalRef.slug)
  }
  if (link.href) return link.href
  return "#"
}

/** Maps a Sanity document _type to its frontend route prefix */
function routeForType(type: string, slug: string): string {
  switch (type) {
    case "service":
      return `/services/${slug}`
    case "serviceArea":
      return `/service-areas/${slug}`
    case "page":
      return `/${slug}`
    default:
      return `/${slug}`
  }
}
