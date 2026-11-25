import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { HeroSlider } from '@/components/HeroSlider';
import { ServiceCard } from '@/components/ServiceCard';
import { SectionIntro } from '@/components/SectionIntro';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';
import { Stars } from '@/components/Stars';
import { assetUrl, FLOOR_IMAGE, ADDRESS_LINES, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/brand';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';

const TICKER = [
  'Strength',
  'Conditioning',
  'Personal training',
  'Group WOD',
  'Sprint turf',
  'RowErg · SkiErg',
  'Steam & recovery',
  'Sports massage',
];

const FLOOR_KIT = [
  { title: 'Rig, rings & bars', note: 'Pull-ups, muscle-ups, squats, presses' },
  { title: 'Numbered sprint turf', note: 'Sled pushes, carries, intervals' },
  { title: 'Concept2 rowers & SkiErg', note: 'Engine work that transfers' },
  { title: 'Air bikes & battle ropes', note: 'Conditioning without the queue' },
  { title: 'Dumbbell wall', note: 'Light pairs through the heavy rack' },
  { title: 'Steam & massage room', note: 'Recovery on the same floor' },
];

const PRINCIPLES = [
  {
    title: 'Form before load',
    text: 'Every new lift starts with the position, not the plate count. A coach watches your setup before your first working set and corrects it while it is still cheap to correct.',
  },
  {
    title: 'Programmed, not random',
    text: 'You get a written block: what to do this week, what it is building towards, and when it changes. No walking in and guessing what looks free.',
  },
  {
    title: 'Recovery is part of it',
    text: 'Steam and deep-tissue work are in the same room for a reason. A hard week only pays off if the body is ready for the next one.',
  },
];

const FIRST_VISIT = [
  { step: 'Message us', note: 'Tell us your goal, your training history and when you can come in.' },
  { step: 'Floor induction', note: 'A short walkthrough of the equipment and how sessions run.' },
  { step: 'Your block', note: 'A starting programme written for you, reviewed as the weeks go.' },
];

export function HomePage() {
  const { settings } = useSettings();
  const programs = useApi(() => publicApi.listProducts({ sort: 'featured' }).then((r) => r.products), []);
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  const allPrograms = programs.data ?? [];
  const featured = allPrograms.filter((item) => item.featured).slice(0, 4);
  const shown = featured.length ? featured : allPrograms.slice(0, 4);

  const enquiryLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a first session',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: settings.businessName,
    description:
      settings.about.intro ||
      'Strength and conditioning floor in Lal Baug, Parel, Mumbai — rigs, sprint turf, rowing and recovery.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, NityaSukhadham Society, Tawaripada, Bharat Rice Mills Compound',
      addressLocality: 'Lal Baug, Parel, Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400012',
      addressCountry: 'IN',
    },
    telephone: PHONE_TEL,
    openingHours: ['Mo-Sa 06:00-12:00', 'Mo-Sa 16:00-22:00'],
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <>
      <Seo
        title="Rebuild Sports & Fitness Center — Strength & Conditioning in Lal Baug, Parel"
        description="A coach-led strength and conditioning floor in Lal Baug, Parel, Mumbai. Rigs, sprint turf, rowers, air bikes, personal training, group WODs, steam and sports massage. Mon–Sat, 6 AM–12 PM and 4–10 PM."
        canonicalPath="/"
        image="/og-image.jpg"
        jsonLd={jsonLd}
      />

      <HeroSlider />

      {/* ── Ticker ────────────────────────────────────────────── */}
      <section className="overflow-hidden border-y border-coal/20 bg-forge-400 py-2.5" aria-hidden="true">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {TICKER.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-sm font-bold uppercase tracking-wide2 text-coal"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rotate-45 bg-coal/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Facts ─────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-iron">
        <div className="shell grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
          {[
            ['4.8 / 5', 'Google rating', 'Public listing'],
            ['6 days', 'On the floor', 'Mon–Sat'],
            ['2 shifts', 'Daily', '6 AM & 4 PM'],
            ['Parel', 'Mumbai 400012', 'Lal Baug'],
          ].map(([value, label, note]) => (
            <div key={label} className="bg-iron px-4 py-6 sm:px-6 sm:py-7">
              <p className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-chalk sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-micro text-forge-300">
                {label}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wide2 text-dust">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Programs ──────────────────────────────────────────── */}
      <section className="shell py-16 sm:py-24">
        <SectionIntro
          eyebrow="What you can book"
          title="Pick your discipline"
          description="Strength, conditioning, personal training and recovery — all on one floor, all coach-led. Prices are quoted at the desk or on WhatsApp, never invented here."
          linkTo="/programs"
          linkLabel="All programs"
        />

        {programs.loading ? (
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[4/5]" />
            ))}
          </div>
        ) : programs.error ? (
          <div className="mt-12">
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
        ) : !shown.length ? (
          <div className="mt-12">
            <EmptyState
              title="The programme board is being set up"
              description="Programs appear here as soon as they are published. Message us in the meantime and we will tell you where to start."
            />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {shown.map((product, index) => (
              <ServiceCard key={product._id} product={product} priority={index < 2} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* ── The floor ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/10 bg-iron py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 floor-grid opacity-60" />
        <div className="shell relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15 cut-tr">
                <img
                  src={settings.about.founderImageUrl || assetUrl(FLOOR_IMAGE)}
                  alt="The training floor at Rebuild — rig, rings and dumbbell wall"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-0 flex items-center gap-4 border border-forge-400 bg-coal px-5 py-4 sm:-left-6">
                <span className="font-display text-4xl font-extrabold leading-none text-forge-400">06</span>
                <span className="text-[10px] font-semibold uppercase leading-relaxed tracking-wide2 text-ash">
                  Zones on
                  <br />
                  one floor
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow">The floor</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tightest text-chalk sm:text-5xl">
              Not a showroom.
              <br />
              <span className="text-forge-400">A working floor.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ash">
              {settings.about.intro}
            </p>

            <ul className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2">
              {FLOOR_KIT.map((item, index) => (
                <li key={item.title} className="bg-iron p-4">
                  <span className="font-mono text-[10px] text-forge-400">0{index + 1}</span>
                  <p className="mt-1 font-display text-sm font-semibold uppercase tracking-wide2 text-chalk">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-dust">{item.note}</p>
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-wide2 text-forge-300"
            >
              Look around the studio
              <span className="h-px w-8 bg-forge-400 transition-all duration-300 hover:w-12" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Disciplines ───────────────────────────────────────── */}
      <section className="shell py-16 sm:py-24">
        <SectionIntro
          eyebrow="Five ways to train"
          title="Walk in with a plan"
          linkTo="/programs"
          linkLabel="Browse everything"
        />

        {categories.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton aspect-[3/4]" />
            ))}
          </div>
        ) : !categories.data?.length ? (
          <div className="mt-10">
            <EmptyState
              title="Disciplines are on their way"
              description="They appear here once the programme is published in the admin panel."
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {categories.data.slice(0, 5).map((category, index) => (
              <Link
                key={category._id}
                to={`/discipline/${category.slug}`}
                className={`group relative block overflow-hidden border border-white/10 ${
                  index === 0 ? 'col-span-2 aspect-[16/10] lg:col-span-1 lg:aspect-[3/4]' : 'aspect-[3/4]'
                }`}
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-[900ms] ease-silk group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent" />
                <div className="absolute inset-0 border-2 border-forge-400/0 transition-colors duration-300 group-hover:border-forge-400/60" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-mono text-[10px] text-forge-400">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-none tracking-tight text-chalk">
                    {category.name}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wide2 text-chalk/60">
                    View
                    <span className="h-px w-5 bg-forge-400 transition-all duration-300 group-hover:w-9" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Principles ────────────────────────────────────────── */}
      <section className="relative border-y border-white/10 bg-iron py-16 sm:py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1 mark-tape opacity-60" aria-hidden="true" />
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">How we coach</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tightest text-chalk sm:text-5xl">
              You don't need a mirror.
              <br />
              You need someone watching your setup.
            </h2>
          </div>

          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <div key={principle.title} className="bg-iron p-6 sm:p-8">
                <p className="font-display text-5xl font-extrabold leading-none text-smoke-light">
                  0{index + 1}
                </p>
                <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-none tracking-tight text-chalk">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── First visit ───────────────────────────────────────── */}
      <section className="shell py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">First visit</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tightest text-chalk">
              Three steps,
              <br />
              <span className="text-forge-400">no guesswork</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">
              You do not need to be fit to start here. Tell us where you are and we will tell you
              honestly where to begin.
            </p>
            <Link to="/contact" className="btn-solid mt-7">
              Book a first session
            </Link>
          </div>

          <ol className="grid gap-px bg-white/10 lg:col-span-8 sm:grid-cols-3">
            {FIRST_VISIT.map((item, index) => (
              <li key={item.step} className="flex flex-col bg-steel p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-forge-400">0{index + 1}</span>
                  <span className="h-px flex-1 bg-white/10 ml-4" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase leading-none tracking-tight text-chalk">
                  {item.step}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{item.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────── */}
      {gallery.data?.length ? (
        <section className="border-t border-white/10 bg-iron py-16 sm:py-24">
          <div className="shell">
            <SectionIntro
              eyebrow={`@${settings.instagramHandle}`}
              title="Inside the studio"
              description="Photographs of the actual floor — the rig, the turf, the machines and the recovery room."
              linkTo="/gallery"
              linkLabel="Open the gallery"
            />
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {gallery.data.slice(0, 6).map((item, index) => (
                <a
                  key={item._id}
                  href={item.externalUrl || settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden border border-white/10 bg-smoke ${
                    index === 0 ? 'col-span-2 aspect-[4/3] sm:col-span-1 sm:aspect-[4/5]' : 'aspect-[4/5]'
                  }`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.caption || 'Rebuild Sports & Fitness Center'}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-silk group-hover:scale-110"
                    />
                  ) : null}
                  <span className="absolute inset-0 bg-coal/0 transition-colors duration-300 group-hover:bg-coal/30" />
                  <span className="absolute inset-0 border-2 border-forge-400/0 transition-colors duration-300 group-hover:border-forge-400/60" />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Reviews ───────────────────────────────────────────── */}
      {reviews.data?.length ? (
        <section className="shell py-16 sm:py-24">
          <SectionIntro eyebrow="After the session" title="What members say" linkTo="/reviews" linkLabel="All reviews" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.data.slice(0, 3).map((review) => (
              <figure key={review._id} className="flex flex-col border border-white/10 bg-steel p-6">
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 font-display text-xl uppercase leading-tight tracking-tight text-chalk">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-5 text-[9px] font-semibold uppercase tracking-wide2 text-dust">
                  {review.customerName}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Visit / CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-coal">
        <div className="pointer-events-none absolute inset-0 floor-grid opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-forge-400/10 blur-[130px]" />

        <div className="shell relative grid gap-12 py-16 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-4 font-display text-[2.9rem] font-extrabold uppercase leading-[0.85] tracking-tightest text-chalk sm:text-6xl lg:text-7xl">
              Your first
              <br />
              session starts
              <br />
              <span className="text-forge-400">with a message.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-ash">
              Tell us what you want to change and when you can train. We will suggest the right
              program, the right coach and a slot that fits your day — no contracts pushed at the
              door.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {enquiryLink ? (
                <a
                  href={enquiryLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid"
                >
                  {enquiryLink.channel === 'whatsapp' ? 'Message us on WhatsApp' : 'Message us on Instagram'}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
                  </svg>
                </a>
              ) : null}
              <a href={`tel:${PHONE_TEL}`} className="btn-line">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-white/15 bg-steel">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <p className="font-display text-sm font-semibold uppercase tracking-wide2 text-chalk">
                  Find the floor
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold uppercase tracking-wide2 text-forge-300 hover:text-forge-200"
                >
                  Maps
                </a>
              </div>
              <div className="space-y-4 px-5 py-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-micro text-dust">Address</p>
                  <address className="mt-1.5 space-y-0.5 text-sm not-italic leading-relaxed text-ash">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[9px] font-semibold uppercase tracking-micro text-dust">Hours</p>
                  <dl className="mt-2 space-y-1.5">
                    {HOURS.map((slot, index) => (
                      <div key={`${slot.day}-${index}`} className="flex items-baseline justify-between gap-3">
                        <dt className="text-[11px] uppercase tracking-wide2 text-ash">{slot.day}</dt>
                        <dd
                          className={`font-display text-sm uppercase tracking-wide2 ${
                            slot.time === 'Closed' ? 'text-dust' : 'text-chalk'
                          }`}
                        >
                          {slot.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="font-display text-2xl font-bold uppercase tracking-tight text-forge-400 hover:text-forge-300"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <p className="mt-1 text-[10px] uppercase tracking-wide2 text-dust">
                    Call or message before you come in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
