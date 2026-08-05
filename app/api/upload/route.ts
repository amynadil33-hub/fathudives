import { NextResponse } from 'next/server'
import { getAdminUser } from '@/lib/auth'
import { saveUpload, type UploadKind } from '@/lib/uploads'

// Files are uploaded through this plain multipart Route Handler rather than a
// Server Action. React's Server Action transport encodes File payloads in a way
// the v0 preview proxy drops (the client sees "Failed to fetch"), whereas a
// normal multipart POST to a Route Handler works reliably. The lightweight
// Server Actions then only receive the resulting URL string.
export async function POST(request: Request) {
  const user = await getAdminUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 })
  }

  const file = formData.get('file')
  const kind = (formData.get('kind') as UploadKind) || 'image'

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Please choose a file to upload.' }, { status: 400 })
  }

  try {
    const url = await saveUpload(file, kind === 'video' || kind === 'any' ? kind : 'image')
    return NextResponse.json({ url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed. Please try again.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
