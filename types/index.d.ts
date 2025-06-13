import { Post as SanityPost } from 'sanity.types'

declare module 'sanity.types' {
  interface Post extends SanityPost {
    readTime?: number
  }
}

// Helper type to get the URL for a Sanity image
type SanityImage = {
  asset: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
  }
  media?: unknown
  hotspot?: any
  crop?: any
  alt?: string
  _type: 'image'
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.svg' {
  import * as React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
declare module '*.avif'
