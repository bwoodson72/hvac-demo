import { SectionRenderer } from "@/components/page-templates/SectionRenderer"
import type { SectionData } from "@/lib/sanity/types"

const testSections: SectionData[] = [
  {
    _type: "heroSection",
    _key: "1",
    title: "Welcome to Our Service",
    variant: "centered",
  },
  {
    _type: "trustBarSection",
    _key: "2",
    items: [],
    layout: "inline",
  },
  {
    _type: "ctaBandSection",
    _key: "3",
    title: "Ready to Get Started?",
    background: "primary",
  },
]

export default function HomePage() {
  return (
    <main>
      <SectionRenderer sections={testSections} />
    </main>
  )
}
