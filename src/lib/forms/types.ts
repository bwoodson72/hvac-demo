// ── Contact form shared types ──────────────────────────────────────────────

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  service: string
  message: string
  honeypot: string // spam trap — must stay empty
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

export type ContactFormStatus = "idle" | "submitting" | "success" | "error"

// Shape POSTed to /api/contact
export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  honeypot: string
}

// Shape returned by /api/contact
export interface ContactApiResponse {
  ok: boolean
  error?: string
}
