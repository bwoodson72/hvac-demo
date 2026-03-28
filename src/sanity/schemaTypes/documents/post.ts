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
      description: "URL path for this post (auto-generated from title). Changing it breaks existing links.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
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
      description: "Controls the publish date shown on the post and sort order in listings.",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Author's name as it appears on the post.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Content tags used for filtering and related-post grouping.",
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
