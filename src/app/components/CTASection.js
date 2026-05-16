import { Squiggle } from './ui'

export default function CTASection({ shopUrl }) {
  return (
    <div className="bg-[var(--ink)] text-[var(--bg)] rounded-2xl md:rounded-3xl py-12 md:py-[80px] px-[clamp(16px,4vw,48px)] max-w-[1272px] mx-4 md:mx-auto my-4 md:my-10 text-center relative z-10 overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(600px_300px_at_50%_0%,color-mix(in_oklch,var(--accent)_25%,transparent),transparent_70%)] before:pointer-events-none">
      <div className="relative max-w-[480px] md:max-w-[740px] mx-auto flex flex-col items-center gap-4 md:gap-[22px]">
        <Squiggle width={100} opacity={0.8} className="md:hidden" />
        <Squiggle width={140} opacity={0.8} className="hidden md:block" />

        <h2 className="font-[family-name:var(--font-display)] font-normal text-[clamp(38px,9vw,120px)] leading-none tracking-[-0.03em] m-0 text-[var(--bg)]">
          Take a piece{' '}
          <em className="italic text-[color-mix(in_oklch,var(--accent)_90%,var(--bg))]">
            home
          </em>
          .
        </h2>

        <p className="italic font-[family-name:var(--font-display)] text-[15px] md:text-[22px] text-[color-mix(in_oklch,var(--bg)_80%,var(--ink))] m-0 max-w-[520px]">
          The full catalogue, current drops, and the occasional one-off live over on
          the Shopify store.
        </p>

        <a
          href={shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 md:gap-4 rounded-full font-medium transition-all hover:scale-105 text-[15px] md:text-[18px] px-6 py-3 md:px-[36px] md:py-[20px] mt-1 md:mt-2 bg-(--accent) text-(--accent-ink) shadow-[0_12px_40px_color-mix(in_oklch,var(--accent)_40%,transparent)]"
        >
          <span>Visit the shop</span>
          <span className="text-[17px] md:text-[20px]">↗</span>
        </a>

        {/* <small className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] opacity-60 text-[var(--bg)]">
          opens timyule.myshopify.com · secure checkout
        </small> */}
      </div>
    </div>
  )
}
