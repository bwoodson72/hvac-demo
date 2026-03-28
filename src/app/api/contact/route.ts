import { NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/forms/email"
import type { ContactApiResponse, ContactSubmission } from "@/lib/forms/types"

// ── Rate limiting ─────────────────────────────────────────────────────────
// In-memory store: ip → { count, resetAt }
// Works for single-instance deployments; swap for Redis/KV on multi-instance.

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

interface RateEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateEntry>()

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown"
  return req.headers.get("x-real-ip") ?? "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) return false

  entry.count = entry.count + 1
  return true
}

// ── Validation ────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-()+]{7,15}$/.test(phone)
}

function ok(status = 200): NextResponse<ContactApiResponse> {
  return NextResponse.json({ ok: true }, { status })
}

function err(message: string, status: number): NextResponse<ContactApiResponse> {
  return NextResponse.json({ ok: false, error: message }, { status })
}

// ── Handler ───────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  // Rate limit
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return err("Too many requests. Please wait before submitting again.", 429)
  }

  // Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return err("Invalid request body.", 400)
  }

  if (!body || typeof body !== "object") {
    return err("Invalid request body.", 400)
  }

  const raw = body as Record<string, unknown>

  // Honeypot — silently succeed so bots think it worked
  if (raw.honeypot) {
    return ok()
  }

  // Validate required fields
  const name = typeof raw.name === "string" ? raw.name.trim() : ""
  const email = typeof raw.email === "string" ? raw.email.trim() : ""
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : ""
  const service = typeof raw.service === "string" ? raw.service.trim() : ""
  const message = typeof raw.message === "string" ? raw.message.trim() : ""

  if (!name) return err("Name is required.", 422)
  if (!email) return err("Email is required.", 422)
  if (!isValidEmail(email)) return err("Invalid email address.", 422)
  if (phone && !isValidPhone(phone)) return err("Invalid phone number.", 422)
  if (!message) return err("Message is required.", 422)

  // Length guards against payload abuse
  if (name.length > 200) return err("Name too long.", 422)
  if (email.length > 254) return err("Email too long.", 422)
  if (message.length > 5000) return err("Message too long.", 422)

  const submission: ContactSubmission = {
    name,
    email,
    phone: phone || undefined,
    service: service || undefined,
    message,
    honeypot: "",
  }

  try {
    await sendContactEmail(submission)
  } catch (e) {
    console.error("[api/contact] sendContactEmail failed:", e)
    return err("Failed to send message. Please try again.", 500)
  }

  return ok()
}
