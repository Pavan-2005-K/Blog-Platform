
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Blog Platform Backend is running!",
    status: "success"
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is healthy",
    status: "success"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found"
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error"
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
