"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { BlogPostMeta } from "@/lib/mdx";
import Link from "next/link";
import * as motion from "framer-motion/client";

export function SearchBar({ posts }: { posts?: BlogPostMeta[] }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const suggestions = posts 
    ? posts.filter(post => (post.title || "").toLowerCase().includes(query.toLowerCase()) && query.length > 0).slice(0, 5)
    : [];

  return (
    <div className="relative w-full max-w-md" onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setTimeout(() => setShowSuggestions(false), 200);
      }
    }}>
      <form onSubmit={handleSearch} className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <input
          type="text"
          className="block w-full rounded-full border border-border bg-background/50 py-3 pl-10 pr-4 text-foreground ring-1 ring-inset ring-transparent placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary focus:border-transparent focus:bg-background sm:text-sm sm:leading-6 backdrop-blur-md transition-all shadow-sm"
          placeholder="Search articles..."
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute mt-2 w-full rounded-2xl border border-border bg-card p-2 shadow-xl backdrop-blur-xl z-50 overflow-hidden"
        >
          <ul className="flex flex-col gap-1">
            {suggestions.map(post => (
              <li key={post.slug}>
                <Link 
                  href={`/blog/${post.slug}`}
                  onClick={() => setShowSuggestions(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-accent transition-colors"
                >
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium text-foreground line-clamp-1">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
