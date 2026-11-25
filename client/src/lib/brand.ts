const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Fallback hero image when no slide is configured. */
export const HERO_IMAGE = `${BASE}/images/arena-cover.jpg`;

/** The training floor, used wherever a single wide photo is needed. */
export const FLOOR_IMAGE = `${BASE}/images/arena-rig.jpg`;

export const OG_IMAGE = `${BASE}/og-image.jpg`;

/** The official mark, background removed, for dark surfaces. */
export const LOGO_LIGHT = `${BASE}/images/rebuild-logo-light.png`;
export const LOGO_TRIM = `${BASE}/images/rebuild-logo-trim.png`;

export const SITE_URL =
  (import.meta.env.VITE_PUBLIC_SITE_URL ?? '').trim() || 'http://localhost:5173';

/** The studio's own Instagram — the source of every photograph on this site. */
export const INSTAGRAM_URL = 'https://www.instagram.com/rebuildfitnessstudio/';
export const INSTAGRAM_HANDLE = 'rebuildfitnessstudio';

/** Published on the studio's own listing. */
export const PHONE_DISPLAY = '+91 85919 15437';
export const PHONE_TEL = '+918591915437';

export const ADDRESS_LINES = [
  'Ground Floor, NityaSukhadham Society',
  'Tawaripada, Bharat Rice Mills Compound',
  'Lal Baug, Parel, Mumbai 400012',
];

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Rebuild Sports And Fitness Centre Lal Baug Parel Mumbai');

export const HOURS = [
  { day: 'Monday – Saturday', time: '6:00 AM – 12:00 PM' },
  { day: 'Monday – Saturday', time: '4:00 PM – 10:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

/**
 * Absolute asset URL that respects Vite's BASE_URL — and is safe to call on a
 * value that was already resolved (project sites are served from /<repo>/, so
 * double-prefixing would 404).
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (!path.startsWith('/')) return `${BASE}/${path}`;
  if (!BASE || path === BASE || path.startsWith(`${BASE}/`)) return path;
  return `${BASE}${path}`;
}
