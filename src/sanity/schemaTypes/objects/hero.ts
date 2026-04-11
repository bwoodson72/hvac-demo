import { defineField, defineType } from "sanity"

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the title.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Supporting line shown below the main title.",
    }),
    defineField({
      name: "body",
      title: "Body text",
      type: "text",
      rows: 4,
      description: "Optional paragraph below the subtitle. Keep to 1–2 sentences.",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "link",
      description: "Main call-to-action button (e.g., 'Get a Free Quote').",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "link",
      description: "Optional secondary button or link.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      description: "Required for the 'split' and 'imageRight' variants.",
    }),
    defineField({
      name: "backgroundStyle",
      title: "Background style",
      type: "string",
      description: "Applies when no image is set.",
      options: {
        list: [
          { title: "Default (light)", value: "default" },
          { title: "Dark", value: "dark" },
          { title: "Primary color", value: "primary" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: { title: "title", media: "image.image" },
  },
})
