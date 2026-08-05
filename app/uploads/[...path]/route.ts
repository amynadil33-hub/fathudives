import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse, type NextRequest } from 'next/server'
import { UPLOAD_DIR } from '@/lib/uploads'

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
}

// Serves uploaded files that live in `.data/uploads` (outside `public/`, so
// writing them during dev does not trigger a server-restarting recompile).
export async function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params

  // Resolve within UPLOAD_DIR and reject any path traversal.
  const relative = segments.join('/')
  const filePath = path.join(UPLOAD_DIR, relative)
  if (!filePath.startsWith(UPLOAD_DIR)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const file = await fs.readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream'
    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
