import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { cn } from "@/lib/utils"
import type { PortableText as PortableTextType } from "@/lib/sanity/types"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-heading text-h2 font-bold leading-tight tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-heading text-h3 font-semibold leading-snug first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 font-heading text-h4 font-semibold leading-snug first:mt-0">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: ({ children, value }: any) => {
      const href: string = value?.href ?? "#"
      const isExternal = href.startsWith("http://") || href.startsWith("https://")
      return (
        <a
          href={href}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc pl-6 last:mb-0 [&>li]:mb-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6 last:mb-0 [&>li]:mb-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}

interface RichTextProps {
  value: PortableTextType
  className?: string
}

export function RichText({ value, className }: RichTextProps) {
  return (
    <div className={cn("text-base text-foreground", className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}
