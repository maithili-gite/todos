// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
<<<<<<< HEAD
const PORT = 5000;
=======
const PORT = process.env.PORT || 5000;
>>>>>>> ee35d98d8fccd7f6d691a4106c2e77e66e3b09aa

// ✅ CORS Middleware
app.use(cors({
  origin: "*",          // allow all origins (later you can restrict to Vercel domain)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Start server only after DB connection
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    console.log(`🌐 Access locally: http://localhost:${PORT}`);
  });
});
