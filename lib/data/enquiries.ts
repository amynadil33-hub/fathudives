import 'server-only'
import type { Enquiry, EnquiryInput, EnquiryStatus } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

// Development fallback store. When Supabase is configured, all reads/writes go
// through it instead. This keeps the app fully functional before credentials
// are added, without hard-coding sample enquiries into components.
const memoryStore: Enquiry[] = []

function isMissingTableError(error: { code?: string; message?: string } | null) {
  if (!error) return false
  return (
    ['PGRST204', 'PGRST205', '42P01'].includes(error.code ?? '') ||
    /could not find the table|relation .* does not exist/i.test(error.message ?? '')
  )
}

function warnSchemaMissing() {
  console.warn('[Fathu Dives] Supabase enquiry tables are not installed; using the temporary in-memory store.')
}
function toRow(enquiry: Enquiry) {
  return {
    id: enquiry.id,
    full_name: enquiry.fullName,
    email: enquiry.email,
    whatsapp: enquiry.whatsapp ?? null,
    nationality: enquiry.nationality ?? null,
    arrival_date: enquiry.arrivalDate || null,
    departure_date: enquiry.departureDate || null,
    adults: enquiry.adults,
    children: enquiry.children,
    number_of_divers: enquiry.numberOfDivers,
    diver_status: enquiry.diverStatus,
    certification_level: enquiry.certificationLevel ?? null,
    certification_agency: enquiry.certificationAgency ?? null,
    logged_dives: enquiry.loggedDives ?? null,
    package_id: enquiry.packageId || null,
    accommodation_required: enquiry.accommodationRequired,
    equipment_required: enquiry.equipmentRequired,
    transfer_required: enquiry.transferRequired,
    special_requests: enquiry.specialRequests ?? null,
    message: enquiry.message ?? null,
    status: enquiry.status,
    created_at: enquiry.createdAt,
  }
}

export async function createEnquiry(input: EnquiryInput): Promise<Enquiry> {
  // Supplying our own UUID and timestamp lets us include authoritative record
  // metadata in the notification without selecting the row after insertion.
  // Anonymous RLS permits INSERT but intentionally denies SELECT.
  const enquiry: Enquiry = {
    ...input,
    id: crypto.randomUUID(),
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  const supabase = await createClient()

  if (supabase) {
    // Anonymous visitors may insert enquiries, but RLS intentionally prevents
    // them from reading enquiry rows. Requesting the inserted row with
    // `.select()` therefore turns a valid insert into a permission error.
    const { error } = await supabase.from('enquiries').insert(toRow(enquiry))
    if (!error) return enquiry
    if (!isMissingTableError(error)) throw error
    warnSchemaMissing()
  }

  memoryStore.unshift(enquiry)
  return enquiry
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<void> {
  const supabase = await createClient()
  if (supabase) {
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (!error) return
    if (!isMissingTableError(error)) throw error
    warnSchemaMissing()
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
    if (!error) return (data ?? []).map(mapRow)
    if (!isMissingTableError(error)) throw error
    warnSchemaMissing()
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
