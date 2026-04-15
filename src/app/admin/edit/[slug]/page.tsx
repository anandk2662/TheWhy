"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { saveMDXPost, getPostDataAction } from "../../actions";

export default function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const isNew = slug === "new";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [series, setSeries] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!isNew) fetchData();
  }, [isNew, slug]);

  const fetchData = async () => {
    try {
      const data = await getPostDataAction(slug);
      setTitle(data.title);
      setCategory(data.category);
      setSeries(data.series || "");
      setDescription(data.description);
      setContent(data.content);
    } catch (err: any) {
      setLoadError(err.message || "Could not load post");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    try {
      const generatedSlug = isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : slug;
      const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
      await saveMDXPost(generatedSlug, { title, category, series, description, tags: tagArray }, content, isNew);
      setStatus("saved");
      setTimeout(() => router.push("/admin"), 600);
    } catch (error: any) {
      alert(error.message || "Failed to save post");
      setStatus("idle");
    }
  };

  const input = "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all";

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 fixed inset-y-0 left-0 bg-zinc-900 border-r border-zinc-800 z-30">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800">
          <div className="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-zinc-700 flex-shrink-0">
            <Image src="/logo.svg" alt="TheWhy" width={28} height={28} className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">TheWhy</span>
          <span className="ml-auto text-[10px] font-semibold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">Admin</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-2 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Content</p>
          <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            All Posts
          </Link>
          <Link href="/admin/edit/new" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            {isNew ? "New Post" : "Edit Post"}
          </Link>

          <p className="px-2 pt-4 pb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Site</p>
          <Link href="/" target="_blank" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            View Blog
          </Link>
        </nav>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div className="flex-1 md:ml-56 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="rounded-lg p-1.5 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">{isNew ? "Write New Post" : "Edit Post"}</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{isNew ? "Create a new article" : `Editing: ${slug}`}</p>
            </div>
          </div>
          <button
            form="post-form"
            type="submit"
            disabled={status !== "idle"}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-60 transition-all"
          >
            {status === "saving" ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Saving…
              </>
            ) : status === "saved" ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                Saved!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Publish Post
              </>
            )}
          </button>
        </header>

        <main className="flex-1 p-6">
          {loadError ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400 text-sm">{loadError}</div>
          ) : (
            <form id="post-form" onSubmit={handleSave}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

                {/* Left — main content */}
                <div className="lg:col-span-2 space-y-5">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Title *</label>
                      <input required value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="An Interesting Blog Post Title"
                        className={input + " text-base font-semibold"} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Description *</label>
                      <textarea required value={description} onChange={(e) => setDescription(e.target.value)}
                        rows={2} placeholder="A short summary shown in blog listings and SEO..."
                        className={input} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Content (MDX / Markdown) *</label>
                    <p className="text-xs text-zinc-600 mb-3">Supports Markdown, headings, code blocks, tables, and MDX components.</p>
                    <textarea required value={content} onChange={(e) => setContent(e.target.value)}
                      rows={26}
                      placeholder={"# Your heading here\n\nStart writing in Markdown...\n\n```js\nconst hello = 'world';\n```"}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-zinc-100 font-mono placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y" />
                  </div>
                </div>

                {/* Right — metadata */}
                <div className="space-y-5">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
                    <h3 className="text-sm font-semibold text-white border-b border-zinc-800 pb-3">Post Settings</h3>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Category *</label>
                      <input required value={category} onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. React, Next.js, Career" className={input} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                        Series <span className="normal-case font-normal text-zinc-600">(optional)</span>
                      </label>
                      <input value={series} onChange={(e) => setSeries(e.target.value)}
                        placeholder="e.g. Day 1, Next.js Series" className={input} />
                      <p className="text-xs text-zinc-600 mt-1.5">Posts with the same series name are linked together.</p>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                        Tags <span className="normal-case font-normal text-zinc-600">(comma separated)</span>
                      </label>
                      <input value={tags} onChange={(e) => setTags(e.target.value)}
                        placeholder="React, TypeScript, Tutorial" className={input} />
                    </div>
                  </div>

                  {/* Markdown guide */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Markdown Guide</h3>
                    <ul className="space-y-2 text-xs font-mono">
                      {[
                        ["# Heading 1", "h1"],
                        ["## Heading 2", "h2"],
                        ["**bold**", "bold"],
                        ["*italic*", "italic"],
                        ["`code`", "inline code"],
                        ["```js...```", "code block"],
                        ["[text](url)", "link"],
                        ["- item", "list"],
                      ].map(([syntax, label]) => (
                        <li key={label} className="flex items-center justify-between gap-2">
                          <code className="bg-zinc-800 text-blue-300 px-1.5 py-0.5 rounded">{syntax}</code>
                          <span className="text-zinc-600">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
