// ── Email delivery via Resend ──────────────────────────────────────────────
// Falls back to console.log when RESEND_API_KEY is not set (local dev).

import type { ContactSubmission } from "./types"

const apiKey = process.env.RESEND_API_KEY
const toEmail = process.env.CONTACT_EMAIL_TO ?? "hello@example.com"
const fromEmail = process.env.CONTACT_EMAIL_FROM ?? "noreply@example.com"

function buildHtml(sub: ContactSubmission): string {
  const rows = [
    ["Name", sub.name],
    ["Email", sub.email],
    ...(sub.phone ? [["Phone", sub.phone]] : []),
    ...(sub.service ? [["Service", sub.service]] : []),
    ["Message", sub.message.replace(/\n/g, "<br>")],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px">${value}</td></tr>`
    )
    .join("")

  return `
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:600px">
      <tbody>${rows}</tbody>
    </table>
  `
}

function buildText(sub: ContactSubmission): string {
  return [
    `Name: ${sub.name}`,
    `Email: ${sub.email}`,
    sub.phone ? `Phone: ${sub.phone}` : null,
    sub.service ? `Service: ${sub.service}` : null,
    `Message:\n${sub.message}`,
  ]
    .filter(Boolean)
    .join("\n")
}

export async function sendContactEmail(sub: ContactSubmission): Promise<void> {
  const subject = `New contact form submission from ${sub.name}`

  if (!apiKey) {
    // Dev fallback — log so nothing is silently lost
    console.log("[contact email] RESEND_API_KEY not set — would have sent:")
    console.log(buildText(sub))
    return
  }

  const { Resend } = await import("resend")
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: sub.email,
    subject,
    html: buildHtml(sub),
    text: buildText(sub),
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}
