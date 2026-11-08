
const express = require("express");

const router = express.Router();

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getBlogs);

// Protected Routes
// IMPORTANT: Keep /my-blogs before /:id
router.get("/my-blogs", protect, getMyBlogs);

// Single blog route
router.get("/:id", getBlogById);

// Create, update and delete
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
