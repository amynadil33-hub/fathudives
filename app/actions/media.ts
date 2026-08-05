'use server'

import { revalidatePath } from 'next/cache'
import { getAdminUser } from '@/lib/auth'
import { saveUpload } from '@/lib/uploads'
import { setMediaOverride, resetMediaOverride } from '@/lib/data/media-store'

type ActionResult = { success: true; url?: string } | { error: string }

// Refresh the public site (everything under the root layout) plus the manager.
function revalidateSite() {
  revalidatePath('/', 'layout')
  revalidatePath('/admin/images')
}

export async function replaceMediaImage(key: string, formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Please choose an image to upload.' }
  }

  try {
    const url = await saveUpload(file, 'image')
    await setMediaOverride(key, url)
    revalidateSite()
    return { success: true, url }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Upload failed. Please try again.' }
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
