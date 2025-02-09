import Link from "next/link";

interface PostTagsProps {
  tags?: string[] | null;
}

export default function PostTags({ tags }: PostTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
