import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  ArrowRight,
  CalendarDays,
  UserRound
} from "lucide-react";

import API from "../services/api";
import "../styles/blogs.css";

const categories = [
  "All",
  "Technology",
  "Lifestyle",
  "Creativity",
  "Ideas",
  "Education",
  "General"
];

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await API.get("/blogs", {
          params: {
            page,
            limit: 9,
            search: search.trim(),
            category: category === "All" ? "" : category
          }
        });

        const data = response.data;

        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
        setTotalPages(Math.max(1, Number(data.pages) || 1));
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load blogs. Please check your backend server."
        );
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, search, category]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const formatDate = (date) => {
    if (!date) return "Recently published";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="blogs-page">
      <section className="blogs-hero">
        <div className="container">
          <span className="blogs-eyebrow">
            <BookOpen size={15} />
            THE BLOGSPACE COLLECTION
          </span>

          <h1>
            Explore stories.
            <span> Discover ideas.</span>
          </h1>

          <p>
            Find fresh perspectives, inspiring experiences and
            interesting ideas shared by our community.
          </p>

          <div className="blogs-search">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search stories by title..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => handleSearch("")}>
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="blogs-content container">
        <div className="blogs-category-section">
          <div>
            <span className="blogs-section-label">BROWSE BY TOPIC</span>
            <h2>Explore categories</h2>
          </div>

          <div className="blogs-category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "category-filter active"
                    : "category-filter"
                }
                onClick={() => handleCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="blogs-heading-row">
          <div>
            <span className="blogs-section-label">OUR COMMUNITY</span>
            <h2>Latest stories</h2>
          </div>

          <span className="blogs-result-label">
            {loading ? "Loading..." : `${blogs.length} stories shown`}
          </span>
        </div>

        {loading ? (
          <div className="blogs-message">
            <div className="blogs-spinner"></div>
            <p>Discovering stories...</p>
          </div>
        ) : error ? (
          <div className="blogs-message blogs-error">
            <p>{error}</p>
            <button onClick={() => setPage((current) => current)}>
              Try again
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="blogs-message">
            <BookOpen size={35} />
            <h3>No stories found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              className="blogs-reset-btn"
              onClick={() => {
                handleSearch("");
                handleCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <article className="blog-card" key={blog._id}>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="blog-card-image"
                  >
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} />
                    ) : (
                      <div className="blog-image-placeholder">
                        <BookOpen size={38} />
                      </div>
                    )}

                    <span className="blog-category">
                      {blog.category || "General"}
                    </span>
                  </Link>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>
                        <CalendarDays size={14} />
                        {formatDate(blog.createdAt)}
                      </span>
                    </div>

                    <Link
                      to={`/blogs/${blog._id}`}
                      className="blog-card-title"
                    >
                      {blog.title}
                    </Link>

                    <p className="blog-card-excerpt">
                      {blog.content?.slice(0, 125)}
                      {blog.content?.length > 125 ? "..." : ""}
                    </p>

                    <div className="blog-card-footer">
                      <span className="blog-author">
                        <UserRound size={15} />
                        {blog.author?.name || "Community Writer"}
                      </span>

                      <Link
                        to={`/blogs/${blog._id}`}
                        className="blog-read-link"
                        aria-label={`Read ${blog.title}`}
                      >
                        <ArrowRight size={19} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="blogs-pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Blogs;