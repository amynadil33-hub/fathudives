'use server'

import { z } from 'zod'
import { createEnquiry } from '@/lib/data/enquiries'
import { packages } from '@/lib/data/packages'
import { sendEnquiryNotification } from '@/lib/email/enquiry-notification'
import type { EnquiryInput } from '@/lib/types'

const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  whatsapp: z.string().trim().max(50).optional(),
  nationality: z.string().trim().max(100).optional(),
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  adults: z.coerce.number().int().min(1).max(30),
  children: z.coerce.number().int().min(0).max(30),
  numberOfDivers: z.coerce.number().int().min(0).max(30),
  diverStatus: z.string().min(1, 'Please select your diver status.'),
  certificationLevel: z.string().trim().max(100).optional(),
  certificationAgency: z.string().trim().max(100).optional(),
  loggedDives: z.coerce.number().int().min(0).optional(),
  packageId: z.string().optional(),
  accommodationRequired: z.coerce.boolean().optional(),
  equipmentRequired: z.coerce.boolean().optional(),
  transferRequired: z.coerce.boolean().optional(),
  specialRequests: z.string().trim().max(2_000).optional(),
  message: z.string().trim().max(5_000).optional(),
  consent: z
    .string()
    .optional()
    .refine((v) => v === 'on' || v === 'true', {
      message: 'Please confirm you consent to being contacted.',
    }),
})

export type EnquiryFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Record<string, string>
}

export async function submitEnquiry(
  _prev: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = enquirySchema.safeParse(raw)

  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !errors[key]) errors[key] = issue.message
    }
    return {
      status: 'error',
      message: 'Please check the highlighted fields and try again.',
      errors,
    }
  }

  const d = parsed.data
  const selectedPackage = packages.find((pkg) => pkg.id === d.packageId)
  const isDatabaseId = Boolean(d.packageId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(d.packageId))
  const message = selectedPackage
    ? [`Selected package: ${selectedPackage.title}.`, d.message].filter(Boolean).join(' ')
    : d.message

  try {
    const enquiry: EnquiryInput = {
      fullName: d.fullName,
      email: d.email,
      whatsapp: d.whatsapp,
      nationality: d.nationality,
      arrivalDate: d.arrivalDate,
      departureDate: d.departureDate,
      adults: d.adults,
      children: d.children,
      numberOfDivers: d.numberOfDivers,
      diverStatus: d.diverStatus as never,
      certificationLevel: d.certificationLevel,
      certificationAgency: d.certificationAgency,
      loggedDives: d.loggedDives,
      packageId: isDatabaseId ? d.packageId : undefined,
      accommodationRequired: Boolean(d.accommodationRequired),
      equipmentRequired: Boolean(d.equipmentRequired),
      transferRequired: Boolean(d.transferRequired),
      specialRequests: d.specialRequests,
      message,
      consent: true,
    }

    // Persist first so a temporary mail-provider failure can never lose the
    // visitor's enquiry or incorrectly tell them that the form failed.
    const savedEnquiry = await createEnquiry(enquiry)

    try {
      await sendEnquiryNotification(savedEnquiry, selectedPackage?.title)
    } catch (emailError) {
      console.error(
        `[Fathu Dives] enquiry ${savedEnquiry.id} was saved, but email notification failed:`,
        emailError,
      )
      return {
        status: 'success',
        message: 'Thank you. Your enquiry was saved, but our email notification was delayed. Please contact us on WhatsApp if your request is urgent.',
      }
    }

    return {
      status: 'success',
      message: 'Thank you. Your enquiry has been received.',
    }
  } catch (err) {
    console.error('[Fathu Dives] enquiry submission failed:', err)
    return {
      status: 'error',
      message: 'Something went wrong while sending your enquiry. Please try again or reach us on WhatsApp.',
    }
  }
}
