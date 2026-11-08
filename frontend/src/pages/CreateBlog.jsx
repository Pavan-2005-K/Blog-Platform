
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PenLine, Image, Tag, ArrowLeft, Save } from "lucide-react";

import API from "../services/api";
import "../styles/create-blog.css";

const categories = [
  "Technology",
  "Lifestyle",
  "Creativity",
  "Ideas",
  "Education",
  "Travel",
  "Health",
  "General"
];

function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    image: "",
    tags: "",
    content: ""
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    if (formData.title.trim().length > 150) {
      setError("Title cannot exceed 150 characters.");
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      setSaving(true);

      const response = await API.post("/blogs", {
        title: formData.title.trim(),
        category: formData.category,
        image: formData.image.trim(),
        tags,
        content: formData.content.trim()
      });

      const blog = response.data.blog || response.data;

      navigate(`/blogs/${blog._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to create your blog."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="create-blog-page">
      <div className="container create-blog-container">

        <Link to="/dashboard" className="create-blog-back">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="create-blog-heading">
          <span className="create-blog-eyebrow">
            <PenLine size={15} />
            SHARE YOUR IDEAS
          </span>

          <h1>Create your story.</h1>

          <p>
            Write something meaningful and share it with the world.
          </p>
        </div>

        <form className="create-blog-form" onSubmit={handleSubmit}>

          <div className="create-blog-field">
            <label htmlFor="title">Blog Title *</label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your blog title"
              maxLength={150}
              required
            />
          </div>

          <div className="create-blog-row">

            <div className="create-blog-field">
              <label htmlFor="category">Category *</label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="create-blog-field">
              <label htmlFor="image">
                <Image size={15} />
                Cover Image URL
              </label>

              <input
                id="image"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

          </div>

          {formData.image && (
            <div className="create-blog-image-preview">
              <img
                src={formData.image}
                alt="Cover preview"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                onLoad={(e) => {
                  e.currentTarget.style.display = "block";
                }}
              />
            </div>
          )}

          <div className="create-blog-field">
            <label htmlFor="tags">
              <Tag size={15} />
              Tags
            </label>

            <input
              id="tags"
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, JavaScript, Web Development"
            />
          </div>

          <div className="create-blog-field">
            <label htmlFor="content">Your Story *</label>

            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              placeholder="Start writing your story..."
              required
            />
          </div>

          {error && (
            <div className="create-blog-error">
              {error}
            </div>
          )}

          <div className="create-blog-actions">

            <Link
              to="/dashboard"
              className="create-blog-cancel"
            >
              Cancel
            </Link>

            <button type="submit" disabled={saving}>
              <Save size={16} />
              {saving ? "Publishing..." : "Publish Story"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
