import type { Package } from '@/lib/types'
import { media } from '@/lib/media'

type FixedPackageInput = {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  nights: number
  dives: number
  whaleSharkDives: number
  mantaDives: number
  basePrice: number
  singlePrices: [number, number, number, number]
  doublePrices: [number, number, number, number]
  triplePrices: [number, number, number, number]
  extraDive: number
  featured?: boolean
}

const mealPlans = 'B&B / Half Board / Full Board / All Inclusive'

function priceLine(label: string, prices: [number, number, number, number]) {
  return `${label} (${mealPlans}): USD ${prices.join(' / ')}`
}

function fixedPackage(input: FixedPackageInput): Package {
  const reefDives = input.dives - input.whaleSharkDives - input.mantaDives

  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    shortDescription: input.shortDescription,
    fullDescription: input.fullDescription,
    featuredImage: input.image,
    gallery: [input.image, media.experiences.whaleShark, media.experiences.manta, media.experiences.reef],
    nights: input.nights,
    dives: input.dives,
    experienceLevel: 'Certified Diver',
    audiences: ['Certified Diver', 'Solo Traveller', 'Couple', 'Group', 'Diving and Stay'],
    accommodationIncluded: true,
    mealsIncluded: true,
    transfersIncluded: true,
    whaleShark: input.whaleSharkDives > 0,
    manta: input.mantaDives > 0,
    basePrice: input.basePrice,
    currency: 'USD',
    featured: input.featured ?? false,
    highlights: [
      `${input.nights} nights in a deluxe twin or double room`,
      `${input.dives} guided dives in South Ari Atoll`,
      `${input.whaleSharkDives} whale shark dive${input.whaleSharkDives === 1 ? '' : 's'} and ${input.mantaDives} manta dive${input.mantaDives === 1 ? '' : 's'}`,
      'Free Ranveli or sandbank trip and beach dinner',
    ],
    inclusions: [
      { label: 'Return airport transfer by speedboat', type: 'included' },
      { label: `${input.nights} nights in a deluxe twin or double room`, type: 'included' },
      { label: 'Selected buffet meal plan', type: 'included' },
      { label: `${input.whaleSharkDives} whale shark dive${input.whaleSharkDives === 1 ? '' : 's'}`, type: 'included' },
      { label: `${input.mantaDives} manta ray dive${input.mantaDives === 1 ? '' : 's'}`, type: 'included' },
      { label: `${reefDives} dives at other South Ari dive sites`, type: 'included' },
      { label: 'Water, coffee, tea, fruit and beach towels aboard the dhoni', type: 'included' },
      { label: 'Snacks on whale shark and manta trips', type: 'included' },
      { label: 'All applicable government taxes', type: 'included' },
      { label: 'Free Ranveli or sandbank trip', type: 'included' },
      { label: 'Free beach dinner', type: 'included' },
      { label: 'International flights', type: 'excluded' },
      { label: 'Dive equipment rental', type: 'excluded' },
    ],
    itinerary: [],
    accommodationInfo: `Deluxe twin or double room for ${input.nights} nights. Rates vary by single, double or triple occupancy and selected meal plan.`,
    equipmentInfo: 'Dive equipment is not included. Rental can be arranged at an additional charge, subject to availability.',
    transferInfo: 'Return airport transfer to and from Dhangethi by speedboat is included.',
    importantNotes: [
      priceLine('Single occupancy', input.singlePrices),
      priceLine('Double occupancy, per person', input.doublePrices),
      priceLine('Triple occupancy, per person', input.triplePrices),
      'A 20% advance payment is required to confirm the booking.',
      'Cash payment in USD or EUR is preferred. Card payments carry an additional charge.',
      `Extra dives cost USD ${input.extraDive} per dive.`,
      'Snorkelling and other excursions can be arranged for an additional charge.',
      'Whale shark and manta encounters depend on weather, sea conditions and wildlife movements and cannot be guaranteed.',
      'Special rates are available for group bookings.',
    ],
    cancellationPolicy: 'A 20% advance payment confirms the package. Full cancellation terms will be provided before payment.',
  }
}

