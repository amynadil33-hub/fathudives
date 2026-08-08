import type { GalleryItem, GalleryCategory } from '@/lib/types'

export const galleryCategories: GalleryCategory[] = [
  'Underwater', 'Whale Sharks', 'Mantas', 'Dhangethi', 'Guests', 'Boat Life', 'Island Sunsets',
]

function photo(id: string, file: string, title: string, category: GalleryCategory, caption: string, featured = false): GalleryItem {
  return { id, title, mediaType: 'image', imageUrl: `/images/gallery/${file}.webp`, category, caption, featured }
}

export const galleryItems: GalleryItem[] = [
  photo('gallery-1', 'manta-front', 'Manta in flight', 'Mantas', 'A manta ray glides head-on above a South Ari reef.', true),
  photo('gallery-2', 'schooling-snapper', 'Schooling snapper', 'Underwater', 'A river of yellow-lined snapper fills the blue.', true),
  photo('gallery-3', 'blue-water-diver', 'Into the blue', 'Guests', 'A diver suspended in the deep blue of South Ari Atoll.', true),
  photo('gallery-4', 'fathu-dhoni', 'Our dive dhoni', 'Boat Life', 'The Fathu Dives dhoni ready at the harbour.', true),
  photo('gallery-5', 'manta-and-diver', 'Manta encounter', 'Mantas', 'A manta sweeps past a diver over the reef.', true),
  photo('gallery-6', 'clownfish-purple-anemone', 'Clownfish at home', 'Underwater', 'A clownfish peeks from a vivid purple anemone.'),
  photo('gallery-7', 'reef-bubbles', 'Bubbles over the reef', 'Underwater', 'Divers explore a sunlit coral garden.'),
  photo('gallery-8', 'feather-star-night', 'Feather star at night', 'Underwater', 'A golden feather star opens above the reef after dark.'),
  photo('gallery-9', 'sunlit-coral-garden', 'Sunlit coral garden', 'Underwater', 'Clear water and thriving coral beneath the surface.'),
  photo('gallery-10', 'clownfish-anemone', 'Anemone portrait', 'Underwater', 'A bright clownfish framed by flowing anemone tentacles.'),
  photo('gallery-11', 'black-coral-slope', 'Black coral slope', 'Underwater', 'Branching coral rises from a colourful reef slope.'),
  photo('gallery-12', 'reef-wall-diver', 'Along the reef wall', 'Underwater', 'A diver follows the edge of a South Ari reef.'),
  photo('gallery-13', 'reef-slope-diver', 'Reef slope', 'Underwater', 'Hard corals spill down toward the blue.'),
  photo('gallery-14', 'anemone-garden-diver', 'Anemone garden', 'Underwater', 'Clownfish and anemones with a diver passing above.'),
  photo('gallery-15', 'anemone-garden', 'Colours of the reef', 'Underwater', 'A lively gathering of clownfish among the anemones.'),
  photo('gallery-16', 'diver-schooling-fish', 'Inside the school', 'Guests', 'A diver moves alongside a dense school of snapper.'),
  photo('gallery-17', 'guest-diver', 'Guest beneath the surface', 'Guests', 'A guest diver pauses beside a school of reef fish.'),
  photo('gallery-18', 'schooling-fish-reef', 'Reef in motion', 'Underwater', 'Schooling fish stream across the reef.'),
  photo('gallery-19', 'divers-over-reef', 'Exploring together', 'Guests', 'Divers drift above a busy reef community.'),
  photo('gallery-20', 'sea-fans-pinnacle', 'Sea fans and pinnacle', 'Underwater', 'Delicate sea fans spread beside a coral-covered pinnacle.'),
  photo('gallery-21', 'manta-reef', 'Manta over the reef', 'Mantas', 'A manta ray passes over the coral in open water.'),
  photo('gallery-22', 'vertical-reef-wall', 'Vertical reef', 'Underwater', 'A steep reef face alive with fish and coral.'),
  photo('gallery-23', 'sea-fan-wall', 'Sea fan wall', 'Underwater', 'Large sea fans catch the current along the wall.'),
  photo('gallery-24', 'sea-fan-dropoff', 'At the drop-off', 'Underwater', 'Sea fans frame the deep blue beyond the reef.'),
  photo('gallery-25', 'lagoon-training', 'First skills in the lagoon', 'Guests', 'Calm, shallow-water training before heading to the reef.'),
  photo('gallery-26', 'dive-centre-exterior', 'Welcome to Fathu Dives', 'Dhangethi', 'The Fathu Dives centre on Dhangethi Island.', true),
  photo('gallery-27', 'dive-centre-reception', 'Inside the dive centre', 'Dhangethi', 'Reception, equipment and local marine-life guides.'),
  photo('gallery-28', 'dive-centre-interior', 'Ready for the day', 'Dhangethi', 'Dive equipment prepared inside the Fathu Dives centre.'),
  photo('gallery-29', 'dive-centre-floor', 'Our island base', 'Dhangethi', 'The Fathu Dives base ready to welcome guests.'),
  photo('gallery-30', 'batfish', 'Batfish portrait', 'Underwater', 'A batfish hovers quietly above the sandy reef.'),
  photo('gallery-31', 'guest-dive-9854', 'Island palms', 'Dhangethi', 'Coconut palms beneath a clear Dhangethi sky.'),
  photo('gallery-32', 'guest-dive-9872', 'Lagoon edge', 'Dhangethi', 'Crystal-clear shallows meet the island shore.'),
  photo('gallery-33', 'guest-dive-9878', 'Sunset departures', 'Island Sunsets', 'Boats cross the glowing horizon at sunset.', true),
  photo('gallery-34', 'guest-dive-1079', 'Wreck descent', 'Underwater', 'Divers descend beside a coral-covered wreck.'),
  photo('gallery-35', 'guest-dive-0296', 'Wreck exploration', 'Guests', 'A group of divers explores the wreck together.'),
  photo('gallery-36', 'guest-dive-0293', 'Over the wreck', 'Guests', 'A diver passes above the wreck in clear blue water.'),
]
