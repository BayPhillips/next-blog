import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const aboutQuery = defineQuery(`*[_type == "about"][0]`);

export const contactQuery = defineQuery(`*[_type == "contact"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{name, picture},
  tags,
  `;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

export const postsQuery = defineQuery(`
  *[_type == "post"] {
    ${postFields}
  }
`);

export const postsByTagQuery = defineQuery(`
  *[_type == "post" && $tag in tags] | order(date desc) {
    ${postFields}
  }
`);

export const paginatedPostsQuery = defineQuery(`
  *[_type == "post"] | order(date desc) [$start...$end] {
    ${postFields}
  }
`);

export const countPostsQuery = defineQuery(`
  count(*[_type == "post"])
`);