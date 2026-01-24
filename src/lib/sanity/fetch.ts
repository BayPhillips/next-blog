import { sanityFetch as baseSanityFetch } from "@/sanity/lib/fetch";
import type { Post, Slug } from "@/sanity.types";
import { SanityImage } from "@/types";

export type PostWithReadTime = Post & {
  readTime?: number;
};

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

export async function fetchSanityData<T>(
  options: {
    query: string;
    params?: Record<string, unknown>;
    stega?: boolean;
    useCache?: boolean;
  }
): Promise<T> {
  const { query, params, stega = false, useCache = true } = options;
  
  const cacheKey = JSON.stringify({ query, params, stega });
  
  if (useCache && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T;
    }
    cache.delete(cacheKey);
  }
  
  const result = await baseSanityFetch({
    query,
    params,
    stega,
  });
  
  if (useCache) {
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });
  }
  
  return result as unknown as T;
}

export async function fetchPost(slug: string): Promise<PostWithReadTime | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      content,
      _id,
      title,
      "slug": slug,
      excerpt,
      coverImage,
      "date": coalesce(date, _updatedAt),
      "author": author->{"name": coalesce(name, "Anonymous"), picture},
      tags,
      "readTime": round(length(pt::text(content)) / 5 / 180)
    }
  `;

  const result = await fetchSanityData<PostWithReadTime | null>({
    query,
    params: { slug },
  });

  if (!result) return null;

  return result;
}

export async function fetchRecentPosts(limit = 3): Promise<PostWithReadTime[]> {
  const query = `
    *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
      _id,
      title,
      "slug": slug,
      excerpt,
      coverImage,
      "date": coalesce(date, _updatedAt),
      "author": author->{"name": coalesce(name, "Anonymous"), picture},
      tags,
      content,
      "readTime": round(length(pt::text(content)) / 5 / 180)
    }
  `;

  const result = await fetchSanityData<PostWithReadTime[]>({
    query,
    params: { limit },
  });

  return result || [];
}

export async function fetchHeroPost(): Promise<PostWithReadTime | null> {
  const query = `
    *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
      content,
      _id,
      title,
      "slug": slug,
      excerpt,
      coverImage,
      "date": coalesce(date, _updatedAt),
      "author": author->{"name": coalesce(name, "Anonymous"), picture},
      tags,
      "readTime": round(length(pt::text(content)) / 5 / 180)
    }
  `;

  const result = await fetchSanityData<PostWithReadTime | null>({
    query,
  });

  return result;
}

export async function fetchPostBySlug(slug: string): Promise<PostWithReadTime | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      content,
      _id,
      title,
      "slug": slug,
      excerpt,
      coverImage,
      "date": coalesce(date, _updatedAt),
      "author": author->{"name": coalesce(name, "Anonymous"), picture},
      tags,
      "readTime": round(length(pt::text(content)) / 5 / 180)
    }
  `;

  const result = await fetchSanityData<PostWithReadTime | null>({
    query,
    params: { slug },
  });

  return result;
}

export async function fetchPostsByTag(tag: string): Promise<PostWithReadTime[]> {
  const query = `
    *[_type == "post" && $tag in tags && defined(slug.current)] | order(date desc, _updatedAt desc) {
      _id,
      title,
      "slug": slug,
      excerpt,
      coverImage,
      "date": coalesce(date, _updatedAt),
      "author": author->{"name": coalesce(name, "Anonymous"), picture},
      tags,
      content,
      "readTime": round(length(pt::text(content)) / 5 / 180)
    }
  `;

  const result = await fetchSanityData<PostWithReadTime[]>({
    query,
    params: { tag },
  });

  return result || [];
}