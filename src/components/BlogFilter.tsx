"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "./BlogCard";
import { BlogPostMeta } from "@/lib/mdx";
import { Search } from "lucide-react";
import * as motion from "framer-motion/client";
import { FadeIn, StaggerContainer, FadeInStaggerItem } from "./MotionWrappers";

interface BlogFilterProps {
  posts: BlogPostMeta[];
  categories: string[];
}

export function BlogFilter({ posts, categories }: BlogFilterProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesQuery = 
        (post.title || "").toLowerCase().includes(query.toLowerCase()) || 
        (post.description || "").toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, selectedCategory]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b border-border pb-6">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <StaggerContainer key={query + selectedCategory} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <FadeInStaggerItem key={post.slug}>
            <BlogCard post={post} />
          </FadeInStaggerItem>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-muted-foreground col-span-full py-10 text-center">
            No posts found. Try another search or category.
          </p>
        )}
      </StaggerContainer>
    </div>
  );
}