export const packages: Package[] = [
  fixedPackage({
    id: 'pkg-basic-dive', slug: 'basic-dive-package', title: 'Basic Dive Package',
    shortDescription: 'Four nights and six guided dives for certified divers exploring the reefs and marine life of South Ari Atoll.',
    fullDescription: 'Experience the underwater beauty of the Maldives with our Basic Dive Package, designed for certified divers who want to explore the vibrant reefs and marine life of South Ari Atoll while enjoying a comfortable island stay.',
    image: media.packages.discover, nights: 4, dives: 6, whaleSharkDives: 1, mantaDives: 1, basePrice: 650,
    singlePrices: [800, 850, 920, 990], doublePrices: [660, 730, 800, 880], triplePrices: [650, 715, 785, 800], extraDive: 55, featured: true,
  }),
  fixedPackage({
    id: 'pkg-explorer-dive', slug: 'explorer-dive-package', title: 'Explorer Dive Package',
    shortDescription: 'Five nights and nine guided dives across exciting and diverse South Ari Atoll dive sites.',
    fullDescription: 'Dive deeper into the beauty of the Maldives. Designed for certified divers who want to experience more of South Ari Atoll, this five-night package includes nine guided dives across a selection of exciting and diverse sites.',
    image: media.packages.explorer, nights: 5, dives: 9, whaleSharkDives: 1, mantaDives: 1, basePrice: 850,
    singlePrices: [1035, 1090, 1180, 1265], doublePrices: [880, 950, 1040, 1130], triplePrices: [850, 925, 1015, 1045], extraDive: 55, featured: true,
  }),
  fixedPackage({
    id: 'pkg-adventurer-dive', slug: 'adventurer-dive-package', title: 'Adventurer Dive Package',
    shortDescription: 'Six nights and twelve guided dives, including dedicated whale shark and manta opportunities.',
    fullDescription: 'Go beyond the ordinary and discover the best of South Ari Atoll. The Adventurer Dive Package is for certified divers seeking an unforgettable Maldivian experience with six nights of accommodation and twelve guided dives.',
    image: media.packages.whaleShark, nights: 6, dives: 12, whaleSharkDives: 1, mantaDives: 1, basePrice: 940,
    singlePrices: [1145, 1220, 1325, 1430], doublePrices: [965, 1055, 1160, 1265], triplePrices: [940, 1035, 1135, 1170], extraDive: 45, featured: true,
  }),
  fixedPackage({
    id: 'pkg-fun-dive', slug: 'fun-dive-package', title: 'Fun Dive Package',
    shortDescription: 'Seven nights and fifteen guided dives for an immersive week beneath the surface.',
    fullDescription: 'Seven nights, fifteen dives and an incredible underwater adventure await. This package is perfect for certified divers who want to immerse themselves in the Maldives, including dedicated whale shark and manta experiences.',
    image: media.experiences.reef, nights: 7, dives: 15, whaleSharkDives: 1, mantaDives: 1, basePrice: 1035,
    singlePrices: [1270, 1360, 1485, 1610], doublePrices: [1070, 1175, 1300, 1420], triplePrices: [1035, 1150, 1280, 1320], extraDive: 40,
  }),
  fixedPackage({
    id: 'pkg-advanced-dive', slug: 'advanced-dive-package', title: 'Advanced Dive Package',
    shortDescription: 'Eight nights and eighteen guided dives across reefs, channels and marine-rich sites.',
    fullDescription: 'More dives, more discoveries and more unforgettable moments beneath the surface. Enjoy eight nights with eighteen guided dives across the spectacular reefs, channels and marine-rich sites of South Ari Atoll.',
    image: media.sites.thila, nights: 8, dives: 18, whaleSharkDives: 1, mantaDives: 1, basePrice: 1200,
    singlePrices: [1455, 1565, 1700, 1845], doublePrices: [1230, 1355, 1490, 1630], triplePrices: [1200, 1325, 1460, 1520], extraDive: 40,
  }),
  fixedPackage({
    id: 'pkg-extreme-dive', slug: 'extreme-dive-package', title: 'Extreme Dive Package',
    shortDescription: 'Nine nights and twenty-one guided dives for passionate certified divers.',
    fullDescription: 'For divers who cannot get enough of the underwater world. Spend nine nights in the Maldives with twenty-one guided dives across reefs, channels, pinnacles and marine-rich sites around South Ari Atoll.',
    image: media.sites.channel, nights: 9, dives: 21, whaleSharkDives: 2, mantaDives: 2, basePrice: 1345,
    singlePrices: [1640, 1770, 1930, 2085], doublePrices: [1375, 1520, 1675, 1835], triplePrices: [1345, 1495, 1650, 1700], extraDive: 40,
  }),
  {
    id: 'pkg-shark-tank-dhangethi', slug: 'hulhumale-shark-tank-dhangethi', title: 'Hulhumale Shark Tank & Dhangethi',
    shortDescription: 'A customizable journey combining Hulhumale Shark Tank with whale shark, manta and reef diving near Dhangethi.',
    fullDescription: 'Experience a unique combination of Hulhumale\'s famous Shark Tank and the pristine waters of Dhangethi. This customizable package blends thrilling shark encounters with South Ari Atoll\'s whale shark, manta and reef sites.',
    featuredImage: media.sites.channel, gallery: [media.sites.channel, media.experiences.whaleShark, media.experiences.manta, media.island.boats],
    nights: 0, dives: 0, experienceLevel: 'Certified Diver', audiences: ['Certified Diver', 'Solo Traveller', 'Couple', 'Group', 'Diving and Stay'],
    accommodationIncluded: true, mealsIncluded: true, transfersIncluded: true, whaleShark: true, manta: true, basePrice: 0, currency: 'USD', featured: false,
    highlights: ['Hulhumale Shark Tank diving', 'Whale shark and manta dives near Dhangethi', 'Flexible nights and number of dives', 'Personalized package price'],
    inclusions: [
      { label: 'Airport pickup and drop-off for a Hulhumale hotel stay, when required', type: 'included' },
      { label: 'One deluxe-room night in Hulhumale, when required', type: 'included' },
      { label: 'Shark Tank dives based on the selected plan', type: 'included' },
      { label: 'Return airport transfer to Dhangethi', type: 'included' },
      { label: 'Deluxe twin or double room in Dhangethi', type: 'included' },
      { label: 'Selected buffet meal plan', type: 'included' },
      { label: 'One whale shark dive, one manta ray dive and selected dives near Dhangethi', type: 'included' },
      { label: 'Boat refreshments, towels, trip snacks, taxes, a Ranveli or sandbank trip, and a beach dinner', type: 'included' },
      { label: 'International flights', type: 'excluded' }, { label: 'Dive equipment rental', type: 'excluded' },
    ],
    itinerary: [],
    accommodationInfo: 'Optional Hulhumale night plus a deluxe twin or double room in Dhangethi, tailored to the selected itinerary.',
    equipmentInfo: 'Dive equipment rental is available for an additional charge, subject to availability.',
    transferInfo: 'Airport pickup, Hulhumale transfers when required, and return Dhangethi transfers are included.',
    importantNotes: ['Price depends on the number of dives, meal plan and number of nights selected.', 'A 30% advance payment is required to confirm the booking.', 'With an early-morning arrival, one or two same-day dives may remove the Hulhumale overnight for groups of at least six divers.', 'Whale shark and manta encounters cannot be guaranteed.', 'Special rates are available for groups.'],
    cancellationPolicy: 'A 30% advance payment confirms the package. Full cancellation terms will be provided before payment.',
  },
  {
    id: 'pkg-night-manta-dhangethi', slug: 'night-manta-north-ari-dhangethi', title: 'Night Manta & Dhangethi Package',
    shortDescription: 'A customizable North Ari night manta adventure paired with whale shark, day manta and reef diving near Dhangethi.',
    fullDescription: 'Combine a Night Manta Dive in North Ari Atoll with the famous whale shark and day manta encounters around Dhangethi. This special package brings together night diving, pelagic encounters and vibrant tropical reefs.',
    featuredImage: media.experiences.manta, gallery: [media.experiences.manta, media.experiences.whaleShark, media.experiences.reef, media.island.boats],
    nights: 0, dives: 0, experienceLevel: 'Certified Diver', audiences: ['Certified Diver', 'Group', 'Diving and Stay'],
    accommodationIncluded: true, mealsIncluded: true, transfersIncluded: true, whaleShark: true, manta: true, basePrice: 0, currency: 'USD', featured: false,
    highlights: ['North Ari night manta dive', 'Whale shark and day manta encounters', 'Flexible nights and number of dives', 'Minimum group of eight divers'],
    inclusions: [
      { label: 'Return airport transfer to Dhangethi', type: 'included' }, { label: 'Deluxe twin or double room', type: 'included' },
      { label: 'Selected buffet meal plan', type: 'included' }, { label: 'One whale shark dive, one day manta dive and selected dives near Dhangethi', type: 'included' },
      { label: 'Packed meals for the night manta trip', type: 'included' }, { label: 'Boat refreshments, towels, trip snacks, taxes, a Ranveli or sandbank trip, and a beach dinner', type: 'included' },
      { label: 'International flights', type: 'excluded' }, { label: 'Dive equipment rental', type: 'excluded' },
    ],
    itinerary: [],
    accommodationInfo: 'Deluxe twin or double room for the number of nights selected in the personalized plan.',
    equipmentInfo: 'Dive equipment rental is available for an additional charge, subject to availability.',
    transferInfo: 'Return airport transfers to and from Dhangethi are included.',
    importantNotes: ['A minimum of eight divers is required.', 'Price depends on the number of dives, meal plan and number of nights selected.', 'A 30% advance payment is required to confirm the booking.', 'Whale shark and manta encounters cannot be guaranteed.', 'Special rates are available for groups.'],
    cancellationPolicy: 'A 30% advance payment confirms the package. Full cancellation terms will be provided before payment.',
  },
]
