import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";


export default defineType({
  name: "contact",
  title: "Contact",
  icon: EnvelopeIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: 'Main heading shown on the contact page (e.g. "Get in touch")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "A short tagline shown below the title",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Your contact email address",
      validation: (rule) =>
        rule.custom((val) => {
          if (!val) return true;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(val) ? true : "Must be a valid email address";
        }),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      description: "Add links to your social media profiles",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Bluesky", value: "bluesky" },
                  { title: "Threads", value: "threads" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Twitch", value: "twitch" },
                  { title: "Discord", value: "discord" },
                  { title: "Mastodon", value: "mastodon" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Display Label (optional)",
              type: "string",
              description: "Override the platform name shown on the page (e.g. @username)",
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
              label: "label",
            },
            prepare({ platform, url, label }) {
              return {
                title: label || platform,
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Additional Content",
      type: "array",
      description: "Optional rich text shown below the contact details",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return { title, subtitle: "Contact page" };
    },
  },
});
