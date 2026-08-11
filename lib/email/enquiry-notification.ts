import 'server-only'

import { ENQUIRY_EMAIL, getEmailClient } from '@/lib/email'
import { getEmailConfig, mailTransporter } from '@/lib/email'
import type { EnquiryInput } from '@/lib/types'

function display(value: string | number | undefined) {
  return value === undefined || value === '' ? 'Not provided' : String(value)
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

export async function sendEnquiryNotification(input: EnquiryInput, packageTitle?: string) {
  const { from, transporter } = getEmailClient()
  const emailConfig = getEmailConfig()
  if (!emailConfig) {
    console.warn('[Fathu Dives] email notification skipped: SMTP credentials are not configured')
    return
  }

  const rows: Array<[string, string | number | undefined]> = [
    ['Name', input.fullName], ['Email', input.email], ['WhatsApp', input.whatsapp],
    ['Nationality', input.nationality], ['Package', packageTitle], ['Arrival', input.arrivalDate],
    ['Departure', input.departureDate], ['Adults', input.adults], ['Children', input.children],
    ['Divers', input.numberOfDivers], ['Diver status', input.diverStatus],
    ['Certification', input.certificationLevel], ['Certification agency', input.certificationAgency],
    ['Logged dives', input.loggedDives], ['Accommodation required', input.accommodationRequired ? 'Yes' : 'No'],
    ['Equipment required', input.equipmentRequired ? 'Yes' : 'No'], ['Transfer required', input.transferRequired ? 'Yes' : 'No'],
    ['Special requests', input.specialRequests], ['Message', input.message],
  ]
  const text = rows.map(([label, value]) => `${label}: ${display(value)}`).join('\n')
  const htmlRows = rows.map(([label, value]) => `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(display(value))}</td></tr>`).join('')

  const result = await transporter.sendMail({
    from,
    to: ENQUIRY_EMAIL,
  await mailTransporter.sendMail({
    from: emailConfig.from,
    to: emailConfig.notificationEmail,
    replyTo: input.email,
    subject: `${packageTitle ? 'Booking' : 'Contact'} enquiry from ${input.fullName}`,
    text,
    html: `<div style="font-family:Arial,sans-serif;color:#172554"><h1 style="font-size:24px">New website enquiry</h1><table style="width:100%;max-width:720px;border-collapse:collapse">${htmlRows}</table></div>`,
  })

  if (result.rejected.length > 0 || result.accepted.length === 0) {
    throw new Error(`SMTP server did not accept delivery to ${ENQUIRY_EMAIL}.`)
  }
}
