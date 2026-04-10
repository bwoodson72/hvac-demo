import { cn } from "@/lib/utils"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { CMSImageFill } from "@/components/shared/CMSImageFill"
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

// True when the background is dark and text should use opacity variants of current colour
function isDarkStyle(s: HeroSectionData["backgroundStyle"] | undefined): boolean {
  return s === "dark" || s === "primary" || s === undefined
}

export function HeroSection({ data }: { data: HeroSectionData }) {
  const {
    variant, eyebrow, title, subtitle, body,
    primaryCta, secondaryCta, image, trustItems, backgroundStyle,
  } = data

  const bgClass = backgroundStyle ? BG_MAP[backgroundStyle] : undefined
  const dark = isDarkStyle(backgroundStyle)

  // Text colour helpers for no-image contexts
  const eyebrowTx  = dark ? "text-current/70" : "text-primary"
  const subtitleTx = dark ? "text-current/80" : "text-muted-foreground"
  const bodyTx     = dark ? "text-current/70" : "text-muted-foreground"

  // ── compact ────────────────────────────────────────────────────────────────

  if (variant === "compact") {
    return (
      <section
        aria-label={title}
        className={cn(
          "py-[var(--section-spacing-sm)] border-b border-border",
          bgClass
        )}
      >
        <Container>
          {eyebrow && (
            <p className={cn("mb-2 text-sm font-semibold uppercase tracking-widest", eyebrowTx)}>
              {eyebrow}
            </p>
          )}
          <Heading as="h1" size="h2">{title}</Heading>
          {subtitle && <p className={cn("mt-3 text-lg", subtitleTx)}>{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryCta && <CTAButton link={primaryCta} size="lg" />}
              {secondaryCta && <CTAButton link={secondaryCta} variant="secondary" size="lg" />}
            </div>
          )}
        </Container>
      </section>
    )
  }

  // ── split / imageRight ─────────────────────────────────────────────────────

  if (variant === "split" || variant === "imageRight") {
    const imageWeight = variant === "imageRight" ? "lg:col-span-3" : "lg:col-span-1"
    const textWeight  = variant === "imageRight" ? "lg:col-span-2" : "lg:col-span-1"

    return (
      <section
        aria-label={title}
        className={cn(
          "min-h-[420px] py-[var(--section-spacing-lg)]",
          bgClass ?? (!image && "bg-muted/40")
        )}
      >
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
            {/* Text column */}
            <div className={cn("flex flex-col", image ? textWeight : "lg:col-span-5")}>
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
              <div className={cn("overflow-hidden rounded-2xl", imageWeight)}>
                <CMSImage image={image} slot="sectionFeature" priority />
              </div>
            )}
          </div>
        </Container>
      </section>
    )
  }

  // ── centered (default) ─────────────────────────────────────────────────────
  // When a background image is present the overlay handles appearance;
  // backgroundStyle is ignored in that case.

  const hasBackgroundImage = !!image
  const centeredBg = hasBackgroundImage
    ? undefined
    : (bgClass ?? "bg-foreground text-background")

  // For the no-image path: light/muted use standard colours; everything else is dark.
  const centeredDark = hasBackgroundImage || isDarkStyle(backgroundStyle)
  const cEyebrow  = hasBackgroundImage ? "text-white/80"  : centeredDark ? "text-current/70"  : "text-primary"
  const cSubtitle = hasBackgroundImage ? "text-white/85"  : centeredDark ? "text-current/80"  : "text-muted-foreground"
  const cBody     = hasBackgroundImage ? "text-white/75"  : centeredDark ? "text-current/70"  : "text-muted-foreground"
  const cTrust    = hasBackgroundImage ? "text-white/80"  : centeredDark ? "text-current/70"  : undefined
  const cHeading  = hasBackgroundImage ? "text-white"     : undefined

  return (
    <section
      aria-label={title}
      className={cn(
        "relative flex min-h-[480px] items-center overflow-hidden py-[var(--section-spacing-lg)]",
        centeredBg
      )}
    >
      {hasBackgroundImage && (
        <>
          <CMSImageFill image={image} slot="hero" priority />
          <div className="absolute inset-0 bg-black/55" aria-hidden />
        </>
      )}

      <Container className="relative z-10 flex flex-col items-center text-center">
        {eyebrow && (
          <p className={cn("mb-4 text-sm font-semibold uppercase tracking-widest", cEyebrow)}>
            {eyebrow}
          </p>
        )}
        <Heading as="h1" size="display" className={cHeading}>{title}</Heading>
        {subtitle && (
          <p className={cn("mx-auto mt-5 max-w-2xl text-xl font-light", cSubtitle)}>
            {subtitle}
          </p>
        )}
        {body && (
          <p className={cn("mx-auto mt-4 max-w-xl leading-relaxed", cBody)}>
            {body}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {primaryCta && <CTAButton link={primaryCta} size="lg" />}
            {secondaryCta && <CTAButton link={secondaryCta} variant="secondary" size="lg" />}
          </div>
        )}
        <TrustItems
          items={trustItems}
          className={cn("mt-8 justify-center", cTrust)}
        />
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
