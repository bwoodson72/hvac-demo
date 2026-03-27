import { cn } from "@/lib/utils"

type HeadingTag = "h1" | "h2" | "h3" | "h4"
type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4"

const sizeStyles: Record<HeadingSize, string> = {
  display: "text-display font-bold leading-[1.1] tracking-tight",
  h1: "text-h1 font-bold leading-tight tracking-tight",
  h2: "text-h2 font-bold leading-tight tracking-tight",
  h3: "text-h3 font-semibold leading-snug",
  h4: "text-h4 font-semibold leading-snug",
}

const tagToSize: Record<HeadingTag, HeadingSize> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
}

interface HeadingProps {
  as?: HeadingTag
  size?: HeadingSize
  className?: string
  children: React.ReactNode
}

export function Heading({ as: Tag = "h2", size, className, children }: HeadingProps) {
  const resolvedSize = size ?? tagToSize[Tag]

  return (
    <Tag className={cn("font-heading", sizeStyles[resolvedSize], className)}>
      {children}
    </Tag>
  )
}
