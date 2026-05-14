import { Squiggle } from './ui'

export default function CTASection({ shopUrl }) {
  return (
    <div className="cta-section relative z-10 text-center py-[30px] px-[clamp(16px,4vw,48px)]">
      <div className="relative max-w-[740px] mx-auto flex flex-col items-center gap-[22px]">
        <Squiggle width={140} opacity={0.8} />

        <h2 className="font-[family-name:var(--font-display)] font-normal text-[clamp(56px,8vw,120px)] leading-none tracking-[-0.03em] m-0 text-[var(--bg)]">
          Take a piece{' '}
          <em className="italic text-[color-mix(in_oklch,var(--accent)_90%,var(--bg))]">
            home
          </em>
          .
        </h2>

        <p className="italic font-[family-name:var(--font-display)] text-[22px] text-[color-mix(in_oklch,var(--bg)_80%,var(--ink))] m-0 max-w-[520px]">
          The full catalogue, current drops, and the occasional one-off live over on
          the Shopify store.
        </p>

        <a
          href={shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 rounded-full font-medium transition-all hover:scale-105 text-[18px] px-[36px] py-[20px] mt-2 bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_12px_40px_color-mix(in_oklch,var(--accent)_40%,transparent)]"
        >
          <span>Visit the shop</span>
          <span className="text-[20px]">↗</span>
        </a>

        {/* <small className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] opacity-60 text-[var(--bg)]">
          opens timyule.myshopify.com · secure checkout
        </small> */}
      </div>
    </div>
  )
}
