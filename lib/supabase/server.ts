import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

// Process-level reachability cache. Supabase env vars may be present but point
// to an unreachable / stale project. Rather than block every request on a slow
// DNS/connection timeout, we remember the first failure and thereafter treat
// Supabase as "not configured" so the app falls back to its disk/mock data.
//   null  = unknown (not probed yet)
//   true  = reachable
//   false = unreachable (skip Supabase for the rest of this process)
let supabaseReachable: boolean | null = null

// How long a single Supabase request may take before we consider the project
// unreachable. Kept short so a dead URL never freezes the UI.
const SUPABASE_TIMEOUT_MS = 2500

// A fetch wrapper that (a) applies a short timeout and (b) records whether the
// Supabase endpoint is reachable so future calls can short-circuit.
const timedFetch: typeof fetch = async (input, init) => {
  try {
    const res = await fetch(input, {
      ...init,
      signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
    })
    supabaseReachable = true
    return res
  } catch (err) {
    supabaseReachable = false
    throw err
  }
}

// Server-side Supabase client (Server Components, Route Handlers, Server
// Actions). Reads the user session from cookies. Returns null when env vars are
// not configured OR when the project has been found unreachable, so callers can
// fall back to mock/disk data.
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null
  if (supabaseReachable === false) return null

  const cookieStore = await cookies()

  return createServerClient<Database>(url, anonKey, {
    global: { fetch: timedFetch },
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if middleware refreshes sessions.
        }
      },
    },
  })
}

// Admin client using the service-role key. NEVER import this into client code.
// Only use inside server actions / route handlers for privileged operations.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null
  if (supabaseReachable === false) return null

  return createServerClient<Database>(url, serviceKey, {
    global: { fetch: timedFetch },
    cookies: { getAll: () => [], setAll: () => {} },
  })
}
