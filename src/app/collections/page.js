import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { data } from '../data';
import { Squiggle, Kicker, SectionTitle } from '../components/ui';

const SHOP_URL = 'https://timyule.myshopify.com';

export default function CollectionsPage() {
  const instock = data.filter(p => p.status === 'instock');
  const commissioned = data.filter(p => p.status === 'commissioned');
  const sold = data.filter(p => p.status === 'sold');

  const renderGrid = (items) => (
    <div className="work-grid mb-24">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className="work-tile block relative"
          style={{ gridColumn: 'span 4' }}
        >
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover rounded-sm block min-h-[180px] aspect-square"
          />
          <div className="flex justify-between items-center mt-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            <span>{item.name}</span>
            <span className="tile-arrow transition-transform">↗</span>
          </div>
        </Link>
      ))}
    </div>
  );

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
        <div className="mb-20 text-center flex flex-col items-center">
          <Kicker>
            <Squiggle width={28} /> browse all
          </Kicker>
          <SectionTitle>collections.</SectionTitle>
        </div>

        <div className="mb-12 border-b border-[var(--line)] pb-4">
          <h2 className="font-[family-name:var(--font-display)] text-4xl m-0 text-[var(--ink)]">In Stock</h2>
          <p className="text-[var(--ink-soft)] mt-2 font-[family-name:var(--font-mono)] uppercase text-xs tracking-wider">Available for immediate purchase</p>
        </div>
        {renderGrid(instock)}

        <div className="mb-12 border-b border-[var(--line)] pb-4">
          <h2 className="font-[family-name:var(--font-display)] text-4xl m-0 text-[var(--ink)]">Commissioned</h2>
          <p className="text-[var(--ink-soft)] mt-2 font-[family-name:var(--font-mono)] uppercase text-xs tracking-wider">Custom pieces created for specific collectors</p>
        </div>
        {renderGrid(commissioned)}

        <div className="mb-12 border-b border-[var(--line)] pb-4">
          <h2 className="font-[family-name:var(--font-display)] text-4xl m-0 text-[var(--ink)]">Sold</h2>
          <p className="text-[var(--ink-soft)] mt-2 font-[family-name:var(--font-mono)] uppercase text-xs tracking-wider">Past works that have found their home</p>
        </div>
        {renderGrid(sold)}

      </main>

      <Footer shopUrl={SHOP_URL} />
      
      <style>{`
        .work-tile:hover { transform: translateY(-4px); }
        .work-tile:hover .tile-arrow { transform: translate(2px, -2px); }
      `}</style>
    </div>
  );
}
