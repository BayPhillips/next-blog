import createImageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/lib/client"
import { dataset, projectId } from "@/sanity/lib/api"

const builder = createImageUrlBuilder(client)

export function urlForImage(source: any) {
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

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filePath}.${fileExtension}`;
}