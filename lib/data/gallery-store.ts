import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { GalleryItem } from '@/lib/types'
import { galleryItems as seedItems } from './gallery'
import { DATA_DIR } from './data-dir'

/**
 * Persisted gallery store.
 *
 * Seeds from the typed sample gallery on first read, then persists all admin
 * edits to disk. Swap these helpers for Supabase queries when connected.
 */

const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json')

async function readAll(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(GALLERY_FILE, 'utf8')
    return JSON.parse(raw) as GalleryItem[]
  } catch {
    // First run: seed from the sample data.
    await writeAll(seedItems as GalleryItem[])
    return seedItems as GalleryItem[]
  }
}

async function writeAll(items: GalleryItem[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2), 'utf8')
}

export async function listGallery(): Promise<GalleryItem[]> {
  return readAll()
}

export type GalleryInput = Omit<GalleryItem, 'id'>

export async function createGalleryItem(input: GalleryInput): Promise<GalleryItem> {
  const items = await readAll()
  const item: GalleryItem = { ...input, id: `g_${randomUUID().slice(0, 8)}` }
  items.unshift(item)
  await writeAll(items)
  return item
}

export async function updateGalleryItem(
  id: string,
  patch: Partial<GalleryInput>,
): Promise<GalleryItem | null> {
  const items = await readAll()
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) return null
  items[idx] = { ...items[idx], ...patch }
  await writeAll(items)
  return items[idx]
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const items = await readAll()
  await writeAll(items.filter((i) => i.id !== id))
}
