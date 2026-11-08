import { Link } from "react-router-dom";
import {
  BookOpen,
  Camera,
  Users,
  Send,
  ArrowUpRight
} from "lucide-react";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-top">

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                <BookOpen size={22} />
              </span>
              BlogSpace<span>.</span>
            </Link>

            <p>
              A space for curious minds, creative thinkers
              and passionate writers. Share your ideas
              with the world.
            </p>

            <div className="footer-socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Camera size={19} />
              </a>

              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Users size={19} />
              </a>

              <a href="https://www.x.com/" target="_blank" rel="noreferrer" aria-label="Social media">
                <Send size={19} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/blogs">All Blogs</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="footer-column">
            <h3>Account</h3>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/create-blog">Write a Blog</Link>
          </div>

          <div className="footer-newsletter">
            <h3>Stay Inspired</h3>
            <p>
              Discover fresh perspectives and interesting
              stories from our community.
            </p>

            <Link to="/register" className="footer-join-link">
              Join our community <ArrowUpRight size={16} />
            </Link>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
          <p>Made with passion for readers and writers.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;