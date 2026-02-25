import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: "2rem",
        }}>
          <h1 style={{ fontSize: "4rem", fontWeight: "bold", margin: "0 0 1rem" }}>404</h1>
          <p style={{ fontSize: "1.25rem", color: "#666", marginBottom: "2rem" }}>
            This page could not be found.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#fff",
              backgroundColor: "#18181b",
              borderRadius: "0.375rem",
              textDecoration: "none",
            }}
          >
            Go back home
          </Link>
        </div>
      </body>
    </html>
  );
}
