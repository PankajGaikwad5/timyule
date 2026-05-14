import { Instrument_Serif, Instrument_Sans } from 'next/font/google'
import './globals.css'

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
  title: 'Timothy Yule — handmade art & home',
  description:
    'Indigenous Australian & Indian artist. Original art, home decor, and handmade artefacts.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${instrumentSansMono.variable}`}
    >
      <body style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
