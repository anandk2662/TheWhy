import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  subscribedAt: string;
}

const SubscriberSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Subscriber || mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
