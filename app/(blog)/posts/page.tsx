import type { Metadata } from "next";
import { PostsList } from "./posts-list";

export const metadata: Metadata = {
  title: "All Posts",
};

// Sanity's API CDN caches for 60 seconds, so regenerating any sooner gains nothing.
export const revalidate = 60;

export default function BlogPage() {
  return <PostsList page={1} />;
}
