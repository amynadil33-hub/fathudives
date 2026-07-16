import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Fathu Dives collects, uses and protects the information you share when planning a diving trip to Dhangethi.',
  alternates: { canonical: '/privacy' },
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Your privacy"
      title="Privacy Policy"
      path="/privacy"
      intro="How we handle the information you share when you enquire about diving and staying on Dhangethi."
      sections={[
        {
          heading: 'Information we collect',
          paragraphs: [
            'When you send an enquiry we collect the details you provide — such as your name, email, WhatsApp number, nationality, travel dates and diving experience — so we can prepare a tailored quotation.',
            'We only ask for information that helps us plan your trip safely. You are never required to share more than you are comfortable with beyond the details needed to respond.',
          ],
        },
        {
          heading: 'How we use your information',
          paragraphs: [
            'Your details are used to respond to your enquiry, arrange diving and accommodation, coordinate transfers and keep you informed about your booking.',
            'We do not sell your personal information. Placeholder: the client will confirm the final list of trusted partners (such as accommodation and transfer providers) with whom limited details may be shared to fulfil your booking.',
          ],
        },
        {
          heading: 'Data storage and security',
          paragraphs: [
            'Enquiries are stored securely and accessed only by authorised Fathu Dives team members. Placeholder: the client will confirm the data storage provider and retention period.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'You may request access to, correction of, or deletion of the personal information we hold about you at any time by contacting us. Placeholder: the client will confirm the contact route for privacy requests.',
          ],
        },
      ]}
    />
  )
}
