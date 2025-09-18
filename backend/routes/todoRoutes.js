// routes/todoRoutes.js
const express = require("express");
const { getTodosCollection, ObjectId } = require("../models/todoModel");

<<<<<<< HEAD
const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await getTodosCollection().find().toArray();
    res.json(todos);
=======
// Normalize todo for frontend
const normalizeTodo = (todo) => ({
  _id: todo._id.toString(),
  task: todo.task,
  status: todo.status,
});

// ✅ GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await getTodosCollection().find().toArray();
    res.json(todos.map(normalizeTodo));
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

<<<<<<< HEAD
// Add new todo
router.post("/", async (req, res) => {
  const { task, status = "pending" } = req.body;
  try {
    const result = await getTodosCollection().insertOne({ task, status });
    res.status(201).json({ _id: result.insertedId, task, status });
=======
// ✅ POST new todo
router.post("/", async (req, res) => {
  const { task, status = "pending" } = req.body;
  if (!task || !task.trim()) {
    return res.status(400).json({ error: "Task cannot be empty" });
  }

  try {
    const result = await getTodosCollection().insertOne({ task, status });
    res.status(201).json({ _id: result.insertedId.toString(), task, status });
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

<<<<<<< HEAD
// Update todo
=======
// ✅ PUT update todo
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;

  try {
    const result = await getTodosCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
<<<<<<< HEAD
      { $set: { task, status } },
=======
      { $set: { ...(task && { task }), ...(status && { status }) } },
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ error: "Todo not found" });
<<<<<<< HEAD
    res.json(result.value);
=======

    res.json(normalizeTodo(result.value));
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

<<<<<<< HEAD
// Delete todo
=======
// ✅ DELETE todo
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getTodosCollection().findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result.value) return res.status(404).json({ error: "Todo not found" });
<<<<<<< HEAD
    res.json(result.value);
=======

    res.json({ _id: id, deleted: true });
>>>>>>> e0c2f71b5af487d0230083fdb950eb5f7eb2e4a6
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

module.exports = router;