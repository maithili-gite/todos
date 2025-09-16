const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todosRoutes = require("./routes/todos");
const dbConfig = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConfig();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});