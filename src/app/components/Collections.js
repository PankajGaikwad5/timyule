import { Squiggle, Kicker, SectionTitle } from './ui'

const collections = [
  {
    name: 'Home',
    count: 18,
    blurb: 'Tableware, vessels, and the small things that make a kitchen feel inherited.',
    tag: 'everyday objects',
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=700&q=80',
  },
  {
    name: 'Wall',
    count: 24,
    blurb: 'Originals on canvas and linen. Some big, some small, none precious about it.',
    tag: 'originals & prints',
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=700&q=80',
  },
  {
    name: 'Wear',
    count: 12,
    blurb: 'Hand-painted scarves, tees and tote bags. The art that comes with you.',
    tag: 'wearable art',
    img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&q=80',
  },
]

export default function Collections({ shopUrl }) {
  return (
    <section
      id="collections"
      className="relative z-10 py-[110px] px-[clamp(16px,4vw,48px)] max-w-[1320px] mx-auto"
    >
      {/* Head */}
      <div className="mb-12">
        <Kicker>
          <Squiggle width={28} /> shop by mood
        </Kicker>
        <SectionTitle>three little worlds.</SectionTitle>
      </div>

      {/* 3-column grid */}
      <div className="collections-grid">
        {collections.map((c) => (
          <a
            key={c.name}
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="collection-card flex flex-col gap-5 rounded-md transition-transform p-[14px] bg-[color-mix(in_oklch,var(--bg-2)_60%,transparent)] border border-[var(--line)] no-underline"
          >
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.img}
              alt={c.name}
              className="w-full object-cover rounded-sm block aspect-[4/5]"
            />

            {/* Info row */}
            <div className="flex gap-4 justify-between items-start">
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-normal text-[clamp(28px,3.5vw,40px)] leading-none tracking-[-0.02em] m-0 mb-2 text-[var(--ink)]">
                  {c.name}.
                </h3>
                <p className="m-0 text-[14px] leading-[1.5] text-[var(--ink-soft)] max-w-[280px]">
                  {c.blurb}
                </p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="italic font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,40px)] leading-none text-[var(--accent)]">
                  {c.count}
                </span>
                <small className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)] mt-1.5">
                  pieces
                </small>
              </div>
            </div>

            {/* Browse link */}
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] pt-3 border-t border-[var(--line)] text-[var(--ink-soft)]">
              Browse {c.name.toLowerCase()} ↗
            </span>
          </a>
        ))}
      </div>

      <style>{`
        .collection-card:hover {
          transform: translateY(-4px);
          background: var(--bg-2) !important;
        }
      `}</style>
    </section>
  )
}
