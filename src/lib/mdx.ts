import connectDB from "./db";
import Post from "@/models/Post";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  category?: string;
  series?: string;
  coverImage?: string;
  readingTime?: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/g).length;
  return Math.ceil(words / 200) + " min read";
}

export async function getPostSlugs(): Promise<string[]> {
  await connectDB();
  const posts = await Post.find({}, { slug: 1 }).lean();
  return posts.map((post: any) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  await connectDB();
  const post = await Post.findOne({ slug }).lean();
  
  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const readingTime = calculateReadingTime(post.content);

  return {
    meta: {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      category: post.category,
      series: post.series,
      coverImage: post.coverImage,
      readingTime,
    },
    content: post.content,
  };
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  await connectDB();
  const posts = await Post.find({}).sort({ date: -1 }).lean();
  
  return posts.map((post: any) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    category: post.category,
    series: post.series,
    coverImage: post.coverImage,
    readingTime: calculateReadingTime(post.content),
  }));
}

export async function getAllCategories(): Promise<string[]> {
  await connectDB();
  const categories = await Post.distinct("category");
  return categories.filter(Boolean);
}

