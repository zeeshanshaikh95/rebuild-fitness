import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';
import { INSTAGRAM_URL } from '@/lib/brand';

export function GalleryPage() {
  const { settings } = useSettings();
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  return (
    <>
      <Seo
        title="Gallery — Rebuild Sports & Fitness Center"
        description="Photographs of the floor at Rebuild Sports & Fitness Center, Lal Baug: the rig, sprint turf, rowers, air bikes and the recovery room."
        canonicalPath="/gallery"
        image="/images/arena-rig.jpg"
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-iron">
        <div className="pointer-events-none absolute inset-0 floor-grid opacity-50" />
        <div className="shell relative py-14 sm:py-20">
          <p className="eyebrow">Inside the studio</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tightest text-chalk sm:text-7xl">
            No renders.
            <br />
            <span className="text-forge-400">Just the floor.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
            Every photograph here is the actual room — the equipment you will use, in the state you
            will find it. More goes up on Instagram through the week.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line mt-7"
          >
            Follow @{settings.instagramHandle}
          </a>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        {gallery.loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="skeleton aspect-square" />
            ))}
          </div>
        ) : gallery.error ? (
          <EmptyState
            tone="error"
            title="The gallery didn't load"
            description={gallery.error}
            action={
              <button type="button" className="btn-line" onClick={gallery.refetch}>
                Try again
              </button>
            }
          />
        ) : !gallery.data?.length ? (
          <EmptyState
            title="Photographs are being added"
            description="The studio gallery appears here once published. Our Instagram has the latest in the meantime."
            action={
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-line">
                Open Instagram
              </a>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.data.map((item, index) => (
              <a
                key={item._id}
                href={item.externalUrl || INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block overflow-hidden border border-white/10 bg-smoke ${
                  index % 7 === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto' : 'aspect-square'
                }`}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.caption || 'Rebuild Sports & Fitness Center'}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-silk group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {item.caption ? (
                  <p className="absolute inset-x-0 bottom-0 translate-y-3 p-4 font-display text-xs font-semibold uppercase leading-tight tracking-wide2 text-chalk opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </p>
                ) : null}
                <span className="absolute right-2 top-2 bg-coal/70 px-2 py-1 font-mono text-[9px] text-ash">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
