// Shared domain types for Fathu Dives.
// These mirror the Supabase schema (see supabase/schema.sql) so the mock data
// layer and a future Supabase data layer stay interchangeable.

export type ExperienceLevel =
  | 'Beginner'
  | 'Certified Diver'
  | 'All Levels'
  | 'Intermediate'
  | 'Advanced'

export type PackageAudience =
  | 'Beginner'
  | 'Certified Diver'
  | 'Solo Traveller'
  | 'Couple'
  | 'Group'
  | 'Diving and Stay'

export type InclusionType = 'included' | 'excluded'

export interface PackageInclusion {
  label: string
  type: InclusionType
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Package {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  featuredImage: string
  gallery: string[]
  nights: number
  dives: number
  experienceLevel: ExperienceLevel
  audiences: PackageAudience[]
  accommodationIncluded: boolean
  mealsIncluded: boolean
  transfersIncluded: boolean
  whaleShark: boolean
  manta: boolean
  basePrice: number // placeholder
  currency: string
  featured: boolean
  highlights: string[]
  inclusions: PackageInclusion[]
  itinerary: ItineraryDay[]
  accommodationInfo: string
  equipmentInfo: string
  transferInfo: string
  importantNotes: string[]
  cancellationPolicy: string
}

export type CourseCategory =
  | 'First-Time Diving'
  | 'Beginner Certification'
  | 'Advanced Courses'
  | 'Rescue and Safety'
  | 'Speciality Courses'
  | 'Professional Development'

export interface Course {
  id: string
  slug: string
  title: string
  category: CourseCategory
  description: string
  longDescription: string
  duration: string
  minimumAge: string // placeholder
  requiredCertification: string
  numberOfDives: number
  price: number // placeholder
  currency: string
  featuredImage: string
  highlights: string[]
  whatYouLearn: string[]
  featured: boolean
}

export type SiteType = 'Reef' | 'Channel' | 'Thila' | 'Wreck' | 'Whale Shark Area' | 'Manta Area'
export type CurrentLevel = 'Mild' | 'Moderate' | 'Strong' | 'Variable'

export interface DiveSite {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  siteType: SiteType
  depthMin: number
  depthMax: number
  difficulty: ExperienceLevel
  currentLevel: CurrentLevel
  marineLife: string[]
  journeyTime: string
  featuredImage: string
  gallery: string[]
  latitude: number | null
  longitude: number | null
  featured: boolean
}

export type GalleryCategory =
  | 'Underwater'
  | 'Whale Sharks'
  | 'Mantas'
  | 'Dhangethi'
  | 'Guests'
  | 'Boat Life'
  | 'Island Sunsets'

export type MediaType = 'image' | 'video'

export interface GalleryItem {
  id: string
  title: string
  mediaType: MediaType
  imageUrl: string
  videoUrl?: string
  posterUrl?: string
  category: GalleryCategory
  caption: string
  featured: boolean
}

export interface Testimonial {
  id: string
  guestName: string
  country: string
  tripType: string
  review: string
  guestImage: string
  source: string
  sourceUrl?: string
}

export interface Faq {
  id: string
  question: string
  answer: string
}

export interface Experience {
  id: string
  title: string
  description: string
  level: string
  image: string
  href: string
  size: 'tall' | 'wide' | 'regular'
}

export interface AdventureOption {
  id: string
  label: string
  description: string
  recommendationType: 'package' | 'course'
  recommendationSlug: string
  recommendationLabel: string
}

// Enquiry (contact / booking form) ------------------------------------------

export type DiverStatus =
  | 'Never dived before'
  | 'Discover Scuba participant'
  | 'Student diver'
  | 'Certified beginner'
  | 'Advanced diver'
  | 'Rescue diver'
  | 'Professional diver'
  | 'Snorkeller or non-diver'

export type EnquiryStatus = 'new' | 'contacted' | 'quoted' | 'confirmed' | 'cancelled'

export interface EnquiryInput {
  fullName: string
  email: string
  whatsapp?: string
  nationality?: string
  arrivalDate?: string
  departureDate?: string
  adults: number
  children: number
  numberOfDivers: number
  diverStatus: DiverStatus
  certificationLevel?: string
  certificationAgency?: string
  loggedDives?: number
  packageId?: string
  accommodationRequired: boolean
  equipmentRequired: boolean
  transferRequired: boolean
  specialRequests?: string
  message?: string
  consent: boolean
}

export interface Enquiry extends EnquiryInput {
  id: string
  status: EnquiryStatus
  createdAt: string
}
