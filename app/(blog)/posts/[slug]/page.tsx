import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CoverImage from "../../cover-image";
import DateComponent from "../../date";
import MoreStories from "../../more-stories";
import PortableText from "../../components/portable-text";
import PostTags from "../../components/post-tags";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: { slug: string };
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await sanityFetch({ query: postQuery, params, stega: false });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    alternates: {
      canonical: post?.slug ? `/posts/${post?.slug}` : `/posts`
    }
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const post = await sanityFetch({ query: postQuery, params });

  if (!post?._id) {
    return notFound();
  }

  return (
    <>
      <article>
        <h1 className="text-pretty mb-12 text-4xl font-serif leading-tight tracking-tighter md:text-7xl md:leading-none">
          {post.title}
        </h1>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage image={post.coverImage} priority />
        </div>
        <div className="mx-auto">
          <div className="mb-6 text-lg">
            <div className="mb-4 text-lg">
              <DateComponent dateString={post.date} />
            </div>
            <PostTags tags={post.tags} />
          </div>
        </div>
        {post.content?.length && (
          <PortableText
            className="mx-auto"
            value={post.content as PortableTextBlock[]}
          />
        )}
      </article>
      <aside>
        <hr className="border-accent-2 mb-24 mt-28" />
        <h2 className="font-serif mb-8 text-6xl font-semibold leading-tight tracking-tighter md:text-7xl">
          Recent Posts
        </h2>
        <Suspense>
          <MoreStories skip={post._id} limit={2} />
        </Suspense>
      </aside>
    </>
  );
}
