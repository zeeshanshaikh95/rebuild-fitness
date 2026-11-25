import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { Stars } from '@/components/Stars';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';
import { MAPS_URL } from '@/lib/brand';

export function ReviewsPage() {
  const { settings } = useSettings();
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);

  const link = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a first session',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  return (
    <>
      <Seo
        title="Reviews — Rebuild Sports & Fitness Center"
        description="What members say about training at Rebuild Sports & Fitness Center, Lal Baug, Parel."
        canonicalPath="/reviews"
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-iron">
        <div className="pointer-events-none absolute inset-0 floor-grid opacity-50" />
        <div className="shell relative py-14 sm:py-20">
          <p className="eyebrow">After the session</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tightest text-chalk sm:text-7xl">
            From the
            <br />
            <span className="text-forge-400">people on the floor</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
            Only reviews that members have actually written appear here. The studio's public Google
            listing is rated 4.8 out of 5 — you can read every review there, unfiltered.
          </p>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-line mt-7">
            Read the Google reviews
          </a>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        {reviews.loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="skeleton h-56" />
            ))}
          </div>
        ) : reviews.error ? (
          <EmptyState
            tone="error"
            title="Reviews didn't load"
            description={reviews.error}
            action={
              <button type="button" className="btn-line" onClick={reviews.refetch}>
                Try again
              </button>
            }
          />
        ) : !reviews.data?.length ? (
          <EmptyState
            title="No reviews published here yet"
            description="We would rather show nothing than write reviews ourselves. Members' words appear here once they are added in the admin panel."
            action={
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-line">
                Read Google reviews
              </a>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.data.map((review) => (
              <figure key={review._id} className="flex flex-col border border-white/10 bg-steel p-6">
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-chalk/85">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span className="flex h-9 w-9 items-center justify-center border border-forge-400/50 font-display text-sm font-bold text-forge-400">
                    {review.customerName.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide2 text-ash">
                    {review.customerName}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border border-forge-400/30 bg-steel p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-chalk">
              Train with us, then tell it straight
            </p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ash">
              If you have trained here, message us with your honest experience — it goes on the site
              once approved.
            </p>
          </div>
          {link ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid shrink-0"
            >
              {link.channel === 'whatsapp' ? 'Message us' : 'DM us'}
            </a>
          ) : null}
        </div>
      </section>
    </>
  );
}
