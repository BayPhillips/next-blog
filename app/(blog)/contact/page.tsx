import { sanityFetch } from "@/sanity/lib/fetch";
import { contactQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/(blog)/components/portable-text";
import { PortableTextBlock } from 'next-sanity';

export default async function ContactPage() {
  const contactData = await sanityFetch({ query: contactQuery});

  return (
    <article className="mb-8">
      <h1 className="text-balance font-serif leading-tight tracking-tighter text-6xl mb-8">{contactData?.title}</h1>
      {(contactData?.content ?? []).length > 0 ? <PortableText value={contactData?.content as PortableTextBlock[]} /> : null }
    </article>
  )
}