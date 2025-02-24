"use server";
import * as mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const cached = (global as any).mongoose || { conn: null, promise: null };

const globalAny = global as any;

const cached =
  globalAny.mongoose || (globalAny.mongoose = { conn: null, promise: null });

async function connect() {

  if (cached.conn) return cached.conn;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined.");
  }

  console.log("Attempting to connect to MongoDB...");

  cached.promise =
    cached.promise ||
    mongoose.default
      .connect(process.env.MONGO_URI!)
      .then(() => {
        console.log("Database connected successfully");
        return mongoose.connection;
      })
      .catch((error: any) => console.error("Error connection db :==> ", error));

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connect;
