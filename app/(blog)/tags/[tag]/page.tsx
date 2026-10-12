import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/fetch";
import { postsByTagQuery, tagsQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { PostQueryResult } from "@/sanity.types";
import { PageHeader } from "@/components/ui/page-header";
import { toTitleCase } from "@/lib/utils";

type Props = {
  params: Promise<{ tag: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Sanity's API CDN caches for 60 seconds, so regenerating any sooner gains nothing.
export const revalidate = 60;

export async function generateStaticParams(): Promise<Array<{ tag: string }>> {
  try {
    // Prerender tags on published posts; any other tag renders on demand.
    const tags = await sanityFetch({ query: tagsQuery, stega: false, perspective: 'published' });
    return (tags ?? []).flatMap((tag) => (tag ? [{ tag }] : []));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const tag = decodeURIComponent((await params).tag);
  
  return {
    title: `Posts tagged with "${tag}"`,
    description: `Browse all blog posts tagged with ${tag}`,
  };
}

export default async function TagPage(props: Props) {
  const params = await props.params;
  const tag = decodeURIComponent((await params).tag);
  const posts = await sanityFetch({ query: postsByTagQuery, params: { tag: tag as any } }) as PostQueryResult[];

  if (!posts?.length) {
    return notFound();
  }

  return (
    <>
      <PageHeader title={`${toTitleCase(tag)} posts`} description={`Browse all posts tagged with ${tag}`} />
      <div className="mbe-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post, index) => {
          return (
            <PostCard key={post!._id} post={post as any} priority={index === 0} headingLevel="h2" />
          );
        })}
      </div>
    </>
  );
}
