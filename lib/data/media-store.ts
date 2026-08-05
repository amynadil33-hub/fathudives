import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { media, mediaRegistry } from '@/lib/media'

/**
 * Persisted media overrides.
 *
 * Admin image replacements are stored as { [mediaKey]: newSrc } in a JSON file
 * on disk. This keeps the site fully functional (and edits persistent) before
 * a database is connected. When Supabase is added, swap the read/write helpers
 * below for table queries without touching any call site.
 */

const DATA_DIR = path.join(process.cwd(), '.data')
const OVERRIDES_FILE = path.join(DATA_DIR, 'media-overrides.json')

type Overrides = Record<string, string>

async function readOverrides(): Promise<Overrides> {
  try {
    const raw = await fs.readFile(OVERRIDES_FILE, 'utf8')
    return JSON.parse(raw) as Overrides
  } catch {
    return {}
  }
}

async function writeOverrides(next: Overrides): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(OVERRIDES_FILE, JSON.stringify(next, null, 2), 'utf8')
}

export async function getMediaOverrides(): Promise<Overrides> {
  return readOverrides()
}

export async function setMediaOverride(key: string, src: string): Promise<void> {
  const current = await readOverrides()
  current[key] = src
  await writeOverrides(current)
}

export async function resetMediaOverride(key: string): Promise<void> {
  const current = await readOverrides()
  delete current[key]
  await writeOverrides(current)
}

/**
 * Resolve a single registry key to its current src (override or default).
 */
export async function getMediaSrc(key: string): Promise<string> {
  const overrides = await readOverrides()
  if (overrides[key]) return overrides[key]
  const entry = mediaRegistry.find((m) => m.key === key)
  return entry?.defaultSrc ?? '/placeholder.svg'
}

/**
 * Build a map of default-src -> overridden-src. Used to rewrite media paths
 * that are baked into content arrays (packages, dive sites, testimonials...).
 */
export async function getMediaPathMap(): Promise<Record<string, string>> {
  const overrides = await readOverrides()
  const map: Record<string, string> = {}
  for (const entry of mediaRegistry) {
    const override = overrides[entry.key]
    if (override) map[entry.defaultSrc] = override
  }
  return map
}

/** Apply a path map to a single src string. */
export function resolveSrc(map: Record<string, string>, src: string | undefined | null): string {
  if (!src) return '/placeholder.svg'
  return map[src] ?? src
}

/**
 * Return the full nested `media` object with all overrides applied. Server
 * components use this so direct references (hero, CTA, etc.) reflect edits.
 */
export async function getResolvedMedia(): Promise<typeof media> {
  const overrides = await readOverrides()
  // Deep clone the defaults.
  const resolved = JSON.parse(JSON.stringify(media)) as Record<string, unknown>

  for (const [key, src] of Object.entries(overrides)) {
    const segments = key.split('.')
    if (segments.length === 1) {
      resolved[segments[0]] = src
    } else if (segments.length === 2) {
      const [group, leaf] = segments
      const groupObj = resolved[group]
      if (groupObj && typeof groupObj === 'object') {
        ;(groupObj as Record<string, unknown>)[leaf] = src
      }
    }
  }

  return resolved as unknown as typeof media
}
