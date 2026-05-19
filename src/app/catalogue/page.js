export const metadata = {
  title: 'Catalogues',
  description:
    'Download and view Timothy Yule\'s art catalogues — including the portfolio, in-stock collections, commissioned works, and sold archives.',
  alternates: {
    canonical: 'https://timyule.au/catalogue',
  },
  openGraph: {
    title: 'Catalogues — Timothy Yule',
    description:
      'Download and view Timothy Yule\'s art catalogues, including portfolio, available works, commissions, and sold archive.',
    url: 'https://timyule.au/catalogue',
    type: 'website',
  },
}

import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Squiggle, Kicker, SectionTitle } from '../components/ui'

const SHOP_URL = 'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri'

const catalogues = [
  {
    id: 'portfolio',
    title: 'Art Portfolio',
    filename: 'portfolio.pdf',
    size: '2.22 MB',
    description: 'A comprehensive showcase of Timothy Yule\'s artistic journey, featuring his artist biography, cultural statements, and highlights of key paintings.',
    image: '/potrait.png',
    category: 'Artist Profile & Featured Works'
  },
  {
    id: 'instock',
    title: 'In-Stock Paintings',
    filename: 'instock.pdf',
    size: '395 KB',
    description: 'Browse original acrylic paintings currently in-stock and available for purchase. Includes detailed dimensions, stories, and pricing.',
    image: '/instock/Homelands.webp',
    category: 'Available Artworks'
  },
  {
    id: 'commissioned',
    title: 'Commissioned Artworks',
    filename: 'commsioned.pdf', // File named commsioned.pdf in public folder
    size: '507 KB',
    description: 'Explore custom paintings and large-scale murals designed in collaboration with schools, organisations, and private art collectors.',
    image: '/commisioned/Warrior_Rise_Up.webp',
    category: 'Collaborations & Custom Pieces'
  },
  {
    id: 'sold',
    title: 'Sold Paintings Archive',
    filename: 'sold.pdf',
    size: '1.34 MB',
    description: 'A visual archive of Timothy\'s past works that have found their homes, tracing his stylistic evolution and Wiradjuri storytelling.',
    image: '/solds/Goanna River.webp',
    category: 'Sold Archives'
  }
]

export default function CataloguePage() {
  return (
    <div
      className="relative overflow-hidden page-texture min-h-screen"
      style={{
        background: `
          radial-gradient(900px 500px at 90% -10%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 70%),
          radial-gradient(700px 400px at -10% 30%, color-mix(in oklch, var(--ink) 6%, transparent), transparent 70%),
          var(--bg)
        `,
      }}
    >
      <Navbar shopUrl={SHOP_URL} />

      <main className="max-w-[1320px] mx-auto px-[clamp(16px,4vw,48px)] py-32">
        {/* Header Section */}
        <div className="mb-24 text-center flex flex-col items-center">
          <Kicker>
            <Squiggle width={28} /> publications
          </Kicker>
          <SectionTitle>catalogues.</SectionTitle>
          <p className="text-[var(--ink-soft)] font-[family-name:var(--font-body)] max-w-lg mx-auto text-base leading-relaxed -mt-4">
            Explore Timothy Yule&apos;s collections of Wiradjuri art and artefacts. View the booklets online or download them to read offline.
          </p>
        </div>

        {/* Catalogues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
          {catalogues.map((cat) => (
            <div
              key={cat.id}
              className="catalogue-card flex flex-col md:flex-row gap-8 items-start justify-between p-6 rounded-lg border border-[var(--line)] bg-[var(--bg-2)]/40 backdrop-blur-xs transition-all duration-300 hover:border-[var(--ink)]/30"
            >
              {/* Cover Image */}
              <div className="w-full md:w-40 shrink-0">
                <div className="catalogue-cover relative aspect-[3/4] w-full rounded-sm overflow-hidden shadow-md bg-[var(--bg-2)] border border-[var(--line)] transition-all duration-500 ease-out origin-bottom-left">
                  <Image
                    src={cat.image}
                    alt={`${cat.title} Cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 160px"
                    loading="lazy"
                  />
                  {/* Subtle Spine shadow to look like a book */}
                  <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text details and actions */}
              <div className="flex flex-col h-full min-w-0 flex-1">
                {/* Meta details */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    {cat.category}
                  </span>
                  {/* <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)] font-medium">
                    {cat.size}
                  </span> */}
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-display)] text-3xl font-normal text-[var(--ink)] mb-3 leading-tight">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Actions */}
                <div className="flex flex-row gap-3 mt-auto">
                  <a
                    href={`/${cat.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center inline-block rounded-full font-medium transition-transform hover:-translate-y-0.5 text-xs py-3 bg-[var(--ink)] text-[var(--bg)] font-[family-name:var(--font-mono)] uppercase tracking-wider"
                  >
                    View PDF ↗
                  </a>
                  <a
                    href={`/${cat.filename}`}
                    download={cat.filename}
                    className="flex-1 text-center inline-block rounded-full font-medium transition-transform hover:-translate-y-0.5 text-xs py-3 border border-[var(--ink)] text-[var(--ink)] font-[family-name:var(--font-mono)] uppercase tracking-wider"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer shopUrl={SHOP_URL} />

      {/* Organic Booklet Hover Tilt Effect */}
      <style>{`
        .catalogue-card:hover .catalogue-cover {
          transform: translateY(-6px) rotate(-2deg);
          box-shadow: 0 20px 25px -5px rgba(29, 26, 20, 0.15), 0 8px 10px -6px rgba(29, 26, 20, 0.15);
        }
      `}</style>
    </div>
  )
}
