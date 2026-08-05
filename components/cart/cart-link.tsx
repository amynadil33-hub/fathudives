'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './cart-provider'
import { cn } from '@/lib/utils'

export function CartLink({ onDark = false }: { onDark?: boolean }) {
  const { itemCount, hydrated } = useCart()
  return (
    <Link
      href="/cart"
      aria-label={`Cart with ${hydrated ? itemCount : 0} packages`}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-full transition-colors',
        onDark ? 'text-background hover:bg-background/10' : 'text-primary hover:bg-primary/5',
      )}
    >
      <ShoppingBag className="size-5" />
      {hydrated && itemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-[0.65rem] font-bold text-accent-foreground">
          {itemCount}
        </span>
      ) : null}
    </Link>
  )
}
