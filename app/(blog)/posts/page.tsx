import { sanityFetch } from "@/sanity/lib/fetch";
import { paginatedPostsQuery, countPostsQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/post-card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

const POSTS_PER_PAGE = 10;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalPosts] = await Promise.all([
    sanityFetch({ query: paginatedPostsQuery, params: { start, end } }),
    sanityFetch({ query: countPostsQuery }),
  ]);

  if (!posts) {
    notFound();
  }

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <>
      <PageHeader title="All Posts" description="Browse all my posts" />
      <div id="posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => {
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
          
          return <PostCard className="post" key={post._id} post={postData} />;
        })}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <Link
              href={`/posts?page=${Math.max(1, page - 1)}`}
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
              href={`/posts?page=${Math.min(totalPages, page + 1)}`}
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