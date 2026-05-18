import { Squiggle, Kicker, SectionTitle } from './ui'

const stats = [
  { value: '120+', label: 'original pieces' },
  { value: '3', label: 'Categories' },
  { value: '11', label: 'community collaborations' },
  { value: '1', label: 'very full studio' },
]

export default function About() {
  return (
    <section
      data-animate-section
      id="about"
      className="relative z-10 py-[110px] px-[clamp(16px,4vw,48px)] max-w-[1200px] mx-auto"
    >
      {/* Kicker row */}
      <div data-animate-reveal className="flex items-center gap-3 mb-4 text-[var(--ink-soft)]">
        <Squiggle width={80} />
        <Kicker>a little story</Kicker>
      </div>

      <SectionTitle data-animate-reveal>
        where heritage <em className="italic text-[var(--accent)]">meets</em> home.
      </SectionTitle>

      {/* Two-column body */}
      <div data-animate-reveal className="about-body">
        <p>
          Tim&rsquo;s work is deeply inspired by his Indigenous Australian heritage, it&rsquo;s
          shaped by a strong connection to Country, reflection and storytelling. Guided by a
          respect for <em>authenticity &nbsp;</em> each artwork is created to bring meaning, warmth and a sense
          of connection into contemporary spaces.
        </p>
        <p>
          Through layered landscapes, flowing waterways and symbolic detail, Tim&rsquo;s pieces
          evoke emotion, memories and showcase the relationship between people and land.
        </p>
        <p>
          Each artwork reflects a thoughtful and <em>intentional &nbsp;</em> process &mdash; celebrating
          heritage, nature and spirit while offering collectors a meaningful connection to
          contemporary Indigenous art.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-6 mt-16 pt-16 border-t border-[var(--line)] grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        {stats.map(({ value, label }) => (
          <div key={label} data-animate-stat className="flex flex-col gap-1">
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
