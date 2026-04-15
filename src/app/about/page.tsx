import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// Removed lucide-react unused imports
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me | TheWhy",
  description: "Learn more about the developer behind this blog.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-3xl px-4 py-20 md:py-32">
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              About Me
            </h1>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-loose">
              <p>
                Hello! I am a passionate full-stack developer enthusiastically building modern web applications. 
                I specialize in React, Next.js, and TypeScript, and I love writing about new technologies, web performance, and software architecture.
              </p>
              <p>
                On this blog, you'll find tutorials, career advice, dive-deep technical articles, and short snippets that you can use in your daily workflow.
              </p>
            </div>
            
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "GraphQL", "PostgreSQL"].map((skill) => (
                  <span key={skill} className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Connect</h2>
              <div className="flex gap-4">
                <Link href="https://github.com/anandk2662" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors overflow-hidden">
                  <span className="sr-only">GitHub</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </Link>
                <Link href="https://x.com/anandk2534" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors overflow-hidden">
                  <span className="sr-only">Twitter</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </Link>
                <Link href="www.linkedin.com/in/anandkumar2029" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors overflow-hidden">
                  <span className="sr-only">LinkedIn</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
