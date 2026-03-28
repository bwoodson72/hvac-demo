"use client"

import { useState } from "react"
import { GallerySection } from "@/components/sections/GallerySection"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ProjectRef, GallerySectionData } from "@/lib/sanity/types"

interface GalleryPageClientProps {
  projects: ProjectRef[]
  categories: string[]
  layout: GallerySectionData["layout"]
}

export function GalleryPageClient({ projects, categories, layout }: GalleryPageClientProps) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? projects.filter((p) => p.category === active) : projects

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2 px-4">
          <button onClick={() => setActive(null)}>
            <Badge
              variant={active === null ? "default" : "outline"}
              className={cn("cursor-pointer px-3 py-1 text-sm h-auto")}
            >
              All ({projects.length})
            </Badge>
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}>
              <Badge
                variant={active === cat ? "default" : "outline"}
                className="cursor-pointer px-3 py-1 text-sm h-auto"
              >
                {cat} ({projects.filter((p) => p.category === cat).length})
              </Badge>
            </button>
          ))}
        </div>
      )}
      <GallerySection
        data={{
          _type: "gallerySection",
          _key: "gallery-main",
          selectedProjects: filtered,
          layout,
        }}
      />
    </div>
  )
}
