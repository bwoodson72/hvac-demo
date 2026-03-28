import type { Metadata } from "next"
import { getAllProjects, getPageBySlug, getSiteSettings } from "@/lib/sanity/queries"
import { buildMetadata } from "@/lib/sanity/mappers"
import { isSanityConfigured } from "@/lib/sanity/client"
import { HeroSection } from "@/components/sections/HeroSection"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { GalleryPageClient } from "./GalleryPageClient"
import type { ProjectData, ProjectRef } from "@/lib/sanity/types"

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured) return { title: "Project Gallery" }
  try {
    const [page, settings] = await Promise.all([
      getPageBySlug("gallery"),
      getSiteSettings(),
    ])
    return buildMetadata(page?.seo ?? null, {
      title: "Project Gallery",
      description: "Browse our recent projects and completed work.",
      siteSettings: settings,
      path: "/gallery",
    })
  } catch {
    return { title: "Project Gallery" }
  }
}

// ── Helper ────────────────────────────────────────────────────────────────────

function toRef(p: ProjectData): ProjectRef {
  return {
    _id: p._id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    afterImage: p.afterImage,
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function GalleryPage() {
  let projects: ProjectData[] = []
  let heroTitle = "Our Work"
  let heroSubtitle: string | undefined

  if (isSanityConfigured) {
    try {
      const [all, page] = await Promise.all([
        getAllProjects(),
        getPageBySlug("gallery"),
      ])
      projects = all
      if (page?.hero?.title) heroTitle = page.hero.title
      if (page?.hero?.subtitle) heroSubtitle = page.hero.subtitle
    } catch {
      // use defaults
    }
  }

  const projectRefs = projects.map(toRef)
  const categories = [...new Set(projects.map((p) => p.category).filter((c): c is string => !!c))]

  return (
    <main>
      <HeroSection
        data={{
          _type: "heroSection",
          _key: "gallery-hero",
          title: heroTitle,
          subtitle: heroSubtitle ?? "A look at some of our recent completed projects.",
          variant: "compact",
        }}
      />

      {projectRefs.length > 0 ? (
        <GalleryPageClient projects={projectRefs} categories={categories} layout="grid" />
      ) : (
        <Section>
          <Container size="sm">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {isSanityConfigured
                  ? "No projects have been added yet."
                  : "Connect Sanity to display gallery projects."}
              </p>
            </div>
          </Container>
        </Section>
      )}
    </main>
  )
}
