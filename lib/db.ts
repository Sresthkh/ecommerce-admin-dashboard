import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI || "mongodb+srv://khandelwalsresth_db_user:0zBhbolLST3yzobi@cluster0.twqxtpm.mongodb.net/ecommerce-admin?appName=Cluster0";

  if (!uri) {
    console.warn("⚠️ MONGODB_URI is missing. Skipping DB connection (safe for build step).");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
