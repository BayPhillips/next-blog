import type { ClientPerspective, FilteredResponseQueryOptions, QueryParams } from "next-sanity";

import { client } from "@/sanity/lib/client";

const TOKEN: string | undefined = undefined;

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  stega,
  perspective,
}: {
  query: QueryString;
  params?: QueryParams;
  stega?: boolean;
  perspective?: string | undefined;
}) {
  const actualPerspective = perspective || import.meta.env.VITE_SANITY_PERSPECTIVE || "published";
  const actualStega = stega || false;

  let fetchParams: FilteredResponseQueryOptions = {
    stega: actualStega,
    perspective: actualPerspective as ClientPerspective,
    useCdn: actualPerspective === "published",
    token: actualPerspective === "previewDrafts" ? TOKEN : undefined,
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