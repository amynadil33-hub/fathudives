import type { ReactNode } from 'react'
import { Header } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { FloatingCta } from '@/components/site/floating-cta'
import { CartProvider } from '@/components/cart/cart-provider'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main id="main">{children}</main>
      <SiteFooter />
      <FloatingCta />
    </CartProvider>
  )
}
