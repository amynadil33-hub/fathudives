import 'server-only'
import os from 'os'
import path from 'path'

/**
 * Root directory for the disk-based CMS fallback (persisted JSON stores and
 * uploaded files).
 *
 * CRITICAL: this MUST live OUTSIDE the project directory. `next dev` watches
 * the whole project tree, so writing files anywhere under `process.cwd()`
 * (including `.data/` or `public/`) during a Server Action triggers a recompile
 * that tears the server down mid-request — the client then sees the action fail
 * with "Failed to fetch". Writing to the OS temp dir avoids the watcher
 * entirely while keeping edits persistent for the session.
 *
 * When Vercel Blob / Supabase is connected this whole disk layer is bypassed.
 */
export const DATA_DIR = path.join(os.tmpdir(), 'fathu-dives-cms')
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads')
