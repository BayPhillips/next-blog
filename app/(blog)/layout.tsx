import "../globals.css";

import type { Metadata } from "next";
import {
  VisualEditing,
} from "next-sanity/visual-editing";
import { toPlainText } from "next-sanity";
import { Nunito, Lora } from "next/font/google";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import AlertBanner from "./alert-banner";
import PortableText from "./components/portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { fetchSanityData } from "@/lib/sanity/fetch";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { SettingsQueryResult } from "@/sanity.types";
import { SiteHeader } from "@/components/ui/site-header"
import { SiteFooter } from "@/components/ui/site-footer"
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSanityData<SettingsQueryResult>({
    query: settingsQuery,
    stega: false,
    useCache: false, // Don't use cache during build
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
  const settings = await fetchSanityData<SettingsQueryResult>({
    query: settingsQuery,
    stega: false,
    useCache: false, // Don't use cache during build
  });
  return (
    <html lang="en" className={`${nunito.variable} ${lora.variable} font-sans min-h-screen`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "system"]}
        >
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
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": ""}'
            strategy="afterInteractive"
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
