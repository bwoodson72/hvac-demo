import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { ContentSectionData } from "@/lib/sanity/types"

export function ContentSection({ data }: { data: ContentSectionData }) {
  return (
    <Section>
      <Container>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">contentSection · {data.layout}</p>
          {data.title && <p className="mt-2 text-lg font-semibold">{data.title}</p>}
        </div>
      </Container>
    </Section>
  )
}
