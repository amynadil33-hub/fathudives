/**
 * Centralised media configuration.
 *
 * Every placeholder image / video reference in the site points here so the
 * client's real assets can be swapped in one place (or later sourced from
 * Supabase Storage). Change a URL here and it updates everywhere.
 *
 * Video files are intentionally NOT committed to the repo. The hero uses a
 * poster image now; set `hero.videoSrc` to a hosted MP4 (Supabase Storage,
 * Mux, Cloudflare Stream, etc.) when available.
 */

export const media = {
  hero: {
    poster: '/images/hero-ocean.png',
    posterMobile: '/images/hero-ocean.png',
    // videoSrc: 'https://your-host.com/fathu-hero.mp4', // add later
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

  // Generic avatar placeholder for testimonials until guest photos arrive.
  avatar: '/images/guest-avatar.png',
} as const
