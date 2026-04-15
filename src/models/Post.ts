import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  category: string;
  series?: string;
  coverImage?: string;
}

const PostSchema: Schema = new Schema({
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

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
