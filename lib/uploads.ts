import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

/**
 * Save an uploaded file to /public/uploads and return its public path.
 *
 * This is the local-development storage strategy. When Vercel Blob or Supabase
 * Storage is connected, replace the body of `saveUpload` with an upload to that
 * provider and return the resulting public URL — callers stay unchanged.
 */

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

const MAX_IMAGE_BYTES = 8 * 1024 * 1024 // 8 MB
const MAX_VIDEO_BYTES = 100 * 1024 * 1024 // 100 MB

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
}

export type UploadKind = 'image' | 'video' | 'any'

export async function saveUpload(file: File, kind: UploadKind = 'image'): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error('No file provided.')
  }

  const allowed =
    kind === 'image' ? IMAGE_TYPES : kind === 'video' ? VIDEO_TYPES : [...IMAGE_TYPES, ...VIDEO_TYPES]

  if (!allowed.includes(file.type)) {
    throw new Error('Unsupported file type.')
  }

  const isVideo = VIDEO_TYPES.includes(file.type)
  const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES
  if (file.size > limit) {
    throw new Error(`File is too large (max ${Math.round(limit / (1024 * 1024))} MB).`)
  }

  const ext = EXT_BY_TYPE[file.type] ?? 'bin'
  const filename = `${randomUUID()}.${ext}`

  await fs.mkdir(UPLOAD_DIR, { recursive: true })
  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)

  return `/uploads/${filename}`
}
