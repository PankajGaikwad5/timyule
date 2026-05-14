'use client'
import { useState } from 'react'

export default function Footer({ shopUrl }) {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail('')
    setJoined(true)
  }

  return (
    <footer className="relative z-10 px-[clamp(16px,4vw,48px)] pt-[100px] pb-10 max-w-[1320px] mx-auto">
      <div className="footer-grid">
        {/* Wordmark + blurb */}
        <div>
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="inline-grid place-items-center rounded-full shrink-0 italic w-14 h-14 bg-[var(--ink)] text-[var(--bg)] font-[family-name:var(--font-display)] text-[26px] tracking-[-0.02em] -rotate-6">
              ty
            </span>
            <span className="font-[family-name:var(--font-display)] text-[44px] tracking-[-0.02em] text-[var(--ink)] leading-none">
              timothy&nbsp;yule
            </span>
          </div>
          <p className="text-sm text-[var(--ink-soft)] max-w-[320px] leading-[1.6] m-0">
            Indigenous Australian &amp; Home decor, originals, and the occasional
            experiment. Made on Gadigal &amp; Wurundjeri Country.
          </p>
        </div>

        {/* Elsewhere */}
        <div>
          <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)] font-medium m-0 mb-3.5">
            elsewhere
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
            {[
              { label: 'Shopify store ↗', href: 'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri', external: true },
              { label: 'Instagram ↗', href: 'https://www.instagram.com/timothyyule/', external: true },
              // { label: 'TikTok ↗', href: '#', external: true },
            ].map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="text-sm text-[var(--ink)] border-b border-transparent pb-0.5 transition-colors duration-200 ease-in hover:border-[var(--ink)]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Say hi */}
        <div>
          <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)] font-medium m-0 mb-3.5">
            say hi
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
            {[
              { label: 'hello@timyule.example', href: 'mailto:hello@timyule.example' },
              { label: 'commissions', href: 'mailto:press@timyule.example' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm text-[var(--ink)] border-b border-transparent pb-0.5 transition-colors duration-200 ease-in hover:border-[var(--ink)]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)] font-medium m-0 mb-3.5">
            newsletter
          </h4>
          <p className="text-sm text-[var(--ink-soft)] leading-[1.6] m-0 mb-[10px]">
            A short note every few months when a new collection drops. No spam, no nagging.
          </p>

          {joined ? (
            <p className="text-sm text-[var(--accent)] italic font-[family-name:var(--font-display)]">
              thanks! see you soon ✿
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email"
                required
                className="flex-1 outline-none px-3.5 py-2.5 rounded-full bg-transparent text-[var(--ink)] border border-[var(--line)] text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full bg-[var(--ink)] text-[var(--bg)] border-0 text-sm cursor-pointer whitespace-nowrap"
              >
                Join →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between flex-wrap gap-4 pt-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
        <span>© {new Date().getFullYear()} Timothy Yule. All works copyright their artists.</span>
        <span>Site is a portfolio piece — not affiliated with anyone but the studio.</span>
      </div>
    </footer>
  )
}
