import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Nunito, Lora } from "next/font/google";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import AlertBanner from "./alert-banner";
import PortableText from "./components/portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { SettingsQueryResult } from "@/sanity.types";
import { SiteHeader } from "@/components/ui/site-header"
import { SiteFooter } from "@/components/ui/site-footer"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: './'
    }
  };
}

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityFetch({ query: settingsQuery });
  return (
    <html lang="en" className={`${nunito.variable} ${lora.variable} font-sans min-h-screen`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          {(await draftMode()).isEnabled && <AlertBanner />}
          <SiteHeader settings={settings} />
          <main className="flex-1">
            <div className="container py-12">
              {children}
            </div>
          </main>
          <SiteFooter settings={settings} />
        </div>
        {(await draftMode()).isEnabled && (
          <Suspense>
            <VisualEditing />
          </Suspense>
        )}
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
