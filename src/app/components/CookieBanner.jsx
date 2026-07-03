'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [consent, setConsent] = useState(null)

  useEffect(() => {
    // Check localStorage on mount
    try {
      const savedConsent = localStorage.getItem('cookie-consent')
      if (savedConsent) {
        setConsent(savedConsent)
      } else {
        setConsent('undecided')
      }
    } catch {
      setConsent('undecided')
    }
  }, [])

  const handleConsent = (status) => {
    try {
      localStorage.setItem('cookie-consent', status)
    } catch (e) {
      console.warn('Could not write to localStorage:', e)
    }
    
    setConsent(status)

    // Update Google Analytics Consent Mode if gtag exists
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: status === 'accepted' ? 'granted' : 'denied',
      })
    }
  }

  // Render nothing if loaded but already consented/declined
  if (consent === null || consent !== 'undecided') return null

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[999] w-[calc(100%-32px)] max-w-[400px] p-5 rounded-2xl border border-[var(--line)] flex flex-col gap-4 transition-all duration-300"
      style={{
        backgroundColor: 'color-mix(in oklch, var(--bg) 92%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 16px 40px color-mix(in oklch, var(--ink) 12%, transparent)',
      }}
    >
      <div className="flex flex-col gap-1.5">
        <h4 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--ink)] font-semibold m-0">
          Cookie Consent
        </h4>
        <p className="text-xs text-[var(--ink-soft)] leading-relaxed m-0 font-[family-name:var(--font-body)]">
          We use cookies to analyze site traffic and optimize your experience. Learn more in our{' '}
          <Link
            href="/privacy-policy"
            className="text-[var(--ink)] font-medium border-b border-[var(--line)] hover:border-[var(--ink)] transition-colors"
          >
            Privacy Policy
          </Link>.
        </p>
      </div>

      <div className="flex gap-2.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em]">
        <button
          onClick={() => handleConsent('accepted')}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--ink)] text-[var(--bg)] font-semibold border-0 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Accept
        </button>
        <button
          onClick={() => handleConsent('declined')}
          className="px-4 py-2.5 rounded-xl bg-transparent text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] cursor-pointer transition-colors duration-200"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
