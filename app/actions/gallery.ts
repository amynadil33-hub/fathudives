'use server'

import { revalidatePath } from 'next/cache'
import { getAdminUser } from '@/lib/auth'
import { saveUpload } from '@/lib/uploads'
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '@/lib/data/gallery-store'
import type { GalleryCategory, MediaType } from '@/lib/types'

type ActionResult = { success: true } | { error: string }

function revalidateGallery() {
  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
  revalidatePath('/', 'layout')
}

function readCommonFields(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const category = String(formData.get('category') ?? 'Underwater') as GalleryCategory
  const caption = String(formData.get('caption') ?? '').trim()
  const mediaType = (String(formData.get('mediaType') ?? 'image') as MediaType) || 'image'
  const featured = formData.get('featured') === 'on' || formData.get('featured') === 'true'
  return { title, category, caption, mediaType, featured }
}

export async function createGallery(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }

  const { title, category, caption, mediaType, featured } = readCommonFields(formData)
  if (!title) return { error: 'A title is required.' }

  const imageFile = formData.get('image')
  const videoFile = formData.get('video')

  try {
    let imageUrl = String(formData.get('imageUrl') ?? '').trim()
    let videoUrl: string | undefined
    let posterUrl: string | undefined

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await saveUpload(imageFile, 'image')
    }
    if (mediaType === 'video') {
      posterUrl = imageUrl || undefined
      if (videoFile instanceof File && videoFile.size > 0) {
        videoUrl = await saveUpload(videoFile, 'video')
      }
    }

    if (!imageUrl) return { error: 'Please upload an image (used as the thumbnail/poster).' }

    await createGalleryItem({
      title,
      category,
      caption,
      mediaType,
      featured,
      imageUrl,
      videoUrl,
      posterUrl,
    })
    revalidateGallery()
    return { success: true }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not add the item.' }
  }
}

export async function updateGallery(id: string, formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }

  const { title, category, caption, mediaType, featured } = readCommonFields(formData)
  if (!title) return { error: 'A title is required.' }

  const imageFile = formData.get('image')
  const videoFile = formData.get('video')

  try {
    const patch: Record<string, unknown> = { title, category, caption, mediaType, featured }

    if (imageFile instanceof File && imageFile.size > 0) {
      const url = await saveUpload(imageFile, 'image')
      patch.imageUrl = url
      if (mediaType === 'video') patch.posterUrl = url
    }
    if (mediaType === 'video' && videoFile instanceof File && videoFile.size > 0) {
      patch.videoUrl = await saveUpload(videoFile, 'video')
    }

    const updated = await updateGalleryItem(id, patch)
    if (!updated) return { error: 'That item no longer exists.' }
    revalidateGallery()
    return { success: true }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not save changes.' }
  }
}

export async function removeGallery(id: string): Promise<ActionResult> {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }
  try {
    await deleteGalleryItem(id)
    revalidateGallery()
    return { success: true }
  } catch {
    return { error: 'Could not delete the item.' }
  }
}

export async function toggleGalleryFeatured(id: string, featured: boolean): Promise<ActionResult> {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }
  try {
    const updated = await updateGalleryItem(id, { featured })
    if (!updated) return { error: 'That item no longer exists.' }
    revalidateGallery()
    return { success: true }
  } catch {
    return { error: 'Could not update the item.' }
  }
}
