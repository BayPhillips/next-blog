import { SanityImageSource } from "@sanity/image-url"
import { imageUrlBuilder } from "@sanity/image-url"
import { client } from "@/sanity/lib/client"

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

export function buildImageUrl(asset: any): string {
  if (!asset) return '';
  if (asset.url) return asset.url;
  if (asset.asset?.url) return asset.asset.url;
  
  // Build Sanity URL from reference
  const ref = asset._ref || asset.asset?._ref;
  if (!ref) return '';
  
  const refParts = ref.split('-');
  const fileExtension = refParts[1];
  const filePath = refParts.slice(2).join('-');
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filePath}.${fileExtension}`;
}