import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { TestimonialSectionData } from "@/lib/sanity/types"

export function TestimonialSection({ data }: { data: TestimonialSectionData }) {
  return (
    <Section>
      <Container>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            testimonialSection · {data.layout} · {data.autoMode ? "auto" : "manual"}
          </p>
          {data.title && <p className="mt-2 text-lg font-semibold">{data.title}</p>}
        </div>
      </Container>
    </Section>
  )
}
