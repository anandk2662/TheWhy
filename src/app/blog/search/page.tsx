import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { SearchBar } from "@/components/SearchBar";
import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | TheWhy",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams;
  const qStr = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const query = typeof qStr === "string" ? qStr : "";
  const allPosts = await getAllPosts();

  
  const results = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
      post.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="mb-10 flex flex-col gap-6 items-start md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Search Results</h1>
              <p className="mt-2 text-muted-foreground">
                Showing results for &quot;<span className="font-semibold text-foreground">{query}</span>&quot;
              </p>
            </div>
            <div className="w-full md:max-w-md">
              <SearchBar />
            </div>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.length > 0 ? (
              results.map((post) => <BlogCard key={post.slug} post={post} />)
            ) : (
              <p className="text-muted-foreground col-span-3 text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
                No posts found matching your search query. Try another keyword!
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
