import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import type { Faq } from '@/lib/types'

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-border">
          <AccordionTrigger className="py-5 font-serif text-lg text-foreground hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
