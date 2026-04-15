import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import { deleteMDXPost } from "./actions";
import { logoutAction } from "./auth-actions";

export default async function AdminDashboard() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  let dbError: string | null = null;

  try {
    posts = await getAllPosts();
  } catch (err: any) {
    dbError = err?.message ?? "Failed to connect to the database.";
  }

  const categoryCount = [...new Set(posts.map((p) => p.category))].length;
  const seriesCount = [...new Set(posts.map((p) => p.series).filter(Boolean))].length;

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 fixed inset-y-0 left-0 bg-zinc-900 border-r border-zinc-800 z-30">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800">
          <div className="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-zinc-700 flex-shrink-0">
            <Image src="/logo.svg" alt="TheWhy" width={28} height={28} className="w-full h-full object-cover" />
          </div>
          <Link href="/" className="font-extrabold text-sm tracking-tight text-white">TheWhy</Link>
          <span className="ml-auto text-[10px] font-semibold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-2 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Content</p>
          <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            All Posts
          </Link>
          <Link href="/admin/edit/new" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            New Post
          </Link>

          <p className="px-2 pt-4 pb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Site</p>
          <Link href="/" target="_blank" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            View Blog
          </Link>
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-4 border-t border-zinc-800 pt-4">
          <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Content Dashboard</h1>
            <p className="text-xs text-zinc-500 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""} published</p>
          </div>
          <Link
            href="/admin/edit/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            New Post
          </Link>
        </header>

        <main className="flex-1 p-6">
          {/* DB Error Banner */}
          {dbError && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3.5 text-sm text-yellow-400">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <div>
                <p className="font-semibold text-yellow-300">Database connection error</p>
                <p className="mt-0.5 text-yellow-400/80 text-xs">{dbError}</p>
                <p className="mt-1 text-yellow-400/60 text-xs">Make sure your local MongoDB service is running and <code className="bg-yellow-500/10 px-1 rounded">MONGO_URI</code> is correct in <code className="bg-yellow-500/10 px-1 rounded">.env.local</code>.</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Posts", value: posts.length, color: "text-blue-400", bg: "bg-blue-500/10", icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.966 8.966 0 0 0-6 2.292m0-14.25v14.25" },
              { label: "Categories", value: categoryCount, color: "text-violet-400", bg: "bg-violet-500/10", icon: "M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" },
              { label: "Series", value: seriesCount, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-5 h-5 ${stat.color}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Posts table */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">All Posts</h2>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">{posts.length} total</span>
            </div>

            {posts.length > 0 ? (
              <ul className="divide-y divide-zinc-800/70">
                {posts.map((post) => (
                  <li key={post.slug} className="flex items-center justify-between px-5 py-4 hover:bg-zinc-800/50 transition-colors group">
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-zinc-100 text-sm truncate">{post.title}</h3>
                        {post.series && (
                          <span className="hidden sm:inline-flex items-center rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400 flex-shrink-0">
                            {post.series}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 flex items-center gap-2">
                        <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                        <span className="opacity-40">·</span>
                        <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">{post.category}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors border border-zinc-700"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/edit/${post.slug}`}
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition-colors border border-blue-500/30"
                      >
                        Edit
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteMDXPost(post.slug);
                      }}>
                        <button type="submit" className="rounded-md px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/30">
                          Delete
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-20 text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.966 8.966 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-zinc-200 mb-1">No posts yet</p>
                <p className="text-xs text-zinc-500 mb-5">Create your first post to get started.</p>
                <Link href="/admin/edit/new" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  Write First Post
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
