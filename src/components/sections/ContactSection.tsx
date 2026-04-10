import { Section } from "@/components/shared/Section"
import { Container } from "@/components/shared/Container"
import { Heading } from "@/components/shared/Heading"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import type { ContactSectionData } from "@/lib/sanity/types"
import { ContactForm } from "./ContactForm"

export function ContactSection({ data }: { data: ContactSectionData }) {
  const { title, intro, formMode, showPhone, showEmail, showAddress, showHours,
    phone, email, address, businessHours } = data

  const hasPhone = showPhone && !!phone
  const hasEmail = showEmail && !!email
  const hasAddress = showAddress && !!(address?.street || address?.city || address?.state || address?.zip)
  const hasHours = showHours && !!businessHours?.length
  const hasContactInfo = hasPhone || hasEmail || hasAddress || hasHours

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
              {hasPhone && (
                <InfoRow icon={<Phone className="size-4 text-primary" />} label="Phone">
                  <a
                    href={`tel:${phone}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </InfoRow>
              )}
              {hasEmail && (
                <InfoRow icon={<Mail className="size-4 text-primary" />} label="Email">
                  <a
                    href={`mailto:${email}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </InfoRow>
              )}
              {hasAddress && (
                <InfoRow icon={<MapPin className="size-4 text-primary" />} label="Address">
                  <p className="text-sm text-muted-foreground">
                    {address?.street && <>{address.street}<br /></>}
                    {[address?.city, address?.state].filter(Boolean).join(", ")}
                    {address?.zip && ` ${address.zip}`}
                  </p>
                </InfoRow>
              )}
              {hasHours && (
                <InfoRow icon={<Clock className="size-4 text-primary" />} label="Hours">
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    {businessHours!.map((h) => (
                      <p key={h._key}>
                        {h.day}: {h.isClosed ? "Closed" : `${h.opens} – ${h.closes}`}
                      </p>
                    ))}
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
