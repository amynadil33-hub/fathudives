import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Server-side Supabase client for authenticated Server Components, Route
// Handlers, and Server Actions. It reads the user session from cookies. A
// missing configuration is returned explicitly; production data callers throw
// rather than silently falling back to the reference data in lib/data/*.ts.
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null

  const cookieStore = await cookies()

  return createServerClient(url, anonKey, {
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

// Request-independent client for public content reads. Unlike createClient(),
// this does not access cookies(), so it is safe in generateStaticParams,
// generateMetadata, sitemap generation, and other build-time contexts. Public
// visibility continues to be enforced by RLS and explicit active filters.
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null

  return createSupabaseClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

// Admin client using the service-role key. NEVER import this into client code.
// Only use inside server actions / route handlers for privileged operations.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null

  return createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  })
}
