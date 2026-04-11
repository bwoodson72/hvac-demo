"use client"

import { useSiteContext } from "@/lib/context/SiteContext"
import { ContactSection } from "./ContactSection"
import type { ContactSectionData } from "@/lib/sanity/types"

/**
 * Wraps ContactSection to pull contact info from SiteContext,
 * allowing server components to render a contact section without prop drilling.
 * Explicit data fields take precedence over context values.
 */
export function ContextualContactSection({ data }: { data: ContactSectionData }) {
  const siteContext = useSiteContext()
  return <ContactSection data={{ ...siteContext, ...data }} />
}
