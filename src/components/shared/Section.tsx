import { cn } from "@/lib/utils"
import type { SectionSpacing } from "@/styles/tokens"

const spacingStyles: Record<SectionSpacing, string> = {
  sm: "py-[var(--section-spacing-sm)]",
  md: "py-[var(--section-spacing-md)]",
  lg: "py-[var(--section-spacing-lg)]",
}

interface SectionProps {
  spacing?: SectionSpacing
  className?: string
  children: React.ReactNode
  id?: string
}

export function Section({ spacing = "md", className, children, id }: SectionProps) {
  return (
    <section id={id} className={cn(spacingStyles[spacing], className)}>
      {children}
    </section>
  )
}
