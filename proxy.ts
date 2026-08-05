import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Refreshes the Supabase auth session on each request so Server Components
// always see a valid session. When Supabase env vars are absent, the app runs
// on mock data and this middleware becomes a transparent pass-through.
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const response = NextResponse.next({ request })

  // Only touch Supabase when it is explicitly enabled AND configured. This
  // avoids paying a DNS/connection timeout on every request when stale env
  // vars point to a dead project. Enable with NEXT_PUBLIC_SUPABASE_ENABLED=true.
  const enabled = process.env.NEXT_PUBLIC_SUPABASE_ENABLED === 'true'
  if (!enabled || !url || !anonKey) return response

  const supabase = createServerClient(url, anonKey, {
    global: {
      // Short timeout so an unreachable/stale Supabase project can never freeze
      // requests. On failure we simply skip the session refresh.
      fetch: async (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(2500) }),
    },
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  try {
    // Touch the session so cookies are refreshed if needed.
    await supabase.auth.getUser()
  } catch {
    // Supabase unreachable — pass through so the app runs on its fallback data.
  }

  return response
}

export const config = {
  matcher: [
    // Run on all routes except static assets and images.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
}
