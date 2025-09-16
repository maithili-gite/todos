require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("MONGO_URI not found in .env file");

const client = new MongoClient(uri);
let db;

async function connectDB() {
  if (db) return db;
  try {
    await client.connect();
    db = client.db("todoDB"); // Change DB name if needed
    console.log("✅ Connected to MongoDB Atlas");
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("Database not connected!");
  return db;
}

function getTodosCollection() {
  return getDB().collection("todos");
}

module.exports = { connectDB, getDB, getTodosCollection };
