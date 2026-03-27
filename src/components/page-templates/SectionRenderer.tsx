import { getSectionComponent } from "@/components/sections"
import type { SectionData } from "@/lib/sanity/types"

interface SectionRendererProps {
  sections: SectionData[]
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        const Component = getSectionComponent(section._type)

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div
                key={section._key}
                className="bg-destructive/10 p-4 text-center text-sm text-destructive"
              >
                Unknown section type: {section._type}
              </div>
            )
          }
          return null
        }

        return <Component key={section._key} data={section} />
      })}
    </>
  )
}
