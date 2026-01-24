import type { ClientPerspective, FilteredResponseQueryOptions, QueryParams } from "next-sanity";

import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

/**
 * Used to fetch data in Server Components, it has built in support for handling Draft Mode and perspectives.
 * When using "published" perspective then time-based revalidation is used, set to match time-to-live on Sanity's API CDN (60 seconds)
 * and will also fetch from CDN.
 * When using "drafts" perspective then data is fetched from live API and isn't cached, it will also fetch draft content that isn't published yet.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  stega,
  perspective = process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE,
}: {
  query: QueryString;
  params?: QueryParams;
  stega?: boolean;
  perspective?: string | undefined;
}) {
  // TODO: Implement TanStack Start compatible draft mode
  // For now, always use published perspective
  const actualPerspective = perspective || "published";
  const actualStega = stega || false;

  let fetchParams: FilteredResponseQueryOptions = {
    stega: actualStega,
    perspective: actualPerspective as ClientPerspective,
    // The `published` perspective is available on API CDN
    useCdn: actualPerspective === "published" ? true : false,
    token: actualPerspective === "previewDrafts" ? token : undefined,
    // When using `published` perspective we use time-based revalidation to match time-to-live on Sanity's API CDN (60 seconds)
    next: { revalidate: actualPerspective === "published" ? 60 : 0 },
  };
  return client.fetch(query, params, fetchParams);
}

// Simplified fetch function for TanStack Router loaders
export async function fetchSanityData<T = any>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<T> {
  return sanityFetch({
    query,
    params,
    stega: false,
  });
}

// Helper function to fetch recent posts
export async function fetchRecentPosts(limit: number = 10) {
  const { postsQuery } = await import("@/sanity/lib/queries");
  return fetchSanityData({
    query: postsQuery,
    params: { limit },
  });
}

// Helper function to fetch hero post
export async function fetchHeroPost() {
  const { heroQuery } = await import("@/sanity/lib/queries");
  return fetchSanityData({
    query: heroQuery,
  });
}

// Type for posts with read time (legacy compatibility)
export type PostWithReadTime = any;