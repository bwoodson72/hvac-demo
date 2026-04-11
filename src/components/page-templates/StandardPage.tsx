import { HeroSection } from "@/components/sections/HeroSection"
import { SectionRendererWithContext } from "./SectionRendererWithContext"
import type { SectionData } from "@/lib/sanity/types"
import type { HeroData } from "@/lib/sanity/types"

interface StandardPageProps {
  hero?: HeroData
  sections?: SectionData[]
}

export function StandardPage({ hero, sections }: StandardPageProps) {
  return (
    <main>
      {hero && (
        <HeroSection
          data={{ ...hero, _type: "heroSection", _key: "page-hero" }}
        />
      )}
      {sections && <SectionRendererWithContext sections={sections} />}
    </main>
  )
}
