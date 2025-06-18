import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "@/components/ui/icons"
import { formatDate } from "@/lib/date-utils"
import { fetchHeroPost, fetchRecentPosts, type PostWithReadTime } from "@/lib/sanity/fetch"
import { getImageUrl, getImageAlt } from "@/lib/sanity/utils"
import type { Post, Slug, SanityImageAsset } from "@/sanity.types"
import { PostCard } from "@/components/post-card"

interface HeroPostProps {
  title?: string;
  slug?: string | { current: string } | Slug;
  coverImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [key: string]: any;
    };
    media?: unknown;
    hotspot?: {
      _type: string;
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
    crop?: {
      _type: string;
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    alt?: string;
    _type: "image";
  } | null;
  date?: string;
  excerpt?: string;
  author?: Post["author"];
  readTime?: number;
}

function HeroPost({
  title,
  slug: slugProp,
  excerpt,
  coverImage,
  date,
  author,
  readTime,
}: HeroPostProps) {
  // Ensure we have a valid slug object
  const slug = slugProp 
    ? (typeof slugProp === 'string' ? { current: slugProp } : slugProp)
    : { current: '' };
  return (
    <section className="mb-16">
      <Card className="overflow-hidden border-none shadow-lg">
        {coverImage?.asset?._ref && (
          <div className="relative h-96 w-full">
            <Image
              src={getImageUrl(coverImage) || '/placeholder.svg'}
              alt={getImageAlt(coverImage) || title || 'Post cover'}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              width={1200}
              height={630}
              priority
            />
          </div>
        )}
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={date || ''} className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {date ? formatDate(date) : 'No date'}
            </time>
            {readTime && readTime > 0 && (
              <span className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {readTime} min read
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <Link
              href={`/posts/${slug.current}`}
              className="hover:underline"
            >
              {title || 'Untitled Post'}
            </Link>
          </h1>
          {excerpt && (
            <p className="text-xl text-muted-foreground">
              {excerpt}
            </p>
          )}
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" className="flex items-center">
            <Link href={`/posts/${slug.current}`}>
              Read more
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

interface RecentPostsProps {
  posts: PostWithReadTime[];
}

function RecentPosts({ posts }: RecentPostsProps) {
  if (!posts?.length) return null

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
        <Button variant="ghost" asChild>
          <Link href="/posts" className="flex items-center">
            View all
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default async function Page() {
  // Fetch hero post and recent posts in parallel
  const [heroPost, recentPosts] = await Promise.all([
    fetchHeroPost(),
    fetchRecentPosts(3)
  ]);

  return (
    <div className="container py-8">
      <div className="space-y-12">
        {heroPost && (
          <HeroPost
            title={heroPost.title || 'Untitled'}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            readTime={heroPost.content 
              ? Math.ceil(
                  heroPost.content
                    .filter((c: any) => c._type === 'block')
                    .map((block: any) => 
                      block.children?.map((child: any) => child.text).join('') || ''
                    )
                    .join(' ')
                    .split(/\s+/).length / 200
                )
              : 5 // Default read time if content is not available
            }
          />
        )}

        {recentPosts && recentPosts.length > 0 && (
          <RecentPosts posts={recentPosts} />
        )}
      </div>
    </div>
  );
}
