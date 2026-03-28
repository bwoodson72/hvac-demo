import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import type { ContactSectionData } from "@/lib/sanity/types"
import { ContactForm } from "./ContactForm"

export function ContactSection({ data }: { data: ContactSectionData }) {
  const { title, intro, formMode, showPhone, showEmail, showAddress, showHours } = data
  const hasContactInfo = showPhone || showEmail || showAddress || showHours

  return (
    <Section>
      <Container>
        {(title || intro) && (
          <div className="mb-10 text-center">
            {title && <Heading as="h2">{title}</Heading>}
            {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}

        <div
          className={
            hasContactInfo ? "grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]" : undefined
          }
        >
          {/* Form */}
          <div>
            <ContactForm formMode={formMode} />
          </div>

          {/* Contact info sidebar */}
          {hasContactInfo && (
            <aside className="flex flex-col gap-6 rounded-xl bg-muted/40 p-6 h-fit">
              <p className="font-heading text-base font-semibold">Contact Information</p>
              {showPhone && (
                <InfoRow icon={<Phone className="size-4 text-primary" />} label="Phone">
                  <a
                    href="tel:+15550001234"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    (555) 000-1234
                  </a>
                </InfoRow>
              )}
              {showEmail && (
                <InfoRow icon={<Mail className="size-4 text-primary" />} label="Email">
                  <a
                    href="mailto:hello@example.com"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    hello@example.com
                  </a>
                </InfoRow>
              )}
              {showAddress && (
                <InfoRow icon={<MapPin className="size-4 text-primary" />} label="Address">
                  <p className="text-sm text-muted-foreground">
                    123 Main Street
                    <br />
                    Anytown, ST 00000
                  </p>
                </InfoRow>
              )}
              {showHours && (
                <InfoRow icon={<Clock className="size-4 text-primary" />} label="Hours">
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    <p>Mon–Fri: 8am – 6pm</p>
                    <p>Sat: 9am – 2pm</p>
                    <p>Sun: Closed</p>
                  </div>
                </InfoRow>
              )}
            </aside>
          )}
        </div>
      </Container>
    </Section>
  )
}

// ── Internal helpers ───────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {children}
      </div>
    </div>
  )
}
