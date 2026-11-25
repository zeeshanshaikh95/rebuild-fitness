import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IHeroSlide {
  imageUrl: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  active: boolean;
}

export const HERO_SLIDES_DEFAULT: IHeroSlide[] = [
  {
    imageUrl: '/images/arena-cover.jpg',
    eyebrow: 'Lal Baug · Parel',
    headline: 'Train like you|mean it',
    subheadline:
      'Strength, conditioning and recovery on one floor — rigs, a numbered sprint turf and coaches who watch the bar path, not their phones.',
    ctaLabel: 'See the programs',
    ctaHref: '/programs',
    active: true,
  },
  {
    imageUrl: '/images/arena-rig.jpg',
    eyebrow: 'The floor',
    headline: 'Built to|be used',
    subheadline:
      'Rings, bars, boxes, sleds and a dumbbell wall from the light pairs to the heavy rack. No queue for a bench, no mirror-only workout.',
    ctaLabel: 'Inside the studio',
    ctaHref: '/about',
    active: true,
  },
  {
    imageUrl: '/images/conditioning-machines.jpg',
    eyebrow: 'Conditioning',
    headline: 'Earn your|engine',
    subheadline:
      'Concept2 rowers and SkiErg, air bikes, battle ropes and a sprint track — intervals that carry over to the sport you actually play.',
    ctaLabel: 'Conditioning programs',
    ctaHref: '/discipline/conditioning',
    active: true,
  },
];

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Hi Rebuild Sports & Fitness Center!\n' +
  'I would like to book the following:\n' +
  '{{ITEMS}}\n' +
  'Estimated total: {{TOTAL}}\n\n' +
  'Please share the available slots and confirm what it costs.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Hi Rebuild Sports & Fitness Center!\n' +
  'I would like to book:\n' +
  '• {{PRODUCT}}\n' +
  '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
  'Please share the available slots and confirm what it costs.';

export interface ISiteSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  city: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  heroSlides: IHeroSlide[];
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  policies: {
    shipping: string;
    returns: string;
  };
  updatedAt: Date;
}

const slideSchema = new Schema<IHeroSlide>(
  {
    imageUrl: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    headline: { type: String, default: '' },
    subheadline: { type: String, default: '' },
    ctaLabel: { type: String, default: 'See the programs' },
    ctaHref: { type: String, default: '/programs' },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'Rebuild Sports & Fitness Center' },
    tagline: { type: String, default: 'Rebuild your limits' },
    whatsappNumber: { type: String, default: '918591915437' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/rebuildfitnessstudio/' },
    instagramHandle: { type: String, default: 'rebuildfitnessstudio' },
    email: { type: String, default: '' },
    city: { type: String, default: 'Lal Baug, Parel, Mumbai' },
    mapsUrl: {
      type: String,
      default:
        'https://www.google.com/maps/search/?api=1&query=Rebuild+Sports+And+Fitness+Centre+Lal+Baug+Parel+Mumbai',
    },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    heroSlides: { type: [slideSchema], default: () => HERO_SLIDES_DEFAULT },
    about: {
      intro: { type: String, default: '' },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '/images/arena-rig.jpg' },
    },
    announcements: {
      enabled: { type: Boolean, default: true },
      text: {
        type: String,
        default: 'Mon–Sat · 6 AM–12 PM & 4–10 PM · Walk in, or message us to book a session',
      },
    },
    policies: {
      shipping: { type: String, default: '' },
      returns: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);
