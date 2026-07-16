import Link from 'next/link'
import { MessageCircle, Mail, MapPin } from 'lucide-react'
import { Logo } from './logo'
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './social-icons'
import { WaveDivider } from './wave'
import { siteConfig, whatsappHref } from '@/lib/site-config'

const diveLinks = [
  { label: 'Dive Packages', href: '/dive-packages' },
  { label: 'Dive Courses', href: '/dive-courses' },
  { label: 'Dive Sites', href: '/dive-sites' },
  { label: 'Gallery', href: '/gallery' },
]

const islandLinks = [
  { label: 'Discover Dhangethi', href: '/discover-dhangethi' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Plan Your Dive', href: '/contact#enquiry' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cancellation Policy', href: '/cancellation' },
]

export function SiteFooter() {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      {/* Wave transition into the footer */}
      <div className="text-background">
        <WaveDivider className="text-primary" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-5">
            <Logo onDark />
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              A locally operated dive centre on Dhangethi Island, South Ari Atoll. Memorable diving, warm island
              hospitality and the wild heart of the Maldives.
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.socials.instagram}
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                aria-label="YouTube"
                className="flex size-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <YoutubeIcon className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Dive services" className="space-y-4">
            <h3 className="tracking-label text-xs font-semibold text-accent">Diving</h3>
            <ul className="space-y-2.5">
              {diveLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-background"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Island" className="space-y-4">
            <h3 className="tracking-label text-xs font-semibold text-accent">Island</h3>
            <ul className="space-y-2.5">
              {islandLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-background"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <h3 className="tracking-label text-xs font-semibold text-accent">Get in touch</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-accent" />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-background">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="size-4 shrink-0 text-accent" />
                <a href={whatsappHref()} className="transition-colors hover:text-background">
                  WhatsApp us
                </a>
              </li>
            </ul>
            <div className="rounded-2xl bg-background/5 p-4">
              <p className="text-xs text-primary-foreground/70">Newsletter — island stories &amp; dive updates</p>
              <form className="mt-3 flex gap-2" aria-label="Newsletter signup (placeholder)">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 rounded-full bg-background/10 px-4 py-2 text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="button"
                  className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-background/10 pt-8">
          <p className="text-center font-serif text-2xl italic text-accent">
            Born in Dhangethi. Guided by the ocean.
          </p>
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-primary-foreground/60 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Fathu Dives. All rights reserved.</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-background">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
