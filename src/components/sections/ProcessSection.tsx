import React from "react"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { getIcon } from "@/lib/utils/icons"
import type { ProcessSectionData, ProcessStep } from "@/lib/sanity/types"

function StepIcon({ iconKey, className }: { iconKey?: string; className: string }) {
  const Icon = iconKey ? getIcon(iconKey) : null
  if (!Icon) return null
  return React.createElement(Icon, { className, "aria-hidden": "true" })
}

export function ProcessSection({ data }: { data: ProcessSectionData }) {
  const { title, intro, steps } = data
  const items = steps ?? []

  return (
    <Section>
      <Container>
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        <div className="flex flex-col max-w-2xl mx-auto">
          {items.map((step, i) => (
            <VerticalStep
              key={step._key}
              step={step}
              index={i + 1}
              isLast={i === items.length - 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function VerticalStep({
  step,
  index,
  isLast,
}: {
  step: ProcessStep
  index: number
  isLast: boolean
}) {
  return (
    <div className="relative flex gap-5 pb-8 last:pb-0">
      {!isLast && (
        <div
          className="absolute left-5 top-10 bottom-0 w-px bg-border"
          aria-hidden
        />
      )}
      <div className="relative z-10 shrink-0 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm mt-0.5">
        {step.icon ? (
          <StepIcon iconKey={step.icon} className="size-5" />
        ) : (
          <span>{index}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 pt-1.5">
        <h3 className="font-heading text-base font-semibold">{step.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </div>
  )
}
