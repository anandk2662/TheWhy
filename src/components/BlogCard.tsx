import Link from "next/link";
import { BlogPostMeta } from "@/lib/mdx";
import * as motion from "framer-motion/client";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative flex flex-col items-start justify-between rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden"
    >
      {/* Decorative gradient background appearing on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.date} className="text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <Link
          href={`/blog/category/${post.category?.toLowerCase()}`}
          className="relative z-10 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          {post.category}
        </Link>
      </div>
      <div className="group/title relative mt-5">
        <h3 className="text-2xl font-bold leading-8 tracking-tight text-foreground group-hover/title:text-primary transition-colors duration-300">
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-muted-foreground/90">
          {post.description}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="relative z-10 inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
