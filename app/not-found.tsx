import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-8xl font-black text-amber-500/20 mb-4">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-[var(--hv-text-primary)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--hv-text-secondary)] text-sm leading-relaxed mb-8">
          The heritage site or page you're looking for doesn't exist yet.
          Perhaps it's waiting to be discovered — like so many of India's
          hidden treasures.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="gold" leftIcon={<ArrowLeft size={16} />}>
              Go Home
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="secondary">Explore Sites</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
