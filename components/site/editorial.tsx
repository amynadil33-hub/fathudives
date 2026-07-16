import { cn } from '@/lib/utils'

// Small uppercase tracked label used above section headings.
export function EditorialLabel({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode
  className?: string
  onDark?: boolean
}) {
  return (
    <span
      className={cn(
        'tracking-label inline-flex items-center gap-2 text-xs font-semibold',
        onDark ? 'text-accent' : 'text-slate-blue',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('h-px w-6', onDark ? 'bg-accent/60' : 'bg-slate-blue/50')}
      />
      {children}
    </span>
  )
}

// Handwritten-style italic accent label.
export function HandwrittenLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('handwritten-label text-coral text-xl', className)}>{children}</span>
  )
}

// Ocean-inspired divider line.
export function OceanDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn('ocean-rule w-full', className)} />
}

// Section wrapper with consistent vertical rhythm and optional background tone.
export function Section({
  children,
  className,
  tone = 'default',
  id,
}: {
  children: React.ReactNode
  className?: string
  tone?: 'default' | 'sand' | 'seafoam' | 'primary' | 'white'
  id?: string
}) {
  const tones: Record<string, string> = {
    default: 'bg-background text-foreground',
    sand: 'bg-muted text-foreground',
    seafoam: 'bg-secondary text-foreground',
    primary: 'bg-primary text-primary-foreground',
    white: 'bg-card text-card-foreground',
  }
  return (
    <section id={id} className={cn('py-20 md:py-28', tones[tone], className)}>
      {children}
    </section>
  )
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8', className)}>{children}</div>
  )
}
