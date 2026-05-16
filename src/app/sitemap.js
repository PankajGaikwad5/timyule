import { data } from './data'

const BASE = 'https://timyule.au'

export default function sitemap() {
  const productEntries = data.map((product) => ({
    url: `${BASE}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: product.status === 'instock' ? 'weekly' : 'monthly',
    priority: product.status === 'instock' ? 0.8 : 0.6,
    images: product.images.map((img) => `${BASE}${img}`),
  }))

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productEntries,
  ]
}
