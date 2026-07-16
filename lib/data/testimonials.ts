import type { Testimonial } from '@/lib/types'
import { media } from '@/lib/media'

// IMPORTANT: These are clearly-marked PLACEHOLDER reviews for layout only.
// They are NOT real guest reviews and imply no Tripadvisor / Google rating.
// Replace with verified guest testimonials supplied by the client.

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    guestName: 'Placeholder Guest',
    country: 'Country',
    tripType: 'Whale Shark Week',
    review:
      'This is placeholder testimonial text written to show how a guest review will appear. Real, verified reviews from Fathu Dives guests will replace this content.',
    guestImage: media.avatar,
    source: 'Placeholder',
  },
  {
    id: 't-2',
    guestName: 'Placeholder Guest',
    country: 'Country',
    tripType: 'Open Water course',
    review:
      'Another placeholder review demonstrating the testimonial layout. The client will provide genuine guest feedback and, where relevant, a source link.',
    guestImage: media.avatar,
    source: 'Placeholder',
  },
  {
    id: 't-3',
    guestName: 'Placeholder Guest',
    country: 'Country',
    tripType: 'Dive and Island Escape',
    review:
      'Placeholder text only. This section is designed to hold authentic reviews once they are confirmed — no ratings or sources are implied here.',
    guestImage: media.avatar,
    source: 'Placeholder',
  },
]
