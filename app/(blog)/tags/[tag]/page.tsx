import Link from "next/link";
import { notFound } from "next/navigation";

import CoverImage from "@/app/(blog)/cover-image";
import DateComponent from "@/app/(blog)/date";
import PostTags from "@/app/(blog)/components/post-tags";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsByTagQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

type Props = {
  params: { tag: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  
  return {
    title: `Posts tagged with "${tag}"`,
    description: `Browse all blog posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = await sanityFetch({ query: postsByTagQuery, params: { tag: tag as any } });

  if (!posts?.length) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-pretty mb-12 text-4xl font-serif leading-tight tracking-tighter md:text-7xl md:leading-none">
        Posts tagged with &quot;{tag}&quot;
      </h1>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => {
          const { _id, title, slug, coverImage, excerpt, tags } = post;
          return (
            <article key={_id}>
              <Link href={`/posts/${slug}`} className="group mb-5 block">
                <CoverImage image={coverImage} priority={false} />
              </Link>
              <h3 className="font-serif text-balance mb-3 text-3xl leading-snug">
                <Link href={`/posts/${slug}`} className="hover:underline">
                  {title}
                </Link>
              </h3>
              <div className="mb-4 text-lg">
                <DateComponent dateString={post.date} />
              </div>
              <PostTags tags={tags} />
              {excerpt && (
                <p className="text-pretty mb-4 text-lg leading-relaxed">
                  {excerpt}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
