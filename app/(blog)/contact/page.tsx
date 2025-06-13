import { sanityFetch } from "@/sanity/lib/fetch"
import { contactQuery } from "@/sanity/lib/queries"
import PortableText from "@/app/(blog)/components/portable-text"
import { PortableTextBlock } from 'next-sanity'
import { PageHeader } from "@/components/ui/page-header"
import { ContactForm } from "@/components/contact-form"

interface ContactData {
  _id: string
  _type: 'contact'
  title?: string
  description?: string
  content?: PortableTextBlock[]
  email?: string
  phone?: string
  address?: string
  socialLinks?: Array<{
    _key: string
    platform: string
    url: string
  }>
}

export default async function ContactPage() {
  const contactData = await sanityFetch({
    query: contactQuery,
    perspective: 'published'
  }) as ContactData | null

  if (!contactData) {
    return (
      <div className="container py-12">
        <p>No contact information found.</p>
      </div>
    )
  }

  const content = Array.isArray(contactData.content) ? contactData.content : []
  const hasContent = content.length > 0

  return (
    <article className="container py-12 max-w-4xl mx-auto">
      <PageHeader 
        title={contactData.title || 'Contact Us'} 
        description={contactData.description}
        className="mb-12"
      />
      
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {hasContent && <PortableText value={content} />}
          
          {(contactData.email || contactData.phone || contactData.address) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <ul className="space-y-2">
                {contactData.email && (
                  <li className="flex items-center">
                    <span className="w-24 text-muted-foreground">Email:</span>
                    <a 
                      href={`mailto:${contactData.email}`}
                      className="hover:text-primary hover:underline"
                    >
                      {contactData.email}
                    </a>
                  </li>
                )}
                {contactData.phone && (
                  <li className="flex items-center">
                    <span className="w-24 text-muted-foreground">Phone:</span>
                    <a 
                      href={`tel:${contactData.phone.replace(/\D/g, '')}`}
                      className="hover:text-primary hover:underline"
                    >
                      {contactData.phone}
                    </a>
                  </li>
                )}
                {contactData.address && (
                  <li className="flex">
                    <span className="w-24 text-muted-foreground">Address:</span>
                    <address className="not-italic">
                      {contactData.address}
                    </address>
                  </li>
                )}
              </ul>
            </div>
          )}
          
          {contactData.socialLinks && contactData.socialLinks.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {contactData.socialLinks.map((link) => (
                  <a
                    key={link._key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link.platform}
                  >
                    <span className="sr-only">{link.platform}</span>
                    <span>{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}