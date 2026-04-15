import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogFilter } from "@/components/BlogFilter";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | TheWhy",
  description: "Read all the latest articles on web development, React, and Next.js.",
};

export default async function BlogIndexPage() {
  const allPosts = await getAllPosts();
  const allCategories = await getAllCategories();


  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-6 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl pb-4">
              The Blog
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              Thoughts on software engineering, UI/UX, and career growth. Sort by category or search directly.
            </p>
          </div>
          
          <BlogFilter posts={allPosts} categories={allCategories} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
