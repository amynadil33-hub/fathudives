import type { Metadata } from 'next'
import { CartPage } from '@/components/cart/cart-page'
import { Container, Section } from '@/components/site/editorial'

export const metadata: Metadata = { title: 'Your Cart', robots: { index: false, follow: false } }

export default function CartRoute() {
  return (
    <Section className="min-h-[70vh] pt-28 sm:pt-36">
      <Container>
        <p className="tracking-label text-xs text-slate-blue">Your trip</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Your cart</h1>
        <div className="mt-10"><CartPage /></div>
      </Container>
    </Section>
  )
}
