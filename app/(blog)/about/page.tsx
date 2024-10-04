import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/(blog)/components/portable-text";
import { PortableTextBlock } from 'next-sanity';

export default async function AboutPage() {
  const aboutData = await sanityFetch({ query: aboutQuery});

  return (
    <article className="mb-8">
      <h1 className="text-balance font-serif leading-tight tracking-tighter text-6xl mb-8">{aboutData?.title}</h1>
      {(aboutData?.content ?? []).length > 0 ? <PortableText value={aboutData?.content as PortableTextBlock[]} /> : null }
    </article>
  )
}