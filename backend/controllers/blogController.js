
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate("author", "name profileImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      blogs
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message
    });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name profileImage");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Failed to fetch blog",
      error: error.message
    });
  }
};

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
  try {
    const { title, content, image, category, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const blog = await Blog.create({
      title,
      content,
      image,
      category,
      tags,
      author: req.user._id
    });

    const populatedBlog = await blog.populate(
      "author",
      "name profileImage"
    );

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: populatedBlog
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create blog",
      error: error.message
    });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only edit your own blogs"
      });
    }

    const { title, content, image, category, tags } = req.body;

    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (image !== undefined) blog.image = image;
    if (category !== undefined) blog.category = category;
    if (tags !== undefined) blog.tags = tags;

    await blog.save();

    const updatedBlog = await blog.populate(
      "author",
      "name profileImage"
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog
    });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Failed to update blog",
      error: error.message
    });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own blogs"
      });
    }

    await Comment.deleteMany({ blog: blog._id });
    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog and its comments deleted successfully"
    });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;

    res.status(status).json({
      message: "Failed to delete blog",
      error: error.message
    });
  }
};

// @desc    Get logged-in user's blogs
// @route   GET /api/blogs/my-blogs
// @access  Private
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your blogs",
      error: error.message
    });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs
};
