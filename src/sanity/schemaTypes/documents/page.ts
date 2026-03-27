import { defineField, defineType } from "sanity"
import { sectionTypes } from "@/sanity/lib/sectionTypes"

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      of: sectionTypes,
    }),
    defineField({
      name: "pageCategory",
      title: "Page category",
      type: "string",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Reviews", value: "reviews" },
          { title: "Gallery", value: "gallery" },
          { title: "FAQ", value: "faq" },
          { title: "Financing", value: "financing" },
          { title: "Careers", value: "careers" },
          { title: "Legal", value: "legal" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "hideFromNavigation",
      title: "Hide from navigation",
      type: "boolean",
      description: "Excludes this page from automatically generated nav menus.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? "Untitled page",
        subtitle: subtitle ? `/${subtitle}` : undefined,
      }
    },
  },
})
