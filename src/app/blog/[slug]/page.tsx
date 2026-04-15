import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/mdx";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { BlogCard } from "@/components/BlogCard";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx?$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.meta.title} | TheWhy`,
      description: post.meta.description,
      openGraph: {
        title: post.meta.title,
        description: post.meta.description,
        type: "article",
        publishedTime: post.meta.date,
        tags: post.meta.tags,
      },
    };
  } catch (e) {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  let post;
  
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  const { meta, content } = post;
  const allPosts = await getAllPosts();
  
  let prevPost = null;
  let nextPost = null;


  if (meta.series) {
    const seriesPosts = allPosts
      .filter((p) => p.series === meta.series)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const currentIndex = seriesPosts.findIndex((p) => p.slug === meta.slug);
    if (currentIndex > 0) prevPost = seriesPosts[currentIndex - 1];
    if (currentIndex > -1 && currentIndex < seriesPosts.length - 1) nextPost = seriesPosts[currentIndex + 1];
  } else {
    // If not in a series, navigate to another post with the same category/tag
    const sameTagPosts = allPosts
      .filter((p) => p.category === meta.category || (p.tags && p.tags.some(tag => meta.tags?.includes(tag))))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const currentIndex = sameTagPosts.findIndex((p) => p.slug === meta.slug);
    if (currentIndex > 0) prevPost = sameTagPosts[currentIndex - 1];
    if (currentIndex > -1 && currentIndex < sameTagPosts.length - 1) nextPost = sameTagPosts[currentIndex + 1];
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== meta.slug && (p.category === meta.category || p.tags?.some(tag => meta.tags?.includes(tag))))
    .slice(0, 3); // Get top 3 related

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
      ],
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-4xl px-6 py-12 md:py-16">
        <Breadcrumbs />
        <article className="mt-8">
          <header className="mb-10 flex flex-col items-start gap-4 border-b pb-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {meta.category}
              </span>
              <span className="text-sm text-muted-foreground">{meta.readingTime}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {meta.title}
            </h1>
            <p className="text-lg text-muted-foreground">{meta.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <time dateTime={meta.date}>
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>
          <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none prose-headings:scroll-mt-20 prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-img:rounded-xl">
            {/* @ts-expect-error next-mdx-remote types issue */}
            <MDXRemote source={content} options={options} />
          </div>
        </article>

        {/* Series and Navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-16 flex flex-col sm:flex-row justify-between items-center border-t pt-8 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col items-start w-full sm:w-1/2 border border-border bg-card rounded-xl p-4 hover:border-primary/50 hover:shadow-sm transition-all text-left">
                <span className="text-sm font-medium text-muted-foreground mb-1 group-hover:text-primary transition-colors">← Previous {meta.series ? "in Series" : "Post"}</span>
                <span className="font-bold text-foreground line-clamp-1">{prevPost.title}</span>
              </Link>
            ) : <div className="w-full sm:w-1/2" />}
            
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col items-end text-right w-full sm:w-1/2 border border-border bg-card rounded-xl p-4 hover:border-primary/50 hover:shadow-sm transition-all text-right mt-4 sm:mt-0">
                <span className="text-sm font-medium text-muted-foreground mb-1 group-hover:text-primary transition-colors">{meta.series ? "Next in Series" : "Next Post"} →</span>
                <span className="font-bold text-foreground line-clamp-1">{nextPost.title}</span>
              </Link>
            ) : <div className="w-full sm:w-1/2" />}
          </div>
        )}
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 border-t pt-10">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Related Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <BlogCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
