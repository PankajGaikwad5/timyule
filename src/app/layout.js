import { Instrument_Serif, Instrument_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import WhatsAppButton from './components/WhatsAppButton'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const instrumentSansMono = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata = {
  metadataBase: new URL('https://timyule.au'),
  title: {
    template: '%s | Timothy Yule',
    default: 'Timothy Yule — Original Aboriginal Art & Paintings',
  },
  description:
    'Timothy Yule is a proud Wiradjuri man and Indigenous Australian artist creating original paintings, commissioned artworks, and handmade artefacts inspired by Country, culture, and connection.',
  keywords: [
    'Aboriginal art',
    'Indigenous Australian artist',
    'Wiradjuri artist',
    'original paintings',
    'commissioned artwork Australia',
    'Timothy Yule',
    'Aboriginal paintings',
    'Indigenous art Australia',
    'handmade art',
    'Australian Aboriginal artist',
    'buy Aboriginal art',
    'Wiradjuri paintings',
  ],
  authors: [{ name: 'Timothy Yule', url: 'https://timyule.au' }],
  creator: 'Timothy Yule',
  publisher: 'Timothy Yule',
  alternates: {
    canonical: 'https://timyule.au',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://timyule.au',
    siteName: 'Timothy Yule Art',
    title: 'Timothy Yule — Original Aboriginal Art & Paintings',
    description:
      'Timothy Yule is a proud Wiradjuri man and Indigenous Australian artist creating original paintings, commissioned artworks, and handmade artefacts inspired by Country, culture, and connection.',
    images: [
      {
        url: '/potrait.png',
        width: 1200,
        height: 630,
        alt: 'Timothy Yule — Wiradjuri Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timothy Yule — Original Aboriginal Art & Paintings',
    description:
      'Wiradjuri man and Indigenous Australian artist. Original paintings, commissioned artworks, and handmade artefacts.',
    images: ['/potrait.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Timothy Yule',
  url: 'https://timyule.au',
  image: 'https://timyule.au/potrait.png',
  description:
    'Timothy Yule is a proud Wiradjuri man and Indigenous Australian artist based in Sydney. He creates original paintings, commissioned artworks, and handmade artefacts inspired by Country, ancestral stories, and cultural identity. He has created over 120 original pieces and completed 11 community collaborations.',
  jobTitle: 'Visual Artist',
  nationality: { '@type': 'Country', name: 'Australia' },
  homeLocation: { '@type': 'Place', name: 'Sydney, Australia' },
  memberOf: {
    '@type': 'Organization',
    name: 'Aboriginal Art Association of Australia',
  },
  award: [
    'Finalist — Fishers Ghost Art Awards 2016',
    'Commissioned by NSW Northern Rivers Correctional Services',
    'Artwork presented to NASA Astronaut Pamela Melroy',
  ],
  knowsAbout: [
    'Wiradjuri culture',
    'Aboriginal art',
    'Dreamtime stories',
    'Indigenous Australian heritage',
    'Landscape painting',
    'Acrylic painting',
  ],
  quote:
    'Expressing my Indigenous heritage through art is a humbling and gratifying experience. Every piece is unique, carrying its own story through colour, rhythm and design.',
  sameAs: [
    'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Timothy Yule Art',
  url: 'https://timyule.au',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Timothy Yule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timothy Yule is a proud Wiradjuri man and Indigenous Australian artist based in Sydney. He creates original acrylic paintings, commissioned artworks, and handmade artefacts inspired by Country, ancestral stories, and cultural identity. He is a member of the Aboriginal Art Association of Australia and has produced over 120 original works.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Timothy Yule\'s cultural heritage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timothy Yule is a Wiradjuri man. The Wiradjuri are one of the largest Aboriginal nations in New South Wales, Australia. The Goanna is his totem. His paintings draw on Wiradjuri stories, landscapes, and ancestral connections to Country.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I commission a painting from Timothy Yule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Timothy Yule accepts commissions for personalised artworks that reflect specific landscapes, family stories, cultural connections, or community themes. Past commissions include works for Concord Public School, NSW Northern Rivers Correctional Services, and private collectors. Commission enquiries can be submitted through the website.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I buy Timothy Yule\'s original paintings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Original paintings available for purchase are listed in the Collections section at timyule.au/collections and also through KDTY Gallery at kdtygallery.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What subjects does Timothy Yule paint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timothy Yule\'s paintings depict Aboriginal nations, Australian landscapes, ancestral Dreamtime stories, totems (particularly the Goanna), the connection between people and Country, and themes of community, identity, and cultural resilience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Has Timothy Yule received awards or notable recognition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timothy Yule was a Finalist in the Fishers Ghost Art Awards 2016. He has been commissioned by institutions including NSW Northern Rivers Correctional Services and Concord Public School, and has had a painting presented to NASA Astronaut Pamela Melroy.',
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${instrumentSansMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
        {children}
        <WhatsAppButton />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5HHKHVCLTK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5HHKHVCLTK');
          `}
        </Script>
      </body>
    </html>
  )
}
