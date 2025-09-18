// routes/todoRoutes.js
const express = require("express");
const { getTodosCollection, ObjectId } = require("../models/todoModel");

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await getTodosCollection().find().toArray();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Add new todo
router.post("/", async (req, res) => {
  const { task, status = "pending" } = req.body;
  try {
    const result = await getTodosCollection().insertOne({ task, status });
    res.status(201).json({ _id: result.insertedId, task, status });
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Update todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;

  try {
    const result = await getTodosCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { task, status } },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ error: "Todo not found" });
    res.json(result.value);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getTodosCollection().findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result.value) return res.status(404).json({ error: "Todo not found" });
    res.json(result.value);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

module.exports = router;
