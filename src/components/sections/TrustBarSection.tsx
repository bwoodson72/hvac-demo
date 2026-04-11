import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { getIcon } from "@/lib/utils/icons"
import { cn } from "@/lib/utils"
import type { TrustBarSectionData } from "@/lib/sanity/types"

export function TrustBarSection({ data }: { data: TrustBarSectionData }) {
  const { items } = data

  if (!items?.length) return null

  return (
    <Section spacing="sm" className="bg-muted/50">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((item, i) => {
            const Icon = item.icon ? getIcon(item.icon) : null
            return (
              <div key={item._key} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    className="hidden text-border sm:inline"
                    aria-hidden
                  >
                    ·
                  </span>
                )}
                {Icon && <Icon className="size-4 shrink-0 text-primary" aria-hidden />}
                {item.value && (
                  <span className="font-semibold">{item.value}</span>
                )}
                <span
                  className={cn(
                    "text-sm",
                    item.value ? "text-muted-foreground" : "font-medium"
                  )}
                >
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
