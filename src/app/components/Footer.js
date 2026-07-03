'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import CommissionModal from './CommissionModal'

export default function Footer({ shopUrl }) {
  const [commissionOpen, setCommissionOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [formLoadTime, setFormLoadTime] = useState(null)
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setFormLoadTime(Date.now())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          honeypot,
          timestamp: formLoadTime,
        }),
      })

      if (response.ok) {
        setEmail('')
        setJoined(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer data-animate-section className="relative z-10 px-[clamp(16px,4vw,48px)] pt-[100px] pb-10 max-w-[1320px] mx-auto">
      <div data-animate-reveal className="footer-grid">
        {/* Wordmark + blurb */}
        <div>
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="inline-grid place-items-center rounded-full shrink-0 italic w-14 h-14 bg-[var(--ink)] text-[var(--bg)] font-[family-name:var(--font-display)] text-[26px] tracking-[-0.02em] -rotate-6">
              ty
            </span>
            <span className="font-[family-name:var(--font-display)] text-[44px] tracking-[-0.02em] text-[var(--ink)] leading-none">
              tim&nbsp;yule
            </span>
          </div>
          <p className="text-sm text-[var(--ink-soft)] max-w-[320px] leading-[1.6] m-0">
           Indigenous Australian original art, decor, wearables and the occasional experiment. Made on Dharug Country.
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
              { label: 'Instagram ↗', href: 'https://www.instagram.com/timdyule/', external: true },
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
            <li>
              <a
                href="mailto:timdyule@gmail.com"
                className="inline-flex items-center gap-1.5 text-sm text-(--ink) border-b border-transparent pb-0.5 transition-colors duration-200 ease-in hover:border-(--ink)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Get in touch
              </a>
            </li>
            <li>
              <button
                onClick={() => setCommissionOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm text-(--ink) border-b border-transparent pb-0.5 transition-colors duration-200 ease-in hover:border-(--ink) bg-transparent border-0 p-0 cursor-pointer font-[inherit]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                Commissions
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)] font-medium m-0 mb-3.5">
            stay connected
          </h4>
          <p className="text-sm text-[var(--ink-soft)] leading-[1.6] m-0 mb-[10px]">
            Drop your email and we&rsquo;ll get back to you.
          </p>

          {joined ? (
            <p className="text-sm text-[var(--accent)] italic font-[family-name:var(--font-display)]">
              thanks! see you soon ✿
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
              {/* Honeypot — hidden from users, bots will fill it */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email"
                  required
                  className="flex-1 outline-none px-3.5 py-2.5 rounded-full bg-transparent text-(--ink) border border-(--line) text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-full bg-(--ink) text-(--bg) border-0 text-sm cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  {submitting ? '...' : 'Join →'}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-500 pl-1">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div data-animate-reveal className="flex justify-between flex-wrap gap-x-8 gap-y-4 pt-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
        <div className="flex gap-x-6 gap-y-2 flex-wrap">
          <span>© {new Date().getFullYear()} Timothy Yule. All works copyright their artists.</span>
          <Link href="/privacy-policy" className="hover:text-[var(--ink)] border-b border-transparent hover:border-[var(--ink-soft)] pb-0.5 transition-all duration-200">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-[var(--ink)] border-b border-transparent hover:border-[var(--ink-soft)] pb-0.5 transition-all duration-200">
            Terms & Conditions
          </Link>
        </div>
        <span>Site is a portfolio piece — not affiliated with anyone but the studio.</span>
      </div>

      <CommissionModal isOpen={commissionOpen} onClose={() => setCommissionOpen(false)} />
    </footer>
  )
}
