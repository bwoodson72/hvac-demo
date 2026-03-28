import Link from "next/link"
import { Button } from "@/components/ui/button"
import { resolveLink } from "@/lib/sanity/mappers/links"
import type { LinkData } from "@/lib/sanity/types"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  link: LinkData
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "lg"
  className?: string
}

/**
 * Renders a shadcn Button that wraps a resolved Sanity LinkData.
 * Internal links use Next.js <Link> for prefetching; external links use <a>.
 */
export function CTAButton({ link, variant = "default", size = "default", className }: CTAButtonProps) {
  const resolved = resolveLink(link)
  const isExternal = !!resolved.target

  if (isExternal) {
    return (
      <Button variant={variant} size={size} className={cn(className)} asChild>
        <a href={resolved.href} target={resolved.target} rel={resolved.rel}>
          {resolved.label}
        </a>
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size} className={cn(className)} asChild>
      <Link href={resolved.href}>{resolved.label}</Link>
    </Button>
  )
}
