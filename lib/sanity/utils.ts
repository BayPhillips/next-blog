import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
// Define the image type that matches our Sanity image structure
type SanityImage = {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [key: string]: any;
  };
  media?: unknown;
  hotspot?: {
    _type: string;
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  crop?: {
    _type: string;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  alt?: string;
  _type: "image";
} | null | undefined;

// Create a Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

// Create a URL builder for Sanity images
const builder = imageUrlBuilder(client);

/**
 * Get the image URL from a Sanity image object
 */
export function getImageUrl(source: SanityImage | null | undefined): string {
  if (!source?.asset?._ref) return '';
  return builder.image(source as any).url();
}

/**
 * Get the alt text for a Sanity image, falling back to an empty string
 */
export function getImageAlt(source: SanityImage | null | undefined): string {
  return source?.alt || '';
}

/**
 * Get the aspect ratio of a Sanity image
 */
export function getImageDimensions(source: SanityImage | null | undefined): { width: number; height: number } {
  if (!source?.asset?._ref) {
    return { width: 1200, height: 630 }; // Default dimensions
  }
  
  const dimensions = source.asset._ref.split('-')[2];
  if (!dimensions) {
    return { width: 1200, height: 630 }; // Fallback if dimensions can't be parsed
  }
  
  const [width, height] = dimensions.split('x').map(Number);
  
  return { 
    width: isNaN(width) ? 1200 : width, 
    height: isNaN(height) ? 630 : height 
  };
}

/**
 * Generate a URL for a Sanity image with the specified width and quality
 */
export function getSanityImageUrl(
  source: SanityImage | null | undefined, 
  width: number, 
  quality = 75
): string {
  if (!source?.asset?._ref) return '';
  
  return builder
    .image(source)
    .width(width)
    .quality(quality)
    .auto('format')
    .url();
}
