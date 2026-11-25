import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { assetUrl, ADDRESS_LINES, PHONE_DISPLAY } from '@/lib/brand';
import type { HeroSlide } from '@/types';

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    imageUrl: '/images/arena-cover.jpg',
    eyebrow: 'Lal Baug · Parel',
    headline: 'Train like you|mean it',
    subheadline:
      'Strength, conditioning and recovery on one floor — rigs, a numbered sprint turf and coaches who watch the bar path.',
    ctaLabel: 'See the programs',
    ctaHref: '/programs',
    active: true,
  },
  {
    imageUrl: '/images/arena-rig.jpg',
    eyebrow: 'The floor',
    headline: 'Built to|be used',
    subheadline:
      'Rings, bars, boxes, sleds and a dumbbell wall from the light pairs to the heavy rack.',
    ctaLabel: 'Inside the studio',
    ctaHref: '/about',
    active: true,
  },
  {
    imageUrl: '/images/conditioning-machines.jpg',
    eyebrow: 'Conditioning',
    headline: 'Earn your|engine',
    subheadline:
      'Concept2 rowers and SkiErg, air bikes and a sprint track — intervals that carry over to the sport you actually play.',
    ctaLabel: 'Conditioning programs',
    ctaHref: '/discipline/conditioning',
    active: true,
  },
];

const AUTOPLAY_MS = 7000;

/**
 * Hero: a cross-fading photo slider, not a video.
 *
 * The composition is a gym wall: the headline is set in condensed caps and
 * broken across two lines, with the second line dropped in safety orange. A
 * vertical rail on the right lists the slides like stations on a whiteboard;
 * the bottom strip carries the facts a walk-in actually wants (hours,
 * address, phone). Arrow keys, swipe, dots and autoplay all drive the same
 * index, and autoplay stops on hover/focus or when reduced motion is requested.
 */
