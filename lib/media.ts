/**
 * Centralised media configuration.
 *
 * Every placeholder image / video reference in the site points here so the
 * client's real assets can be swapped in one place. The nested `media` object
 * holds the DEFAULT sources. Admins can override any of these from the Image
 * Manager (/admin/images); overrides are resolved at read time via
 * `lib/data/media-store.ts`, so the const below always represents the shipped
 * defaults and never needs editing by hand.
 */

export const media = {
  hero: {
    poster: '/images/hero-ocean.png',
    posterMobile: '/images/hero-ocean.png',
    videoSrc: '' as string,
  },
  og: '/images/hero-ocean.png',

  experiences: {
    whaleShark: '/images/whale-shark.png',
    manta: '/images/manta.png',
    reef: '/images/reef-dive.png',
    learn: '/images/learn-to-dive.png',
  },

  packages: {
    discover: '/images/pkg-discover.png',
    explorer: '/images/pkg-explorer.png',
    whaleShark: '/images/pkg-whaleshark.png',
    escape: '/images/pkg-escape.png',
  },

  island: {
    beach: '/images/island-beach.png',
    lane: '/images/island-lane.png',
    sunset: '/images/island-sunset.png',
    boats: '/images/island-dhoni.png',
    aerial: '/images/dhangethi-aerial.png',
    dining: '/images/island-dining.png',
  },

  sites: {
    channel: '/images/site-channel.png',
    thila: '/images/site-thila.png',
    reef: '/images/reef-dive.png',
  },

  trust: '/images/dive-briefing.png',
  about: '/images/about-team.png',
  ctaSunset: '/images/island-sunset.png',

  avatar: '/images/guest-avatar.png',
} as const

// --- Flat registry used by the Image Manager --------------------------------
// A stable `key` (dot-path into `media`) plus a friendly label and group. This
// is the single source of truth for which images are editable in the admin.

export type MediaGroup =
  | 'Hero & Social'
  | 'Homepage Experiences'
  | 'Packages'
  | 'Dhangethi Island'
  | 'Dive Sites'
  | 'General'

export interface MediaEntry {
  key: string
  label: string
  group: MediaGroup
  defaultSrc: string
  /** Where this image appears on the public site (shown as a hint). */
  usedOn: string
}

export const mediaRegistry: MediaEntry[] = [
  { key: 'hero.poster', label: 'Hero background', group: 'Hero & Social', defaultSrc: media.hero.poster, usedOn: 'Homepage hero' },
  { key: 'hero.posterMobile', label: 'Hero background (mobile)', group: 'Hero & Social', defaultSrc: media.hero.posterMobile, usedOn: 'Homepage hero on phones' },
  { key: 'og', label: 'Social share image', group: 'Hero & Social', defaultSrc: media.og, usedOn: 'Link previews / SEO' },

  { key: 'experiences.whaleShark', label: 'Whale shark', group: 'Homepage Experiences', defaultSrc: media.experiences.whaleShark, usedOn: 'Signature experiences' },
  { key: 'experiences.manta', label: 'Manta ray', group: 'Homepage Experiences', defaultSrc: media.experiences.manta, usedOn: 'Signature experiences' },
  { key: 'experiences.reef', label: 'Reef dive', group: 'Homepage Experiences', defaultSrc: media.experiences.reef, usedOn: 'Signature experiences' },
  { key: 'experiences.learn', label: 'Learn to dive', group: 'Homepage Experiences', defaultSrc: media.experiences.learn, usedOn: 'Signature experiences' },

  { key: 'packages.discover', label: 'Discover package', group: 'Packages', defaultSrc: media.packages.discover, usedOn: 'Dive packages' },
  { key: 'packages.explorer', label: 'Explorer package', group: 'Packages', defaultSrc: media.packages.explorer, usedOn: 'Dive packages' },
  { key: 'packages.whaleShark', label: 'Whale shark package', group: 'Packages', defaultSrc: media.packages.whaleShark, usedOn: 'Dive packages' },
  { key: 'packages.escape', label: 'Island escape package', group: 'Packages', defaultSrc: media.packages.escape, usedOn: 'Dive packages' },

  { key: 'island.beach', label: 'Beach', group: 'Dhangethi Island', defaultSrc: media.island.beach, usedOn: 'Island experience / Discover' },
  { key: 'island.lane', label: 'Island lane', group: 'Dhangethi Island', defaultSrc: media.island.lane, usedOn: 'Island experience / Discover' },
  { key: 'island.sunset', label: 'Sunset', group: 'Dhangethi Island', defaultSrc: media.island.sunset, usedOn: 'Island experience / CTA' },
  { key: 'island.boats', label: 'Dhoni boats', group: 'Dhangethi Island', defaultSrc: media.island.boats, usedOn: 'Island experience / Discover' },
  { key: 'island.aerial', label: 'Aerial view', group: 'Dhangethi Island', defaultSrc: media.island.aerial, usedOn: 'Discover Dhangethi' },
  { key: 'island.dining', label: 'Dining', group: 'Dhangethi Island', defaultSrc: media.island.dining, usedOn: 'Discover Dhangethi' },

  { key: 'sites.channel', label: 'Channel site', group: 'Dive Sites', defaultSrc: media.sites.channel, usedOn: 'Dive sites' },
  { key: 'sites.thila', label: 'Thila site', group: 'Dive Sites', defaultSrc: media.sites.thila, usedOn: 'Dive sites' },
  { key: 'sites.reef', label: 'Reef site', group: 'Dive Sites', defaultSrc: media.sites.reef, usedOn: 'Dive sites' },

  { key: 'trust', label: 'Dive briefing (safety)', group: 'General', defaultSrc: media.trust, usedOn: 'Homepage trust & safety' },
  { key: 'about', label: 'About the team', group: 'General', defaultSrc: media.about, usedOn: 'About page' },
  { key: 'ctaSunset', label: 'Closing CTA', group: 'General', defaultSrc: media.ctaSunset, usedOn: 'Homepage final CTA' },
  { key: 'avatar', label: 'Guest avatar fallback', group: 'General', defaultSrc: media.avatar, usedOn: 'Testimonials' },
]

export const mediaGroups: MediaGroup[] = [
  'Hero & Social',
  'Homepage Experiences',
  'Packages',
  'Dhangethi Island',
  'Dive Sites',
  'General',
]
