'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappHref } from '@/lib/site-config'
import { cn } from '@/lib/utils'

// Sticky WhatsApp booking CTA — appears after the user scrolls past the hero.
export function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappHref()}
      aria-label="Chat with Fathu Dives on WhatsApp"
      className={cn(
        'fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-coral px-4 py-3 text-sm font-medium text-coral-foreground shadow-lg transition-all duration-500 hover:bg-coral/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Plan Your Dive</span>
    </a>
  )
}
