import { Container } from "@/components/shared/Container"
import { CTAButton } from "@/components/shared/CTAButton"
import { cn } from "@/lib/utils"
import type { PromoBannerSectionData } from "@/lib/sanity/types"

const styleMap: Record<PromoBannerSectionData["style"], string> = {
  default: "bg-muted text-foreground",
  accent: "bg-accent text-accent-foreground",
  warning: "bg-warning text-warning-foreground",
}

export function PromoBannerSection({ data }: { data: PromoBannerSectionData }) {
  const { text, cta, style } = data

  return (
    <div className={cn("py-3", styleMap[style])}>
      <Container>
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-medium">{text}</p>
          {cta && (
            <CTAButton link={cta} variant="outline" size="default" className="shrink-0 text-xs" />
          )}
        </div>
      </Container>
    </div>
  )
}
