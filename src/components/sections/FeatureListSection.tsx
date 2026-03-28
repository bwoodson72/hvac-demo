import React from "react"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { getIcon } from "@/lib/utils/icons"
import { cn } from "@/lib/utils"
import type { FeatureListSectionData, Feature } from "@/lib/sanity/types"

/** Renders a Lucide icon by key without triggering react-hooks/static-components. */
function FeatureIcon({ iconKey, className }: { iconKey?: string; className: string }) {
  const Icon = iconKey ? getIcon(iconKey) : null
  if (!Icon) return null
  return React.createElement(Icon, { className, "aria-hidden": "true" })
}

export function FeatureListSection({ data }: { data: FeatureListSectionData }) {
  const { title, intro, features, layout } = data
  const items = features ?? []

  return (
    <Section>
      <Container>
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        {layout === "grid" && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((feature) => (
              <FeatureCard key={feature._key} feature={feature} />
            ))}
          </div>
        )}

        {layout === "list" && (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            {items.map((feature) => (
              <FeatureRow key={feature._key} feature={feature} />
            ))}
          </div>
        )}

        {layout === "alternating" && (
          <div className="flex flex-col gap-16">
            {items.map((feature, i) => (
              <FeatureAlternating key={feature._key} feature={feature} flip={i % 2 === 1} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col gap-3">
      {feature.icon && (
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
          <FeatureIcon iconKey={feature.icon} className="size-6 text-primary" />
        </div>
      )}
      <h3 className="font-heading text-h4 font-semibold leading-snug">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
    </div>
  )
}

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-0.5 flex size-9 items-center justify-center rounded-lg bg-primary/10">
        {feature.icon ? (
          <FeatureIcon iconKey={feature.icon} className="size-5 text-primary" />
        ) : (
          <span className="size-2 rounded-full bg-primary" aria-hidden />
        )}
      </div>
      <div>
        <h3 className="font-heading text-base font-semibold">{feature.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      </div>
    </div>
  )
}

function FeatureAlternating({ feature, flip }: { feature: Feature; flip: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-8 lg:grid-cols-2",
        flip && "lg:[&>*:first-child]:order-last"
      )}
    >
      <div className="flex items-center justify-center rounded-2xl bg-muted/50 p-12 min-h-48">
        {feature.icon ? (
          <FeatureIcon iconKey={feature.icon} className="size-20 text-primary opacity-80" />
        ) : (
          <div className="size-20 rounded-full bg-primary/20" />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-h3 font-semibold leading-snug">{feature.title}</h3>
        <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
      </div>
    </div>
  )
}
