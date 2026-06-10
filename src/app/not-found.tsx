import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div className="max-w-lg">
        <p className="font-mono text-sm uppercase text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground">
          Signal lost.
        </h1>
        <p className="mt-4 text-muted-foreground">
          The route you requested is outside the current portfolio map.
        </p>
        <Button asChild className="mt-8" data-sound>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
