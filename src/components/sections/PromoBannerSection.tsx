import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { PromoBannerSectionData } from "@/lib/sanity/types"

export function PromoBannerSection({ data }: { data: PromoBannerSectionData }) {
  return (
    <Section spacing="sm">
      <Container>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">promoBannerSection · {data.style}</p>
          <p className="mt-1 font-medium">{data.text}</p>
        </div>
      </Container>
    </Section>
  )
}
