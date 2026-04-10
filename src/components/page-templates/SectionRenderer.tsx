import { getSectionComponent } from "@/components/sections"
import type { SectionData, SiteSettingsData } from "@/lib/sanity/types"

interface SiteContext {
  phone?: string
  email?: string
  address?: SiteSettingsData["address"]
  businessHours?: SiteSettingsData["businessHours"]
}

interface SectionRendererProps {
  sections: SectionData[]
  siteContext?: SiteContext
}

export function SectionRenderer({ sections, siteContext }: SectionRendererProps) {
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

        const data =
          section._type === "contactSection" && siteContext
            ? { ...section, ...siteContext }
            : section

        return <Component key={section._key} data={data} />
      })}
    </>
  )
}
