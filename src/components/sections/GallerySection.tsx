import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import type { GallerySectionData } from "@/lib/sanity/types"

export function GallerySection({ data }: { data: GallerySectionData }) {
  return (
    <Section>
      <Container>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            gallerySection · {data.layout} · {data.selectedProjects?.length ?? 0} projects
          </p>
          {data.title && <p className="mt-2 text-lg font-semibold">{data.title}</p>}
        </div>
      </Container>
    </Section>
  )
}
