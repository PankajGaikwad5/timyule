import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { data } from '../../data';

const SHOP_URL = 'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri';

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const product = data.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="relative overflow-hidden page-texture min-h-screen text-center flex flex-col justify-center items-center"
      style={{
        background: `
          radial-gradient(900px 500px at 90% -10%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 70%),
          radial-gradient(700px 400px at -10% 30%, color-mix(in oklch, var(--ink) 6%, transparent), transparent 70%),
          var(--bg)
        `,
      }}>
        <Navbar shopUrl={SHOP_URL} />
        <h1 className="text-4xl mt-32 mb-auto font-[family-name:var(--font-display)]">Product Not Found</h1>
        <Footer shopUrl={SHOP_URL} />
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden page-texture min-h-screen flex flex-col"
      style={{
        background: `
          radial-gradient(900px 500px at 90% -10%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 70%),
          radial-gradient(700px 400px at -10% 30%, color-mix(in oklch, var(--ink) 6%, transparent), transparent 70%),
          var(--bg)
        `,
      }}
    >
      <Navbar shopUrl={SHOP_URL} />
      
      <main className="flex-grow max-w-[1320px] mx-auto w-full px-6 py-32 flex flex-col md:flex-row gap-16 items-start">
        <div className="flex-1 flex flex-col gap-8 w-full">
          {product.images.map((img, idx) => (
            <div key={idx} className="w-full rounded-[24px] overflow-hidden shadow-2xl bg-[var(--line)]">
              <img 
                src={img} 
                alt={`${product.name} - ${idx + 1}`} 
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex-1 md:sticky md:top-32 flex flex-col gap-8 w-full">
          <div>
            <h1 className="font-[family-name:var(--font-display)] font-normal text-[clamp(40px,6vw,80px)] leading-[1.1] tracking-[-0.02em] m-0 text-[var(--ink)]">
              {product.name}
            </h1>
          </div>
          
          <div className="h-[1px] w-full bg-[var(--line)]"></div>
          
          <p className="text-[17px] leading-[1.7] text-[var(--ink)] max-w-lg">
            {product.description}
          </p>
          
          {product.link ? (
            <div className="mt-4">
              <a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--ink)] text-[var(--bg)] px-8 py-4 rounded-full font-medium tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
              >
                Shop on Shopify
              </a>
            </div>
          ) : (
            <div className="mt-4">
              <span className="inline-flex items-center justify-center bg-transparent border border-[var(--line)] text-[var(--ink-soft)] px-8 py-4 rounded-full font-medium tracking-wide">
                Currently Unavailable
              </span>
            </div>
          )}
        </div>
      </main>

      <Footer shopUrl={SHOP_URL} />
    </div>
  );
}
