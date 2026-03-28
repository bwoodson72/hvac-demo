import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import type { StatsSectionData } from "@/lib/sanity/types"

export function StatsSection({ data }: { data: StatsSectionData }) {
  const { title, intro, stats } = data

  if (!stats?.length) return null

  return (
    <Section className="bg-muted/30">
      <Container>
        {(title || intro) && (
          <div className="mb-12 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat._key} className="flex flex-col items-center text-center">
              <div className="font-heading text-5xl font-bold leading-none tracking-tight text-primary">
                {stat.prefix && <span>{stat.prefix}</span>}
                {stat.value}
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
