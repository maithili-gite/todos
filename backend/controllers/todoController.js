const { getTodosCollection, ObjectId } = require("../models/todoModel");

// GET all todos
const getTodos = async (req, res) => {
  try {
    const todos = await getTodosCollection().find().toArray();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// POST new todo
const addTodo = async (req, res) => {
  try {
    const { task, status = "pending" } = req.body;
    const result = await getTodosCollection().insertOne({ task, status });
    res.status(201).json({ _id: result.insertedId, task, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// PUT update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;

  try {
    const updateFields = {};
    if (task !== undefined) updateFields.task = task;
    if (status !== undefined) updateFields.status = status;

    const result = await getTodosCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ error: "Todo not found" });
    res.json(result.value);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// DELETE todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getTodosCollection().findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!result.value) return res.status(404).json({ error: "Todo not found" });
    res.json({ _id: id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid ID format" });
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
