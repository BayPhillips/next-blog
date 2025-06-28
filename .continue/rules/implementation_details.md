---
name: Implementation Details
alwaysApply: true
---

# Next.js Blog with Sanity CMS - Implementation Details

## Overview
This is a modern blog application built with Next.js, Sanity.io, and Tailwind CSS. The application is hosted on Vercel with Cloudflare integration. It features a headless CMS architecture where content is managed in Sanity and displayed through a Next.js frontend.

## Tech Stack
- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io (Headless CMS)
- **Hosting**: Vercel
- **CDN**: Cloudflare
- **Analytics**: Vercel Analytics
- **Performance**: Vercel Speed Insights

## Project Structure

### Key Directories
- `/app` - Next.js 13+ App Router pages and layouts
  - `/(blog)` - Main blog routes and components
  - `/(sanity)` - Sanity Studio configuration
  - `/api` - API routes
- `/components` - Reusable UI components
- `/sanity` - Sanity configuration and schemas
  - `/schemas` - Content type definitions
  - `/lib` - Helper functions and API clients

## Content Management (Sanity)

### Content Types
1. **Post**
   - Title, slug, content (Portable Text)
   - Cover image with alt text
   - Publication date
   - Author reference
   - Tags
   - Excerpt
   - SEO metadata

2. **Author**
   - Name
   - Bio
   - Profile picture
   - Social links

3. **Settings (Singleton)**
   - Site title and description
   - Social media links
   - SEO settings
   - Navigation items

### Schema Features
- Custom blocks for rich text editing
- Image handling with alt text
- Custom components (e.g., image grids, tweet embeds)
- SEO optimization fields
- Preview configurations

## Frontend Architecture

### Data Fetching
- Uses Next.js 13+ Server Components for data fetching
- Implements ISR (Incremental Static Regeneration) for blog posts
- Handles draft mode for previewing unpublished content
- Implements proper caching strategies

### Key Components

#### Layout Components
- `SiteHeader` - Main navigation and site header
- `SiteFooter` - Footer with site information
- `AlertBanner` - For important announcements

#### Post Components
- `PostCard` - Preview card for blog posts
- `CoverImage` - Responsive cover images with lazy loading
- `PortableText` - Renders Sanity's Portable Text format
- `PostTags` - Displays tags for categorization
- `ShareButtons` - Social sharing functionality

#### UI Components
- Custom form elements (inputs, buttons, etc.)
- Typography components
- Responsive design utilities

### Routing
- `/` - Blog homepage with latest posts
- `/posts` - Archive of all posts
- `/posts/[slug]` - Individual blog post
- `/tags/[tag]` - Posts filtered by tag
- `/about` - About page
- `/contact` - Contact form page

## Performance Optimizations
- Image optimization with Next/Image
- Font optimization with next/font
- Code splitting and lazy loading
- Proper caching headers
- Bundle size optimizations

## Development Workflow

### Local Development
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Start Sanity Studio: `cd sanity && npm run dev`

### Environment Variables
Required environment variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_READ_TOKEN=
NEXT_PUBLIC_VERCEL_URL=
```

## Deployment
- Automatic deployments on push to main branch
- Preview deployments for pull requests
- Environment-specific configurations

## SEO & Analytics
- Built-in metadata handling
- Sitemap generation
- OpenGraph and Twitter card support
- Vercel Analytics integration

## Custom Features
- Contact form with server actions
- Image grid component
- Tweet embedding
- Code syntax highlighting
- Dark mode support
- Responsive design

## Dependencies
- `next-sanity` - Sanity.io integration
- `@sanity/*` - Sanity client and utilities
- `@vercel/*` - Vercel analytics and speed insights
- `tailwindcss` - Utility-first CSS framework
- `date-fns` - Date formatting
- `react-share` - Social sharing buttons
- `@portabletext/*` - Portable Text rendering

## Future Improvements
- Implement comments system
- Add search functionality
- Newsletter integration
- Content tagging improvements
- Performance monitoring
- More interactive components