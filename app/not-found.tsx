import Link from "next/link";

import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <div className="flex min-h-dvh flex-col items-center justify-center p-8 text-center">
          <h1 className="mb-4 text-6xl font-bold">404</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            This page could not be found.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90"
          >
            Go back home
          </Link>
        </div>
      </body>
    </html>
  );
}
