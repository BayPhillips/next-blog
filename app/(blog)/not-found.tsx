import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold mbe-4">404</h1>
      <p className="text-xl text-muted-foreground mbe-8">
        This page could not be found.
      </p>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
