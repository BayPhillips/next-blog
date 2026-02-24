import { sanityFetch } from "@/sanity/lib/fetch"
import { contactQuery } from "@/sanity/lib/queries"
import PortableText from "@/app/(blog)/components/portable-text"
import { PortableTextBlock } from 'next-sanity'
import { ContactForm } from "@/components/contact-form"
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Twitch,
  Mail,
  ArrowUpRight,
  Link as LinkIcon,
} from "lucide-react"

interface SocialLink {
  _key: string
  platform: string
  url: string
  label?: string
}

interface ContactData {
  _id: string
  _type: 'contact'
  title?: string
  description?: string
  email?: string
  socialLinks?: SocialLink[]
  content?: PortableTextBlock[]
}

const platformConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  github:    { icon: Github,    label: "GitHub",       color: "hover:border-[#333] dark:hover:border-[#eee]" },
  twitter:   { icon: Twitter,   label: "Twitter / X",  color: "hover:border-[#1DA1F2]" },
  linkedin:  { icon: Linkedin,  label: "LinkedIn",     color: "hover:border-[#0A66C2]" },
  instagram: { icon: Instagram, label: "Instagram",    color: "hover:border-[#E1306C]" },
  youtube:   { icon: Youtube,   label: "YouTube",      color: "hover:border-[#FF0000]" },
  facebook:  { icon: Facebook,  label: "Facebook",     color: "hover:border-[#1877F2]" },
  twitch:    { icon: Twitch,    label: "Twitch",       color: "hover:border-[#9146FF]" },
  bluesky:   { icon: LinkIcon,  label: "Bluesky",      color: "hover:border-[#0085FF]" },
  threads:   { icon: LinkIcon,  label: "Threads",      color: "hover:border-foreground" },
  tiktok:    { icon: LinkIcon,  label: "TikTok",       color: "hover:border-foreground" },
  discord:   { icon: LinkIcon,  label: "Discord",      color: "hover:border-[#5865F2]" },
  mastodon:  { icon: LinkIcon,  label: "Mastodon",     color: "hover:border-[#6364FF]" },
}

function SocialCard({ link }: { link: SocialLink }) {
  const config = platformConfig[link.platform] ?? { icon: LinkIcon, label: link.platform, color: "hover:border-primary" }
  const Icon = config.icon
  const displayLabel = link.label || config.label

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group flex items-center gap-3 rounded-xl border bg-card px-4 py-3",
        "text-card-foreground transition-all duration-200",
        "hover:shadow-md",
        config.color,
      ].join(" ")}
    >
      <Icon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      <span className="flex-1 text-sm font-medium">{displayLabel}</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-opacity opacity-0 group-hover:opacity-100" />
    </a>
  )
}

export default async function ContactPage() {
  const contactData = await sanityFetch({
    query: contactQuery,
    perspective: process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE || 'published'
  }) as ContactData | null

  const title = contactData?.title || "Get in touch"
  const description = contactData?.description
  const email = contactData?.email
  const socialLinks = contactData?.socialLinks ?? []
  const content = Array.isArray(contactData?.content) ? contactData!.content! : []

  return (
    <article className="max-w-4xl">
      {/* Header */}
      <header className="mb-12 space-y-3">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>
        )}
      </header>

      <div className="grid gap-10 sm:grid-cols-2">
        {/* Email section */}
        {email && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Email
            </h2>
            <a
              href={`mailto:${email}`}
              className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all duration-200 hover:border-primary/60 hover:shadow-md"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{email}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Send an email</p>
              </div>
              <ArrowUpRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </section>
        )}

        {/* Social links section */}
        {socialLinks.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Find me on
            </h2>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <SocialCard key={link._key} link={link} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Divider + form */}
      <div className="mt-14">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">or send a message</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="max-w-lg">
          <ContactForm />
        </div>
      </div>

      {/* Optional rich-text content */}
      {content.length > 0 && (
        <div className="mt-12 border-t pt-10">
          <PortableText value={content} />
        </div>
      )}
    </article>
  )
}
