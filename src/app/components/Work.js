import Image from 'next/image'
import { Squiggle, Kicker, SectionTitle } from './ui'
import Link from 'next/link'
import { data } from '../data'

export default function Work() {
  const displayItems = data.slice(0, 6);

  return (
    <section
      id="work"
      className="relative z-10 py-[110px] px-[clamp(16px,4vw,48px)] max-w-[1320px] mx-auto"
    >
      {/* Section head */}
      <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
        <div>
          <Kicker>
            <Squiggle width={28} /> selected pieces
          </Kicker>
          <SectionTitle className="!m-0">the work.</SectionTitle>
        </div>
        <Link
          href="/collections"
          className="ghost-link text-[var(--ink)]"
        >
          View all collections ↗
        </Link>
      </div>

      {/* Asymmetric grid */}
      <div className="work-grid">
        {displayItems.map((item, i) => {
          // Add some asymmetry mimicking the original
          const colSpan = (i === 3) ? 'span 8' : 'span 4';
          const rowSpan = (i === 0) ? 'span 2' : 'auto';
          
          return (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="work-tile block relative"
              style={{ gridColumn: colSpan, gridRow: rowSpan }}
            >
              <Image
                src={item.images[0]}
                alt={item.name}
                width={600}
                height={600}
                className="w-full object-cover rounded-sm block"
                style={{ height: 'auto' }}
                sizes="(max-width: 640px) 50vw, (max-width: 980px) 33vw, 25vw"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="flex justify-between items-center mt-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                <span>{item.name}</span>
                <span className="tile-arrow transition-transform">↗</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .work-tile:hover { transform: translateY(-4px); }
        .work-tile:hover .tile-arrow { transform: translate(2px, -2px); }
      `}</style>
    </section>
  )
}
