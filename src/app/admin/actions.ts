"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import Subscriber from "@/models/Subscriber";
import { sendNewPostEmail } from "@/lib/mailer";

export async function saveMDXPost(slug: string, frontmatter: any, content: string, isNew: boolean = false) {
  await connectDB();
  const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

  const postData = {
    title: frontmatter.title || "Untitled",
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    description: frontmatter.description || "",
    category: frontmatter.category || "Uncategorized",
    series: frontmatter.series || "",
    tags: frontmatter.tags || [],
    content: content,
  };

  if (isNew) {
    const exists = await Post.findOne({ slug: safeSlug });
    if (exists) {
      throw new Error("A post with this slug already exists.");
    }
    await Post.create({ ...postData, slug: safeSlug });

    // --- Send Email Notifications to All Subscribers ---
    try {
      const subscribers = await Subscriber.find({}, "email");
      const emailList = subscribers.map((s: any) => s.email);
      
      if (emailList.length > 0) {
        // We trigger this without 'await' if we want it to be backgrounded, 
        // but since this is a Server Action and we want to ensure it completes, 
        // we'll await it but wrap in a try-catch to be safe.
        await sendNewPostEmail(emailList, {
          title: postData.title,
          description: postData.description,
          slug: safeSlug,
        });
      }
    } catch (mailError) {
      console.error("Failed to send subscriber notifications:", mailError);
      // We don't throw the error, so the user still sees their post as "Saved"
    }
  } else {
    await Post.findOneAndUpdate({ slug: safeSlug }, postData, { upsert: true });
  }
  
  // Revalidate caches to instantly update the UI
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  return { success: true, slug: safeSlug };
}

export async function deleteMDXPost(slug: string) {
  await connectDB();
  const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
  
  const result = await Post.deleteOne({ slug: safeSlug });
  if (result.deletedCount === 0) {
    throw new Error("Post not found");
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  return { success: true };
}

export async function getPostDataAction(slug: string) {
  await connectDB();
  const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
  
  const post = await Post.findOne({ slug: safeSlug }).lean();
  
  if (!post) throw new Error("Post not found");
  
  return {
    title: (post as any).title || "",
    category: (post as any).category || "",
    series: (post as any).series || "",
    description: (post as any).description || "",
    content: (post as any).content || "",
  };
}

