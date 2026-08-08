'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function createGalleryItem(formData: FormData) {
  await requireAdmin()

  const supabase = await createClient()
  if (!supabase) throw new Error('Supabase is not configured.')

  const title = String(formData.get('title') || '').trim()
  const mediaType = String(formData.get('mediaType') || 'image')
  const imageUrl = String(formData.get('imageUrl') || '').trim()
  const videoUrl = String(formData.get('videoUrl') || '').trim()
  const category = String(formData.get('category') || '').trim()
  const caption = String(formData.get('caption') || '').trim()

  const featured = formData.get('featured') === 'on'
  const active = formData.get('active') === 'on'

  const sortOrderValue = Number(formData.get('sortOrder') || 0)

  if (!title) {
    throw new Error('Title is required.')
  }

  const { error } = await supabase
    .from('gallery_items')
    .insert({
      title,
      media_type: mediaType,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
      poster_url: null,
      category: category || null,
      caption: caption || null,
      featured,
      active,
      sort_order: Number.isNaN(sortOrderValue)
        ? 0
        : sortOrderValue,
    })

  if (error) {
    console.error('Create gallery item error:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')

  redirect('/admin/gallery')
}

export async function updateGalleryItem(formData: FormData) {
  await requireAdmin()

  const supabase = await createClient()
  if (!supabase) throw new Error('Supabase is not configured.')

  const id = String(formData.get('id') || '')

  const title = String(formData.get('title') || '').trim()
  const mediaType = String(formData.get('mediaType') || 'image')
  const imageUrl = String(formData.get('imageUrl') || '').trim()
  const videoUrl = String(formData.get('videoUrl') || '').trim()
  const category = String(formData.get('category') || '').trim()
  const caption = String(formData.get('caption') || '').trim()

  const featured = formData.get('featured') === 'on'
  const active = formData.get('active') === 'on'

  const sortOrderValue = Number(formData.get('sortOrder') || 0)

  if (!id) {
    throw new Error('Gallery item ID is missing.')
  }

  if (!title) {
    throw new Error('Title is required.')
  }

  const { error } = await supabase
    .from('gallery_items')
    .update({
      title,
      media_type: mediaType,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
      category: category || null,
      caption: caption || null,
      featured,
      active,
      sort_order: Number.isNaN(sortOrderValue)
        ? 0
        : sortOrderValue,
    })
    .eq('id', id)

  if (error) {
    console.error('Update gallery item error:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')

  redirect('/admin/gallery')
}

export async function deleteGalleryItem(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get('id') || '')

  if (!id) {
    throw new Error('Gallery item ID is missing.')
  }

  const supabase = await createClient()
  if (!supabase) throw new Error('Supabase is not configured.')

  const { error } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete gallery item error:', error)
    throw new Error(error.message)
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}
