import type { Metadata } from "next"
import { SectionRenderer } from "@/components/page-templates/SectionRenderer"
import { getHomepage, getSiteSettings } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import type { SectionData } from "@/lib/sanity/types"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "Home" }
  try {
    const [homepage, settings] = await Promise.all([getHomepage(), getSiteSettings()])
    return buildMetadata(homepage?.seo ?? null, {
      title: settings?.businessName ?? "Home",
      siteSettings: settings,
      path: "/",
    })
  } catch {
    return { title: "Home" }
  }
}

// ── Fallback sections shown when Sanity is not connected ──────────────────────

const FALLBACK_SECTIONS: SectionData[] = [
  {
    _type: "heroSection",
    _key: "fb-hero",
    title: "Professional Home Services",
    subtitle: "Fast response, fair pricing, and guaranteed workmanship on every job.",
    primaryCta: { label: "Get a Free Quote", href: "/contact" },
    secondaryCta: { label: "Our Services", href: "/services" },
    variant: "centered",
    trustItems: [
      { _key: "t1", icon: "shield", label: "Licensed & Insured" },
      { _key: "t2", icon: "star", label: "5-Star Rated" },
      { _key: "t3", icon: "clock", label: "Same-Day Service" },
    ],
  },
  {
    _type: "trustBarSection",
    _key: "fb-trust",
    layout: "inline",
    items: [
      { _key: "i1", icon: "badgeCheck", label: "Licensed & Insured" },
      { _key: "i2", icon: "trophy", label: "Years Experience", value: "20+" },
      { _key: "i3", icon: "users", label: "Happy Customers", value: "5,000+" },
      { _key: "i4", icon: "star", label: "Average Rating", value: "4.9★" },
    ],
  },
  {
    _type: "ctaBandSection",
    _key: "fb-cta",
    title: "Ready to Get Started?",
    text: "Contact us today for a free, no-obligation estimate.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    background: "primary",
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  let sections: SectionData[] | undefined

  if (isSanityConfigured) {
    try {
      const homepage = await getHomepage()
      sections = homepage?.sections
    } catch {
      // Sanity configured but unreachable — use fallback
    }
  }

  const renderSections = sections ?? FALLBACK_SECTIONS
  const showDevNotice = !isSanityConfigured && process.env.NODE_ENV === "development"

  return (
    <main>
      {showDevNotice && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-800">
          Sanity not configured — showing fallback content. Set{" "}
          <code className="font-mono">NEXT_PUBLIC_SANITY_PROJECT_ID</code> in{" "}
          <code className="font-mono">.env.local</code>.
        </div>
      )}
      <SectionRenderer sections={renderSections} />
    </main>
  )
}
