import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    
    // Provide more helpful logs for common connection issues
    if (e.message.includes("ECONNREFUSED") || e.message.includes("querySrv")) {
      console.error("\n❌ MONGODB CONNECTION ERROR: Connection Refused.");
      console.error("👉 Check if your IP address is whitelisted in MongoDB Atlas (Network Access).");
      console.error("👉 If you are on a restricted network, ensure port 27017 is open.\n");
    }
    
    throw e;
  }


  return cached.conn;
}

export default connectDB;
