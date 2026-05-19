'use client'
import { useState, useEffect } from 'react'

export default function Navbar({ shopUrl }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToAbout = (e) => {
    e.preventDefault()
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-50 flex items-center justify-between transition-all duration-300 px-[clamp(16px,4vw,48px)] ${
          scrolled
            ? 'py-[12px] bg-[color-mix(in_oklch,var(--bg)_82%,transparent)] backdrop-blur-[14px] backdrop-saturate-[160%] border-b border-[var(--line)]'
            : 'py-[22px] bg-transparent border-b border-transparent'
        }`}
      >
        {/* Wordmark */}
        <a
          href="/"
          // onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="inline-flex items-center gap-3 no-underline"
        >
          <span className="inline-grid place-items-center rounded-full shrink-0 italic select-none w-[38px] h-[38px] bg-[var(--ink)] text-[var(--bg)] font-[family-name:var(--font-display)] text-[18px] tracking-[-0.02em] -rotate-6">
            ty
          </span>
          {/* <span className="font-[family-name:var(--font-display)] text-[clamp(20px,3vw,28px)] tracking-[-0.02em] text-[var(--ink)] leading-none">
            tim&nbsp;yule
          </span> */}
          <h1 className="font-[family-name:var(--font-display)] font-normal text-[clamp(20px,3vw,28px)] leading-[0.9] tracking-[0.03em] text-[var(--ink)]">
            tim
            yule.
          </h1>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop">
          <a
            href="/collections"
            // onClick={scrollToAbout}
            className="transition-opacity hover:opacity-100 text-sm text-[var(--ink)] opacity-[0.72]"
          >
            Collections
          </a>
          <a
            href="/portfolio"
            // onClick={scrollToAbout}
            className="transition-opacity hover:opacity-100 text-sm text-[var(--ink)] opacity-[0.72]"
          >
            Portfolio
          </a>
          <a
            href="/catalogue"
            className="transition-opacity hover:opacity-100 text-sm text-[var(--ink)] opacity-[0.72]"
          >
            Catalogue
          </a>
          <a
            href={'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full font-medium transition-transform hover:-translate-y-0.5 hover:-rotate-1 text-sm px-[18px] py-[9px] bg-[var(--ink)] text-white"
          >
            Shop <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`hamburger-line transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}
          />
          <span
            className={`hamburger-line transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`hamburger-line transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`nav-mobile-overlay bg-[var(--bg)] transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2.5'
        }`}
      >
        <a
          href="/collections"
          // onClick={scrollToAbout}
          className="font-[family-name:var(--font-display)] text-[clamp(40px,10vw,64px)] text-[var(--ink)] tracking-[-0.02em]"
        >
          Collections
        </a>
        <a
          href="/portfolio"
          // onClick={scrollToAbout}
          className="font-[family-name:var(--font-display)] text-[clamp(40px,10vw,64px)] text-[var(--ink)] tracking-[-0.02em]"
        >
          Portfolio
        </a>
        <a
          href="/catalogue"
          className="font-[family-name:var(--font-display)] text-[clamp(40px,10vw,64px)] text-[var(--ink)] tracking-[-0.02em]"
        >
          Catalogue
        </a>
        <a
          href={'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri'}
          target="_blank"
          rel="noopener noreferrer"
          // onClick={() => setMenuOpen(false)}
          className="inline-flex items-center gap-2 rounded-full font-medium text-[20px] px-8 py-3.5 bg-[var(--ink)] text-[var(--bg)]"
        >
          Visit the Shop ↗
        </a>
      </div>
    </>
  )
}
