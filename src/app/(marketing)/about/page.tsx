import type { Metadata } from "next"
import { getPageBySlug, getSiteSettings } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { StandardPage } from "@/components/page-templates"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import type { SectionData } from "@/lib/sanity/types"
import type { PortableTextBlock } from "next-sanity"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "About Us" }
  try {
    const [page, settings] = await Promise.all([
      getPageBySlug("about"),
      getSiteSettings(),
    ])
    return buildMetadata(page?.seo ?? null, {
      title: "About Us",
      siteSettings: settings,
      path: "/about",
    })
  } catch {
    return { title: "About Us" }
  }
}

// ── Fallback ──────────────────────────────────────────────────────────────────

const fallbackBody: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "ab1",
    style: "normal",
    children: [
      {
        _type: "span",
        _key: "abs1",
        text: "We're a locally owned and operated home services company with over 20 years of experience. Our team of licensed professionals takes pride in delivering quality workmanship and exceptional customer service on every job.",
        marks: [],
      },
    ],
    markDefs: [],
  },
]

const FALLBACK_SECTIONS: SectionData[] = [
  {
    _type: "heroSection",
    _key: "about-hero",
    title: "About Our Company",
    subtitle: "20+ years of trusted service in the community.",
    variant: "compact",
  },
  {
    _type: "contentSection",
    _key: "about-content",
    title: "Who We Are",
    body: fallbackBody,
    layout: "default",
    cta: { label: "Contact Us", href: "/contact" },
  },
  {
    _type: "statsSection",
    _key: "about-stats",
    title: "By the Numbers",
    stats: [
      { _key: "s1", value: "20", suffix: "+", label: "Years in Business" },
      { _key: "s2", value: "5,000", suffix: "+", label: "Jobs Completed" },
      { _key: "s3", value: "4.9", label: "Star Rating" },
      { _key: "s4", value: "100", suffix: "%", label: "Licensed & Insured" },
    ],
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  if (isSanityConfigured) {
    try {
      const page = await getPageBySlug("about")
      if (page) {
        return <StandardPage hero={page.hero} sections={page.sections} />
      }
    } catch {
      // fall through to fallback
    }
  }

  // Fallback: static about page
  return (
    <main>
      <StandardPage sections={FALLBACK_SECTIONS} />
    </main>
  )
}
