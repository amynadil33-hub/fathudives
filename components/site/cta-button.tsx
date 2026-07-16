import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type Variant = 'coral' | 'primary' | 'outline' | 'ghost-light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  // Coral is reserved for primary booking CTAs only.
  coral: 'bg-coral text-coral-foreground shadow-sm hover:bg-coral/90 hover:shadow-md active:translate-y-px',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px',
  outline: 'border border-primary/30 text-primary hover:bg-primary/5 active:translate-y-px',
  'ghost-light':
    'border border-background/40 text-background backdrop-blur-sm hover:bg-background/10 active:translate-y-px',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

export function CtaLink({
  href,
  variant = 'coral',
  size = 'md',
  className,
  external = false,
  children,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentProps<typeof Link>,
    'href' | 'className'
  >) {
  const classes = cn(base, variants[variant], sizes[size], className)

  // External links (e.g. WhatsApp, social) render a plain anchor with the
  // appropriate security attributes rather than a client-side Next.js Link.
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}

export function CtaButton({
  variant = 'coral',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
