import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connect() {
  if (cached.conn) return cached.conn;
  cached.promise =
    cached.promise ||
    mongoose
      .connect(process.env.MONGO_URI!, {
        dbName: "gaming",
        bufferCommands: false,
      })
      .then(() => console.log("Database connected successfully "))
      .catch((error: any) => console.log("error :--> ", error));

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;