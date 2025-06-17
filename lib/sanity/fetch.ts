import { sanityFetch as baseSanityFetch } from "@/sanity/lib/fetch";
import type { Post, Slug } from "@/sanity.types";
import { SanityImage } from "@/types";

// Extended Post type with readTime for our queries
export type PostWithReadTime = Omit<Post, 'content' | 'slug' | 'coverImage'> & {
  readTime?: number;
  content?: any; // Add content back for read time calculation
  slug: Slug | { current: string };
  coverImage?: SanityImage | null;
};

// Type-safe wrapper around sanityFetch
export async function fetchSanityData<T>(
  options: {
    query: string;
    params?: Record<string, unknown>;
    perspective?: 'published' | 'previewDrafts';
    stega?: boolean;
  }
): Promise<T> {
  const { query, params, perspective = 'published', stega = false } = options;
  
  const result = await baseSanityFetch({
    query,
    params,
    perspective,
    stega,
  });
  
  // Cast the result to the expected type
  return result as unknown as T;
}

// Helper function to fetch a single post
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

  // Ensure coverImage is properly typed
  if (result.coverImage && !result.coverImage.asset) {
    result.coverImage = null;
  }

  return result;
}

// Helper function to fetch recent posts
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

  if (!result) return [];

  // Ensure coverImage is properly typed for each post
  return result.map(post => {
    // If coverImage exists but has no asset, set it to null
    const coverImage = post.coverImage?.asset ? post.coverImage : null;
    return {
      ...post,
      coverImage
    };
  });
}

// Helper function to fetch hero post
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

  if (!result) return null;

  // Ensure coverImage is properly typed
  if (result.coverImage && !result.coverImage.asset) {
    result.coverImage = null;
  }

  return result;
}
