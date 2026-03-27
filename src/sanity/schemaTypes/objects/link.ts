import { defineField, defineType } from "sanity"

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "External URL or internal path (e.g. /about). Leave blank if using an internal reference.",
    }),
    defineField({
      name: "internalRef",
      title: "Internal page reference",
      type: "reference",
      description: "Link to a page, service, or service area managed in Sanity.",
      to: [
        { type: "page" },
        { type: "service" },
        { type: "serviceArea" },
      ],
      options: { disableNew: true },
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default (text link)", value: "default" },
          { title: "Button", value: "button" },
          { title: "Button outline", value: "buttonOutline" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
})
