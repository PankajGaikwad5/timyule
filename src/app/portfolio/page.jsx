export const metadata = {
  title: 'Portfolio',
  description:
    'Explore the portfolio of Timothy Yule — Wiradjuri man and Indigenous Australian artist. Original landscape paintings, cultural works, and stories of Country, ancestors, and connection.',
  alternates: {
    canonical: 'https://timyule.au/portfolio',
  },
  openGraph: {
    title: 'Portfolio — Timothy Yule',
    description:
      'Original paintings and cultural artworks by Wiradjuri artist Timothy Yule. Stories of Country, ancestors, and Indigenous Australian identity.',
    url: 'https://timyule.au/portfolio',
    type: 'website',
  },
}

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Work from '../components/Work'
import Collections from '../components/Collections'
import StudioSection from '../components/StudioSection'
import AcknowledgementOfCountry from '../components/AcknowledgementOfCountry'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const SHOP_URL = 'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri' // ← swap this for the real URL

export default function HomePage() {
  return (
    <div
      className="relative overflow-hidden page-texture"
      style={{
        background: `
          radial-gradient(900px 500px at 90% -10%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 70%),
          radial-gradient(700px 400px at -10% 30%, color-mix(in oklch, var(--ink) 6%, transparent), transparent 70%),
          var(--bg)
        `,
      }}
    >
      <Navbar shopUrl={SHOP_URL} />
      <Hero />
      <About />
      <Work shopUrl={SHOP_URL} />
      {/* <Collections shopUrl={SHOP_URL} /> */}
      {/* <StudioSection /> */}
      <AcknowledgementOfCountry />
      <CTASection shopUrl={SHOP_URL} />
      <Footer shopUrl={SHOP_URL} />
    </div>
  )
}
