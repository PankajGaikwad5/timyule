import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Squiggle, Kicker, SectionTitle } from '../components/ui'

export const metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions for Timothy Yule Art (timyule.au). Read about artwork copyright, intellectual property, commission agreements, and website terms.',
  alternates: {
    canonical: 'https://timyule.au/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions — Timothy Yule',
    description:
      'Review the terms of use, artwork copyright, and commission guidelines for Timothy Yule Art.',
    url: 'https://timyule.au/terms-and-conditions',
    type: 'website',
  },
}

const SHOP_URL = 'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri'

export default function TermsAndConditionsPage() {
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
            <Squiggle width={28} /> terms of service
          </Kicker>
          <SectionTitle className="!text-[clamp(40px,5vw,64px)] leading-none">Terms & Conditions</SectionTitle>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)] -mt-4">
            Last Updated: July 3, 2026
          </p>
        </div>

        <div className="prose text-sm md:text-base leading-relaxed text-[var(--ink-soft)] flex flex-col gap-8 font-[family-name:var(--font-body)]">
          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              1. Acceptance of Terms
            </h2>
            <p className="m-0">
              Welcome to the website of Timothy Yule Art (<strong>&ldquo;we&rdquo;</strong>, <strong>&ldquo;our&rdquo;</strong>, or <strong>&ldquo;us&rdquo;</strong>), accessible at <a href="https://timyule.au" className="text-[var(--ink)] border-b border-[var(--line)] hover:border-[var(--ink)] transition-colors">timyule.au</a>.
            </p>
            <p className="m-0">
              By accessing, browsing, or using this website, and by submitting information via our newsletter, product inquiry, or commission forms, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, please do not use this site.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              2. Intellectual Property & Copyright
            </h2>
            <p className="m-0">
              Unless otherwise noted, all content on this website, including but not limited to images, digital photography, text, graphics, logos, layout designs, and the original artworks depicted, is the intellectual property of Timothy Yule. It is protected by Australian and international copyright laws.
            </p>
            <p className="m-0">
              You are granted a limited license to access and view the content for personal, non-commercial use. You must not:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1 m-0">
              <li>Reproduce, copy, duplicate, sell, or exploit any artwork images or content on this website without explicit written consent from Timothy Yule.</li>
              <li>Use our brand, name, or logos in any manner that suggests sponsorship, affiliation, or endorsement without prior written approval.</li>
              <li>Alter or remove any copyright notices, watermark signatures, or totem attributions from the displayed artwork images.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              3. Artwork Enquiries & Commissions
            </h2>
            <p className="m-0">
              Our website includes interactive forms that allow you to submit details for product enquiries and custom commission quotes.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 m-0">
              <li>
                <strong>Accuracy:</strong> You agree to provide accurate, current, and complete details (name, email, phone, and project parameters) in these forms.
              </li>
              <li>
                <strong>No Obligation:</strong> Submitting a commission enquiry form does not guarantee acceptance of the project or bind either party. All pricing and designs are subject to written confirmation, agreement on timelines, and a separate commission deposit contract.
              </li>
              <li>
                <strong>External Purchases:</strong> Any links that direct you to external shop catalogs (such as KDTY Gallery or Shopify) are governed by the terms of service of those respective third-party platforms.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              4. Website Availability & Accuracy
            </h2>
            <p className="m-0">
              We make every effort to display the dimensions, colors, and textures of our paintings accurately. However, we cannot guarantee that your monitor&rsquo;s display of any color will be completely accurate.
            </p>
            <p className="m-0">
              While we attempt to ensure the information on this website is correct, we do not warrant its completeness or accuracy. The website and its contents are provided on an &ldquo;as is&rdquo; basis. We reserve the right to modify or discontinue any part of the website without notice.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              5. Limitation of Liability
            </h2>
            <p className="m-0">
              To the maximum extent permitted by law, Timothy Yule shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this website, or any errors or omissions in the content.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              6. Data Analytics & User Behavior
            </h2>
            <p className="m-0">
              We track user navigation and site usage patterns utilizing Google Analytics and Google Search Console to refine site accessibility. By using our website, you acknowledge and agree that automated identifiers and session metrics are gathered and processed as detailed in our <a href="/privacy-policy" className="text-[var(--ink)] border-b border-[var(--line)] hover:border-[var(--ink)] transition-colors">Privacy Policy</a>.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              7. Governing Law
            </h2>
            <p className="m-0">
              These Terms & Conditions are governed by and construed in accordance with the laws of the State of New South Wales (NSW), Australia. You irrevocably submit to the exclusive jurisdiction of the courts in NSW to resolve any dispute arising from these terms or your use of the website.
            </p>
          </section>

          <section className="flex flex-col gap-3 border-t border-[var(--line)] pt-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] font-normal m-0">
              8. Contact Details
            </h2>
            <p className="m-0">
              If you have any questions about these Terms & Conditions, please contact us at:
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
