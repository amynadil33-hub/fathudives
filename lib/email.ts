import 'server-only'

import nodemailer from 'nodemailer'

type RequiredSmtpVariable = 'SMTP_HOST' | 'SMTP_USER' | 'SMTP_PASSWORD'

function requiredEnvironmentVariable(name: RequiredSmtpVariable) {
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
      requireTLS: port === 587,
      auth: { user, pass: password },
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
    }),
    from: `"Fathu Dives Website" <${user}>`,
    contactEmail: process.env.CONTACT_EMAIL?.trim() || 'contact@fathudives.com',
  }
}
