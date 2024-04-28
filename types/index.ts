import type { PortableTextBlock } from 'next-sanity';
import type { Image } from 'sanity';

export interface PostPayload {
  _type: string
  slug?: string
  title?: string
  body?: PortableTextBlock[]
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}