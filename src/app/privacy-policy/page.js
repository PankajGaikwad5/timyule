import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Squiggle, Kicker, SectionTitle } from '../components/ui'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Timothy Yule Art (timyule.au). Read about how we collect, use, and safeguard your personal details and analytics data.',
  alternates: {
    canonical: 'https://timyule.au/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — Timothy Yule',
    description:
      'Learn how Timothy Yule Art collects, processes, and protects your personal information and visitor analytics data.',
    url: 'https://timyule.au/privacy-policy',
    type: 'website',
  },
}

const SHOP_URL = 'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri'

export default function PrivacyPolicyPage() {
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

      <main className="max-w-[800px] mx-auto px-[clamp(16px,4vw,48px)] py-32">
        <div className="mb-16 text-center flex flex-col items-center">
          <Kicker>
            <Squiggle width={28} /> policy & compliance
          </Kicker>
          <SectionTitle className="!text-[clamp(40px,5vw,64px)]">Privacy Policy</SectionTitle>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)] -mt-4">
            Last Updated: July 3, 2026
          </p>
        </div>

        <div className="prose text-sm md:text-base leading-relaxed text-[var(--ink-soft)] flex flex-col gap-8 font-[family-name:var(--font-body)]">
          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              1. Introduction & Commitment
            </h2>
            <p className="m-0">
              Timothy Yule Art (<strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;our&rdquo;</strong>, or <strong>&ldquo;us&rdquo;</strong>) operates the website <a href="https://timyule.au" className="text-[var(--ink)] border-b border-[var(--line)] hover:border-[var(--ink)] transition-colors">timyule.au</a>. We respect the privacy of our visitors and customers and are committed to protecting any personal information you share with us.
            </p>
            <p className="m-0">
              This Privacy Policy explains how we collect, store, use, and disclose your personal data, particularly regarding the use of Google Analytics, Google Search Console, newsletter sign-ups, and artwork/commission enquiry forms. We comply with the Australian Privacy Principles (APPs) contained in the <em>Privacy Act 1988</em> (Cth).
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              2. Information We Collect
            </h2>
            <p className="m-0">
              We collect information in two main ways: directly from your inputs and automatically through your interaction with the site.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 m-0">
              <li>
                <strong>Direct Inputs (Forms):</strong> When you fill out a commission enquiry form, a product enquiry form, or sign up for our newsletter, we collect the personal details you submit. This may include your <strong>name</strong>, <strong>email address</strong>, <strong>phone number</strong>, <strong>budget</strong>, and any <strong>specific details or messages</strong> you type regarding your inquiry.
              </li>
              <li>
                <strong>Automated Tracking (Cookies & Diagnostics):</strong> When you browse the website, we automatically collect anonymous technical information using tracking cookies and script identifiers.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              3. Google Analytics & Google Search Console
            </h2>
            <p className="m-0">
              This website uses <strong>Google Analytics</strong> (specifically GA4) and <strong>Google Search Console</strong>, web analysis services provided by Google LLC (<strong>&ldquo;Google&rdquo;</strong>).
            </p>
            <p className="m-0">
              Google Analytics uses &ldquo;cookies&rdquo;—which are text files placed on your computer—to help analyze how users navigate the site. The information generated by the cookie about your use of the website (including your anonymized IP address) is transmitted to and stored by Google on servers in the United States.
            </p>
            <p className="m-0">
              Google uses this information to:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1 m-0">
              <li>Evaluate your usage of our website.</li>
              <li>Compile reports on website activity for us.</li>
              <li>Provide other services relating to website activity and internet usage.</li>
            </ul>
            <p className="m-0">
              Google Search Console allows us to monitor our site&rsquo;s presence in Google Search results, helping us optimize search rankings and trace indexing status without collecting personally identifiable credentials.
            </p>
            <p className="m-0">
              You can refuse the use of cookies by selecting the appropriate settings on your browser; however, please note that if you do this you may not be able to use the full functionality of this website.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              4. How We Use Your Data
            </h2>
            <p className="m-0">
              We process and use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 m-0">
              <li>To respond to and process your commission or product enquiries.</li>
              <li>To discuss design preferences, sizes, budget ranges, and timelines for custom paintings.</li>
              <li>To email you updates, newsletters, or marketing communications (only if you have opted in to our newsletter, from which you can unsubscribe at any time).</li>
              <li>To monitor and improve website usability, page speed, and content layout using aggregated analytics.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              5. Data Storage & Security
            </h2>
            <p className="m-0">
              We take the security of your data seriously. Personal inputs provided via forms are compiled and sent to us securely via email (using Nodemailer). We do not store credit card credentials or sensitive payment details directly on our servers; any online purchases are processed externally via secure third-party platforms (such as Shopify).
            </p>
            <p className="m-0">
              While we implement reasonable safeguards to protect your personal information, no transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute safety.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              6. Sharing of Personal Data
            </h2>
            <p className="m-0">
              We do not sell, rent, trade, or otherwise share your personal information with third parties for their promotional activities. We may only disclose your information if required to do so by law or in the good faith belief that such action is necessary to comply with legal obligations or protect our rights.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              7. Access, Correction, & Deletion
            </h2>
            <p className="m-0">
              You have the right to request access to the personal information we hold about you, request corrections to any inaccuracies, or request that we delete your details entirely from our database. To make such a request, please contact us using the details below.
            </p>
          </section>

          <section className="flex flex-col gap-3 border-t border-[var(--line)] pt-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              8. Contact Details
            </h2>
            <p className="m-0">
              If you have any questions or complaints regarding this Privacy Policy or how we handle your personal data, please get in touch with us:
            </p>
            <p className="m-0 font-[family-name:var(--font-mono)] text-sm">
              Email: <a href="mailto:timdyule@gmail.com" className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors">timdyule@gmail.com</a>
            </p>
          </section>
        </div>
      </main>

      <Footer shopUrl={SHOP_URL} />
    </div>
  )
}
