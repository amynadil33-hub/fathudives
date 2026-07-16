import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

// Browser-side Supabase client. Uses only the public anon key, which is safe
// to expose. Returns null when env vars are not yet configured so the app can
// gracefully fall back to typed mock data.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null

  return createBrowserClient<Database>(url, anonKey)
}
