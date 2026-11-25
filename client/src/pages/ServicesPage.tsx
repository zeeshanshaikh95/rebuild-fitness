import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { ServiceCard } from '@/components/ServiceCard';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';

type SortValue = 'featured' | 'bestseller' | 'newest' | 'price_asc' | 'price_desc';

const SORTS: Array<{ value: SortValue; label: string }> = [
  { value: 'featured', label: 'Featured first' },
  { value: 'bestseller', label: 'Most booked' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
];

export function ServicesPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? '';
  const sort = (params.get('sort') as SortValue) ?? 'featured';
  const searchParam = params.get('q') ?? '';

  const [search, setSearch] = useState(searchParam);
  const [debounced, setDebounced] = useState(searchParam);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(search.trim()), 320);
    return () => window.clearTimeout(timer);
  }, [search]);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const programs = useApi(
    () =>
      publicApi
        .listProducts({
          search: debounced || undefined,
          category: category || undefined,
          sort,
        })
        .then((r) => r.products),
    [debounced, category, sort]
  );

  const activeCategory = useMemo(
    () => categories.data?.find((item) => item.slug === category) ?? null,
    [categories.data, category]
  );

  return (
    <>
      <Seo
        title="Training programs — Rebuild Sports & Fitness Center"
        description="Strength floor access, personal training, functional conditioning, group WODs, weight-loss blocks, sports massage and steam recovery at Rebuild, Lal Baug, Parel."
        canonicalPath="/programs"
      />

      {/* Header band */}
      <section className="relative overflow-hidden border-b border-white/10 bg-iron">
        <div className="pointer-events-none absolute inset-0 floor-grid opacity-60" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1.5 mark-tape opacity-70" />
        <div className="shell relative py-14 sm:py-20">
          <p className="eyebrow">The programme board</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tightest text-chalk sm:text-7xl">
            Training that
            <br />
            <span className="text-forge-400">has a plan</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
            Everything you can book on this floor, in one place. Prices are quoted at the desk or on
            WhatsApp — add what you are interested in to your plan and send it to us.
          </p>
        </div>
      </section>

      <section className="shell py-10 sm:py-14">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => update('category', '')}
              className={`border px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-wide2 transition-colors ${
                !category
                  ? 'border-forge-400 bg-forge-400 text-coal'
                  : 'border-white/15 text-ash hover:border-white/35 hover:text-chalk'
              }`}
            >
              All programs
            </button>
            {categories.data?.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() => update('category', item.slug)}
                className={`border px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-wide2 transition-colors ${
                  category === item.slug
                    ? 'border-forge-400 bg-forge-400 text-coal'
                    : 'border-white/15 text-ash hover:border-white/35 hover:text-chalk'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search programs</span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  update('q', event.target.value);
                }}
                placeholder="Search the board"
                className="field h-10 w-full pl-9 text-sm sm:w-56"
              />
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dust"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5" strokeLinecap="square" />
              </svg>
            </label>

            <label htmlFor="program-sort" className="sr-only">
              Sort programs
            </label>
            <select
              id="program-sort"
              value={sort}
              onChange={(event) => update('sort', event.target.value)}
              className="field h-10 text-sm sm:w-48"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-micro text-dust">
            {programs.loading ? 'Loading' : `${programs.data?.length ?? 0} programs`}
            {activeCategory ? ` · ${activeCategory.name}` : ''}
            {debounced ? ` · “${debounced}”` : ''}
          </p>
          {(category || debounced || sort !== 'featured') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setParams(new URLSearchParams(), { replace: true });
              }}
              className="text-[10px] font-semibold uppercase tracking-wide2 text-forge-300 hover:text-forge-200"
            >
              Reset
            </button>
          )}
        </div>

        {programs.loading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="skeleton aspect-[4/5]" />
            ))}
          </div>
        ) : programs.error ? (
          <div className="mt-8">
            <EmptyState
              tone="error"
              title="We couldn't load the programs"
              description={programs.error}
              action={
                <button type="button" className="btn-line" onClick={programs.refetch}>
                  Try again
                </button>
              }
            />
          </div>
        ) : !programs.data?.length ? (
          <div className="mt-8">
            <EmptyState
              title="Nothing matches that yet"
              description="Try a different discipline or clear the search. You can also message us and we will point you to the right program."
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {programs.data.map((product, index) => (
              <ServiceCard key={product._id} product={product} priority={index < 4} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
