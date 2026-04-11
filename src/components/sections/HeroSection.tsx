import { cn } from "@/lib/utils"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { CMSImageFill } from "@/components/shared/CMSImageFill"
import { CTAButton } from "@/components/shared/CTAButton"
import { getIcon } from "@/lib/utils/icons"
import type { HeroSectionData } from "@/lib/sanity/types"

// ── Background style map ───────────────────────────────────────────────────────

const BG_CLASSES: Record<string, { section: string; text: string; muted: string }> = {
  dark:    { section: "bg-foreground",  text: "text-background",              muted: "text-background/70" },
  primary: { section: "bg-primary",     text: "text-primary-foreground",      muted: "text-primary-foreground/75" },
  default: { section: "bg-muted/40",    text: "text-foreground",              muted: "text-muted-foreground" },
}

const DEFAULT_BG = BG_CLASSES["default"] as { section: string; text: string; muted: string }

function getBg(style?: string): { section: string; text: string; muted: string } {
  return BG_CLASSES[style ?? "default"] ?? DEFAULT_BG
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroSection({ data }: { data: HeroSectionData }) {
  const {
    eyebrow, title, subtitle, body,
    primaryCta, secondaryCta, image, trustItems, backgroundStyle,
    variant = "split",
  } = data

  // ── Compact ─────────────────────────────────────────────────────────────────
  if (variant === "compact") {
    const bg = getBg(backgroundStyle)
    return (
      <section
        aria-label={title}
        className={cn("border-b border-border py-10", bg.section, bg.text)}
      >
        <Container>
          <div className="flex flex-col gap-2">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {eyebrow}
              </p>
            )}
            <Heading as="h1" size="h1">{title}</Heading>
            {subtitle && <p className={cn("text-lg", bg.muted)}>{subtitle}</p>}
          </div>
        </Container>
      </section>
    )
  }

  // ── Centered (image-as-background) ───────────────────────────────────────────
  if (variant === "centered") {
    const hasImage = Boolean(image)
    const bg = getBg(backgroundStyle)

    const eyebrowTx  = hasImage ? "text-white/80" : "text-primary"
    const subtitleTx = hasImage ? "text-white/80" : bg.muted
    const bodyTx     = hasImage ? "text-white/70" : bg.muted

    return (
      <section
        aria-label={title}
        className={cn(
          "relative isolate min-h-[480px] py-[var(--section-spacing-lg)]",
          hasImage ? "text-white" : cn(bg.section, bg.text)
        )}
      >
        {hasImage && (
          <>
            <CMSImageFill image={image!} slot="hero" priority />
            <div className="absolute inset-0 bg-black/45" />
          </>
        )}
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
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
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {primaryCta && <CTAButton link={primaryCta} size="lg" />}
                {secondaryCta && <CTAButton link={secondaryCta} variant="secondary" size="lg" />}
              </div>
            )}
            <TrustItems items={trustItems} className="mt-6 justify-center" />
          </div>
        </Container>
      </section>
    )
  }

  // ── Split (default) ──────────────────────────────────────────────────────────
  const bg = getBg(backgroundStyle)

  return (
    <section
      aria-label={title}
      className={cn(
        "min-h-[420px] py-[var(--section-spacing-lg)]",
        image ? undefined : bg.section,
        bg.text
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text column */}
          <div className={cn("flex flex-col", !image && "lg:col-span-2")}>
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                {eyebrow}
              </p>
            )}
            <Heading as="h1" size="display">{title}</Heading>
            {subtitle && (
              <p className={cn("mt-4 text-xl font-light", bg.muted)}>{subtitle}</p>
            )}
            {body && <p className={cn("mt-4 leading-relaxed", bg.muted)}>{body}</p>}
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
