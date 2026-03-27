import { defineField, defineType } from "sanity"

export const businessHours = defineType({
  name: "businessHours",
  title: "Business hours",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    }),
    defineField({
      name: "opens",
      title: "Opens",
      type: "string",
      description: "24-hour format, e.g. 08:00",
      hidden: ({ parent }) => Boolean((parent as { isClosed?: boolean } | undefined)?.isClosed),
    }),
    defineField({
      name: "closes",
      title: "Closes",
      type: "string",
      description: "24-hour format, e.g. 17:00",
      hidden: ({ parent }) => Boolean((parent as { isClosed?: boolean } | undefined)?.isClosed),
    }),
    defineField({
      name: "isClosed",
      title: "Closed this day",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "day", subtitle: "opens" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? "Day",
        subtitle: subtitle ? `Opens ${subtitle}` : "Closed",
      }
    },
  },
})
