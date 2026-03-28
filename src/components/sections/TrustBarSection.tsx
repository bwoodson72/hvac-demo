import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { getIcon } from "@/lib/utils/icons"
import { cn } from "@/lib/utils"
import type { TrustBarSectionData } from "@/lib/sanity/types"

export function TrustBarSection({ data }: { data: TrustBarSectionData }) {
  const { items, layout } = data

  if (!items?.length) return null

  if (layout === "grid") {
    return (
      <Section spacing="sm" className="bg-muted/50">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {items.map((item) => {
              const Icon = item.icon ? getIcon(item.icon) : null
              return (
                <div key={item._key} className="flex flex-col items-center gap-2 text-center">
                  {Icon && (
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-5 text-primary" aria-hidden />
                    </div>
                  )}
                  {item.value && (
                    <span className="text-lg font-bold leading-none">{item.value}</span>
                  )}
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>
    )
  }

  // inline (default)
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
