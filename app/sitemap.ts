import type { MetadataRoute } from 'next';
import { postsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/fetch';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let routes: MetadataRoute.Sitemap = [
    {
      url: 'https://bayphillips.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://bayphillips.com/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    }
  ];
  
  // Add all blog posts
  const posts = await sanityFetch({ query: postsQuery });
  routes.push(...posts.map((post) => ({
      url: `https://bayphillips.com/posts/${post.slug || 'slug'}`,
      lastModified: post.date ? new Date(Date.parse(post.date)) : ''
  })));

  return routes;
}