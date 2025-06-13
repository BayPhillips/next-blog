'use client';

import Image from 'next/image';
import { SanityImageAsset } from '@/sanity.types';
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
    <Image
      src={getImageUrl(imageAsset)}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
    />
  );
}
