"use client";

import { useState } from "react";
import { BlueskyIcon, FacebookIcon, LinkedinIcon, TwitterIcon, CopyIcon } from "./social-icons";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: TwitterIcon,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: LinkedinIcon,
    },
    {
      name: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
      icon: BlueskyIcon,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-12 border-t border-gray-200 pt-8">
      <span className="text-gray-600 text-sm font-medium">Share this post</span>
      <div className="flex gap-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative group"
          aria-label="Copy link"
        >
          <CopyIcon className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
