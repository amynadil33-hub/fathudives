import type { DiverStatus, PackageAudience } from './types'

export const DIVER_STATUSES: DiverStatus[] = [
  'Never dived before',
  'Discover Scuba participant',
  'Student diver',
  'Certified beginner',
  'Advanced diver',
  'Rescue diver',
  'Professional diver',
  'Snorkeller or non-diver',
]

export const PACKAGE_AUDIENCES: PackageAudience[] = [
  'Beginner',
  'Certified Diver',
  'Solo Traveller',
  'Couple',
  'Group',
  'Diving and Stay',
]

export const ENQUIRY_STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
}
