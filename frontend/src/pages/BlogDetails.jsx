import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  UserRound,
  MessageCircle,
  Send,
  ArrowLeft,
  Trash2,
  BookOpen
} from "lucide-react";

import API from "../services/api";
import "../styles/blog-details.css";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [commentError, setCommentError] = useState("");

  const token = localStorage.getItem("token");
  const currentUser = getStoredUser();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const [blogResponse, commentsResponse] = await Promise.all([
          API.get(`/blogs/${id}`),
          API.get(`/comments/${id}`)
        ]);

        const blogData = blogResponse.data.blog || blogResponse.data;
        const commentsData =
          commentsResponse.data.comments || commentsResponse.data;

        setBlog(blogData);
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load this blog. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Recently published";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setCommentError("Please write a comment first.");
      return;
    }

    setSubmitting(true);
    setCommentError("");

    try {
      const response = await API.post(`/comments/${id}`, {
        content: commentText.trim()
      });

      const newComment =
        response.data.comment || response.data;

      setComments((previous) => [newComment, ...previous]);
      setCommentText("");
    } catch (err) {
      setCommentError(
        err.response?.data?.message ||
        "Unable to add your comment. Please log in and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/comments/${commentId}`);

      setComments((previous) =>
        previous.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      setCommentError(
        err.response?.data?.message || "Unable to delete comment."
      );
    }
  };

  const isMyComment = (comment) => {
    const authorId = comment.author?._id || comment.author;
    const userId = currentUser?._id || currentUser?.id;

    return userId && authorId && String(userId) === String(authorId);
  };

  if (loading) {
    return (
      <div className="blog-details-message">
        <div className="blog-details-spinner"></div>
        <p>Loading story...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-details-message">
        <BookOpen size={40} />
        <h2>Story unavailable</h2>
        <p>{error || "This blog could not be found."}</p>
        <Link to="/blogs" className="blog-back-link">
          <ArrowLeft size={16} /> Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-details-page">
      <div className="container blog-details-container">

        <Link to="/blogs" className="blog-back-link">
          <ArrowLeft size={16} />
          Back to Explore
        </Link>

        <article className="blog-article">
          <div className="blog-article-heading">
            <span className="blog-article-category">
              {blog.category || "General"}
            </span>

            <h1>{blog.title}</h1>

            <div className="blog-article-meta">
              <span>
                <UserRound size={16} />
                {blog.author?.name || "Community Writer"}
              </span>

              <span>
                <CalendarDays size={16} />
                {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>

          {blog.image && (
            <div className="blog-article-image">
              <img src={blog.image} alt={blog.title} />
            </div>
          )}

          <div className="blog-article-content">
            {blog.content}
          </div>

          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="blog-article-tags">
              {blog.tags.map((tag, index) => (
                <span key={`${tag}-${index}`}>#{tag}</span>
              ))}
            </div>
          )}
        </article>

        <section className="blog-comments">
          <div className="blog-comments-heading">
            <MessageCircle size={23} />
            <h2>Comments ({comments.length})</h2>
          </div>

          <form className="comment-form" onSubmit={handleAddComment}>
            {token ? (
              <>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts about this story..."
                  rows={4}
                  maxLength={1000}
                />

                <div className="comment-form-footer">
                  <span>{commentText.length}/1000 characters</span>

                  <button type="submit" disabled={submitting}>
                    <Send size={15} />
                    {submitting ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </>
            ) : (
              <p className="comment-login-message">
                <Link to="/login">Log in</Link> to share your thoughts.
              </p>
            )}

            {commentError && (
              <p className="comment-error">{commentError}</p>
            )}
          </form>

          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">
                <MessageCircle size={30} />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div className="comment-item" key={comment._id}>
                  <div className="comment-avatar">
                    {comment.author?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div className="comment-main">
                    <div className="comment-author-row">
                      <strong>
                        {comment.author?.name || "Community Member"}
                      </strong>

                      <span>{formatDate(comment.createdAt)}</span>
                    </div>

                    <p>{comment.content}</p>
                  </div>

                  {isMyComment(comment) && (
                    <button
                      className="comment-delete-btn"
                      onClick={() => handleDeleteComment(comment._id)}
                      aria-label="Delete comment"
                      title="Delete comment"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BlogDetails;