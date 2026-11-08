
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  PenLine,
  Eye,
  Trash2,
  Plus,
  CalendarDays,
  ArrowRight,
  FileText,
  Edit3
} from "lucide-react";

import API from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in user's blogs
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchMyBlogs();
  }, [navigate]);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/blogs/my-blogs");

      const blogData =
        response.data.blogs ||
        response.data ||
        [];

      setBlogs(Array.isArray(blogData) ? blogData : []);
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load your blogs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${blogId}`);

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog._id !== blogId)
      );
    } catch (err) {
      console.error("Delete blog error:", err);

      alert(
        err.response?.data?.message ||
        "Failed to delete blog. Please try again."
      );
    }
  };

  // Format blog date
  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  // Loading screen
  if (loading) {
    return (
      <div className="dashboard-message">
        <div className="dashboard-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <section className="dashboard-page">
      <div className="container dashboard-container">

        {/* DASHBOARD HEADER */}
        <div className="dashboard-welcome">

          <div>
            <span className="dashboard-eyebrow">
              YOUR WORKSPACE
            </span>

            <h1>
              My Dashboard
            </h1>

            <p>
              Manage your stories, edit your posts and keep
              sharing your ideas with the world.
            </p>
          </div>

          <Link
            to="/create-blog"
            className="dashboard-create-btn"
          >
            <Plus size={17} />
            Write New Story
          </Link>

        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="dashboard-error">
            {error}

            <button
              type="button"
              onClick={fetchMyBlogs}
              style={{
                marginLeft: "12px",
                border: "none",
                background: "transparent",
                color: "inherit",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* STATISTICS */}
        <div className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              <BookOpen size={22} />
            </div>

            <div>
              <span>Total Stories</span>
              <h2>{blogs.length}</h2>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              <FileText size={22} />
            </div>

            <div>
              <span>Published Stories</span>
              <h2>{blogs.length}</h2>
            </div>

          </div>

        </div>

        {/* YOUR STORIES */}
        <div className="dashboard-content">

          <div className="dashboard-section-heading">

            <div>
              <h2>Your Stories</h2>
              <p>
                All the articles you have created.
              </p>
            </div>

            <Link
              to="/create-blog"
              className="dashboard-create-btn"
            >
              <Plus size={15} />
              Create Story
            </Link>

          </div>

          {/* EMPTY STATE */}
          {blogs.length === 0 && !error ? (

            <div className="dashboard-empty">

              <div className="dashboard-empty-icon">
                <BookOpen size={35} />
              </div>

              <h3>No stories yet</h3>

              <p>
                You haven't published any stories.
                Start writing and share your thoughts with the world!
              </p>

              <Link
                to="/create-blog"
                className="dashboard-create-btn"
              >
                <Plus size={17} />
                Write Your First Story
              </Link>

            </div>

          ) : (

            /* BLOG LIST */
            <div className="dashboard-blog-list">

              {blogs.map((blog) => (

                <article
                  className="dashboard-blog-card"
                  key={blog._id}
                >

                  {/* BLOG IMAGE */}
                  <div className="dashboard-blog-image">

                    {blog.image ? (

                      <img
                        src={blog.image}
                        alt={blog.title}
                      />

                    ) : (

                      <div className="dashboard-placeholder-image">
                        <BookOpen size={35} />
                      </div>

                    )}

                  </div>

                  {/* BLOG INFORMATION */}
                  <div className="dashboard-blog-info">

                    <span className="dashboard-blog-category">
                      {blog.category || "General"}
                    </span>

                    <h3>
                      {blog.title}
                    </h3>

                    <p className="dashboard-blog-excerpt">
                      {blog.content
                        ? `${blog.content.substring(0, 150)}${
                            blog.content.length > 150 ? "..." : ""
                          }`
                        : "No description available."}
                    </p>

                    <div className="dashboard-blog-date">
                      <CalendarDays size={14} />
                      {formatDate(blog.createdAt)}
                    </div>

                    {/* BLOG ACTIONS */}
                    <div className="dashboard-blog-actions">

                      {/* VIEW STORY */}
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="dashboard-view-btn"
                      >
                        <Eye size={15} />
                        View Story
                        <ArrowRight size={14} />
                      </Link>

                      {/* EDIT STORY */}
                      <Link
                        to={`/blogs/${blog._id}/edit`}
                        className="dashboard-edit-btn"
                      >
                        <Edit3 size={15} />
                        Edit
                      </Link>

                      {/* DELETE STORY */}
                      <button
                        type="button"
                        className="dashboard-delete-btn"
                        onClick={() => handleDelete(blog._id)}
                        aria-label={`Delete ${blog.title}`}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default Dashboard;
