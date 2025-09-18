<<<<<<< HEAD
// config/db.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI not found in .env file");
=======
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI not found in .env");
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6

let client;
let db;

async function connectDB() {
<<<<<<< HEAD
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    db = client.db("todoDB"); // Change DB name if needed
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("Database not connected! Call connectDB() first.");
  return db;
}

module.exports = { connectDB, getDB };
=======
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db("todoDB"); // database name
  console.log("✅ MongoDB connected");
  return db;
}

function getTodosCollection() {
  if (!db) throw new Error("❌ Database not initialized");
  return db.collection("todos");
}

module.exports = { connectDB, getTodosCollection, ObjectId };
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
