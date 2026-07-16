import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when you book diving, courses and stays with Fathu Dives on Dhangethi Island.',
  alternates: { canonical: '/terms' },
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <LegalPage
      label="The details"
      title="Terms & Conditions"
      path="/terms"
      intro="The terms that apply when you dive, learn and stay with Fathu Dives. Final wording will be confirmed by the client."
      sections={[
        {
          heading: 'Enquiries and bookings',
          paragraphs: [
            'Submitting an enquiry does not create a confirmed booking. We will reply with availability and a quotation. A booking is confirmed only once we agree the details together and any required deposit is received.',
            'Placeholder: the client will confirm deposit amounts, payment methods and the point at which a booking becomes binding.',
          ],
        },
        {
          heading: 'Diving safety and eligibility',
          paragraphs: [
            'All diving is subject to a health and safety assessment. You may be asked to complete a medical questionnaire, and some medical conditions require a physician\u2019s sign-off before diving.',
            'Certified divers should provide accurate certification and experience information. We reserve the right to require a check dive or to decline any dive where safety cannot be reasonably assured.',
          ],
        },
        {
          heading: 'Pricing',
          paragraphs: [
            'All prices shown on this website are temporary placeholders. Final pricing, inclusions and any applicable taxes or fees will be confirmed in your personal quotation.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'Placeholder: the client will confirm the final liability, insurance and assumption-of-risk wording in line with local regulations and diving-industry standards.',
          ],
        },
      ]}
    />
  )
}
