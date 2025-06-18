import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostCard } from "@/components/post-card";
import PortableText from "@/app/(blog)/components/portable-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, moreStoriesQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

// Import SanityDocument type from next-sanity
import type { PortableTextBlock, SanityDocument } from "next-sanity";
import { Post, PostsQueryResult } from "@/sanity.types";
import { getImageUrl } from "@/lib/sanity/utils";
import { PageHeader } from "@/components/ui/page-header";

// Define a type for the post slugs query result
interface PostSlugResult {
  slug: {
    current: string;
  };
}

interface MoreStoriesQueryResult {
  _id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  coverImage: {
    asset: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    alt?: string;
  } | null;
  date: string | null;
  tags: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }> | null;
  content: any[] | null;
}

declare const internalGroqTypeReferenceTo: unique symbol;

type Tag = string[];

type CoverImage = {
  asset: {
    url: string;
  };
  alt?: string;
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
);

// Define a type for the post slugs query result
interface PostSlugResult {
  slug: {
    current: string;
  };
}

interface SanitySlugResult {
  slug: string;
}

// Define the expected return type for generateStaticParams
type StaticParams = Array<{ params: { slug: string } }>;

export async function generateStaticParams(): Promise<StaticParams> {
  try {
    const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
    
    // Fetch the data from Sanity with the correct type
    const result = await sanityFetch({
      query,
      perspective: "published",
      stega: false,
    }) as unknown as Array<{ slug: string }>;
    
    // Ensure we have a valid result before mapping
    if (!Array.isArray(result)) {
      return [];
    }

    // Map the result to the expected format for Next.js
    return result.map((post) => ({
      params: {
        slug: post.slug,
      },
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: GenerateMetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const post = await sanityFetch({
    query: postQuery,
    params: { slug: (await params).slug },
  });

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The requested post could not be found.',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = post.coverImage?.asset?._ref
    ? resolveOpenGraphImage(post.coverImage.asset)
    : null;

  const metadata: Metadata = {
    title: post.title || 'Untitled Post',
    description: post.excerpt || '',
    openGraph: {
      title: post.title || 'Untitled Post',
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.date || new Date().toISOString(),
      authors: post.author?.name ? [post.author.name] : [],
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title || 'Untitled Post',
      description: post.excerpt || '',
      images: ogImage ? [ogImage] : [],
    },
  };

  return metadata;
}

interface PostCard {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  date: string;
  content: any[];
  coverImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [key: string]: any;
    };
    alt?: string;
  };
  tags?: Array<string>;
}


async function MorePosts({ currentPostId }: { currentPostId: string }) {
  // Use type assertion to handle the generic type constraint
  const morePosts = await sanityFetch({
    query: moreStoriesQuery,
    params: { skip: currentPostId, limit: 2 }
  }) as PostsQueryResult;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {morePosts.map((post) => {
        return <PostCard key={post._id} post={post as unknown as Post} className="h-full" />;
      })}
    </div>
  );
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const post = await sanityFetch({
    query: postQuery,
    params: { slug: params.slug },
    perspective: 'published',
    stega: false,
  }) as unknown as Post;

  if (!post?._id) {
    return notFound();
  }

  const publishedDate = post.date ? new Date(post.date) : null;
  const readTime = Math.ceil(((post.content?.length || 0) / 200) || 5);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/posts/${post.slug?.current || ''}`;

  return (
    <>
      <article className="prose dark:prose-invert max-w-none">
        <header className="mb-12">
          <PageHeader title={post.title || 'Untitled'} description={''} />
          
          <div className="flex items-center text-muted-foreground text-sm gap-4">
            {publishedDate && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={publishedDate.toISOString()}>
                  {formatDate(publishedDate, 'long')}
                </time>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tagRef) => {
                // Cast the tag reference to the Tag type
                const tag = tagRef as unknown as Tag;
                return (
                  <Link
                    key={`tag-${tag}`}
                    href={`/tags/${tag}`}
                    className="hover:underline"
                    >
                    <Badge variant="outline">{tag}</Badge>
                  </Link>
                );
              })}
            </div>
          )}

          {post.coverImage && (
            <div className="relative aspect-video w-full mt-8 rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(post.coverImage)}
                alt={post.coverImage.alt || post.title || 'Post cover image'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </header>

        {post.content && post.content.length > 0 && (
          <div className="prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.content as unknown as PortableTextBlock[]} />
          </div>
        )}

        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Share:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <span>Twitter</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <span className="sr-only">Share on LinkedIn</span>
                    <span>LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/posts" className="flex items-center gap-1">
                <span>←</span>
                <span>Back to all posts</span>
              </Link>
            </Button>
          </div>
        </footer>
      </article>
      <Separator className="my-12" />
      <aside>
        <h2 className="text-2xl font-bold mb-8">More articles</h2>
        <Suspense fallback={<div>Loading more posts...</div>}>
          <MorePosts currentPostId={post._id} />
        </Suspense>
      </aside>
    </>
  );
}
