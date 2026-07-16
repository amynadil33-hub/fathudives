/**
 * Data access layer.
 *
 * Pages import from here rather than from raw data files. Today these helpers
 * return typed mock data. When Supabase credentials are added you can swap the
 * bodies of these functions to query Supabase without touching any page/component.
 * Every helper is async so the call sites are already Supabase-ready.
 */

import { packages } from './packages'
import { courses } from './courses'
import { diveSites } from './dive-sites'
import { galleryItems } from './gallery'
import { testimonials } from './testimonials'
import { faqs } from './faqs'
import { experiences, adventureOptions } from './experiences'
import type { Package, Course, DiveSite } from '@/lib/types'

// Packages -------------------------------------------------------------------
export async function getPackages(): Promise<Package[]> {
  return [...packages].sort((a, b) => a.basePrice - b.basePrice)
}

export async function getFeaturedPackages(): Promise<Package[]> {
  return packages.filter((p) => p.featured)
}

export async function getPackageBySlug(slug: string): Promise<Package | undefined> {
  return packages.find((p) => p.slug === slug)
}

export async function getRelatedPackages(slug: string, limit = 3): Promise<Package[]> {
  return packages.filter((p) => p.slug !== slug).slice(0, limit)
}

// Courses --------------------------------------------------------------------
export async function getCourses(): Promise<Course[]> {
  return courses
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return courses.find((c) => c.slug === slug)
}

// Dive sites -----------------------------------------------------------------
export async function getDiveSites(): Promise<DiveSite[]> {
  return diveSites
}

export async function getFeaturedDiveSites(): Promise<DiveSite[]> {
  return diveSites.filter((s) => s.featured)
}

export async function getDiveSiteBySlug(slug: string): Promise<DiveSite | undefined> {
  return diveSites.find((s) => s.slug === slug)
}

// Content --------------------------------------------------------------------
export async function getGalleryItems() {
  return galleryItems
}

export async function getTestimonials() {
  return testimonials
}

export async function getFaqs() {
  return faqs
}

export async function getExperiences() {
  return experiences
}

export async function getAdventureOptions() {
  return adventureOptions
}

// Re-export raw arrays for client components that need synchronous sample data.
export {
  packages,
  courses,
  diveSites,
  galleryItems,
  testimonials,
  faqs,
  experiences,
  adventureOptions,
}
