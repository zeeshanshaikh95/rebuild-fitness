/**
 * The starter catalogue.
 *
 * Kept separate from `seed.ts` so the same data can also produce the static
 * snapshot the GitHub Pages build ships (see `snapshot.ts`) without a database.
 *
 * Every category and program is drawn from what the studio publicly offers and
 * from the equipment visible in its own photographs of the floor. **No price
 * is invented** — every program ships as "price on request", matching how the
 * studio quotes at the desk and on WhatsApp. Fill real prices in Admin →
 * Programs when they are confirmed.
 */
import {
  HERO_SLIDES_DEFAULT,
  WHATSAPP_TEMPLATE_DEFAULT,
  WHATSAPP_TEMPLATE_SINGLE_DEFAULT,
} from '../models/siteSettings.model.js';

const IG = 'https://www.instagram.com/rebuildfitnessstudio/';

export const categories = [
  {
    name: 'Strength',
    slug: 'strength',
    description:
      'Barbells, dumbbells, a rig and platforms — squat, hinge, press and pull with someone watching the bar path.',
    image: '/images/arena-rig.jpg',
    displayOrder: 1,
  },
  {
    name: 'Conditioning',
    slug: 'conditioning',
    description:
      'Rowers, SkiErg, air bikes and a numbered sprint turf for the engine work that carries over to your sport.',
    image: '/images/conditioning-machines.jpg',
    displayOrder: 2,
  },
  {
    name: 'Personal Training',
    slug: 'personal-training',
    description: 'One coach, one plan, one hour that is only about your goal.',
    image: '/images/turf-and-dumbbells.jpg',
    displayOrder: 3,
  },
  {
    name: 'Group Classes',
    slug: 'group-classes',
    description:
      'Small-group sessions on the turf and rig, scaled to whoever turns up — first-timers included.',
    image: '/images/arena-cover.jpg',
    displayOrder: 4,
  },
  {
    name: 'Recovery',
    slug: 'recovery',
    description:
      'Steam, stretching and deep-tissue work so the next session is better than the last.',
    image: '/images/steam-recovery.jpg',
    displayOrder: 5,
  },
];

export const packageOptions = (names: string[]) =>
  names.map((name) => ({
    name,
    price: null as number | null,
    stockStatus: 'in_stock' as const,
  }));

