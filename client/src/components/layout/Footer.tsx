import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';
import {
  ADDRESS_LINES,
  HOURS,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from '@/lib/brand';

const TRAIN_LINKS = [
  { to: '/programs', label: 'All programs' },
  { to: '/discipline/strength', label: 'Strength' },
  { to: '/discipline/conditioning', label: 'Conditioning' },
  { to: '/discipline/personal-training', label: 'Personal training' },
  { to: '/discipline/recovery', label: 'Recovery' },
];

const STUDIO_LINKS = [
  { to: '/about', label: 'The floor' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Visit us' },
];

export function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-iron">
      {/* Marking tape rail */}
      <div className="h-1.5 w-full mark-tape opacity-80" aria-hidden="true" />

      <div className="shell grid gap-12 py-14 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Wordmark size="lg" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">
            {settings.about.intro ||
              'A strength and conditioning floor in Lal Baug, Parel — rigs, turf, rowers and coaches who watch the work.'}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide2 text-chalk transition-colors hover:border-forge-400 hover:text-forge-300"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3.5" y="3.5" width="17" height="17" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
              @{settings.instagramHandle}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide2 text-chalk transition-colors hover:border-forge-400 hover:text-forge-300"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-micro text-forge-300">Train</p>
            <ul className="mt-4 space-y-2.5">
              {TRAIN_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-display text-sm uppercase tracking-wide2 text-ash transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-micro text-forge-300">Studio</p>
            <ul className="mt-4 space-y-2.5">
              {STUDIO_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-display text-sm uppercase tracking-wide2 text-ash transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-micro text-forge-300">Hours</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              {HOURS.map((slot, index) => (
                <div key={`${slot.day}-${index}`}>
                  <dt className="text-[10px] uppercase tracking-wide2 text-dust">{slot.day}</dt>
                  <dd className={`font-display text-sm uppercase tracking-wide2 ${slot.time === 'Closed' ? 'text-dust' : 'text-chalk'}`}>
                    {slot.time}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-wide2 text-forge-300 underline decoration-forge-400/40 underline-offset-4 hover:decoration-forge-400"
            >
              Open in maps
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-wide2 text-dust">
            {ADDRESS_LINES.join(' · ')}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wide2 text-dust">
            <span>© {year} {settings.businessName}</span>
            <Link to="/admin" className="transition-colors hover:text-forge-300">
              Admin login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
