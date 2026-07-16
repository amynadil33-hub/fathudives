export const siteConfig = {
  name: 'Fathu Dives',
  tagline: 'Dive the Wild Heart of Dhangethi',
  description:
    'Fathu Dives is a locally operated scuba diving centre on Dhangethi Island, South Ari Atoll, Maldives. Whale shark and manta encounters, beginner-friendly courses, and authentic local-island stays.',
  url: 'https://fathudives.com',
  location: 'Dhangethi Island, South Ari Atoll, Maldives',
  atoll: 'South Ari Atoll · Maldives',
  // Placeholder contact details — replace with the client's confirmed information.
  email: 'hello@fathudives.com',
  phoneDisplay: '+960 000 0000',
  whatsapp: '9600000000', // digits only, placeholder
  whatsappMessage: 'Hello Fathu Dives! I would love to plan a diving trip to Dhangethi.',
  responseTime: '24 hours',
  socials: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
    tripadvisor: 'https://tripadvisor.com/',
  },
} as const

export function whatsappHref(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage)
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Dive Packages', href: '/dive-packages' },
  { label: 'Dive Courses', href: '/dive-courses' },
  { label: 'Dive Sites', href: '/dive-sites' },
  { label: 'Discover Dhangethi', href: '/discover-dhangethi' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const