export const products = [
  {
    name: 'Strength Floor Access',
    slug: 'strength-floor-access',
    description:
      'The full floor, your own programme. Squat racks, benches, a dumbbell wall from the light pairs to the heavy rack, platforms and bars — with a coach on the floor for a form check when you want one.',
    price: null,
    compareAtPrice: null,
    fabric: 'Open floor · Mon–Sat, 6 AM–12 PM and 4–10 PM',
    care: 'Bring flat-soled shoes, a towel and water. Chalk is on the house. Leave the weights where you found them.',
    colour: 'Anyone who already trains and wants a serious floor without a fixed class time',
    categorySlug: 'strength',
    images: ['/images/arena-rig.jpg', '/images/turf-and-dumbbells.jpg'],
    variants: packageOptions(['Single session', 'Monthly', 'Quarterly']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 1,
  },
  {
    name: 'Personal Training',
    slug: 'personal-training',
    description:
      'A coach, a plan and a full hour that is only about your goal. Movement screened on day one, technique taught before load, and a programme that is written down so you know what you are doing when you walk in.',
    price: null,
    compareAtPrice: null,
    fabric: '60 minutes · one-to-one on the floor',
    care: 'Arrive ten minutes early for the first session. Wear what you can move in; we will start with the basics, not the heaviest set.',
    colour: 'Beginners, returners after a break, or anyone chasing a specific strength or body-composition goal',
    categorySlug: 'personal-training',
    images: ['/images/turf-and-dumbbells.jpg', '/images/arena-rig.jpg'],
    variants: packageOptions(['1 session', '5 sessions', '10 sessions']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 2,
  },
  {
    name: 'Functional Conditioning',
    slug: 'functional-conditioning',
    description:
      'Sled pushes, carries, rower intervals, ski erg and air-bike work on the numbered sprint turf. Built around the way you actually move — running, climbing, lifting, playing — rather than a single machine.',
    price: null,
    compareAtPrice: null,
    fabric: '45–60 minutes · coach-led on the turf',
    care: 'Bring shoes you can run in. Intensity is scaled to you, so a first session is hard but never a gamble.',
    colour: 'Athletes in season, and anyone whose gym work has stopped translating to real life',
    categorySlug: 'conditioning',
    images: ['/images/conditioning-machines.jpg', '/images/arena-cover.jpg'],
    variants: packageOptions(['Drop-in', '10-class pack']),
    bestseller: false,
    featured: true,
    newArrival: false,
    displayOrder: 3,
  },
  {
    name: 'Group WOD',
    slug: 'group-wod',
    description:
      'Small-group strength and conditioning on the rig and turf. One workout on the board, scaled three ways, a coach counting reps and fixing positions. Competitive if you want it, quiet if you do not.',
    price: null,
    compareAtPrice: null,
    fabric: '50 minutes · small group, capped',
    care: 'Book the slot you can actually make. Arrive early enough to warm up properly.',
    colour: 'People who train better with a board, a timer and someone beside them',
    categorySlug: 'group-classes',
    images: ['/images/arena-cover.jpg', '/images/arena-rig.jpg'],
    variants: packageOptions(['Drop-in', '10-class pack']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 4,
  },
  {
    name: 'Weight-Loss & Recomposition Plan',
    slug: 'weight-loss-recomposition-plan',
    description:
      'A structured block for fat loss that keeps the muscle. Strength sessions, conditioning you can recover from, and simple food guidance you can follow in a Mumbai kitchen — reviewed as the weeks go, not emailed once and forgotten.',
    price: null,
    compareAtPrice: null,
    fabric: '8 or 12 weeks · training plus check-ins',
    care: 'Come for a starting assessment before the block begins so progress is measured, not guessed.',
    colour: 'Anyone who has lost weight before and put it back on, or wants to change shape without living on the treadmill',
    categorySlug: 'personal-training',
    images: ['/images/turf-and-dumbbells.jpg', '/images/conditioning-machines.jpg'],
    variants: packageOptions(['8 weeks', '12 weeks']),
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 5,
  },
  {
    name: 'Sports Massage & Deep Tissue',
    slug: 'sports-massage-deep-tissue',
    description:
      'Deep-tissue work on the areas your training keeps complaining about — hips, hamstrings, calves, upper back. Booked after a hard block or before a heavy week.',
    price: null,
    compareAtPrice: null,
    fabric: '45 or 60 minutes · on-site therapy room',
    care: 'Tell the therapist what is sore and what you are training for. Drink water afterwards and do not book it straight after a max-effort session.',
    colour: 'Tight hips, desk-bound shoulders, or a training week that will not loosen up',
    categorySlug: 'recovery',
    images: ['/images/sports-massage.jpg', '/images/steam-recovery.jpg'],
    variants: packageOptions(['45 minutes', '60 minutes']),
    bestseller: false,
    featured: false,
    newArrival: false,
    displayOrder: 6,
  },
  {
    name: 'Steam & Recovery Session',
    slug: 'steam-recovery-session',
    description:
      'A steam bath, a quiet corner and twenty minutes where nobody asks you for a rep. The cheapest way to make the rest of the week train better.',
    price: null,
    compareAtPrice: null,
    fabric: 'Steam suite · member and walk-in slots',
    care: 'Bring a towel. Skip it if you are dehydrated, unwell or have a heart condition — ask us and we will suggest something else.',
    colour: 'Heavy training weeks, poor sleep, or a body that needs a reset',
    categorySlug: 'recovery',
    images: ['/images/steam-recovery.jpg'],
    variants: packageOptions(['Single visit', '5-visit pack']),
    bestseller: false,
    featured: false,
    newArrival: false,
    displayOrder: 7,
  },
];

export const gallery = [
  {
    image: '/images/arena-rig.jpg',
    caption: 'The rig, the rings and the dumbbell wall',
    externalUrl: IG,
    displayOrder: 1,
  },
  {
    image: '/images/turf-and-dumbbells.jpg',
    caption: 'Blue sprint turf down the middle of the floor',
    externalUrl: IG,
    displayOrder: 2,
  },
  {
    image: '/images/conditioning-machines.jpg',
    caption: 'Concept2 rowers, SkiErg and air bikes',
    externalUrl: IG,
    displayOrder: 3,
  },
  {
    image: '/images/arena-cover.jpg',
    caption: 'The full floor, before the evening shift',
    externalUrl: IG,
    displayOrder: 4,
  },
  {
    image: '/images/steam-recovery.jpg',
    caption: 'Steam suite — recovery is part of the programme',
    externalUrl: IG,
    displayOrder: 5,
  },
  {
    image: '/images/sports-massage.jpg',
    caption: 'Sports massage and deep-tissue work',
    externalUrl: IG,
    displayOrder: 6,
  },
];

/** Mirrors the defaults in `siteSettings.model.ts`, for the static snapshot. */
export const publicSettings = {
  businessName: 'Rebuild Sports & Fitness Center',
  tagline: 'Rebuild your limits',
  whatsappNumber: '918591915437',
  instagramUrl: IG,
  instagramHandle: 'rebuildfitnessstudio',
  email: '',
  city: 'Lal Baug, Parel, Mumbai',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rebuild+Sports+And+Fitness+Centre+Lal+Baug+Parel+Mumbai',
  whatsappTemplate: WHATSAPP_TEMPLATE_DEFAULT,
  whatsappSingleProductTemplate: WHATSAPP_TEMPLATE_SINGLE_DEFAULT,
  heroSlides: HERO_SLIDES_DEFAULT,
  about: {
    intro:
      'Rebuild Sports & Fitness Center is a strength and conditioning floor on the ground floor of NityaSukhadham Society in Lal Baug, Parel. Rigs, a numbered sprint turf, rowers and a dumbbell wall — one room, used properly, with a coach on the floor.',
    story:
      'This is not a hotel gym and it is not a room full of machines facing televisions. It is a working floor: a rig with rings, bars, bands and boxes, a blue sprint turf down the middle, Concept2 rowers and SkiErg, air bikes, sleds and a dumbbell wall that runs from the light pairs to the heavy rack.\n\nTraining here is coach-led. Someone watches your setup before your first working set, teaches the positions before adding load, and writes the next block down so you are not guessing when you walk in. Group sessions are scaled to whoever turns up — first-timers are not an inconvenience.\n\nThe other half of the room is recovery: a steam suite and an on-site massage room, because a hard week only pays off if you can come back to the next one. Members park on the premises; Currey Road and Chinchpokli are the closest stations.\n\nCome in for a session, or message us and we will tell you honestly where you should start.',
    founderImageUrl: '/images/arena-rig.jpg',
  },
  announcements: {
    enabled: true,
    text: 'Mon–Sat · 6 AM–12 PM & 4–10 PM · Walk in, or message us to book a session',
  },
  policies: {
    shipping:
      'Memberships and session packs are quoted at the desk or on WhatsApp. Nothing on this site is a checkout — you are sending an enquiry, not paying online. Ask for the current plans before you commit.',
    returns:
      'Need to move a booked session? Message us a few hours ahead so the slot can go to someone else. First visits start with a short floor induction before any heavy work.',
  },
};
