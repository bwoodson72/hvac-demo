import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { HeroSectionData } from "@/lib/sanity/types"

export function HeroSection({ data }: { data: HeroSectionData }) {
  return (
    <Section>
      <Container>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">heroSection · {data.variant}</p>
          <p className="mt-2 text-lg font-semibold">{data.title}</p>
          {data.subtitle && <p className="mt-1 text-muted-foreground">{data.subtitle}</p>}
        </div>
      </Container>
    </Section>
  )
}
