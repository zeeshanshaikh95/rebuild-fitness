import { useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { PageHeader, Spinner, Notice } from './AdminUI';
import { normaliseNumber } from '@/lib/whatsapp';

const RANGES = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
] as const;

export function AdminDashboardPage() {
  const [range, setRange] = useState<'7' | '30' | '90'>('30');
  const analytics = useApi(() => adminApi.getAnalytics(range), [range]);
  const products = useApi(() => adminApi.listProducts(), []);
  const settings = useApi(() => adminApi.getSettings(), []);

  const totals = analytics.data?.totals;
  const missingWhatsApp = settings.data ? normaliseNumber(settings.data.settings.whatsappNumber).length < 8 : false;
  const unapproved = 0;

  const cards = [
    { label: 'Page views', value: totals?.pageViews ?? 0 },
    { label: 'Program views', value: totals?.productViews ?? 0 },
    { label: 'Added to bag', value: totals?.cartAdds ?? 0 },
    { label: 'Order messages', value: totals?.orderWhatsappClicks ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Studio"
        title="Overview"
        description="How the site is being used, what needs attention, and the fastest way to add a new program."
        actions={
          <Link to="/admin/products/new" className="btn-solid !px-5 !py-2.5 text-[10px]">
            Add a program
          </Link>
        }
      />

      {missingWhatsApp ? (
        <Notice tone="warn">
          <strong className="font-medium">No order number set.</strong> Order buttons currently open
          Instagram DMs. Add the WhatsApp number in{' '}
          <Link to="/admin/settings" className="underline">
            Settings → Contact
          </Link>{' '}
          to switch them over.
        </Notice>
      ) : null}

      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Last {range} days</h2>
        <div className="flex gap-1">
          {RANGES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRange(option.value)}
              className={`border px-3 py-1.5 text-[10px] uppercase tracking-wide2 transition-colors ${
                range === option.value
                  ? 'border-white/40 bg-forge-400 text-coal'
                  : 'border-white/15 text-ash hover:border-white/40/40'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {analytics.loading ? (
        <Spinner label="Reading the numbers…" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-px bg-forge-400/15 lg:grid-cols-4">
            {cards.map((card) => (
              <div key={card.label} className="bg-steel p-5">
                <p className="eyebrow">{card.label}</p>
                <p className="mt-3 font-display text-4xl leading-none">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="panel p-5">
              <h3 className="font-display text-xl">Most viewed programs</h3>
              {analytics.data?.topProducts.length ? (
                <ul className="mt-4 divide-y divide-ink/10">
                  {analytics.data.topProducts.map((row) => (
                    <li key={row.slug} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                      <span className="truncate text-ash">
                        {row.exists ? row.name : `${row.slug} (removed)`}
                      </span>
                      <span className="shrink-0 text-xs text-dust">{row.count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-xs text-dust">No program views recorded in this range yet.</p>
              )}
            </section>

            <section className="panel p-5">
              <h3 className="font-display text-xl">Where people arrive</h3>
              {analytics.data?.topReferrers.length ? (
                <ul className="mt-4 divide-y divide-ink/10">
                  {analytics.data.topReferrers.map((row) => (
                    <li key={row._id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                      <span className="truncate text-ash">{row._id}</span>
                      <span className="shrink-0 text-xs text-dust">{row.count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-xs text-dust">
                  Direct visits so far. Referrer data appears once the site is shared.
                </p>
              )}
            </section>
          </div>
        </>
      )}

      <div className="grid gap-6 sm:grid-cols-3">
        <Link to="/admin/products" className="panel group p-5 transition-colors hover:bg-steel">
          <p className="eyebrow">Catalogue</p>
          <p className="mt-2 font-display text-3xl">
            {products.loading ? '—' : products.data?.products.filter((item) => !item.archived).length ?? 0}
          </p>
          <p className="mt-1 text-xs text-ash">live programs</p>
          <span className="mt-4 inline-block text-[10px] uppercase tracking-wide2 text-dust group-hover:text-chalk">
            Manage →
          </span>
        </Link>
        <Link to="/admin/categories" className="panel group p-5">
          <p className="eyebrow">Categories</p>
          <p className="mt-2 font-display text-3xl">—</p>
          <p className="mt-1 text-xs text-ash">collections in the nav</p>
          <span className="mt-4 inline-block text-[10px] uppercase tracking-wide2 text-dust group-hover:text-chalk">
            Manage →
          </span>
        </Link>
        <Link to="/admin/reviews" className="panel group p-5">
          <p className="eyebrow">Reviews</p>
          <p className="mt-2 font-display text-3xl">{unapproved}</p>
          <p className="mt-1 text-xs text-ash">awaiting moderation</p>
          <span className="mt-4 inline-block text-[10px] uppercase tracking-wide2 text-dust group-hover:text-chalk">
            Moderate →
          </span>
        </Link>
      </div>
    </div>
  );
}
