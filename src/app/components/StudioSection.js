import { Squiggle, Kicker, SectionTitle } from './ui'

const studioImgs = [
  {
    src: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80',
    alt: 'Tools of the trade',
    label: 'studio / 01',
    cls: 'studio-tile-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    alt: 'Work in progress',
    label: 'studio / 02',
    cls: 'studio-tile-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80',
    alt: 'Drying rack',
    label: 'studio / 03',
    cls: 'studio-tile-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=600&q=80',
    alt: 'The chai station',
    label: 'studio / 04',
    cls: 'studio-tile-4',
  },
]

export default function StudioSection() {
  return (
    <section
      id="studio"
      className="relative z-10 py-[110px] px-[clamp(16px,4vw,48px)] max-w-[1320px] mx-auto"
    >
      <div className="studio-grid">
        {/* ---- Left: text ---- */}
        <div>
          <Kicker>
            <Squiggle width={28} /> in the studio
          </Kicker>
          <SectionTitle>paint, tea, repeat.</SectionTitle>

          <p className="text-[17px] leading-[1.7] text-[var(--ink)] max-w-[460px] m-0 mb-[18px]">
            Most weeks the studio smells like turps and chai. Tim works in long
            slow sessions — sketching, layering, leaving things to dry, then coming
            back the next morning to argue with them.
          </p>
          <p className="text-[17px] leading-[1.7] text-[var(--ink)] max-w-[460px] m-0 mb-[28px]">
            Commissions open a few times a year. If something on the site sparks
            an idea for your space, the studio is happy to chat.
          </p>

          <a
            href="mailto:hello@timyule.example"
            className="ghost-link text-[var(--ink)]"
          >
            Start a commission →
          </a>
        </div>

        {/* ---- Right: 2×2 tilted photo grid ---- */}
        <div className="studio-tiles">
          {studioImgs.map(({ src, alt, label, cls }) => (
            <div key={label} className={`relative rounded-sm overflow-hidden ${cls}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover block aspect-square"
              />
              {/* overlay label */}
              <span className="absolute bottom-2 left-2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.75)] bg-[rgba(0,0,0,0.25)] px-1.5 py-0.5 rounded-[3px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
