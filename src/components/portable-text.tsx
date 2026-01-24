/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText as BasePortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/api";
import { cn } from "@/lib/utils";
import { Code } from "@/components/ui/code";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ImageGrid from "./image-grid";
import { Tweet } from "react-tweet";

// Custom components for different block types
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold tracking-tight mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold tracking-tight mt-4 mb-2">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold tracking-tight mt-3 mb-2">
        {children}
      </h5>
    ),
    normal: ({ children }) => {
      if (Array.isArray(children) && children.length === 1 && children[0] === '') {
        return <div className="pt-2" />;
      }
      return <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>;
    },
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-4 hover:text-primary"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      // TODO: Implement image URL generation for TanStack Start
      const imageUrl = value?.asset?.url || '';
      if (!imageUrl) {
        return null;
      }
      return (
        <div className="my-6 overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={value.alt || 'Image'}
            className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }) => {
      return (
        <div className="my-6 overflow-hidden rounded-lg border">
          <div className="bg-muted px-4 py-2 font-mono text-sm font-medium">
            {value.language}
          </div>
          <Code 
            code={value.code} 
            language={value.language}
            className="[&>pre]:p-4 [&>pre]:my-0 [&>pre]:rounded-none [&>pre]:bg-background"
          />
        </div>
      );
    },
    imagegrid: ({ value }) => {
      return <ImageGrid images={value.images || []} />;
    },
    twitter: ({ value }) => {
      const id = value?.id;
      if (!id) return null;
      return (
        <div className="my-6 justify-center">
          <Tweet id={id} />
        </div>
      );
    },
  },
};

interface CustomPortableTextProps {
  className?: string;
  value: PortableTextBlock[];
}

export default function CustomPortableText({
  className,
  value,
}: CustomPortableTextProps) {
  if (!value) return null;
  
  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      <BasePortableText 
        components={components} 
        value={value} 
      />
    </div>
  );
}

