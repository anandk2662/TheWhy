import fs from "fs";
import path from "path";
import matter from "gray-matter";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "";

if (!MONGO_URI) {
  console.error("Error: MONGO_URI not found in .env.local");
  process.exit(1);
}

// Inline schemas to avoid import issues in script
const PostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: String, default: "Uncategorized" },
  series: { type: String },
  coverImage: { type: String },
}, { timestamps: true });

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: String, required: true },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");
const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function migrate() {
  console.log("🚀 Starting migration to MongoDB...");

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Migrate Blog Posts
    if (fs.existsSync(CONTENT_DIR)) {
      const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
      console.log(`📝 Found ${files.length} blog posts to migrate...`);

      for (const file of files) {
        const slug = file.replace(/\.mdx?$/, "");
        const filePath = path.join(CONTENT_DIR, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        const postData = {
          slug,
          title: data.title || "Untitled",
          description: data.description || "",
          content: content,
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          tags: data.tags || [],
          category: data.category || "Uncategorized",
          series: data.series || "",
          coverImage: data.coverImage || "",
        };

        await Post.findOneAndUpdate({ slug }, postData, { upsert: true });
        console.log(`   ✅ Migrated post: ${slug}`);
      }
    }

    // 2. Migrate Subscribers
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const subscribersData = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf8"));
      console.log(`📧 Found ${subscribersData.length} subscribers to migrate...`);

      for (const sub of subscribersData) {
        await Subscriber.findOneAndUpdate(
          { email: sub.email.toLowerCase() },
          { email: sub.email.toLowerCase(), subscribedAt: sub.subscribedAt },
          { upsert: true }
        );
        console.log(`   ✅ Migrated subscriber: ${sub.email}`);
      }
    }

    console.log("\n✨ Migration completed successfully!");
    console.log("You can now safely delete the 'src/content/blog' directory and 'data' folder.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrate();
