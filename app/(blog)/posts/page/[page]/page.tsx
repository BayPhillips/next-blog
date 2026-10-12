import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PostsList, getTotalPostPages } from "../../posts-list";

type Props = {
  params: Promise<{ page: string }>;
};

// Sanity's API CDN caches for 60 seconds, so regenerating any sooner gains nothing.
export const revalidate = 60;

export async function generateStaticParams(): Promise<Array<{ page: string }>> {
  try {
    // Page 1 is /posts. Count published posts only, like the post pages do.
    const totalPages = await getTotalPostPages('published');
    return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

function parsePage(value: string) {
  return /^[1-9]\d*$/.test(value) ? Number(value) : null;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const page = parsePage((await props.params).page);
  return { title: page ? `All Posts – Page ${page}` : "All Posts" };
}

export default async function PostsPage(props: Props) {
  const page = parsePage((await props.params).page);
  if (!page) {
    notFound();
  }
  if (page === 1) {
    permanentRedirect("/posts");
  }
  return <PostsList page={page} />;
}
