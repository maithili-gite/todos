const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;