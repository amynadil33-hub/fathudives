import 'server-only'
import type { Enquiry, EnquiryInput, EnquiryStatus } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

// Development fallback store. When Supabase is configured, all reads/writes go
// through it instead. This keeps the app fully functional before credentials
// are added, without hard-coding sample enquiries into components.
const memoryStore: Enquiry[] = []

function toRow(input: EnquiryInput) {
  return {
    full_name: input.fullName,
    email: input.email,
    whatsapp: input.whatsapp ?? null,
    nationality: input.nationality ?? null,
    arrival_date: input.arrivalDate || null,
    departure_date: input.departureDate || null,
    adults: input.adults,
    children: input.children,
    number_of_divers: input.numberOfDivers,
    diver_status: input.diverStatus,
    certification_level: input.certificationLevel ?? null,
    certification_agency: input.certificationAgency ?? null,
    logged_dives: input.loggedDives ?? null,
    package_id: input.packageId || null,
    accommodation_required: input.accommodationRequired,
    equipment_required: input.equipmentRequired,
    transfer_required: input.transferRequired,
    special_requests: input.specialRequests ?? null,
    message: input.message ?? null,
    status: 'new' as EnquiryStatus,
  }
}

export async function createEnquiry(input: EnquiryInput): Promise<Enquiry> {
  const supabase = await createClient()

  if (supabase) {
    const { data, error } = await supabase.from('enquiries').insert(toRow(input)).select().single()
    if (error) throw error
    return mapRow(data)
  }

  const enquiry: Enquiry = {
    ...input,
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  memoryStore.unshift(enquiry)
  return enquiry
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<void> {
  const supabase = await createClient()
  if (supabase) {
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (error) throw error
    return
  }
  const found = memoryStore.find((e) => e.id === id)
  if (found) found.status = status
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const supabase = await createClient()
  if (supabase) {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []).map(mapRow)
  }
  return memoryStore
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRow(row: any): Enquiry {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    whatsapp: row.whatsapp ?? undefined,
    nationality: row.nationality ?? undefined,
    arrivalDate: row.arrival_date ?? undefined,
    departureDate: row.departure_date ?? undefined,
    adults: row.adults,
    children: row.children,
    numberOfDivers: row.number_of_divers,
    diverStatus: row.diver_status,
    certificationLevel: row.certification_level ?? undefined,
    certificationAgency: row.certification_agency ?? undefined,
    loggedDives: row.logged_dives ?? undefined,
    packageId: row.package_id ?? undefined,
    accommodationRequired: row.accommodation_required,
    equipmentRequired: row.equipment_required,
    transferRequired: row.transfer_required,
    specialRequests: row.special_requests ?? undefined,
    message: row.message ?? undefined,
    consent: true,
    status: row.status,
    createdAt: row.created_at,
  }
}
