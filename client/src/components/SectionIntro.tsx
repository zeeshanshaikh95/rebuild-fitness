import { Link } from 'react-router-dom';

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  linkTo?: string;
  linkLabel?: string;
  align?: 'left' | 'center';
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel = 'View all',
  align = 'left',
}: Props) {
  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'sm:flex-col sm:items-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'text-center' : ''}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tightest text-chalk sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-4 max-w-xl text-sm leading-relaxed text-ash ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>

      {linkTo ? (
        <Link
          to={linkTo}
          className="group inline-flex shrink-0 items-center gap-3 font-display text-[11px] font-semibold uppercase tracking-wide2 text-chalk/70 transition-colors hover:text-forge-300"
        >
          {linkLabel}
          <span className="h-px w-7 bg-forge-400/50 transition-all duration-300 group-hover:w-11 group-hover:bg-forge-400" />
        </Link>
      ) : null}
    </div>
  );
}
