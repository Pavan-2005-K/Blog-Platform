
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// @desc    Get comments for a blog
// @route   GET /api/comments/:blogId
// @access  Public
const getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    const comments = await Comment.find({
      blog: req.params.blogId
    })
      .populate("author", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments
    });

  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Failed to fetch comments",
      error: error.message
    });
  }
};

// @desc    Add comment to a blog
// @route   POST /api/comments/:blogId
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Comment content is required"
      });
    }

    if (content.trim().length > 1000) {
      return res.status(400).json({
        message: "Comment cannot exceed 1000 characters"
      });
    }

    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    const comment = await Comment.create({
      content: content.trim(),
      blog: blog._id,
      author: req.user._id
    });

    const populatedComment = await comment.populate(
      "author",
      "name profileImage"
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment
    });

  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Failed to add comment",
      error: error.message
    });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own comments"
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully"
    });

  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Failed to delete comment",
      error: error.message
    });
  }
};

module.exports = {
  getComments,
  addComment,
  deleteComment
};
