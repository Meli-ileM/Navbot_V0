// lib/db.js
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://amirahamdi:j6rS2qQQOC1Q9Q1c@clusterdata.dsbshld.mongodb.net/?appName=ClusterData";

if (!MONGO_URI) {
  throw new Error("Veuillez définir MONGO_URI dans lib/db.js");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  console.log("MongoDB connecté");
  return cached.conn;
}

export default connectToDB;
