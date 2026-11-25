import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';
import { ADDRESS_LINES, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/brand';

const NAV_ITEMS = [
  { to: '/programs', label: 'Programs' },
  { to: '/discipline/strength', label: 'Strength' },
  { to: '/about', label: 'The Floor' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Visit Us' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const announcement =
    settings.announcements.enabled && settings.announcements.text
      ? settings.announcements.text
      : '';

  return (
    <header className="sticky top-0 z-50">
      {announcement ? (
        <div className="overflow-hidden bg-forge-400 text-coal">
          <div className="shell flex items-center justify-between gap-4 py-1.5">
            <p className="truncate font-display text-[11px] font-semibold uppercase tracking-wide2">
              {announcement}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-1.5 font-display text-[10px] font-semibold uppercase tracking-wide2 underline decoration-coal/40 underline-offset-4 hover:decoration-coal sm:flex"
            >
              Get directions
            </a>
          </div>
        </div>
      ) : null}

      <div
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? 'border-white/10 bg-coal/95 backdrop-blur-md'
            : 'border-white/5 bg-coal/80 backdrop-blur-sm'
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
          <Wordmark size="md" />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative font-display text-[13px] font-semibold uppercase tracking-wide2 transition-colors ${
                    isActive ? 'text-forge-400' : 'text-chalk/85 hover:text-chalk'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-0.5 bg-forge-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden text-right font-display leading-none text-chalk transition-colors hover:text-forge-300 xl:block"
            >
              <span className="block text-[9px] font-semibold uppercase tracking-micro text-dust">
                Call the floor
              </span>
              <span className="mt-1 block text-sm font-semibold tracking-wide2">{PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 items-center gap-2 border border-white/15 px-3 text-chalk transition-colors hover:border-forge-400 hover:text-forge-300"
              aria-label={`Open your plan (${count} ${count === 1 ? 'item' : 'items'})`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 5h3l2 11h10l2-8H7" strokeLinecap="square" />
                <path d="M10 8h10M12 3h6" strokeLinecap="square" opacity="0.5" />
              </svg>
              <span className="font-display text-xs font-semibold">{count}</span>
            </button>

            <Link to="/contact" className="btn-solid hidden h-10 px-4 py-0 text-xs sm:inline-flex">
              Book a session
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-chalk lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen ? (
        <div className="fixed inset-0 top-[68px] z-40 flex flex-col border-t border-white/10 bg-coal lg:hidden">
          <nav className="shell flex flex-1 flex-col justify-center gap-1 py-8" aria-label="Mobile">
            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl font-bold uppercase leading-none tracking-tightest ${
                    isActive ? 'text-forge-400' : 'text-chalk'
                  }`
                }
              >
                <span className="font-mono text-[10px] text-dust">0{index + 1}</span>
                {item.label}
              </NavLink>
            ))}
            <Link to="/reviews" className="border-b border-white/10 py-4 font-display text-xl uppercase tracking-wide2 text-ash">
              Reviews
            </Link>
          </nav>

          <div className="shell border-t border-white/10 py-5">
            <Link to="/contact" className="btn-solid w-full">
              Book a session
            </Link>
            <div className="mt-4 grid gap-2 text-xs text-ash">
              <a href={`tel:${PHONE_TEL}`} className="hover:text-forge-300">
                {PHONE_DISPLAY}
              </a>
              <p className="text-dust">{ADDRESS_LINES.join(' · ')}</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-forge-300">
                @{settings.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
