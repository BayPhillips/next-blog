import type { ClientPerspective, FilteredResponseQueryOptions, QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

/**
 * Used to fetch data in Server Components, it has built in support for handling Draft Mode and perspectives.
 * When using the "published" perspective then time-based revalidation is used, set to match the time-to-live on Sanity's API CDN (60 seconds)
 * and will also fetch from the CDN.
 * When using the "drafts" perspective then the data is fetched from the live API and isn't cached, it will also fetch draft content that isn't published yet.
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
  // Draft Mode may be disabled in some environments, so we need to handle that case
  const isEnabled = await (async () => {
    try {
      return (await draftMode()).isEnabled;
    } catch {
      return false;
    }
  })();
  const actualPerspective = isEnabled ? "previewDrafts" : perspective;
  const actualStega = stega || actualPerspective === "previewDrafts";

  let fetchParams: FilteredResponseQueryOptions = {
    stega: actualStega,
    perspective: actualPerspective as ClientPerspective,
    // The `published` perspective is available on the API CDN
    useCdn: actualPerspective === "published" ? true : false,
    token: actualPerspective === "previewDrafts" ? token : undefined,
    // When using the `published` perspective we use time-based revalidation to match the time-to-live on Sanity's API CDN (60 seconds)
    next: { revalidate: actualPerspective === "published" ? 60 : 0 },
  };
  return client.fetch(query, params, fetchParams);
}
