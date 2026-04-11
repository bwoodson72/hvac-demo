import { cn } from "@/lib/utils"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { CTAButton } from "@/components/shared/CTAButton"
import { getIcon } from "@/lib/utils/icons"
import type { HeroSectionData } from "@/lib/sanity/types"

// Maps backgroundStyle → "bg-X text-Y" Tailwind classes
const BG_MAP: Record<NonNullable<HeroSectionData["backgroundStyle"]>, string> = {
  light:   "bg-background text-foreground",
  dark:    "bg-foreground text-background",
  primary: "bg-primary text-primary-foreground",
  muted:   "bg-muted text-foreground",
}

function isDarkStyle(s: HeroSectionData["backgroundStyle"] | undefined): boolean {
  return s === "dark" || s === "primary" || s === undefined
}

export function HeroSection({ data }: { data: HeroSectionData }) {
  const {
    eyebrow, title, subtitle, body,
    primaryCta, secondaryCta, image, trustItems, backgroundStyle,
  } = data

  const bgClass = backgroundStyle ? BG_MAP[backgroundStyle] : undefined
  const dark = isDarkStyle(backgroundStyle)

  const eyebrowTx  = dark ? "text-current/70" : "text-primary"
  const subtitleTx = dark ? "text-current/80" : "text-muted-foreground"
  const bodyTx     = dark ? "text-current/70" : "text-muted-foreground"

  return (
    <section
      aria-label={title}
      className={cn(
        "min-h-[420px] py-[var(--section-spacing-lg)]",
        bgClass ?? (!image && "bg-muted/40")
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text column */}
          <div className={cn("flex flex-col", !image && "lg:col-span-2")}>
            {eyebrow && (
              <p className={cn("mb-3 text-sm font-semibold uppercase tracking-widest", eyebrowTx)}>
                {eyebrow}
              </p>
            )}
            <Heading as="h1" size="display">{title}</Heading>
            {subtitle && (
              <p className={cn("mt-4 text-xl font-light", subtitleTx)}>{subtitle}</p>
            )}
            {body && <p className={cn("mt-4 leading-relaxed", bodyTx)}>{body}</p>}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && <CTAButton link={primaryCta} size="lg" />}
                {secondaryCta && <CTAButton link={secondaryCta} variant="secondary" size="lg" />}
              </div>
            )}
            <TrustItems items={trustItems} className="mt-6" />
          </div>

          {/* Image column */}
          {image && (
            <div className="overflow-hidden rounded-2xl">
              <CMSImage image={image} slot="sectionFeature" priority />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

// ── Internal helper ────────────────────────────────────────────────────────────

function TrustItems({
  items,
  className,
}: {
  items: HeroSectionData["trustItems"]
  className?: string
}) {
  if (!items?.length) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {items.map((item) => {
        const Icon = item.icon ? getIcon(item.icon) : null
        return (
          <div key={item._key} className="flex items-center gap-1.5 text-sm">
            {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
            <span>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}
