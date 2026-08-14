import 'server-only'

import { getEmailClient } from '@/lib/email'
import type { Enquiry } from '@/lib/types'

function display(value: string | number | undefined) {
  return value === undefined || value === '' ? 'Not provided' : String(value)
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

function safeSubjectName(name: string) {
  return name.replace(/[\r\n]+/g, ' ').trim()
}

export async function sendEnquiryNotification(enquiry: Enquiry, packageTitle?: string) {
  const { contactEmail, from, transporter } = getEmailClient()
  const rows: Array<[string, string | number | undefined]> = [
    ['Enquiry ID', enquiry.id],
    ['Submitted', enquiry.createdAt],
    ['Name', enquiry.fullName],
    ['Email', enquiry.email],
    ['WhatsApp', enquiry.whatsapp],
    ['Nationality', enquiry.nationality],
    ['Package', packageTitle],
    ['Arrival', enquiry.arrivalDate],
    ['Departure', enquiry.departureDate],
    ['Adults', enquiry.adults],
    ['Children', enquiry.children],
    ['Divers', enquiry.numberOfDivers],
    ['Diver status', enquiry.diverStatus],
    ['Certification', enquiry.certificationLevel],
    ['Certification agency', enquiry.certificationAgency],
    ['Logged dives', enquiry.loggedDives],
    ['Accommodation required', enquiry.accommodationRequired ? 'Yes' : 'No'],
    ['Equipment required', enquiry.equipmentRequired ? 'Yes' : 'No'],
    ['Transfer required', enquiry.transferRequired ? 'Yes' : 'No'],
    ['Special requests', enquiry.specialRequests],
    ['Message', enquiry.message],
  ]
  const text = rows.map(([label, value]) => `${label}: ${display(value)}`).join('\n')
  const htmlRows = rows.map(([label, value]) => `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(display(value))}</td></tr>`).join('')

  const result = await transporter.sendMail({
    from,
    to: contactEmail,
    replyTo: enquiry.email,
    subject: `New Fathu Dives enquiry — ${safeSubjectName(enquiry.fullName)}`,
    text,
    html: `<div style="font-family:Arial,sans-serif;color:#172554"><h1 style="font-size:24px">New website enquiry</h1><table style="width:100%;max-width:720px;border-collapse:collapse">${htmlRows}</table></div>`,
  })

  if (result.rejected.length > 0 || result.accepted.length === 0) {
    throw new Error(`SMTP server did not accept delivery to ${contactEmail}.`)
  }
}
