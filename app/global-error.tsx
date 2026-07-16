'use client'

import { useEffect } from 'react'

// Root-level error boundary. This replaces the entire root layout when an error
// is thrown in the layout itself, so it must render its own <html>/<body> and
// cannot depend on the app's fonts or global styles. Inline styles use the
// Fathu Dives palette so the fallback still feels on-brand.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log('[Fathu Dives] Global error:', error.message)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f0e6',
          color: '#17313d',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '32rem' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              fontSize: '12px',
              color: '#607f91',
              marginBottom: '16px',
            }}
          >
            Fathu Dives
          </p>
          <h1 style={{ fontSize: '2rem', margin: '0 0 12px', fontWeight: 600 }}>
            We hit a rough current
          </h1>
          <p style={{ lineHeight: 1.6, color: '#405d70', margin: '0 0 28px' }}>
            An unexpected error occurred. Please try again, or return to the homepage.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                cursor: 'pointer',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px 24px',
                backgroundColor: '#ee8467',
                color: '#fcfbf7',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: '9999px',
                padding: '12px 24px',
                border: '1px solid #607f91',
                color: '#17313d',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
