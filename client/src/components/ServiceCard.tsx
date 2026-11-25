import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice, truncate } from '@/lib/format';
import type { Product } from '@/types';

/**
 * A program tile: portrait photograph, hard orange frame on hover, a station
 * number in the corner and one-tap "add to your plan". Prices stay null until
 * the studio sets them, so the card says "price on request" rather than ₹0.
 */
export function ServiceCard({
  product,
  priority = false,
  index,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const { addItem } = useCart();
  const outOfStock = product.stockStatus === 'out_of_stock';
  const secondary = product.images[1];

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden border border-white/10 bg-smoke">
        <Link to={`/program/${product.slug}`} aria-label={`View ${product.name}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            {product.images[0] ? (
              <>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading={priority ? 'eager' : 'lazy'}
                  className={`h-full w-full object-cover transition-all duration-[1100ms] ease-silk group-hover:scale-[1.06] ${
                    secondary ? 'group-hover:opacity-0' : ''
                  }`}
                />
                {secondary ? (
                  <img
                    src={secondary}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                ) : null}
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-iron">
                <span className="font-display text-4xl font-bold text-forge-400">
                  {product.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal via-coal/10 to-transparent opacity-80" />
            <div className="pointer-events-none absolute inset-0 border-2 border-forge-400/0 transition-colors duration-300 group-hover:border-forge-400/70" />

            {typeof index === 'number' ? (
              <span className="absolute right-0 top-0 bg-coal/70 px-2.5 py-1.5 font-mono text-[10px] text-ash backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
            ) : null}
          </div>
        </Link>

        <div className="absolute left-0 top-0 flex flex-col gap-1 p-2">
          {product.newArrival ? <span className="badge-dark">New</span> : null}
          {product.bestseller ? <span className="badge-line">Popular</span> : null}
          {outOfStock ? <span className="badge-line">Ask us</span> : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-coal/95 px-3 py-2.5 backdrop-blur-md transition-transform duration-300 ease-editorial group-hover:translate-y-0">
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => addItem(product)}
            className="w-full font-display text-[11px] font-semibold uppercase tracking-wide2 text-forge-300 transition-opacity hover:opacity-70 disabled:opacity-40"
          >
            {outOfStock ? 'Ask about availability' : 'Add to your plan'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-x border-b border-white/10 bg-steel px-4 pb-4 pt-3.5">
        <Link to={`/program/${product.slug}`} className="block">
          <h3 className="font-display text-xl font-semibold uppercase leading-none tracking-tight text-chalk transition-colors group-hover:text-forge-300">
            {truncate(product.name, 46)}
          </h3>
        </Link>
        <div className="mt-auto flex items-baseline justify-between gap-3 pt-3">
          <p className="text-[9px] font-semibold uppercase tracking-wide2 text-dust">
            {product.category?.name ?? 'Training'}
          </p>
          <p className="font-display text-[11px] uppercase tracking-wide2 text-forge-300">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </article>
  );
}
