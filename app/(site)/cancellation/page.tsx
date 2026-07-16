import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'How changes, cancellations and refunds are handled for Fathu Dives diving trips and courses on Dhangethi.',
  alternates: { canonical: '/cancellation' },
  robots: { index: false },
}

export default function CancellationPage() {
  return (
    <LegalPage
      label="Plans change"
      title="Cancellation Policy"
      path="/cancellation"
      intro="How we handle changes, cancellations and refunds. Final terms will be confirmed by the client."
      sections={[
        {
          heading: 'Changing your dates',
          paragraphs: [
            'We understand travel plans can shift. Wherever possible we will try to move your booking to new dates subject to availability.',
            'Placeholder: the client will confirm how far in advance changes can be made without charge.',
          ],
        },
        {
          heading: 'Cancellations and refunds',
          paragraphs: [
            'Placeholder: the client will confirm the refund schedule — for example, the percentage refundable at different points before arrival and any non-refundable deposit.',
            'We recommend all guests hold appropriate travel and diving insurance to cover unexpected cancellations.',
          ],
        },
        {
          heading: 'Weather and sea conditions',
          paragraphs: [
            'Diving is weather dependent. If conditions make a dive unsafe we will reschedule where possible or discuss suitable alternatives. Placeholder: the client will confirm how missed dives due to weather are handled.',
          ],
        },
        {
          heading: 'How to request a change',
          paragraphs: [
            'To change or cancel a booking, contact us as early as possible by WhatsApp or email and we will guide you through the next steps.',
          ],
        },
      ]}
    />
  )
}
