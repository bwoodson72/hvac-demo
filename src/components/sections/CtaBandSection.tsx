import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { CtaBandSectionData } from "@/lib/sanity/types"

export function CtaBandSection({ data }: { data: CtaBandSectionData }) {
  return (
    <Section spacing="sm">
      <Container>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">ctaBandSection · bg:{data.background}</p>
          <p className="mt-2 text-lg font-semibold">{data.title}</p>
          {data.text && <p className="mt-1 text-muted-foreground">{data.text}</p>}
        </div>
      </Container>
    </Section>
  )
}
