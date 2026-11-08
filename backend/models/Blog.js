
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: 150
    },

    content: {
      type: String,
      required: [true, "Blog content is required"]
    },

    image: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: "General"
    },

    tags: {
      type: [String],
      default: []
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Blog", blogSchema);
