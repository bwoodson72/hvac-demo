// ── Analytics event helpers ────────────────────────────────────────────────
// Placeholder — swap implementations when a real analytics provider is added.
// All functions are no-ops in environments where `window.gtag` is absent.

type EventParams = Record<string, string | number | boolean>

export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return
  // Google Analytics 4
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params ?? {})
  }
}

export function trackContactFormSubmit(): void {
  trackEvent("contact_form_submit")
}

export function trackContactFormSuccess(): void {
  trackEvent("contact_form_success")
}

export function trackContactFormError(reason: string): void {
  trackEvent("contact_form_error", { reason })
}
