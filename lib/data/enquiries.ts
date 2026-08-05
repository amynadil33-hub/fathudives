import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import type { Enquiry, EnquiryInput, EnquiryStatus } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

// Development fallback store. When Supabase is configured, all reads/writes go
// through it instead. When it is not, enquiries persist to a JSON file on disk
// so the Bookings CMS stays functional and keeps data across requests.

const DATA_DIR = path.join(process.cwd(), '.data')
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json')

// A few realistic sample bookings so the admin has data to work with before
// any real enquiries arrive. Seeded only on first run.
const seedEnquiries: Enquiry[] = [
  {
    id: 'enq_seed_1',
    fullName: 'Hannah Meyer',
    email: 'hannah.meyer@example.com',
    whatsapp: '+49 170 1234567',
    nationality: 'Germany',
    arrivalDate: '2026-09-12',
    departureDate: '2026-09-19',
    adults: 2,
    children: 0,
    numberOfDivers: 2,
    diverStatus: 'Certified beginner',
    certificationLevel: 'Open Water',
    certificationAgency: 'PADI',
    loggedDives: 14,
    packageId: 'explorer',
    accommodationRequired: true,
    equipmentRequired: true,
    transferRequired: true,
    specialRequests: 'Honeymoon trip — a quiet room if possible.',
    message: 'We would love to see whale sharks and mantas.',
    consent: true,
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'enq_seed_2',
    fullName: 'Diego Fernández',
    email: 'diego.f@example.com',
    whatsapp: '+34 600 998877',
    nationality: 'Spain',
    arrivalDate: '2026-10-03',
    departureDate: '2026-10-10',
    adults: 1,
    children: 0,
    numberOfDivers: 1,
    diverStatus: 'Advanced diver',
    certificationLevel: 'Advanced Open Water',
    certificationAgency: 'SSI',
    loggedDives: 87,
    packageId: 'whaleshark',
    accommodationRequired: true,
    equipmentRequired: false,
    transferRequired: true,
    specialRequests: undefined,
    message: 'Interested in the whale shark focused package. I bring my own gear.',
    consent: true,
    status: 'contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: 'enq_seed_3',
    fullName: 'Aiko Tanaka',
    email: 'aiko.tanaka@example.com',
    whatsapp: '+81 90 1112 3333',
    nationality: 'Japan',
    arrivalDate: '2026-11-20',
    departureDate: '2026-11-27',
    adults: 2,
    children: 1,
    numberOfDivers: 2,
    diverStatus: 'Never dived before',
    accommodationRequired: true,
    equipmentRequired: true,
    transferRequired: true,
    specialRequests: 'Travelling with a 9 year old — snorkelling options welcome.',
    message: 'First time divers, would like the Discover Scuba experience.',
    consent: true,
    status: 'quoted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
]

async function readAll(): Promise<Enquiry[]> {
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf8')
    return JSON.parse(raw) as Enquiry[]
  } catch {
    await writeAll(seedEnquiries)
    return seedEnquiries
  }
}

async function writeAll(items: Enquiry[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(items, null, 2), 'utf8')
}

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
  const items = await readAll()
  items.unshift(enquiry)
  await writeAll(items)
  return enquiry
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<void> {
  const supabase = await createClient()
  if (supabase) {
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (error) throw error
    return
  }
  const items = await readAll()
  const found = items.find((e) => e.id === id)
  if (found) {
    found.status = status
    await writeAll(items)
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  const supabase = await createClient()
  if (supabase) {
    const { error } = await supabase.from('enquiries').delete().eq('id', id)
    if (error) throw error
    return
  }
  const items = await readAll()
  await writeAll(items.filter((e) => e.id !== id))
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
  return readAll()
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
