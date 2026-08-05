'use server'

import { revalidatePath } from 'next/cache'
import { getAdminUser } from '@/lib/auth'
import { setMediaOverride, resetMediaOverride } from '@/lib/data/media-store'

type ActionResult = { success: true } | { error: string }

// Refresh the public site (everything under the root layout) plus the manager.
function revalidateSite() {
  revalidatePath('/', 'layout')
  revalidatePath('/admin/images')
}

// The file itself is uploaded via /api/upload (a Route Handler); this action
// only records the resulting URL as the override for the given media key.
export async function replaceMediaImage(key: string, url: string): Promise<ActionResult> {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }

  if (!url || typeof url !== 'string') {
    return { error: 'Missing uploaded image URL.' }
  }

  try {
    await setMediaOverride(key, url)
    revalidateSite()
    return { success: true }
  } catch {
    return { error: 'Could not save this image. Please try again.' }
  }
}

export async function resetMediaImage(key: string): Promise<ActionResult> {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }

  try {
    await resetMediaOverride(key)
    revalidateSite()
    return { success: true }
  } catch {
    return { error: 'Could not reset this image. Please try again.' }
  }
}
