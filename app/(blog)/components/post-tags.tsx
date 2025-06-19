import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface PostTagsProps {
  tags?: string[] | null;
}

export default function PostTags({ tags }: PostTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-1">
      {tags.map((tag) => (
        <Link key={`tag-${tag}`} href={`/tags/${tag}`}>
          <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground">
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
