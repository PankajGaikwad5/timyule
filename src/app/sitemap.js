import { data } from './data'

const BASE = 'https://timyule.au'

// URL-encode each path segment so special chars like & and spaces are valid XML
function encodeImagePath(path) {
  return path.split('/').map((seg) => (seg ? encodeURIComponent(seg) : seg)).join('/')
}

export default function sitemap() {
  const productEntries = data.map((product) => ({
    url: `${BASE}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: product.status === 'instock' ? 'weekly' : 'monthly',
    priority: product.status === 'instock' ? 0.8 : 0.6,
    images: product.images.map((img) => `${BASE}${encodeImagePath(img)}`),
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
    {
      url: `${BASE}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...productEntries,
  ]
}
