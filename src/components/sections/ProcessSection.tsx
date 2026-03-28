import React from "react"
import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { getIcon } from "@/lib/utils/icons"
import { cn } from "@/lib/utils"
import type { ProcessSectionData, ProcessStep } from "@/lib/sanity/types"

function StepIcon({ iconKey, className }: { iconKey?: string; className: string }) {
  const Icon = iconKey ? getIcon(iconKey) : null
  if (!Icon) return null
  return React.createElement(Icon, { className, "aria-hidden": "true" })
}

export function ProcessSection({ data }: { data: ProcessSectionData }) {
  const { title, intro, steps, showNumbers, variant } = data
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

        {variant === "horizontal" && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((step, i) => (
              <HorizontalStep
                key={step._key}
                step={step}
                index={i + 1}
                showNumber={showNumbers}
                isLast={i === items.length - 1}
              />
            ))}
          </div>
        )}

        {variant === "vertical" && (
          <div className="flex flex-col max-w-2xl mx-auto">
            {items.map((step, i) => (
              <VerticalStep
                key={step._key}
                step={step}
                index={i + 1}
                showNumber={showNumbers}
                isLast={i === items.length - 1}
              />
            ))}
          </div>
        )}

        {variant === "timeline" && (
          <div className="relative flex flex-col max-w-2xl mx-auto">
            {/* Vertical spine */}
            <div className="absolute left-5 top-8 bottom-8 w-px bg-border" aria-hidden />
            {items.map((step, i) => (
              <TimelineStep
                key={step._key}
                step={step}
                index={i + 1}
                showNumber={showNumbers}
                isLast={i === items.length - 1}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

function HorizontalStep({
  step,
  index,
  showNumber,
  isLast,
}: {
  step: ProcessStep
  index: number
  showNumber: boolean
  isLast: boolean
}) {
  return (
    <div className="relative flex flex-col items-center text-center gap-3">
      {/* Connector line (hidden on last) */}
      {!isLast && (
        <div
          className="absolute top-5 left-1/2 w-full h-px bg-border hidden lg:block"
          style={{ transform: "translateX(50%)" }}
          aria-hidden
        />
      )}
      <div className="relative z-10 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
        {showNumber || !step.icon ? (
          <span>{index}</span>
        ) : (
          <StepIcon iconKey={step.icon} className="size-5" />
        )}
      </div>
      <h3 className="font-heading text-base font-semibold">{step.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
    </div>
  )
}

function VerticalStep({
  step,
  index,
  showNumber,
  isLast,
}: {
  step: ProcessStep
  index: number
  showNumber: boolean
  isLast: boolean
}) {
  return (
    <div className="relative flex gap-5 pb-8 last:pb-0">
      {/* Spine */}
      {!isLast && (
        <div
          className="absolute left-5 top-10 bottom-0 w-px bg-border"
          aria-hidden
        />
      )}
      <div className="relative z-10 shrink-0 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm mt-0.5">
        {showNumber || !step.icon ? (
          <span>{index}</span>
        ) : (
          <StepIcon iconKey={step.icon} className="size-5" />
        )}
      </div>
      <div className="flex flex-col gap-1 pt-1.5">
        <h3 className="font-heading text-base font-semibold">{step.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </div>
  )
}

function TimelineStep({
  step,
  index,
  showNumber,
  isLast,
}: {
  step: ProcessStep
  index: number
  showNumber: boolean
  isLast: boolean
}) {
  return (
    <div className={cn("relative flex gap-6 pb-10", isLast && "pb-0")}>
      {/* Node */}
      <div className="relative z-10 shrink-0 flex size-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary font-bold text-sm">
        {showNumber || !step.icon ? (
          <span>{index}</span>
        ) : (
          <StepIcon iconKey={step.icon} className="size-5" />
        )}
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">
          Step {index}
        </div>
        <h3 className="font-heading text-h4 font-semibold leading-snug">{step.title}</h3>
        <p className="leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </div>
  )
}
