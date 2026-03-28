import { defineField, defineType } from "sanity"
import { HomeIcon } from "@sanity/icons"
import { sectionTypes } from "@/sanity/lib/sectionTypes"

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      of: sectionTypes,
      description: "Build the homepage by adding and reordering sections. Drag to reorder.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Search engine and social sharing settings for the homepage.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" }
    },
  },
})
