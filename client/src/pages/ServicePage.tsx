import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';
import { Seo } from '@/components/seo/Seo';
import { ServiceCard } from '@/components/ServiceCard';
import { EmptyState } from '@/components/EmptyState';
import { formatPrice } from '@/lib/format';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import type { ProductVariant } from '@/types';

export function ServicePage() {
  const { slug = '' } = useParams();
  const { toast } = useToast();
  const { addItem } = useCart();
  const { settings } = useSettings();

  const service = useApi(() => publicApi.getProduct(slug).then((r) => r.product), [slug]);
  const related = useApi(() => publicApi.getRelated(slug).then((r) => r.products), [slug]);

  const product = service.data;
  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) trackEvent({ type: 'product_view', productSlug: product.slug });
  }, [product]);

  useEffect(() => {
    setVariant(product?.variants?.[0] ?? null);
    setActiveImage(0);
    setQuantity(1);
  }, [product]);

  const price = variant?.price ?? product?.price ?? null;
  const enquiry = useMemo(() => {
    if (!product) return null;
    return buildOrderLink(
      settings,
      buildSingleProductMessage(settings, {
        productName: product.name,
        variantName: variant?.name ?? null,
        quantity,
        price,
      })
    );
  }, [product, settings, variant, quantity]);

  if (service.loading) {
    return (
      <div className="shell py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="skeleton aspect-[4/5]" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-12 w-3/4" />
            <div className="skeleton h-24 w-full" />
            <div className="skeleton h-12 w-56" />
          </div>
        </div>
      </div>
    );
  }

  if (service.error || !product) {
    return (
      <div className="shell py-20">
        <EmptyState
          tone="error"
          title="That program is not on the board"
          description={service.error ?? 'It may have been renamed or archived. The rest of the board is still open.'}
          action={
            <Link to="/programs" className="btn-line">
              Back to all programs
            </Link>
          }
        />
      </div>
    );
  }

  const details = [
    { label: 'Format', value: product.fabric },
    { label: 'What to bring', value: product.care },
    { label: 'Best for', value: product.colour },
  ].filter((item) => item.value);

  return (
    <>
      <Seo
        title={`${product.name} — Rebuild Sports & Fitness Center`}
        description={product.seoDescription || product.description.slice(0, 155)}
        canonicalPath={`/program/${product.slug}`}
        image={product.images[0]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: product.name,
          description: product.description,
          provider: { '@type': 'ExerciseGym', name: settings.businessName },
          areaServed: 'Lal Baug, Parel, Mumbai',
        }}
      />

      <div className="shell py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide2 text-dust" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-forge-300">Home</Link>
          <span>/</span>
          <Link to="/programs" className="hover:text-forge-300">Programs</Link>
          {product.category ? (
            <>
              <span>/</span>
              <Link to={`/discipline/${product.category.slug}`} className="hover:text-forge-300">
                {product.category.name}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden border border-white/10 bg-smoke">
              <div className="aspect-[4/3] w-full">
                {product.images[activeImage] ? (
                  <img
                    src={product.images[activeImage]}
                    alt={`${product.name} — image ${activeImage + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-display text-4xl text-forge-400">
                    {product.name.slice(0, 2)}
                  </div>
                )}
              </div>
              <span className="absolute left-0 top-0 bg-forge-400 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-wide2 text-coal">
                {product.category?.name ?? 'Program'}
              </span>
            </div>

            {product.images.length > 1 ? (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-current={activeImage === index}
                    className={`aspect-[4/3] overflow-hidden border transition-colors ${
                      activeImage === index ? 'border-forge-400' : 'border-white/10 hover:border-white/35'
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-3">
              {details.map((item) => (
                <div key={item.label} className="bg-steel p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-micro text-dust">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tightest text-chalk sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ash">{product.description}</p>

            <div className="mt-7 flex items-baseline gap-3 border-y border-white/10 py-4">
              <span className="font-display text-3xl font-bold uppercase tracking-tight text-forge-400">
                {formatPrice(price)}
              </span>
              <span className="text-[10px] uppercase tracking-wide2 text-dust">
                Confirmed on WhatsApp
              </span>
            </div>

            {product.variants.length ? (
              <div className="mt-6">
                <p className="field-label">Choose your option</p>
                <div className="grid gap-2">
                  {product.variants.map((option) => {
                    const active = variant?.name === option.name;
                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setVariant(option)}
                        aria-pressed={active}
                        className={`flex items-center justify-between border px-4 py-3 text-left transition-colors ${
                          active
                            ? 'border-forge-400 bg-forge-400/[0.08]'
                            : 'border-white/15 hover:border-white/35'
                        }`}
                      >
                        <span className="font-display text-sm font-semibold uppercase tracking-wide2 text-chalk">
                          {option.name}
                        </span>
                        <span className="text-[11px] uppercase tracking-wide2 text-ash">
                          {formatPrice(option.price ?? product.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-white/15">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="h-10 w-10 text-ash transition-colors hover:text-forge-300"
                  aria-label="Reduce quantity"
                >
                  −
                </button>
                <span className="w-8 text-center font-display text-sm text-chalk">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                  className="h-10 w-10 text-ash transition-colors hover:text-forge-300"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-wide2 text-dust">Sessions / spots</p>
            </div>

            <button
              type="button"
              onClick={() => {
                addItem(product, variant?.name ?? null);
                toast(`${product.name} added to your plan`);
              }}
              className="btn-solid mt-5 w-full"
            >
              Add to your plan
            </button>

            {enquiry ? (
              <a
                href={enquiry.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent({ type: 'order_whatsapp_click' })}
                className="btn-line mt-2 w-full"
              >
                {enquiry.channel === 'whatsapp' ? 'Ask about this on WhatsApp' : 'Ask about this on Instagram'}
              </a>
            ) : null}

            <p className="mt-4 text-[11px] leading-relaxed text-dust">
              Nothing is charged online. Send the enquiry and we will confirm the slot, the coach and
              the final price before you come in.
            </p>

            <div className="mt-8 border border-white/10 bg-steel p-5">
              <p className="font-display text-sm font-semibold uppercase tracking-wide2 text-chalk">
                Not sure this is the right start?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ash">
                Message us with your goal and training history. We will tell you honestly whether this
                program, a personal-training block or a few coached sessions is the better fit.
              </p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide2 text-forge-300 hover:text-forge-200">
                Talk to the floor
                <span className="h-px w-6 bg-forge-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {related.data?.length ? (
        <section className="border-t border-white/10 bg-iron py-14 sm:py-20">
          <div className="shell">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Keep going</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tightest text-chalk sm:text-4xl">
                  Pairs well with
                </h2>
              </div>
              <Link
                to="/programs"
                className="hidden text-[10px] font-semibold uppercase tracking-wide2 text-forge-300 hover:text-forge-200 sm:block"
              >
                All programs
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {related.data.slice(0, 4).map((item, index) => (
                <ServiceCard key={item._id} product={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
