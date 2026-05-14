import { Squiggle, Kicker, SectionTitle } from './ui'

const stats = [
  { value: '120+', label: 'original pieces' },
  { value: '4', label: 'collections a year' },
  { value: '11', label: 'community partners' },
  { value: '1', label: 'very full studio' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 py-[110px] px-[clamp(16px,4vw,48px)] max-w-[1200px] mx-auto"
    >
      {/* Kicker row */}
      <div className="flex items-center gap-3 mb-4 text-[var(--ink-soft)]">
        <Squiggle width={80} />
        <Kicker>a little story</Kicker>
      </div>

      <SectionTitle>
        where heritage <em className="italic text-[var(--accent)]">meets</em> home.
      </SectionTitle>

      {/* Two-column body */}
      <div className="about-body">
        <p>
          Tim&rsquo;s work is shaped by a rich tapestry of Indigenous Australian  driven by a deep reverence for tradition and craftsmanship, with a
          soft spot for the kind of objects that make a room feel{' '}
          <em>actually</em> lived in.
        </p>
        <p>
          Each piece is a curated blend of handmade artefacts — selected to tell a story,
          evoke emotion, and bring a sense of history and warmth to your space. Bit of colour.
          Bit of rhythm. A whole lot of intent.
        </p>
        <p>
          Every purchase supports organisations working with Indigenous Australian
          communities. So your shelf gets cooler and the world gets slightly better.
          Hard to argue with.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-6 mt-16 pt-16 border-t border-[var(--line)] grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-1">
            <strong className="font-[family-name:var(--font-display)] font-normal text-[clamp(40px,5vw,56px)] leading-none tracking-[-0.02em] text-[var(--ink)]">
              {value}
            </strong>
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
