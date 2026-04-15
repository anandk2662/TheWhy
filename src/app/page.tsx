import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/components/BlogCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllPosts, getAllCategories } from "@/lib/mdx";
import { SearchBar } from "@/components/SearchBar";
import { Newsletter } from "@/components/Newsletter";
import * as motion from "framer-motion/client";
import { StaggerContainer, FadeInStaggerItem, FadeIn } from "@/components/MotionWrappers";

export default async function Home() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();


  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        {/* Fullscreen Hero Section */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center pt-24 pb-16 px-4">
          {/* Ambient Background Gradient (squarespace/stripe feel) */}
          <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl opacity-30 pointer-events-none" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#a855f7] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>

          <StaggerContainer className="flex flex-col items-center text-center space-y-8 max-w-4xl w-full z-10">
            {/* Logo */}
            <FadeInStaggerItem>
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                <Image
                  src="/logo.svg"
                  alt="TheWhy logo"
                  width={80}
                  height={80}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
                Hi, I'm Anand Kumar.
              </h1>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                  Where Curiosity Meets What's Next
                </span>
              </h2>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <p className="mx-auto max-w-[42rem] text-muted-foreground sm:text-xl leading-relaxed">
                Welcome to <span className="font-semibold text-foreground">TheWhy</span> — a minimal, premium space where I explore programming, share insights, and dive into the latest in tech.
              </p>
            </FadeInStaggerItem>

            <FadeInStaggerItem className="w-full flex justify-center max-w-sm mt-4 relative z-50">
              <SearchBar posts={posts} />
            </FadeInStaggerItem>

            <FadeInStaggerItem className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/blog"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow"
              >
                Read the Blog
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                More About Me
              </motion.a>
            </FadeInStaggerItem>
          </StaggerContainer>
        </section>

        {/* Categories Section */}
        <FadeIn delay={0.2}>
          <section className="border-t border-border bg-muted/20 py-16">
            <div className="container mx-auto max-w-7xl px-6 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">Explore Topics</h2>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog/category/${category.toLowerCase()}`}
                    className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Featured Section (Sticky Pattern Example) */}
        <FadeIn delay={0.1}>
          <section className="container mx-auto max-w-7xl px-6 py-20 relative">
            <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm relative overflow-hidden group">
              {/* Premium Glow Effect inside card */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="flex-1 space-y-6">
                  <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                    Welcome
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                    Start Here
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you're new to TheWhy, check out the Top Tips for Landing a Tech Internship
                    or dive directly into my latest React tutorials. Everything here is open source
                    and built for the community.
                  </p>
                  <Link href="/about" className="inline-flex items-center text-primary font-medium hover:underline underline-offset-4">
                    Learn more about me &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Latest Posts Section */}
        <section className="border-t border-border bg-background py-20">
          <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3 static md:sticky top-32 self-start">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">Latest Articles</h2>
              <p className="text-muted-foreground mb-8">
                A collection of my recent thoughts, tutorials, and deep dives into frontend engineering and beyond.
              </p>
              <Link href="/blog" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                View all posts
              </Link>
            </div>

            <div className="w-full md:w-2/3">
              <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                {posts.slice(0, 4).map((post) => (
                  <FadeIn key={post.slug}>
                    <BlogCard post={post} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <FadeIn>
          <section className="border-t border-border bg-muted/30 py-24">
            <Newsletter />
          </section>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
