import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { formatPrice } from '@/lib/format';
import { buildOrderLink, buildOrderMessage } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

/**
 * "Your plan" — the gym version of the bag. Nobody pays online: the list is a
 * way to walk in (or message) with the sessions you want already written out,
 * so the only action is a WhatsApp message with the chosen programs.
 */
export function MiniCart() {
  const { items, isOpen, closeCart, setQuantity, removeItem, subtotal, count, clear } = useCart();
  const { settings } = useSettings();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const link = items.length ? buildOrderLink(settings, buildOrderMessage(settings, items)) : null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Your session plan">
      <button
        type="button"
        aria-label="Close plan"
        onClick={closeCart}
        className="absolute inset-0 bg-coal/80 backdrop-blur-[3px]"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/15 bg-iron shadow-panel">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="eyebrow">Your plan</p>
            <p className="mt-1 font-display text-2xl font-bold uppercase leading-none tracking-tight text-chalk">
              {count} {count === 1 ? 'session' : 'sessions'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-ash transition-colors hover:text-forge-300"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="font-display text-2xl font-bold uppercase tracking-tight text-chalk">
                Nothing on the plan yet
              </p>
              <p className="max-w-[17rem] text-sm leading-relaxed text-ash">
                Add the programs you are curious about, then send them to us — we will confirm the
                slots and the price on WhatsApp.
              </p>
              <Link to="/programs" onClick={closeCart} className="btn-line mt-2">
                See the programs
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <Link
                    to={`/program/${item.slug}`}
                    onClick={closeCart}
                    className="w-20 shrink-0 bg-smoke"
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="aspect-square h-full w-full object-cover" />
                    ) : (
                      <div className="aspect-square" />
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to={`/program/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-base font-semibold uppercase leading-tight tracking-tight text-chalk hover:text-forge-300"
                        >
                          {item.name}
                        </Link>
                        {item.variantName ? (
                          <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide2 text-dust">
                            {item.variantName}
                          </p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-[9px] font-semibold uppercase tracking-wide2 text-dust transition-colors hover:text-blood-500"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                      <div className="flex items-center border border-white/15">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          className="h-8 w-8 text-ash transition-colors hover:text-forge-300"
                          aria-label={`Reduce ${item.name} quantity`}
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-display text-xs text-chalk">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          className="h-8 w-8 text-ash transition-colors hover:text-forge-300"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs uppercase tracking-wide2 text-forge-300">
                        {formatPrice(item.unitPrice)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-white/10 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow">Estimated total</span>
              <span className="font-display text-xl font-bold uppercase text-chalk">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ash">
              Final pricing depends on the program and the pack you choose — we confirm everything on{' '}
              {link?.channel === 'whatsapp' ? 'WhatsApp' : 'Instagram'} before your first session.
            </p>

            {link ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent({ type: 'order_whatsapp_click' })}
                className="btn-solid mt-4 w-full"
              >
                {link.channel === 'whatsapp' ? 'Send plan on WhatsApp' : 'Send plan on Instagram'}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
                </svg>
              </a>
            ) : null}

            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-[10px] font-semibold uppercase tracking-wide2 text-dust transition-colors hover:text-chalk"
            >
              Clear plan
            </button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
