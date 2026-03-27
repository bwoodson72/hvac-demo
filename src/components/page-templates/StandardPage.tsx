import { HeroSection } from "@/components/sections/HeroSection"
import { SectionRenderer } from "./SectionRenderer"
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
          data={{ variant: "centered", ...hero, _type: "heroSection", _key: "page-hero" }}
        />
      )}
      {sections && <SectionRenderer sections={sections} />}
    </main>
  )
}
