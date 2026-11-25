import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';
import { INSTAGRAM_URL, ADDRESS_LINES, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/brand';

const WHAT_TO_EXPECT = [
  'Tell us your goal, your training history and any injury we should train around.',
  'We suggest a program, a coach and the shift that fits your day.',
  'We confirm the slot and the price on WhatsApp — nothing is charged online.',
  'Arrive ten minutes early on the first day for a short floor induction.',
];

export function ContactPage() {
  const { settings } = useSettings();

  const link = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a first session',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  return (
    <>
      <Seo
        title="Visit us — Rebuild Sports & Fitness Center, Lal Baug"
        description="Address, hours and contact for Rebuild Sports & Fitness Center, ground floor, NityaSukhadham Society, Tawaripada, Bharat Rice Mills Compound, Lal Baug, Parel, Mumbai 400012."
        canonicalPath="/contact"
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-iron">
        <div className="pointer-events-none absolute inset-0 floor-grid opacity-50" />
        <div className="shell relative py-14 sm:py-20">
          <p className="eyebrow">Visit us</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tightest text-chalk sm:text-7xl">
            Come see
            <br />
            <span className="text-forge-400">the floor</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
            Walk in during a shift, or message first so somebody is free to show you around. The
            ground floor entrance is inside the Bharat Rice Mills compound at Tawaripada.
          </p>
        </div>
      </section>

      <section className="shell py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              <div className="bg-steel p-6">
                <p className="text-[9px] font-semibold uppercase tracking-micro text-forge-300">Address</p>
                <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-ash">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide2 text-forge-300 hover:text-forge-200"
                >
                  Open in maps
                  <span className="h-px w-6 bg-forge-400" />
                </a>
              </div>

              <div className="bg-steel p-6">
                <p className="text-[9px] font-semibold uppercase tracking-micro text-forge-300">Talk to us</p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="mt-3 block font-display text-2xl font-bold uppercase tracking-tight text-chalk hover:text-forge-300"
                >
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-sm text-ash hover:text-forge-300"
                >
                  @{settings.instagramHandle}
                </a>
                <p className="mt-4 text-[11px] leading-relaxed text-dust">
                  WhatsApp is fastest — send the program you are interested in and the shift you can
                  train.
                </p>
              </div>

              <div className="bg-steel p-6 sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[9px] font-semibold uppercase tracking-micro text-forge-300">Hours</p>
                  <span className="font-mono text-[10px] text-dust">Mon – Sat</span>
                </div>
                <dl className="mt-3 grid gap-2 sm:grid-cols-3">
                  {HOURS.map((slot, index) => (
                    <div key={`${slot.day}-${index}`} className="border border-white/10 px-4 py-3">
                      <dt className="text-[9px] uppercase tracking-wide2 text-dust">{slot.day}</dt>
                      <dd className={`mt-1 font-display text-sm uppercase tracking-wide2 ${slot.time === 'Closed' ? 'text-dust' : 'text-chalk'}`}>
                        {slot.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-6 border border-white/10 bg-coal p-6">
              <p className="font-display text-lg font-bold uppercase tracking-tight text-chalk">
                What happens after you message
              </p>
              <ol className="mt-4 space-y-3">
                {WHAT_TO_EXPECT.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ash">
                    <span className="font-mono text-[11px] text-forge-400">0{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-forge-400/40 bg-steel p-6 sm:p-7">
              <p className="eyebrow">Book a session</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.9] tracking-tightest text-chalk">
                One message is
                <br />
                all it takes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ash">
                Send us the program you want and when you can train. We will reply with the slot, the
                coach and the price — before you commit to anything.
              </p>

              {link ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid mt-6 w-full"
                >
                  {link.channel === 'whatsapp' ? 'Message on WhatsApp' : 'Message on Instagram'}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
                  </svg>
                </a>
              ) : null}
              <a href={`tel:${PHONE_TEL}`} className="btn-line mt-2 w-full">
                Call {PHONE_DISPLAY}
              </a>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[9px] font-semibold uppercase tracking-micro text-dust">Parking</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-ash">
                  On-premise compound parking for members. If you are coming by train, Currey Road and
                  Chinchpokli are the closest stations.
                </p>
              </div>
            </div>

            {settings.policies.shipping || settings.policies.returns ? (
              <div className="mt-6 space-y-4 border border-white/10 bg-iron p-6">
                {settings.policies.shipping ? (
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-micro text-dust">
                      Memberships & pricing
                    </p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-ash">{settings.policies.shipping}</p>
                  </div>
                ) : null}
                {settings.policies.returns ? (
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[9px] font-semibold uppercase tracking-micro text-dust">
                      Moving a session
                    </p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-ash">{settings.policies.returns}</p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
