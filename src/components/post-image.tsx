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
  priority = false 
}: PostImageProps) {
  if (!imageAsset) return null;

  return (
    <img
      src={getImageUrl(imageAsset)}
      alt={alt}
      className={`w-full h-auto object-cover ${className}`}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}
