const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// MongoDB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "Dress Shop Backend is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
