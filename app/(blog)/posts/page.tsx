import Link from "next/link";
import DateComponent from "../date";
import CoverImage from "../cover-image";
import PostTags from "../components/post-tags";
import { sanityFetch } from "@/sanity/lib/fetch";
import { paginatedPostsQuery, countPostsQuery } from "@/sanity/lib/queries";

const POSTS_PER_PAGE = 10;

interface Props {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalPosts] = await Promise.all([
    sanityFetch({ query: paginatedPostsQuery, params: { start, end } }),
    sanityFetch({ query: countPostsQuery }),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div>
      <h1 className="text-pretty mb-12 text-4xl font-serif leading-tight tracking-tighter md:text-7xl md:leading-none">Posts</h1>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts?.map((post: { date?: any; _id?: any; title?: any; slug?: any; coverImage?: any; excerpt?: any; tags?: any; }) => {
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

      {/* Pagination */}
      <div className="flex justify-center mb-12">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Link
            key={pageNumber}
            href={`/posts/?page=${pageNumber}`}
            className={`px-4 py-2 mx-1 rounded ${
              page === pageNumber ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </Link>
        ))}
      </div>
    </div>
  );
}