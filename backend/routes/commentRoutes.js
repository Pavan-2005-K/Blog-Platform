
const express = require("express");

const router = express.Router();

const {
  getComments,
  addComment,
  deleteComment
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

// Public Route
router.get("/:blogId", getComments);

// Protected Routes
router.post("/:blogId", protect, addComment);
router.delete("/:id", protect, deleteComment);

module.exports = router;