export function HeroSlider() {
  const { settings } = useSettings();

  const slides = useMemo(() => {
    const configured = (settings.heroSlides ?? []).filter(
      (slide) => slide.active && (slide.imageUrl || slide.headline)
    );
    return configured.length ? configured : FALLBACK_SLIDES;
  }, [settings.heroSlides]);

  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStart = useRef<number | null>(null);

  const slide = slides[Math.min(index, total - 1)] ?? FALLBACK_SLIDES[0];
  const lines = (slide.headline || 'Train like you|mean it').split('|');

  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total]);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setProgress(0);
    if (total < 2 || paused || reduced) return;

    const started = Date.now();
    const tick = window.setInterval(() => {
      setProgress(Math.min(1, (Date.now() - started) / AUTOPLAY_MS));
    }, 80);
    const advance = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(advance);
    };
  }, [index, total, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Rebuild Sports & Fitness Center highlights"
      className="relative isolate overflow-hidden bg-coal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1);
        if (event.key === 'ArrowLeft') go(index - 1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
        if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="relative min-h-[640px] w-full sm:min-h-[680px] lg:h-[86vh] lg:min-h-[700px]">
        {/* ── Photographs ───────────────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((item, itemIndex) => {
            const isActive = itemIndex === index % total;
            const src = item.imageUrl
              ? item.imageUrl.startsWith('http')
                ? item.imageUrl
                : assetUrl(item.imageUrl)
              : '';
            return (
              <div
                key={`${item.imageUrl}-${itemIndex}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-[1100ms] ease-editorial ${
                  isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                {src ? (
                  <img
                    src={src}
                    alt={item.headline?.replace('|', ' ') || 'Rebuild Sports & Fitness Center'}
                    loading={itemIndex === 0 ? 'eager' : 'lazy'}
                    className={`h-full w-full object-cover object-[center_45%] ${
                      isActive ? 'animate-ken-burns' : ''
                    }`}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Darkening for type, plus an orange floor-glow from the left. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-coal via-coal/85 to-coal/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal via-coal/10 to-coal/50" />
        <div className="pointer-events-none absolute inset-0 bg-forge-glow" />

        {/* Diagonal marking tape, right edge. */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-6 mark-tape opacity-70 lg:block" />

        {/* ── Copy ─────────────────────────────────────────────── */}
        <div className="relative flex h-full items-center">
          <div className="shell w-full pb-40 pt-28 sm:pb-44 sm:pt-32">
            <div key={index} className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-dark">{slide.eyebrow || 'Lal Baug · Parel'}</span>
                <span className="font-mono text-[10px] uppercase tracking-wide2 text-ash">
                  Est. floor · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>

              <h1 className="mt-6 font-display text-[3.4rem] font-extrabold uppercase leading-[0.84] tracking-tightest text-chalk sm:text-[5.2rem] lg:text-[6.6rem]">
                <span className="block animate-fade-up" style={{ animationDelay: '40ms' }}>
                  {lines[0]}
                </span>
                {lines[1] ? (
                  <span
                    className="block animate-fade-up text-forge-400"
                    style={{ animationDelay: '120ms' }}
                  >
                    {lines[1]}
                  </span>
                ) : null}
              </h1>

              {slide.subheadline ? (
                <p
                  className="mt-7 max-w-xl animate-fade-up border-l-2 border-forge-400/70 pl-4 text-sm leading-relaxed text-chalk/75 sm:text-base"
                  style={{ animationDelay: '220ms' }}
                >
                  {slide.subheadline}
                </p>
              ) : null}

              <div
                className="mt-9 flex animate-fade-up flex-wrap items-center gap-3"
                style={{ animationDelay: '320ms' }}
              >
                <Link to={slide.ctaHref || '/programs'} className="btn-solid">
                  {slide.ctaLabel || 'See the programs'}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
                  </svg>
                </Link>
                <Link to="/contact" className="btn-line">
                  Book a session
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right rail: slide stations ────────────────────────── */}
        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
          {slides.map((item, itemIndex) => {
            const active = itemIndex === index % total;
            const label = (item.eyebrow || `Station ${itemIndex + 1}`).replace(/·.*/, '').trim();
            return (
              <button
                key={`rail-${itemIndex}`}
                type="button"
                onClick={() => go(itemIndex)}
                aria-label={`Go to slide ${itemIndex + 1}: ${label}`}
                aria-current={active}
                className={`group flex w-44 items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                  active
                    ? 'border-forge-400 bg-coal/80'
                    : 'border-white/15 bg-coal/40 hover:border-white/40'
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${
                    active ? 'text-forge-400' : 'text-dust group-hover:text-ash'
                  }`}
                >
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-display text-sm font-semibold uppercase tracking-wide2 ${
                    active ? 'text-chalk' : 'text-ash'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`ml-auto h-1.5 w-1.5 ${active ? 'bg-forge-400' : 'bg-white/20'}`}
                />
              </button>
            );
          })}
        </div>

        {/* ── Bottom control + facts strip ──────────────────────── */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="shell pb-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-semibold text-forge-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative h-1 w-24 overflow-hidden bg-white/15 sm:w-40">
                  <span
                    className="absolute inset-y-0 left-0 bg-forge-400 transition-[width] duration-100 ease-linear"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-dust">
                  {String(total).padStart(2, '0')}
                </span>

                {total > 1 ? (
                  <div className="ml-2 hidden items-center gap-1.5 sm:flex">
                    {slides.map((item, itemIndex) => (
                      <button
                        key={`dot-${itemIndex}`}
                        type="button"
                        onClick={() => go(itemIndex)}
                        aria-label={`Go to slide ${itemIndex + 1}${item.eyebrow ? `: ${item.eyebrow}` : ''}`}
                        aria-current={itemIndex === index}
                        className={`h-1.5 transition-all duration-300 ${
                          itemIndex === index ? 'w-7 bg-forge-400' : 'w-2.5 bg-white/25 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                ) : null}

                <div className="ml-1 flex items-center gap-2 sm:ml-3">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() => go(index - 1)}
                    className="flex h-9 w-9 items-center justify-center border border-white/20 text-chalk transition-colors hover:border-forge-400 hover:bg-forge-400 hover:text-coal"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 5l-7 7 7 7" strokeLinecap="square" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => go(index + 1)}
                    className="flex h-9 w-9 items-center justify-center border border-white/20 text-chalk transition-colors hover:border-forge-400 hover:bg-forge-400 hover:text-coal"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" strokeLinecap="square" />
                    </svg>
                  </button>
                </div>
              </div>

              <span className="hidden font-mono text-[9px] uppercase tracking-wide2 text-dust lg:block">
                Swipe · ← →
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-px border-t border-white/15 bg-white/15 sm:grid-cols-4">
              {[
                ['Open', 'Mon–Sat · 6 AM–12 PM & 4–10 PM'],
                ['Floor', 'Lal Baug, Parel'],
                ['Talk to us', PHONE_DISPLAY],
                ['Recovery', 'Steam · Massage'],
              ].map(([label, value]) => (
                <div key={label} className="bg-coal/85 px-3 py-3 backdrop-blur-sm sm:px-4">
                  <dt className="text-[9px] font-semibold uppercase tracking-micro text-dust">{label}</dt>
                  <dd className="mt-1 font-display text-xs uppercase tracking-wide2 text-chalk sm:text-sm">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="sr-only">{ADDRESS_LINES.join(', ')}</p>
      </div>
    </section>
  );
}
