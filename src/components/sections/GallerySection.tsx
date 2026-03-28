import Link from "next/link"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { GallerySectionData, ProjectRef } from "@/lib/sanity/types"

export function GallerySection({ data }: { data: GallerySectionData }) {
  const { title, intro, selectedProjects, layout } = data
  const projects = selectedProjects ?? []

  return (
    <Section>
      <Container>
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        {layout === "grid" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        )}

        {layout === "masonry" && (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {projects.map((p) => (
              <div key={p._id} className="mb-5 break-inside-avoid">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        )}

        {layout === "carousel" && (
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((p) => (
              <div key={p._id} className="w-[280px] shrink-0 snap-start sm:w-[340px]">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

function ProjectCard({ project }: { project: ProjectRef }) {
  const inner = (
    <div className="group overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow hover:shadow-md">
      {project.afterImage ? (
        <CMSImage image={project.afterImage} slot="galleryLandscape" className="w-full" />
      ) : (
        <div className="aspect-video w-full bg-muted" />
      )}
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <span className="font-heading text-sm font-medium leading-snug group-hover:text-primary transition-colors">
            {project.title}
          </span>
          {project.category && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {project.category}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )

  if (project.slug) {
    return <Link href={`/gallery/${project.slug}`}>{inner}</Link>
  }
  return inner
}
