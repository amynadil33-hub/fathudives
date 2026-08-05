/**
 * Data access layer.
 *
 * Pages import from here rather than from raw data files. These helpers return
 * typed sample data with any admin media overrides applied. When Supabase
 * credentials are added you can swap the bodies to query Supabase without
 * touching any page/component. Every helper is async so the call sites are
 * already Supabase-ready.
 */

import { packages } from './packages'
import { courses } from './courses'
import { diveSites } from './dive-sites'
import { testimonials } from './testimonials'
import { faqs } from './faqs'
import { experiences, adventureOptions } from './experiences'
import { listGallery } from './gallery-store'
import { getMediaPathMap, resolveSrc } from './media-store'
import type { Package, Course, DiveSite } from '@/lib/types'

// Packages -------------------------------------------------------------------
async function applyPackageMedia(list: Package[]): Promise<Package[]> {
  const map = await getMediaPathMap()
  return list.map((p) => ({
    ...p,
    featuredImage: resolveSrc(map, p.featuredImage),
    gallery: p.gallery.map((g) => resolveSrc(map, g)),
  }))
}

export async function getPackages(): Promise<Package[]> {
  const sorted = [...packages].sort((a, b) => a.basePrice - b.basePrice)
  return applyPackageMedia(sorted)
}

export async function getFeaturedPackages(): Promise<Package[]> {
  return applyPackageMedia(packages.filter((p) => p.featured))
}

export async function getPackageBySlug(slug: string): Promise<Package | undefined> {
  const found = packages.find((p) => p.slug === slug)
  if (!found) return undefined
  return (await applyPackageMedia([found]))[0]
}

export async function getRelatedPackages(slug: string, limit = 3): Promise<Package[]> {
  return applyPackageMedia(packages.filter((p) => p.slug !== slug).slice(0, limit))
}

// Courses --------------------------------------------------------------------
async function applyCourseMedia(list: Course[]): Promise<Course[]> {
  const map = await getMediaPathMap()
  return list.map((c) => ({ ...c, featuredImage: resolveSrc(map, c.featuredImage) }))
}

export async function getCourses(): Promise<Course[]> {
  return applyCourseMedia(courses)
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const found = courses.find((c) => c.slug === slug)
  if (!found) return undefined
  return (await applyCourseMedia([found]))[0]
}

// Dive sites -----------------------------------------------------------------
async function applyDiveSiteMedia(list: DiveSite[]): Promise<DiveSite[]> {
  const map = await getMediaPathMap()
  return list.map((s) => ({
    ...s,
    featuredImage: resolveSrc(map, s.featuredImage),
    gallery: s.gallery.map((g) => resolveSrc(map, g)),
  }))
}

export async function getDiveSites(): Promise<DiveSite[]> {
  return applyDiveSiteMedia(diveSites)
}

export async function getFeaturedDiveSites(): Promise<DiveSite[]> {
  return applyDiveSiteMedia(diveSites.filter((s) => s.featured))
}

export async function getDiveSiteBySlug(slug: string): Promise<DiveSite | undefined> {
  const found = diveSites.find((s) => s.slug === slug)
  if (!found) return undefined
  return (await applyDiveSiteMedia([found]))[0]
}

// Content --------------------------------------------------------------------
export async function getGalleryItems() {
  return listGallery()
}

export async function getTestimonials() {
  const map = await getMediaPathMap()
  return testimonials.map((t) => ({ ...t, guestImage: resolveSrc(map, t.guestImage) }))
}

export async function getFaqs() {
  return faqs
}

export async function getExperiences() {
  const map = await getMediaPathMap()
  return experiences.map((e) => ({ ...e, image: resolveSrc(map, e.image) }))
}

export async function getAdventureOptions() {
  return adventureOptions
}

// Re-export raw arrays for client components that need synchronous sample data.
export {
  packages,
  courses,
  diveSites,
  testimonials,
  faqs,
  experiences,
  adventureOptions,
}
