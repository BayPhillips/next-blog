import type { MetadataRoute } from 'next';
import { countPostsQuery, postsQuery } from '@/sanity/lib/queries';
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
      lastModified: post.date ? new Date(Date.parse(post.date)) : '',
      priority: 0.6,
  })));

  // Add blog index pages
  const totalPosts = await sanityFetch({ query: countPostsQuery });
  const POSTS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  for (let i = 1; i <= totalPages; i++) {
    routes.push({
      url: `https://bayphillips.com/posts/?page=${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return routes;
}