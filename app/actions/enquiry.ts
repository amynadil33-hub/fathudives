'use server'

import { z } from 'zod'
import { createEnquiry } from '@/lib/data/enquiries'
import { packages } from '@/lib/data/packages'

const enquirySchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  whatsapp: z.string().optional(),
  nationality: z.string().optional(),
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  adults: z.coerce.number().int().min(1).max(30),
  children: z.coerce.number().int().min(0).max(30),
  numberOfDivers: z.coerce.number().int().min(0).max(30),
  diverStatus: z.string().min(1, 'Please select your diver status.'),
  certificationLevel: z.string().optional(),
  certificationAgency: z.string().optional(),
  loggedDives: z.coerce.number().int().min(0).optional(),
  packageId: z.string().optional(),
  accommodationRequired: z.coerce.boolean().optional(),
  equipmentRequired: z.coerce.boolean().optional(),
  transferRequired: z.coerce.boolean().optional(),
  specialRequests: z.string().optional(),
  message: z.string().optional(),
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
    await createEnquiry({
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
    })

    return {
      status: 'success',
      message: 'Thank you. Your enquiry has been received.',
    }
  } catch (err) {
    console.log('[Fathu Dives] enquiry submission failed:', err)
    return {
      status: 'error',
      message: 'Something went wrong while sending your enquiry. Please try again or reach us on WhatsApp.',
    }
  }
}
