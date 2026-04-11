import React from "react"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { getIcon } from "@/lib/utils/icons"
import type { FeatureListSectionData, Feature } from "@/lib/sanity/types"

function FeatureIcon({ iconKey, className }: { iconKey?: string; className: string }) {
  const Icon = iconKey ? getIcon(iconKey) : null
  if (!Icon) return null
  return React.createElement(Icon, { className, "aria-hidden": "true" })
}

export function FeatureListSection({ data }: { data: FeatureListSectionData }) {
  const { title, intro, features } = data
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => (
            <FeatureCard key={feature._key} feature={feature} />
          ))}
        </div>
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
