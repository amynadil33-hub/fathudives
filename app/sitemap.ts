import type { MetadataRoute } from 'next'
import { getPackages, getCourses, getDiveSites } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '')
  const now = new Date()

  const staticRoutes = [
    '',
    '/dive-packages',
    '/dive-courses',
    '/dive-sites',
    '/discover-dhangethi',
    '/gallery',
    '/about',
    '/contact',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const [packages, courses, diveSites] = await Promise.all([
    getPackages(),
    getCourses(),
    getDiveSites(),
  ])

  const packageRoutes = packages.map((p) => ({
    url: `${base}/dive-packages/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const courseRoutes = courses.map((c) => ({
    url: `${base}/dive-courses/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const siteRoutes = diveSites.map((s) => ({
    url: `${base}/dive-sites/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...packageRoutes, ...courseRoutes, ...siteRoutes]
}
