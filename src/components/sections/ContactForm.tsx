"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContactForm } from "@/lib/forms/useContactForm"

export function ContactForm() {
  const { values, errors, status, setField, setSelectField, handleSubmit, reset } =
    useContactForm()

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/10 p-8 text-center">
        <p className="text-lg font-semibold text-foreground">Thank you for reaching out!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll be in touch within one business day.
        </p>
        <Button variant="outline" className="mt-4" onClick={reset}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from real users, bots fill it */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={setField("honeypot")}
        />
      </div>

      <FormField label="Your Name" error={errors.name} required>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={setField("name")}
          aria-invalid={!!errors.name}
          placeholder="Jane Smith"
        />
      </FormField>

      <FormField label="Email Address" error={errors.email} required>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={setField("email")}
          aria-invalid={!!errors.email}
          placeholder="jane@example.com"
        />
      </FormField>

      <FormField label="Phone Number" error={errors.phone}>
        <Input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={setField("phone")}
          aria-invalid={!!errors.phone}
          placeholder="(555) 000-1234"
        />
      </FormField>

      <FormField label="Service Needed">
        <Select value={values.service} onValueChange={setSelectField("service")}>
          <SelectTrigger id="contact-service" className="w-full h-9">
            <SelectValue placeholder="Select a service…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="repair">Repair / Service Call</SelectItem>
            <SelectItem value="install">New Installation</SelectItem>
            <SelectItem value="estimate">Free Estimate</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Message" error={errors.message} required>
        <Textarea
          id="contact-message"
          value={values.message}
          onChange={setField("message")}
          aria-invalid={!!errors.message}
          placeholder="Tell us how we can help…"
          className="min-h-28"
        />
      </FormField>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  )
}

// ── Internal helpers ───────────────────────────────────────────────────────

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  const id = `contact-${label.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
