import 'server-only'

import nodemailer from 'nodemailer'

export const ENQUIRY_EMAIL = 'contact@fathudives.com'

function requiredEnvironmentVariable(name: 'SMTP_HOST' | 'SMTP_USER' | 'SMTP_PASSWORD') {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is not configured in the deployment environment.`)
  return value
}

export function getEmailClient() {
  const host = requiredEnvironmentVariable('SMTP_HOST')
  const user = requiredEnvironmentVariable('SMTP_USER')
  const password = requiredEnvironmentVariable('SMTP_PASSWORD')
  const port = Number(process.env.SMTP_PORT || 465)

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('SMTP_PORT must be a valid port number.')
  }

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
    }),
    from: process.env.SMTP_FROM_EMAIL?.trim() || `Fathu Dives Website <${user}>`,
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
