import { Link } from 'react-router-dom';
import { assetUrl, LOGO_TRIM } from '@/lib/brand';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
  tone?: 'chalk' | 'plate';
  asLink?: boolean;
  className?: string;
}

const HEIGHTS: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-7 sm:h-8',
  md: 'h-9 sm:h-11',
  lg: 'h-16 sm:h-24',
};

/**
 * The studio's own lockup — the supplied REBUILD mark between its dumbbells,
 * with SPORTS AND FITNESS CENTER underneath. It is the real artwork, never
 * redrawn or stretched: on dark surfaces a chalk-cut version is used so the
 * black half of the logo still reads, and on light surfaces the original.
 */
export function Wordmark({
  size = 'md',
  withTagline = false,
  tone = 'chalk',
  asLink = true,
  className = '',
}: Props) {
  const src =
    tone === 'chalk'
      ? assetUrl('/images/rebuild-logo-chalk.png')
      : assetUrl(LOGO_TRIM);

  const content = (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      {tone === 'plate' ? (
        <span className="bg-chalk px-3 py-2">
          <img
            src={src}
            alt="Rebuild Sports & Fitness Center"
            className={`w-auto object-contain ${HEIGHTS[size]}`}
          />
        </span>
      ) : (
        <img
          src={src}
          alt="Rebuild Sports & Fitness Center"
          className={`w-auto object-contain ${HEIGHTS[size]}`}
        />
      )}
      {withTagline ? (
        <span className="mt-2 text-[8px] font-medium uppercase tracking-micro text-ash">
          Strength · Conditioning · Recovery
        </span>
      ) : null}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="Rebuild Sports & Fitness Center — home" className="shrink-0">
      {content}
    </Link>
  );
}
