import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log("⚠️  MONGO_URI not set — running without DB (contact form will log to console)");
    return;
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Don't crash — portfolio should run without DB for demo
  }
};
