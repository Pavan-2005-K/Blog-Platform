
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  BookOpen,
  Menu,
  X,
  UserRound,
  PenLine
} from "lucide-react";

import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/blogs" },
    { name: "Dashboard", path: "/dashboard" }
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">
            <BookOpen size={23} />
          </span>
          <span>BlogSpace<span className="logo-dot">.</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Actions */}
          <div className="mobile-nav-actions">
            <Link to="/login" onClick={closeMenu}>
              <UserRound size={17} /> Login
            </Link>

            <Link
              to="/register"
              className="nav-start-btn"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="nav-start-btn">
            <PenLine size={15} />
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
