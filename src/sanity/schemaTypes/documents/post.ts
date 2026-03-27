import { defineArrayMember, defineField, defineType } from "sanity"

export const post = defineType({
  name: "post",
  title: "Blog post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in listings. Max 200 characters.",
      validation: (Rule) => Rule.max(200).warning("Keep excerpts under 200 characters."),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "imageWithAlt" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      media: "featuredImage.image",
    },
    prepare({ title, publishedAt }: { title?: string; publishedAt?: string }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Unpublished"
      return { title: title ?? "Untitled post", subtitle: date }
    },
  },
})
