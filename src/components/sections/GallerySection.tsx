import Link from "next/link"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { Badge } from "@/components/ui/badge"
import type { GallerySectionData, ProjectRef } from "@/lib/sanity/types"

export function GallerySection({ data }: { data: GallerySectionData }) {
  const { title, intro, selectedProjects } = data
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ProjectCard({ project }: { project: ProjectRef }) {
  const hasBoth = !!(project.beforeImage && project.afterImage)

  const imageBlock = hasBoth ? (
    <div className="grid grid-cols-2 gap-px bg-border overflow-hidden rounded-t-xl">
      <div className="relative">
        <CMSImage image={project.beforeImage!} slot="galleryLandscape" className="w-full" />
        <span className="absolute bottom-0 left-0 rounded-tr bg-black/50 px-2 py-0.5 text-xs font-semibold text-white">
          Before
        </span>
      </div>
      <div className="relative">
        <CMSImage image={project.afterImage!} slot="galleryLandscape" className="w-full" />
        <span className="absolute bottom-0 right-0 rounded-tl bg-black/50 px-2 py-0.5 text-xs font-semibold text-white">
          After
        </span>
      </div>
    </div>
  ) : project.afterImage ? (
    <CMSImage image={project.afterImage} slot="galleryLandscape" className="w-full" />
  ) : (
    <div className="aspect-video w-full bg-muted" />
  )

  const inner = (
    <div className="group overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow hover:shadow-md">
      {imageBlock}
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
