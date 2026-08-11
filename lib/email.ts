import 'server-only'

import nodemailer from 'nodemailer'

const smtpPort = Number(process.env.SMTP_PORT || 465)

export const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export function getEmailConfig() {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const password = process.env.SMTP_PASSWORD

  if (!host || !user || !password) return null

  return {
    from: process.env.SMTP_FROM_EMAIL?.trim() || `Fathu Dives Website <${user}>`,
    notificationEmail: process.env.ENQUIRY_NOTIFICATION_EMAIL?.trim() || 'contact@fathudives.com',
  }
}
