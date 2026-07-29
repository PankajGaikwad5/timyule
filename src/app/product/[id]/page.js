import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductActions from '../../components/ProductActions';
import { data } from '../../data';

const SHOP_URL = 'https://kdtygallery.com/collections/aboriginal-artist-tim-yule-wiradjuri';
const BASE = 'https://timyule.au';

export function generateStaticParams() {
  return data.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = data.find((p) => p.id === parseInt(id));

  if (!product) {
    return { title: 'Artwork Not Found' };
  }

  const description = product.description.replace(/\s+/g, ' ').trim().slice(0, 155);
  const statusLabel =
    product.status === 'instock'
      ? 'Available'
      : product.status === 'commissioned'
      ? 'Commissioned Work'
      : 'Sold';

  const artworkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: product.name,
    description: product.description.replace(/\s+/g, ' ').trim(),
    url: `${BASE}/product/${product.id}`,
    image: product.images.map((img) => `${BASE}${img}`),
    creator: {
      '@type': 'Person',
      name: 'Timothy Yule',
      url: BASE,
    },
    artMedium: 'Acrylic on canvas',
    artworkSurface: 'Canvas',
    offers:
      product.status === 'instock'
        ? {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: product.link,
          }
        : undefined,
  };

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `${BASE}/product/${product.id}`,
    },
    openGraph: {
      title: `${product.name} — Timothy Yule`,
      description,
      url: `${BASE}/product/${product.id}`,
      type: 'website',
      images: [
        {
          url: product.images[0],
          alt: `${product.name} by Timothy Yule — Wiradjuri Artist`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Timothy Yule (${statusLabel})`,
      description,
      images: [product.images[0]],
    },
    other: {
      'script:ld+json': JSON.stringify(artworkJsonLd),
    },
  };
}

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
              <Image
                src={img}
                alt={idx === 0 ? `${product.name} by Timothy Yule — original Aboriginal painting` : `${product.name} — view ${idx + 1}`}
                width={1200}
                height={900}
                className="w-full object-cover"
                style={{ height: 'auto' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                unoptimized
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

          <ProductActions product={product} />
        </div>
      </main>

      <Footer shopUrl={SHOP_URL} />
    </div>
  );
}
