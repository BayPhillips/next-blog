import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "../../components/ui/button"
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "../../components/ui/icons"
import { formatDate } from "../../lib/date-utils"
import { fetchHeroPost, fetchRecentPosts, type PostWithReadTime } from "../../lib/sanity/fetch"
import { getImageUrl, getImageAlt } from "../../lib/sanity/utils"
import type { Post } from "../../sanity.types"
import { PostCard } from "../../components/post-card"
import PostTags from "./post-tags"

interface HeroPostProps {
  post: Post;
}

function HeroPost({ post }: HeroPostProps) {
  return (
    <section className="hero mb-16">
      <div className="overflow-hidden border-none shadow-lg rounded-lg">
        {post.coverImage?.asset?._ref && (
          <div className="relative h-96 w-full">
            <img
              src={getImageUrl(post.coverImage) || '/placeholder.svg'}
              alt={getImageAlt(post.coverImage) || post.title || 'Post cover'}
              className="object-cover w-full h-full"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date || ''} className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {post.date ? formatDate(post.date) : 'No date'}
            </time>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <Link
              to={`/posts/${post.slug?.current}`}
              className="hover:underline"
            >
              {post.title || 'Untitled Post'}
            </Link>
          </h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
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
          <Link to="/posts" className="flex items-center">
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

export const Route = createFileRoute('/(blog)/')({
  component: HomePage,
  loader: async () => {
    // Fetch hero post and recent posts in parallel
    const [heroPost, recentPosts] = await Promise.all([
      fetchHeroPost(),
      fetchRecentPosts(3)
    ]);
    return { heroPost, recentPosts }
  },
})

function HomePage() {
  const { heroPost, recentPosts } = Route.useLoaderData()

  return (
    <div className="space-y-12">
      {heroPost && (
        <HeroPost
          post={heroPost as Post}
        />
      )}

      {recentPosts && recentPosts.length > 0 && (
        <RecentPosts posts={recentPosts} />
      )}
    </div>
  )
}