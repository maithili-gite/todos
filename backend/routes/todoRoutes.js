const express = require("express");
const router = express.Router();
const { getTodosCollection, ObjectId } = require("../models/todoModel");

// Normalize todo
const normalizeTodo = (todo) => ({
  _id: todo._id.toString(),
  task: todo.task,
  status: todo.status,
});

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await getTodosCollection().find().toArray();
    res.json(todos.map(normalizeTodo));
  } catch {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST new todo
router.post("/", async (req, res) => {
  const { task, status = "pending" } = req.body;
  if (!task || !task.trim()) return res.status(400).json({ error: "Task cannot be empty" });

  try {
    const result = await getTodosCollection().insertOne({ task, status });
    res.status(201).json({ _id: result.insertedId.toString(), task, status });
  } catch {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PUT update todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;
  const updateFields = {};
  if (task !== undefined) updateFields.task = task;
  if (status !== undefined) updateFields.status = status;

  try {
    const result = await getTodosCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result.value) return res.status(404).json({ error: "Todo not found" });
    res.json(normalizeTodo(result.value));
  } catch {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getTodosCollection().findOneAndDelete({ _id: new ObjectId(id) });
    if (!result.value) return res.status(404).json({ error: "Todo not found" });
    res.json({ _id: id });
  } catch {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

module.exports = router;
