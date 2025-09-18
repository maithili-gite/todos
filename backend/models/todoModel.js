// models/todoModel.js
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

// Helper function to access the "todos" collection
function getTodosCollection() {
  return getDB().collection("todos");
}

// Export both the collection helper and ObjectId for use in routes
module.exports = { getTodosCollection, ObjectId };