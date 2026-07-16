import type { Experience, AdventureOption } from '@/lib/types'
import { media } from '@/lib/media'

export const experiences: Experience[] = [
  {
    id: 'exp-whale-shark',
    title: 'Whale Shark Encounters',
    description:
      'Share the water with the ocean\u2019s gentle giants in one of the few places they roam year round.',
    level: 'All levels · snorkel or dive',
    image: media.experiences.whaleShark,
    href: '/dive-sites/south-ari-whale-zone',
    size: 'tall',
  },
  {
    id: 'exp-manta',
    title: 'Manta Ray Adventures',
    description: 'Hover quietly as mantas glide in to be cleaned — a slow, spellbinding ballet.',
    level: 'Beginner friendly · seasonal',
    image: media.experiences.manta,
    href: '/dive-sites/manta-cleaning-station',
    size: 'regular',
  },
  {
    id: 'exp-reef',
    title: 'South Ari Reef Diving',
    description:
      'Drift channels, coral thilas and living reefs bursting with colour and marine life.',
    level: 'Certified divers',
    image: media.experiences.reef,
    href: '/dive-sites',
    size: 'wide',
  },
  {
    id: 'exp-learn',
    title: 'Learn to Dive',
    description: 'Take your first underwater breath, guided every moment by a caring professional.',
    level: 'No experience needed',
    image: media.experiences.learn,
    href: '/dive-courses',
    size: 'regular',
  },
]

export const adventureOptions: AdventureOption[] = [
  {
    id: 'adv-first-breath',
    label: 'My first underwater breath',
    description: 'Start gently with a guided introduction — no experience required.',
    recommendationType: 'course',
    recommendationSlug: 'discover-scuba-diving',
    recommendationLabel: 'Discover Scuba Diving',
  },
  {
    id: 'adv-whale-manta',
    label: 'Whale sharks and mantas',
    description: 'Build your trip around the big encounters South Ari is famous for.',
    recommendationType: 'package',
    recommendationSlug: 'whale-shark-week',
    recommendationLabel: 'Whale Shark Week',
  },
  {
    id: 'adv-reefs',
    label: 'Colourful reefs and marine life',
    description: 'Dive as much as you can across the best of South Ari.',
    recommendationType: 'package',
    recommendationSlug: 'south-ari-explorer',
    recommendationLabel: 'South Ari Explorer',
  },
  {
    id: 'adv-friends',
    label: 'A diving holiday with friends',
    description: 'A week of diving and island evenings shared with your group.',
    recommendationType: 'package',
    recommendationSlug: 'south-ari-explorer',
    recommendationLabel: 'South Ari Explorer',
  },
  {
    id: 'adv-relax',
    label: 'Island relaxation between dives',
    description: 'A balanced blend of easy diving and slow island days.',
    recommendationType: 'package',
    recommendationSlug: 'dive-and-island-escape',
    recommendationLabel: 'Dive and Island Escape',
  },
  {
    id: 'adv-photography',
    label: 'Underwater photography',
    description: 'Extend your bottom time and get closer to the reef with enriched air.',
    recommendationType: 'course',
    recommendationSlug: 'enriched-air-nitrox',
    recommendationLabel: 'Enriched Air (Nitrox)',
  },
]
