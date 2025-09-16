const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Add new todo
router.post("/", async (req, res) => {
  const { task, status = "pending" } = req.body;
  const newTodo = new Todo({ task, status });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: "Failed to add todo" });
  }
});

// Update a todo (PUT)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, status },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: "Failed to update todo" });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;