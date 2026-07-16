'use server'

import { revalidatePath } from 'next/cache'
import { updateEnquiryStatus } from '@/lib/data/enquiries'
import { getAdminUser } from '@/lib/auth'
import type { EnquiryStatus } from '@/lib/types'

export async function setEnquiryStatus(id: string, status: EnquiryStatus) {
  const user = await getAdminUser()
  if (!user) return { error: 'Not authorised.' }

  try {
    await updateEnquiryStatus(id, status)
    revalidatePath('/admin/enquiries')
    revalidatePath('/admin')
    return { success: true }
  } catch {
    return { error: 'Could not update the enquiry. Please try again.' }
  }
}
