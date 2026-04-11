import Link from "next/link"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { MapPin } from "lucide-react"
import type { ServiceAreaSectionData, ServiceAreaRef } from "@/lib/sanity/types"

export function ServiceAreaSection({ data }: { data: ServiceAreaSectionData }) {
  const { title, intro, selectedServiceAreas, autoMode } = data
  const areas = selectedServiceAreas ?? []

  return (
    <Section>
      <Container>
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        {areas.length === 0 && autoMode && process.env.NODE_ENV === "development" && (
          <p className="py-8 text-center text-sm text-muted-foreground italic">
            [DEV] autoMode is enabled but no service areas were resolved.
          </p>
        )}

        {areas.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <AreaCard key={area._id} area={area} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

function AreaCard({ area }: { area: ServiceAreaRef }) {
  return (
    <Link
      href={`/service-areas/${area.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary hover:bg-primary/5"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <MapPin className="size-4 text-primary" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-medium group-hover:text-primary transition-colors">
          {area.city}
        </p>
        {area.state && <p className="text-xs text-muted-foreground">{area.state}</p>}
      </div>
    </Link>
  )
}
