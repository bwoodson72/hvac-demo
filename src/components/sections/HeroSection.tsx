import { cn } from "@/lib/utils"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { CMSImage } from "@/components/shared/CMSImage"
import { CMSImageFill } from "@/components/shared/CMSImageFill"
import { CTAButton } from "@/components/shared/CTAButton"
import { getIcon } from "@/lib/utils/icons"
import type { HeroSectionData } from "@/lib/sanity/types"

export function HeroSection({ data }: { data: HeroSectionData }) {
  const { variant, eyebrow, title, subtitle, body, primaryCta, secondaryCta, image, trustItems } =
    data

  if (variant === "compact") {
    return (
      <section
        aria-label={title}
        className="py-[var(--section-spacing-sm)] border-b border-border"
      >
        <Container>
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          )}
          <Heading as="h1" size="h1">
            {title}
          </Heading>
          {subtitle && <p className="mt-3 text-xl text-muted-foreground">{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryCta && <CTAButton link={primaryCta} size="lg" />}
              {secondaryCta && <CTAButton link={secondaryCta} variant="outline" size="lg" />}
            </div>
          )}
        </Container>
      </section>
    )
  }

  if (variant === "split" || variant === "imageRight") {
    const imageWeight = variant === "imageRight" ? "lg:col-span-3" : "lg:col-span-1"
    const textWeight = variant === "imageRight" ? "lg:col-span-2" : "lg:col-span-1"

    return (
      <section
        aria-label={title}
        className="py-[var(--section-spacing-lg)]"
      >
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
            {/* Text column */}
            <div className={cn("flex flex-col", textWeight)}>
              {eyebrow && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                  {eyebrow}
                </p>
              )}
              <Heading as="h1" size="display">
                {title}
              </Heading>
              {subtitle && (
                <p className="mt-4 text-xl font-light text-muted-foreground">{subtitle}</p>
              )}
              {body && <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>}
              {(primaryCta || secondaryCta) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {primaryCta && <CTAButton link={primaryCta} size="lg" />}
                  {secondaryCta && <CTAButton link={secondaryCta} variant="outline" size="lg" />}
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

  // centered (default)
  const hasBackgroundImage = !!image
  return (
    <section
      aria-label={title}
      className={cn(
        "relative flex min-h-[560px] items-center overflow-hidden py-[var(--section-spacing-lg)]",
        !hasBackgroundImage && "bg-muted/30"
      )}
    >
      {hasBackgroundImage && (
        <>
          <CMSImageFill image={image} slot="hero" priority />
          <div className="absolute inset-0 bg-black/55" aria-hidden />
        </>
      )}

      <Container
        className={cn(
          "relative z-10 flex flex-col items-center text-center",
          hasBackgroundImage && "text-white"
        )}
      >
        {eyebrow && (
          <p
            className={cn(
              "mb-4 text-sm font-semibold uppercase tracking-widest",
              hasBackgroundImage ? "text-white/80" : "text-primary"
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading
          as="h1"
          size="display"
          className={hasBackgroundImage ? "text-white" : undefined}
        >
          {title}
        </Heading>
        {subtitle && (
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl text-xl font-light",
              hasBackgroundImage ? "text-white/85" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        )}
        {body && (
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl leading-relaxed",
              hasBackgroundImage ? "text-white/75" : "text-muted-foreground"
            )}
          >
            {body}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {primaryCta && <CTAButton link={primaryCta} size="lg" />}
            {secondaryCta && (
              <CTAButton
                link={secondaryCta}
                variant="outline"
                size="lg"
                className={hasBackgroundImage ? "border-white text-white hover:bg-white/10" : undefined}
              />
            )}
          </div>
        )}
        <TrustItems
          items={trustItems}
          className={cn("mt-8 justify-center", hasBackgroundImage && "text-white/80")}
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
