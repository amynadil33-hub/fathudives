// Client-side helper: upload a file through the /api/upload Route Handler and
// return its public URL. Used by the admin CMS instead of passing Files through
// Server Actions (which the preview transport drops).
export async function uploadFile(file: File, kind: 'image' | 'video' | 'any' = 'image'): Promise<string> {
  const formData = new FormData()
  formData.set('file', file)
  formData.set('kind', kind)

  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null

  if (!res.ok || !data?.url) {
    throw new Error(data?.error ?? 'Upload failed. Please try again.')
  }
  return data.url
}
