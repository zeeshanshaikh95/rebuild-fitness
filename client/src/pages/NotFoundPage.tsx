import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found — Rebuild Sports & Fitness Center" description="That page is not on the board." noIndex />
      <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
        <p className="font-display text-[7rem] font-extrabold leading-none tracking-tightest text-smoke-light sm:text-[12rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase leading-none tracking-tightest text-chalk sm:text-5xl">
          That rep doesn't count
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ash">
          The page you were looking for is not on the board. Head back to the floor — the programs and
          the gallery are all still open.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-solid">
            Back to the floor
          </Link>
          <Link to="/programs" className="btn-line">
            All programs
          </Link>
        </div>
      </section>
    </>
  );
}
