import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Dive the Wild Heart of Dhangethi`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'scuba diving Dhangethi',
    'diving South Ari Atoll',
    'whale shark diving Maldives',
    'manta diving Maldives',
    'Dhangethi dive packages',
    'Maldives local island diving',
    'beginner diving Maldives',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} — Dive the Wild Heart of Dhangethi`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: '/images/fathu-dives-logo-navy.png', width: 814, height: 807, alt: `${siteConfig.name} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Dive the Wild Heart of Dhangethi`,
    description: siteConfig.description,
    images: ['/images/fathu-dives-logo-navy.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export const viewport: Viewport = {
  themeColor: '#fcfbf7',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} bg-background`}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
