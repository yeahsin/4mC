
import { CarCategory, ServiceStep, ServiceDetailCategory, ServicePackage, ViewType } from './types';

export const STEPS: ServiceStep[] = [
  {
    id: 1,
    title: "Purify",
    description: "Bio-active foam canon ritual followed by a zero-contact rinse.",
    icon: "water"
  },
  {
    id: 2,
    title: "Restore",
    description: "Hand-polish correcting micro-abrasions and restoring obsidian depth.",
    icon: "sparkles"
  },
  {
    id: 3,
    title: "Shield",
    description: "Aerospace-grade ceramic coating. 12-month hydrophobic armor.",
    icon: "shield"
  }
];

export const SERVICE_DETAILS: ServiceDetailCategory[] = [
  {
    title: "Interior Detailing",
    items: [
      "Interior Steam Cleaning",
      "Sanitizing",
      "Detail Vacuuming",
      "Seat & Roof Shampooing",
      "Anti Bacterial Treatment",
      "A/C Vents Cleaning",
      "Boot & Shelf Cleaning",
      "Dashboard Detail Cleaning & Polishing",
      "All Plastic Material Polishing",
      "Sun Visors Cleaning",
      "Door Pads Detail Cleaning",
      "Deodorizing"
    ]
  },
  {
    title: "Engine Bay Detailing",
    items: [
      "Safe Steam Wash & Shine",
      "Removal Of Grease & Dirty Oil",
      "Windshield Water Check And Filling",
      "Polishing"
    ]
  },
  {
    title: "Exterior Detailing",
    items: [
      "Steam Wash",
      "Wheel Arches Cleaning",
      "Tar Removing",
      "Rust Cleaning",
      "Hand Polish",
      "Hand Wax",
      "Rim Cleaning",
      "Windows And Mirror Cleaning",
      "Windshield Stain Removal"
    ]
  },
  {
    title: "Wheels Detailing",
    items: [
      "Alloys Wheels Detailed Cleaning",
      "Iron Removal",
      "Tyre Dressing"
    ]
  }
];

export const PACKAGES: ServicePackage[] = [
  {
    id: "foam-wash",
    name: "Foam Wash",
    features: [
      "Exterior Foam Wash",
      "Vacuuming",
      "Dashboard Polishing",
      "Wheel Dressing"
    ],
    prices: {
      [CarCategory.HATCHBACK]: 499,
      [CarCategory.SEDAN]: 499,
      [CarCategory.SUV]: 499
    }
  },
  {
    id: "gold-steam",
    name: "Gold Steam Wash",
    features: [
      "Exterior Steam Wash",
      "Interior Steam Cleaning",
      "Vacuuming",
      "Dashboard Polishing",
      "Wheel Dressing",
      "Deodorizing",
      "Vehicle Body Polishing",
      "A/c Vents Steam & Sanitizing"
    ],
    prices: {
      [CarCategory.HATCHBACK]: 899,
      [CarCategory.SEDAN]: 999,
      [CarCategory.SUV]: 999
    },
    popular: true
  },
  {
    id: "platinum-steam",
    name: "Platinum Steam Wash",
    features: [
      "Exterior Steam Wash",
      "Interior Steam Cleaning",
      "Vacuuming",
      "Dashboard Polishing",
      "Wheel Dressing",
      "Deodorizing",
      "Vehicle Body Polishing",
      "A/c Vents Steam & Sanitizing",
      "Seat & Roof Shampooing"
    ],
    prices: {
      [CarCategory.HATCHBACK]: 1699,
      [CarCategory.SEDAN]: 1799,
      [CarCategory.SUV]: 1899
    }
  },
  {
    id: "teflon-coating",
    name: "Teflon Coating",
    features: [
      "Exterior Teflon Coating",
      "Waxing",
      "Exterior Steam Wash",
      "Interior Steam Cleaning",
      "Vacuuming",
      "Dashboard Polishing",
      "Wheel Dressing",
      "Deodorizing",
      "Vehicle Body Polishing",
      "A/c Vents Steam & Sanitizing"
    ],
    prices: {
      [CarCategory.HATCHBACK]: 4499,
      [CarCategory.SEDAN]: 4999,
      [CarCategory.SUV]: 5999
    }
  }
];

export const NAV_LINKS: { name: string; id: ViewType }[] = [
  { name: "Ritual", id: 'home' },
  { name: "Services", id: 'services' },
  { name: "About", id: 'about' },
  { name: "Contact", id: 'contact' },
  { name: "Book Now", id: 'booking' },
];
