"use client"

import { useState } from "react"
import type {
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
  ContactApiResponse,
} from "./types"
import {
  trackContactFormSubmit,
  trackContactFormSuccess,
  trackContactFormError,
} from "@/lib/analytics/events"

const INITIAL: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  honeypot: "",
}

function validate(
  values: ContactFormValues,
  mode: "full" | "compact" | "minimal"
): ContactFormErrors {
  const errors: ContactFormErrors = {}
  if (!values.name.trim()) errors.name = "Name is required."
  if (!values.email.trim()) {
    errors.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address."
  }
  if (mode !== "minimal" && values.phone && !/^[\d\s\-()+]{7,15}$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone number."
  }
  if (!values.message.trim()) errors.message = "Message is required."
  return errors
}

export function useContactForm(formMode: "full" | "compact" | "minimal" = "full") {
  const [values, setValues] = useState<ContactFormValues>(INITIAL)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<ContactFormStatus>("idle")

  function setField(field: keyof ContactFormValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      if (errors[field as keyof ContactFormErrors]) {
        setErrors((er) => ({ ...er, [field]: undefined }))
      }
    }
  }

  function setSelectField(field: keyof ContactFormValues) {
    return (v: string) => setValues((prev) => ({ ...prev, [field]: v }))
  }

  function reset() {
    setValues(INITIAL)
    setErrors({})
    setStatus("idle")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Honeypot — silently succeed so bots think the form worked
    if (values.honeypot) {
      setStatus("success")
      return
    }

    const errs = validate(values, formMode)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus("submitting")
    trackContactFormSubmit()

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || undefined,
          service: values.service || undefined,
          message: values.message,
          honeypot: values.honeypot,
        }),
      })

      const json: ContactApiResponse = await res.json()

      if (!res.ok || !json.ok) {
        const reason = json.error ?? `HTTP ${res.status}`
        trackContactFormError(reason)
        setStatus("error")
        return
      }

      trackContactFormSuccess()
      setStatus("success")
    } catch (err) {
      const reason = err instanceof Error ? err.message : "network"
      trackContactFormError(reason)
      setStatus("error")
    }
  }

  return { values, errors, status, setField, setSelectField, handleSubmit, reset }
}
