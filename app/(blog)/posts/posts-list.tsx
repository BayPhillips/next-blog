import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { paginatedPostsQuery, countPostsQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/post-card";
import { PageHeader } from "@/components/ui/page-header";

export const POSTS_PER_PAGE = 10;

// Pages live at /posts and /posts/page/N rather than /posts?page=N, because
// reading searchParams would force every request to render on demand.
export function postsPageHref(page: number) {
  return page <= 1 ? "/posts" : `/posts/page/${page}`;
}

export async function getTotalPostPages(perspective?: string) {
  const totalPosts = await sanityFetch({ query: countPostsQuery, perspective });
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
}

export async function PostsList({ page }: { page: number }) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalPages] = await Promise.all([
    sanityFetch({ query: paginatedPostsQuery, params: { start, end } }),
    getTotalPostPages(),
  ]);

  if (!posts?.length) {
    notFound();
  }

  return (
    <>
      <PageHeader title="All Posts" description="Browse all my posts" />
      <div id="posts" className="grid grid-cols-cards gap-8">
        {posts.map((post: any, index: number) => {
          // Transform the post data to match our Post type
          const postData = {
            ...post,
            slug: post.slug?.current || post.slug,
            coverImage: post.coverImage?.asset ? {
              asset: post.coverImage.asset,
              alt: post.coverImage.alt
            } : null,
            tags: post.tags || []
          };

          return <PostCard className="post" key={post._id} post={postData} priority={index === 0} headingLevel="h2" />;
        })}
      </div>

      {totalPages > 1 && (
        <div className="mbs-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <Link
              href={postsPageHref(Math.max(1, page - 1))}
              className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
                page <= 1
                  ? 'pointer-events-none text-muted-foreground/50'
                  : 'text-foreground hover:bg-accent'
              }`}
              aria-disabled={page <= 1}
              tabIndex={page <= 1 ? -1 : undefined}
            >
              Previous
            </Link>
            <span className="px-3 py-2 text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Link
              href={postsPageHref(Math.min(totalPages, page + 1))}
              className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
                page >= totalPages
                  ? 'pointer-events-none text-muted-foreground/50'
                  : 'text-foreground hover:bg-accent'
              }`}
              aria-disabled={page >= totalPages}
              tabIndex={page >= totalPages ? -1 : undefined}
            >
              Next
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
