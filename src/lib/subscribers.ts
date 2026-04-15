import connectDB from "./db";
import Subscriber from "@/models/Subscriber";

export interface SubscriberData {
  email: string;
  subscribedAt: string;
}

export async function getSubscribers(): Promise<SubscriberData[]> {
  await connectDB();
  const subscribers = await Subscriber.find({}).lean();
  return subscribers.map((s: any) => ({
    email: s.email,
    subscribedAt: s.subscribedAt,
  }));
}

export async function addSubscriber(email: string): Promise<{ added: boolean; alreadyExists: boolean }> {
  await connectDB();
  const exists = await Subscriber.findOne({ email: email.toLowerCase() });
  if (exists) return { added: false, alreadyExists: true };
  
  await Subscriber.create({
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
  });
  
  return { added: true, alreadyExists: false };
}

export async function removeSubscriber(email: string): Promise<boolean> {
  await connectDB();
  const result = await Subscriber.deleteOne({ email: email.toLowerCase() });
  return result.deletedCount > 0;
}

