import { MetadataRoute } from 'next'
import { getProducts, getCategories } from '@/lib/woocommerce'

const BASE_URL = 'https://elv8now.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const routes = [
    '',
    '/products',
    '/about',
    '/store-locator',
    '/b2b-wholesale',
    '/payment-methods',
    '/faq',
    '/returns',
    '/privacy',
    '/terms',
    '/gemi',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    // Fetch categories
    const categories = await getCategories({ per_page: '100', hide_empty: 'true' })
    const categoryRoutes = categories.map((cat: any) => ({
      url: `${BASE_URL}/products?category=${cat.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Fetch products
    const products = await getProducts({ per_page: '100' }) // Get the 100 most recent for now
    const productRoutes = products.map((product: any) => ({
      url: `${BASE_URL}/product/${product.id}`,
      lastModified: new Date(product.date_modified || new Date()),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }))

    return [...routes, ...categoryRoutes, ...productRoutes]
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return routes
  }
}
