import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { TrustBarSectionData } from "@/lib/sanity/types"

export function TrustBarSection({ data }: { data: TrustBarSectionData }) {
  return (
    <Section spacing="sm">
      <Container>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            trustBarSection · {data.layout} · {data.items?.length ?? 0} items
          </p>
        </div>
      </Container>
    </Section>
  )
}
