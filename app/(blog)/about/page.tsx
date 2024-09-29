import { About } from '@/sanity.types.js';
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/(blog)/components/portable-text";
import { PortableTextBlock } from 'next-sanity';

export default async function AboutPage() {
  const aboutData: About = await sanityFetch({ query: aboutQuery});

  return (
    <article>
      <PortableText value={aboutData.content as PortableTextBlock[]} />
    </article>
  )
}