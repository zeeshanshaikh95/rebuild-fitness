import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { assetUrl, ADDRESS_LINES, FLOOR_IMAGE, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/brand';

const SPECS = [
  ['Rig', 'Rings, bars, bands, boxes'],
  ['Turf', 'Numbered sprint lanes'],
  ['Erg', 'Concept2 rowers & SkiErg'],
  ['Bikes', 'Air bikes, ropes, sleds'],
  ['Weights', 'Dumbbell wall & plates'],
  ['Recovery', 'Steam suite & massage room'],
];

export function AboutPage() {
  const { settings } = useSettings();
  const paragraphs = (settings.about.story || '').split('\n').filter(Boolean);

  return (
    <>
      <Seo
        title="The floor — Rebuild Sports & Fitness Center"
        description="Inside Rebuild Sports & Fitness Center, Lal Baug, Parel: the rig, the sprint turf, rowers and air bikes, and a recovery room on the same floor."
        canonicalPath="/about"
        image="/images/arena-rig.jpg"
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-iron">
        <div className="pointer-events-none absolute inset-0 floor-grid opacity-50" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1.5 mark-tape opacity-70" />
        <div className="shell relative py-14 sm:py-20">
          <p className="eyebrow">The floor</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tightest text-chalk sm:text-7xl">
            One room.
            <br />
            <span className="text-forge-400">Used properly.</span>
          </h1>
          <p className="mt-6 max-w-xl border-l-2 border-forge-400 pl-4 text-sm leading-relaxed text-ash">
            {settings.about.intro ||
              'A strength and conditioning floor on the ground floor of NityaSukhadham Society in Lal Baug, Parel.'}
          </p>
        </div>
      </section>

      <section className="shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/15 cut-tr">
              <img
                src={settings.about.founderImageUrl || assetUrl(FLOOR_IMAGE)}
                alt="Rig, rings and dumbbell rack at Rebuild Sports & Fitness Center"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] overflow-hidden border border-white/10">
                <img src={assetUrl('/images/turf-and-dumbbells.jpg')} alt="Sprint turf and dumbbell rack" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-[4/3] overflow-hidden border border-white/10">
                <img src={assetUrl('/images/conditioning-machines.jpg')} alt="Rowers, SkiErg and air bikes" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="eyebrow">How it runs</p>
            <div className="prose-editorial mt-5">
              {paragraphs.length ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index} className="!text-[15px] first:text-base first:text-chalk/85">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>
                  Training here is coach-led: positions before load, a written programme, and group
                  sessions scaled to whoever turns up. The recovery room is part of the floor.
                </p>
              )}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">
              {SPECS.map(([label, value]) => (
                <div key={label} className="bg-steel px-4 py-4">
                  <dt className="text-[9px] font-semibold uppercase tracking-micro text-forge-300">{label}</dt>
                  <dd className="mt-1 text-[11px] leading-relaxed text-ash">{value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 font-display text-2xl font-bold uppercase tracking-tight text-chalk">
              Training floor led by a coach, not a screen
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ash">
              Sessions are run by the floor team — the people correcting your setup, counting the
              reps and telling you when to add weight. If you are coming back after a break or
              training through an old niggle, say so before the session so the plan is built around
              it, not on top of it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-iron py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Visit</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tightest text-chalk">
              Find the door
            </h2>
            <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-ash">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
            <p className="mt-4 text-[11px] uppercase tracking-wide2 text-dust">
              Closest stations: Currey Road & Chinchpokli
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-solid">
                Open in maps
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn-line">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-white/10 bg-steel">
              <div className="border-b border-white/10 px-5 py-3">
                <p className="font-display text-sm font-semibold uppercase tracking-wide2 text-chalk">
                  Floor hours
                </p>
              </div>
              <dl className="divide-y divide-white/10">
                {HOURS.map((slot, index) => (
                  <div key={`${slot.day}-${index}`} className="flex items-center justify-between gap-4 px-5 py-4">
                    <dt className="text-[11px] uppercase tracking-wide2 text-ash">{slot.day}</dt>
                    <dd className={`font-display text-sm uppercase tracking-wide2 ${slot.time === 'Closed' ? 'text-dust' : 'text-chalk'}`}>
                      {slot.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-white/10 px-5 py-4">
                <p className="text-[11px] leading-relaxed text-dust">
                  Two shifts a day, six days a week. Message us before a first visit so somebody is
                  free to walk you through the floor.
                </p>
              </div>
            </div>

            <Link to="/programs" className="mt-6 inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-wide2 text-forge-300">
              See what you can book
              <span className="h-px w-8 bg-forge-400" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
