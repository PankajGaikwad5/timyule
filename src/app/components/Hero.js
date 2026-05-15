import { Squiggle, SmallDot } from './ui'

export default function Hero() {
  return (
    <header
      className="relative z-10 pt-[24px] pb-0 px-[clamp(14px,4vw,48px)] md:px-[clamp(100px,4vw,48px)]"
      id="top"
    >
      <div className="hero-grid max-w-[1300px]">
        {/* ---- LEFT ---- */}
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            <Squiggle width={36} />
            <span>The Artist</span>
          </div>

          {/* Display name */}
          {/* <h1 className="font-[family-name:var(--font-display)] font-normal text-[clamp(64px,11vw,168px)] leading-[0.9] tracking-[-0.03em] m-0 mb-7 text-[var(--ink)]">
            Tim
            Yule.
          </h1> */}

          {/* Quote */}
          <p className="italic font-[family-name:var(--font-display)] text-[clamp(18px,1.8vw,24px)] leading-[1.4] max-w-[560px] text-[var(--ink)] m-0 mb-7">
            &ldquo;Expressing my Indigenous heritage through art is a humbling < br />
            and gratifying experience. Every piece is unique  carrying <br/> its own story
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
        <div>
          <div className="relative max-w-[400px] ml-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="./potrait2.png"
              alt="Timothy Yule — artist portrait"
              className="w-full rounded-sm object-cover object-top aspect-[3/4] block"
            />

            {/* Heritage badge — anchored to portrait */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 bg-(--bg)/85 backdrop-blur-[2px] px-3 py-2.5 rounded-sm border border-(--line)">
              <Squiggle width={36} opacity={0.6} />
              <small className="font-mono text-[9px] uppercase tracking-[0.22em] text-(--ink-soft) leading-[1.6]">
                indigenous australian
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Category Strip ---- */}
      <div
        className="relative z-10 mt-7 border-y border-(--line) font-(family-name:--font-display) text-[clamp(16px,2.4vw,30px)] py-3.5 text-(--ink) italic"
        aria-hidden="true"
      >
        <div className="flex items-center justify-center flex-wrap gap-y-1">
          {['handmade artefacts', 'home decor', 'original art', 'wearables', 'commissions'].map((item, i, arr) => (
            <span key={item} className="flex items-center">
              {item}
              {i < arr.length - 1 && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '1px',
                    height: '1.1em',
                    margin: '0 clamp(12px, 2vw, 28px)',
                    background: 'linear-gradient(to bottom, transparent, var(--ink-soft) 25%, var(--ink-soft) 75%, transparent)',
                    opacity: 0.35,
                    verticalAlign: 'middle',
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
