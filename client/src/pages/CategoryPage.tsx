import { Link, useParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { ServiceCard } from '@/components/ServiceCard';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const data = useApi(() => publicApi.getCategory(slug), [slug]);

  if (data.loading) {
    return (
      <div className="shell py-16">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton mt-5 h-16 w-2/3" />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="skeleton aspect-[4/5]" />
          ))}
        </div>
      </div>
    );
  }

  if (data.error || !data.data) {
    return (
      <div className="shell py-20">
        <EmptyState
          tone="error"
          title="That discipline isn't on the board"
          description={data.error ?? 'It may have been renamed. Everything else is still open.'}
          action={
            <Link to="/programs" className="btn-line">
              All programs
            </Link>
          }
        />
      </div>
    );
  }

  const { category, products } = data.data;

  return (
    <>
      <Seo
        title={`${category.name} — Rebuild Sports & Fitness Center`}
        description={category.description}
        canonicalPath={`/discipline/${category.slug}`}
        image={category.image}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-iron">
        {category.image ? (
          <img
            src={category.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            aria-hidden="true"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-coal via-coal/85 to-coal/30" />
        <div className="shell relative py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-dust" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-forge-300">Home</Link>
            <span>/</span>
            <Link to="/programs" className="hover:text-forge-300">Programs</Link>
            <span>/</span>
            <span className="text-ash">{category.name}</span>
          </nav>
          <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tightest text-chalk sm:text-7xl">
            {category.name}
          </h1>
          {category.description ? (
            <p className="mt-5 max-w-xl border-l-2 border-forge-400 pl-4 text-sm leading-relaxed text-ash">
              {category.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-micro text-dust">
            {products.length} {products.length === 1 ? 'program' : 'programs'}
          </p>
          <Link to="/programs" className="text-[10px] font-semibold uppercase tracking-wide2 text-forge-300 hover:text-forge-200">
            View everything
          </Link>
        </div>

        {products.length ? (
          <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {products.map((product, index) => (
              <ServiceCard key={product._id} product={product} priority={index < 4} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-7">
            <EmptyState
              title="Nothing published here yet"
              description="Programs appear as soon as they are published in the admin panel. Message us and we will tell you what is running this week."
            />
          </div>
        )}
      </section>
    </>
  );
}
