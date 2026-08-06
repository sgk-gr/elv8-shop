import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart/', '/checkout/', '/account/', '/auth/', '/api/'],
    },
    sitemap: 'https://elv8now.com/sitemap.xml',
  }
}
