const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

// Helper function to access the "todos" collection
function getTodosCollection() {
  const db = getDB();
  if (!db) {
    throw new Error("Database not initialized. Make sure connectDB() has been called.");
  }
  return db.collection("todos");
}

// Export both the collection helper and ObjectId for use in routes
module.exports = { getTodosCollection, ObjectId };
