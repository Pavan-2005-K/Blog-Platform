import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PenLine,
  Image,
  Tag,
  ArrowLeft,
  Save
} from "lucide-react";

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

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    image: "",
    tags: "",
    content: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blogs/${id}`);
        const blog = response.data.blog || response.data;

        setFormData({
          title: blog.title || "",
          category: blog.category || "General",
          image: blog.image || "",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
          content: blog.content || ""
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load this blog."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

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

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    if (formData.title.trim().length > 150) {
      setError("The title cannot exceed 150 characters.");
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    setSaving(true);

    try {
      await API.put(`/blogs/${id}`, {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        image: formData.image.trim(),
        tags
      });

      navigate(`/blogs/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to update your blog."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="create-blog-page">
        <div className="container">
          <p>Loading blog details...</p>
        </div>
      </div>
    );
  }

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
            UPDATE YOUR STORY
          </span>

          <h1>Edit your story.</h1>

          <p>Make changes and keep your story up to date.</p>
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
                alt="Blog cover preview"
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
              required
            />
          </div>

          {error && (
            <div className="create-blog-error">
              {error}
            </div>
          )}

          <div className="create-blog-actions">
            <Link to="/dashboard" className="create-blog-cancel">
              Cancel
            </Link>

            <button type="submit" disabled={saving}>
              <Save size={16} />
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditBlog;