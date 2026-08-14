import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { createClient } from '@supabase/supabase-js'

function readEnv(file = '.env') {
  return Object.fromEntries(
    fs
      .readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !line.trim().startsWith('#') && line.includes('='))
      .map((line) => {
        const separator = line.indexOf('=')
        const key = line.slice(0, separator).trim()
        const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
        return [key, value]
      }),
  )
}

function loadTypeScriptModule(file, dependencies = {}) {
  const source = fs.readFileSync(file, 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: file,
  }).outputText

  const module = { exports: {} }
  const localRequire = (specifier) => {
    if (specifier in dependencies) return dependencies[specifier]
    throw new Error(`Unsupported runtime import ${specifier} in ${file}`)
  }
  const run = new Function('require', 'module', 'exports', output)
  run(localRequire, module, module.exports)
  return module.exports
}

function stableUuid(value) {
  const hex = crypto.createHash('md5').update(value).digest('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function required(env, name) {
  if (!env[name]) throw new Error(`${name} is missing from .env`)
  return env[name]
}

async function checked(label, operation) {
  const { data, error } = await operation
  if (error) throw new Error(`${label}: ${error.message}`)
  return data
}

const root = process.cwd()
const env = readEnv()
const supabase = createClient(
  required(env, 'NEXT_PUBLIC_SUPABASE_URL'),
  required(env, 'NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  { auth: { persistSession: false, autoRefreshToken: false } },
)

const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email: required(env, 'ADMIN_EMAIL'),
  password: required(env, 'ADMIN_PASSWORD'),
})
if (authError || !authData.user) {
  throw new Error(`Admin sign-in failed: ${authError?.message ?? 'No user returned'}`)
}

const profile = await checked(
  'Admin profile check failed',
  supabase.from('profiles').select('role').eq('id', authData.user.id).single(),
)
if (!['super_admin', 'admin', 'editor'].includes(profile.role)) {
  throw new Error('The configured account does not have an admin profile role.')
}

const mediaModule = loadTypeScriptModule(path.join(root, 'lib/media.ts'))
const mediaDependency = { '@/lib/media': mediaModule }
const { packages } = loadTypeScriptModule(path.join(root, 'lib/data/packages.ts'), mediaDependency)
const { courses } = loadTypeScriptModule(path.join(root, 'lib/data/courses.ts'), mediaDependency)
const { diveSites } = loadTypeScriptModule(path.join(root, 'lib/data/dive-sites.ts'), mediaDependency)
const { galleryItems } = loadTypeScriptModule(path.join(root, 'lib/data/gallery.ts'))
const { testimonials } = loadTypeScriptModule(path.join(root, 'lib/data/testimonials.ts'), mediaDependency)
const { faqs } = loadTypeScriptModule(path.join(root, 'lib/data/faqs.ts'))
const { experiences, adventureOptions } = loadTypeScriptModule(
  path.join(root, 'lib/data/experiences.ts'),
  mediaDependency,
)

const packageRows = packages.map((item, index) => ({
  slug: item.slug,
  title: item.title,
  short_description: item.shortDescription,
  full_description: item.fullDescription,
  featured_image: item.featuredImage,
  gallery: item.gallery,
  nights: item.nights,
  dives: item.dives,
  experience_level: item.experienceLevel,
  audiences: item.audiences,
  accommodation_included: item.accommodationIncluded,
  meals_included: item.mealsIncluded,
  transfers_included: item.transfersIncluded,
  whale_shark: item.whaleShark,
  manta: item.manta,
  base_price: item.basePrice,
  currency: item.currency,
  featured: item.featured ?? false,
  highlights: item.highlights,
  accommodation_info: item.accommodationInfo,
  equipment_info: item.equipmentInfo,
  transfer_info: item.transferInfo,
  important_notes: item.importantNotes,
  cancellation_policy: item.cancellationPolicy,
  active: item.active ?? true,
  sort_order: item.sortOrder ?? index,
}))
const packageSlugs = packageRows.map((item) => item.slug)
const existingPackages = await checked(
  'Existing package lookup failed',
  supabase.from('packages').select('id,slug'),
)
const retiredPackageIds = existingPackages
  .filter((item) => !packageSlugs.includes(item.slug))
  .map((item) => item.id)
if (retiredPackageIds.length > 0) {
  await checked(
    'Old package deactivation failed',
    supabase.from('packages').update({ active: false }).in('id', retiredPackageIds),
  )
}
const savedPackages = await checked(
  'Package import failed',
  supabase.from('packages').upsert(packageRows, { onConflict: 'slug' }).select('id,slug'),
)
const packageIds = new Map(savedPackages.map((item) => [item.slug, item.id]))
await checked(
  'Package inclusion cleanup failed',
  supabase.from('package_inclusions').delete().in('package_id', [...packageIds.values()]),
)
await checked(
  'Package itinerary cleanup failed',
  supabase.from('package_itinerary').delete().in('package_id', [...packageIds.values()]),
)
await checked(
  'Package inclusion import failed',
  supabase.from('package_inclusions').insert(
    packages.flatMap((item) =>
      item.inclusions.map((entry, index) => ({
        package_id: packageIds.get(item.slug),
        label: entry.label,
        inclusion_type: entry.type,
        sort_order: index,
      })),
    ),
  ),
)
await checked(
  'Package itinerary import failed',
  supabase.from('package_itinerary').insert(
    packages.flatMap((item) =>
      item.itinerary.map((entry) => ({
        package_id: packageIds.get(item.slug),
        day_number: entry.day,
        title: entry.title,
        description: entry.description,
      })),
    ),
  ),
)

await checked(
  'Course import failed',
  supabase.from('courses').upsert(
    courses.map((item, index) => ({
      slug: item.slug,
      title: item.title,
      category: item.category,
      description: item.description,
      long_description: item.longDescription,
      duration: item.duration,
      minimum_age: item.minimumAge,
      required_certification: item.requiredCertification,
      number_of_dives: item.numberOfDives,
      price: item.price,
      currency: item.currency,
      featured_image: item.featuredImage,
      highlights: item.highlights,
      what_you_learn: item.whatYouLearn,
      featured: item.featured ?? false,
      active: item.active ?? true,
      sort_order: item.sortOrder ?? index,
    })),
    { onConflict: 'slug' },
  ),
)

await checked(
  'Dive site import failed',
  supabase.from('dive_sites').upsert(
    diveSites.map((item, index) => ({
      slug: item.slug,
      name: item.name,
      description: item.description,
      long_description: item.longDescription,
      site_type: item.siteType,
      depth_min: item.depthMin,
      depth_max: item.depthMax,
      difficulty: item.difficulty,
      current_level: item.currentLevel,
      marine_life: item.marineLife,
      journey_time: item.journeyTime,
      featured_image: item.featuredImage,
      gallery: item.gallery,
      latitude: item.latitude,
      longitude: item.longitude,
      featured: item.featured ?? false,
      active: item.active ?? true,
      sort_order: item.sortOrder ?? index,
    })),
    { onConflict: 'slug' },
  ),
)

await checked(
  'Gallery import failed',
  supabase.from('gallery_items').upsert(
    galleryItems.map((item, index) => ({
      id: stableUuid(item.id),
      title: item.title,
      media_type: item.mediaType,
      image_url: item.imageUrl,
      video_url: item.videoUrl ?? null,
      poster_url: item.posterUrl ?? null,
      category: item.category,
      caption: item.caption,
      featured: item.featured ?? false,
      active: item.active ?? true,
      sort_order: item.sortOrder ?? index,
    })),
    { onConflict: 'id' },
  ),
)

await checked(
  'Testimonial import failed',
  supabase.from('testimonials').upsert(
    testimonials.map((item, index) => ({
      id: stableUuid(item.id),
      guest_name: item.guestName,
      country: item.country,
      trip_type: item.tripType,
      review: item.review,
      guest_image: item.guestImage,
      source: item.source,
      source_url: item.sourceUrl ?? null,
      featured: item.featured ?? false,
      active: item.active ?? true,
      sort_order: item.sortOrder ?? index,
    })),
    { onConflict: 'id' },
  ),
)

await checked(
  'FAQ import failed',
  supabase.from('faqs').upsert(
    faqs.map((item, index) => ({
      id: stableUuid(item.id),
      question: item.question,
      answer: item.answer,
      active: item.active ?? true,
      sort_order: item.sortOrder ?? index,
    })),
    { onConflict: 'id' },
  ),
)

await checked(
  'Experience import failed',
  supabase.from('experiences').upsert(
    experiences.map((item, index) => ({
      id: stableUuid(item.id),
      title: item.title,
      description: item.description,
      level: item.level,
      image: item.image,
      href: item.href,
      size: item.size,
      featured: item.featured ?? false,
      active: item.active ?? true,
      sort_order: item.sortOrder ?? index,
    })),
    { onConflict: 'id' },
  ),
)

await checked(
  'Adventure option import failed',
  supabase.from('adventure_options').upsert(
    adventureOptions.map((item, index) => ({
      id: stableUuid(item.id),
      title: item.label,
      slug: item.id,
      label: item.label,
      description: item.description,
      recommendation_type: item.recommendationType,
      recommendation_slug: item.recommendationSlug,
      recommendation_label: item.recommendationLabel,
      featured: item.featured ?? false,
      active: item.active ?? true,
      sort_order: item.sortOrder ?? index,
    })),
    { onConflict: 'id' },
  ),
)

await supabase.auth.signOut()

console.log(
  JSON.stringify(
    {
      packages: packages.length,
      courses: courses.length,
      dive_sites: diveSites.length,
      gallery_items: galleryItems.length,
      testimonials: testimonials.length,
      faqs: faqs.length,
      experiences: experiences.length,
      adventure_options: adventureOptions.length,
    },
    null,
    2,
  ),
)
