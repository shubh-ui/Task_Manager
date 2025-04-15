// server.js
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/authRoutes")

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const app = express();
const PORT = 3000;

// Middleware
// app.use(
//     cors({
//       origin:process.env.CLIENT_URL || "*",
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   )
  
  app.use(express.json());

// MongoDB connection
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Server is up and running 🚀');
});

app.use("/api/auth", authRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
