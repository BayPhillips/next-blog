import { groq } from 'next-sanity';

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)]
`

export const pagesQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    slug,
    title,
  }
`