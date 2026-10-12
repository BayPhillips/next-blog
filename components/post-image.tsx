import Image from 'next/image';
import { getImageUrl } from '@/lib/sanity/utils';
import { SanityImage } from '@/types';

interface PostImageProps {
  imageAsset: SanityImage;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function PostImage({ 
  imageAsset, 
  alt = '', 
  className = '',
  priority = false,
}: PostImageProps) {
  if (!imageAsset) return null;

  return (
    <Image
      src={getImageUrl(imageAsset)}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      // Cards fill a grid of >= 20rem columns inside the 72rem content column.
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
      // Next 16's `priority` only preloads; this also raises the request's priority.
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}
