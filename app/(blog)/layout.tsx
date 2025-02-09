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
import Header from "./components/header";
import { Analytics } from "@vercel/analytics/react"

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
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});


async function Footer(props: { settings: SettingsQueryResult }) {
  const { settings } = props;
  const footer = settings?.footer || [];

  return (
    <footer className="bg-accent-1 border-accent-2 border-t">
      <div className="container mx-auto px-5">
        {footer.length > 0 ? (
          <PortableText
            className="prose-sm text-pretty bottom-0 w-full max-w-none bg-white py-12 text-center md:py-20"
            value={footer as PortableTextBlock[]}
          />
        ) : null}
      </div>
    </footer>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityFetch({ query: settingsQuery });
  return (
    <html lang="en" className={`${nunito.variable} ${lora.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen container mx-auto px-5">
          {(await draftMode()).isEnabled && <AlertBanner />}
          <Header settings={settings} />
          <main>{children}</main>
          <Suspense>
            <Footer settings={settings} />
          </Suspense>
        </section>
        {(await draftMode()).isEnabled && <VisualEditing />}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
