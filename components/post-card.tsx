import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CalendarDays, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { PostImage } from "./post-image"
import { Post } from "@/sanity.types"

export type SanityImageAsset = {
  _type: 'sanity.imageAsset'
  _ref: string
  url?: string
  metadata?: {
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export type SanityImage = {
  _type: 'image'
  asset: SanityImageAsset
  alt?: string
  caption?: string
}

type PostCardProps = {
  post: Post
  className?: string
}

// Helper function to build the image URL from Sanity reference
const buildImageUrl = (asset: SanityImageAsset): string => {
  if (asset.url) return asset.url;
  
  // Extract the file extension and path from the reference
  const refParts = asset._ref.split('-');
  const fileExtension = refParts[1];
  const filePath = refParts.slice(2).join('-');
  
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${filePath}.${fileExtension}`;
};

export function PostCard({ post, className }: PostCardProps) {
  const { 
    title, 
    excerpt, 
    slug: slugProp, 
    coverImage, 
    date,  
    tags
  } = post;
  
  // Create a proper SanityImage object with a reference to the asset
  const image = coverImage?.asset ? {
    _type: 'image' as const,
    asset: {
      _type: 'reference' as const,
      _ref: coverImage.asset._ref,
      _weak: true
    },
    alt: coverImage.alt || ''
  } : undefined;

  // Ensure slug is always a string and handle potential undefined
  const slug = typeof slugProp === 'string' ? slugProp : slugProp?.current || '';
  const postUrl = `/posts/${slug}`;
  return (
    <Card className={cn("flex flex-col h-full overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="relative h-48 w-full">
        {image && (
          <PostImage
            imageAsset={image}
            alt={coverImage?.alt || title || 'Post cover image'}
            className="w-full h-full"
            priority={false}
          />
        )}
      </div>
      <CardHeader className="flex-1">
        <h3 className="text-xl font-semibold leading-tight tracking-tight">
          <Link href={postUrl} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date || '')}</time>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 mt-auto">
        {tags?.map((tag) => {
            return (
              <Link key={`tag-${tag}`} href={`/tags/${tag}`}>
                <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground">
                  {tag}
                </Badge>
              </Link>
            );
          })}
        <Button variant="ghost" className="ml-auto" asChild>
          <Link href={postUrl}>
            Read more
            <span className="sr-only">about {title}</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
