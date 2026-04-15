import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { getAllCategories, getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ category: cat.toLowerCase() }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} | Category | TheWhy`,
    description: `All blog posts related to ${category}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;
  const allPosts = await getAllPosts();
  const categoryPosts = allPosts.filter((post) => post.category?.toLowerCase() === category.toLowerCase());


  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="mb-12 border-b pb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl capitalize">
              {category.replace(/-/g, " ")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A curated collection of thoughts and tutorials on {category.replace(/-/g, " ")}.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
            {categoryPosts.length === 0 && (
              <p className="text-muted-foreground col-span-full">No posts available for this category.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
