// config/db.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI not found in .env file");

const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    db = client.db("todoDB"); // Change DB name if needed
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("💡 Possible solutions:");
    console.log("   1. Check your internet connection");
    console.log("   2. Verify MongoDB Atlas cluster is running");
    console.log("   3. Check IP whitelist in MongoDB Atlas");
    console.log("   4. Verify username/password in .env file");
    console.log("   5. Try using local MongoDB: mongodb://localhost:27017/todoDB");
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("Database not connected! Call connectDB() first.");
  return db;
}

module.exports = { connectDB, getDB };