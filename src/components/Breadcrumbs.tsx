"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-foreground transition-colors flex items-center">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {segments.map((segment, index) => {
        const url = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const formattedSegment = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div key={url} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {formattedSegment}
              </span>
            ) : (
              <Link href={url} className="hover:text-foreground transition-colors">
                {formattedSegment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
