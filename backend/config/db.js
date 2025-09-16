const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("❌ MONGO_URI not found in .env");

let client;
let db;

async function connectDB() {
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
