import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URL environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGO_URL);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
