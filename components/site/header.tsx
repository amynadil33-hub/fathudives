'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks, siteConfig } from '@/lib/site-config'
import { Logo } from './logo'
import { CtaLink } from './cta-button'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  // Home page has a full-bleed hero, so the header starts transparent there.
  const overHero = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || !overHero
  const onDark = overHero && !scrolled

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'bg-background/90 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 md:h-20 lg:px-8">
        <Logo onDark={onDark} priority />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  onDark
                    ? 'text-background/90 hover:text-background'
                    : active
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary',
                )}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-3 -bottom-0.5 h-px',
                      onDark ? 'bg-accent' : 'bg-coral',
                    )}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CtaLink
            href="/contact"
            variant={onDark ? 'ghost-light' : 'coral'}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Plan Your Dive
          </CtaLink>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden',
              onDark ? 'text-background hover:bg-background/10' : 'text-primary hover:bg-primary/5',
            )}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Island-inspired full-screen menu */}
            <div className="absolute inset-0 bg-primary" />
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,var(--color-accent),transparent_45%),radial-gradient(circle_at_80%_80%,var(--color-coral),transparent_45%)]" />
            </div>

            <div className="relative flex h-full flex-col">
              <div className="flex h-16 items-center justify-between px-5 md:h-20">
                <Logo onDark />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex size-10 items-center justify-center rounded-full text-background hover:bg-background/10"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col justify-center gap-1 px-6"
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="block border-b border-background/10 py-3 font-serif text-3xl text-background/90 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 pb-10">
                <CtaLink href="/contact" variant="coral" size="lg" className="w-full">
                  Plan Your Dive
                </CtaLink>
                <p className="mt-4 text-center text-sm text-background/70">{siteConfig.location}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
