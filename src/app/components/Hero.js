import { Squiggle, SmallDot } from './ui'

export default function Hero() {
  return (
    <header
      className="relative z-10 pt-[2px] pb-0 px-[clamp(14px,4vw,48px)] md:px-[clamp(100px,4vw,48px)]"
      id="top"
    >
      <div className="hero-grid">
        {/* ---- LEFT ---- */}
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            <Squiggle width={36} />
            <span>The Artist</span>
          </div>

          {/* Display name */}
          <h1 className="font-[family-name:var(--font-display)] font-normal text-[clamp(64px,11vw,168px)] leading-[0.9] tracking-[-0.03em] m-0 mb-7 text-[var(--ink)]">
            Tim
            Yule.
          </h1>

          {/* Quote */}
          <p className="italic font-[family-name:var(--font-display)] text-[clamp(18px,1.8vw,24px)] leading-[1.4] max-w-[520px] text-[var(--ink)] m-0 mb-7">
            &ldquo;Expressing my Indigenous heritage through art is a humbling and
            gratifying experience. Every piece is unique  carrying its own story
            through colour, rhythm and design.&rdquo;
          </p>

          {/* Signature */}
          <div className="mb-8 text-[var(--ink)]" aria-label="Timothy Yule signature">
            {/* <svg viewBox="0 0 220 60" width="180" height="50">
              <path
                d="M10 40 C 20 20, 30 18, 36 38 C 40 50, 50 50, 55 30 C 60 18, 75 18, 78 36
                   M 92 42 C 90 22, 100 14, 108 28 C 112 36, 110 46, 100 44
                   M 120 22 L 120 45 M 132 30 C 132 22, 144 22, 144 32 L 144 44
                   M 158 22 L 158 44 M 158 44 L 174 22 L 174 44
                   M 190 30 C 188 22, 204 22, 204 32 C 204 42, 188 42, 188 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            <img src="/timsign.png" alt="" />
          </div>

          {/* Location meta */}
          <div className="flex items-center flex-wrap font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            <span>Sydney</span>
            <SmallDot />
            <span>Est. since forever-ish</span>
          </div>
        </div>

        {/* ---- RIGHT: Portrait ---- */}
        <div className="relative">
          <div className="max-w-[400px] ml-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="./potrait2.png"
              alt="Timothy Yule — artist portrait"
              className="w-full rounded-sm object-cover object-top aspect-[3/4] block"
            />
          </div>

          {/* Heritage badge */}
          <div className="flex flex-col gap-1.5 mt-4 text-[var(--ink-soft)]">
            <Squiggle width={50} opacity={0.7} />
            <small className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] max-w-[200px] leading-[1.6]">
              indigenous australian 
            </small>
          </div>
        </div>
      </div>

      {/* ---- Marquee Strip ---- */}
      <div
        className="relative z-10 overflow-hidden italic mt-7 border-y border-[var(--line)] font-[family-name:var(--font-display)] text-[clamp(22px,4vw,36px)] py-3.5 text-[var(--ink)]"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span key={i} className="pr-6">
              handmade artefacts &nbsp;✺&nbsp; home decor &nbsp;✺&nbsp; original art &nbsp;✺&nbsp;
              wearables &nbsp;✺&nbsp; commissions &nbsp;✺&nbsp; handmade artefacts &nbsp;✺&nbsp;
              home decor &nbsp;✺&nbsp; original art &nbsp;✺&nbsp;
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
