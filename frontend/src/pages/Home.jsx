
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code,
  Coffee,
  Lightbulb,
  Palette,
  TrendingUp,
  PenLine,
  Clock3
} from "lucide-react";

import "../styles/home.css";

const categories = [
  { name: "Technology", icon: Code, count: "120+ Articles" },
  { name: "Lifestyle", icon: Coffee, count: "85+ Articles" },
  { name: "Creativity", icon: Palette, count: "64+ Articles" },
  { name: "Ideas", icon: Lightbulb, count: "92+ Articles" }
];

const featuredBlogs = [
  {
    id: "featured-1",
    title: "The Future of Artificial Intelligence",
    description:
      "Explore how artificial intelligence is transforming the way we live, work and interact with technology.",
    category: "Technology",
    author: "Alex Morgan",
    date: "Nov 02, 2026",
    read: "6 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "featured-2",
    title: "Finding Inspiration in Everyday Life",
    description:
      "Sometimes the most beautiful ideas come from the simplest moments around us.",
    category: "Lifestyle",
    author: "Sarah Wilson",
    date: "Nov 01, 2026",
    read: "4 min read",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "featured-3",
    title: "Building Better Habits for Success",
    description:
      "Small consistent actions can create meaningful changes in your personal and professional life.",
    category: "Personal Growth",
    author: "James Carter",
    date: "Oct 29, 2026",
    read: "5 min read",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80"
  }
];

const latestBlogs = [
  {
    id: "latest-1",
    title: "Why Every Developer Should Learn React",
    category: "Technology",
    author: "David Miller",
    date: "Nov 04, 2026",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "latest-2",
    title: "The Art of Slow Living",
    category: "Lifestyle",
    author: "Emma Davis",
    date: "Nov 03, 2026",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "latest-3",
    title: "Creative Thinking in a Digital World",
    category: "Creativity",
    author: "Ryan Smith",
    date: "Nov 02, 2026",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80"
  }
];

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-tag">
              <span className="hero-tag-dot"></span>
              A COMMUNITY OF CURIOUS MINDS
            </span>

            <h1>
              Stories that
              <br />
              <span>inspire ideas.</span>
            </h1>

            <p>
              Discover fresh perspectives, share your knowledge
              and explore stories that make you think differently.
              Your next great read starts here.
            </p>

            <div className="hero-buttons">
              <Link to="/blogs" className="hero-primary-btn">
                Explore Stories <ArrowRight size={18} />
              </Link>

              <Link to="/register" className="hero-secondary-btn">
                Start Writing
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <h3>500+</h3>
                <span>Published Stories</span>
              </div>

              <div>
                <h3>200+</h3>
                <span>Writers</span>
              </div>

              <div>
                <h3>10k+</h3>
                <span>Readers</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85"
              alt="Writing and creative workspace"
              className="hero-image"
            />

            <div className="hero-floating-card">
              <div className="floating-icon">
                <BookOpen size={20} />
              </div>

              <div>
                <h4>Read something new</h4>
                <p>Ideas worth sharing.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="category-section">
        <div className="container">

          <div className="home-section-header">
            <div>
              <span className="section-eyebrow">EXPLORE INTERESTS</span>
              <h2>Find your inspiration</h2>
              <p>Explore topics that match your curiosity.</p>
            </div>

            <Link to="/blogs" className="text-link">
              All categories <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  to={`/blogs?category=${encodeURIComponent(category.name)}`}
                  className="category-card"
                  key={category.name}
                >
                  <div className="category-icon">
                    <Icon size={23} />
                  </div>

                  <h3>{category.name}</h3>
                  <p>{category.count}</p>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* FEATURED BLOGS */}
      <section className="featured-section">
        <div className="container">

          <div className="home-section-header">
            <div>
              <span className="section-eyebrow">EDITOR'S PICKS</span>
              <h2>Featured stories</h2>
              <p>Handpicked reads worth your time.</p>
            </div>

            <Link to="/blogs" className="text-link">
              View all stories <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="featured-grid">
            {featuredBlogs.map((blog) => (
              <article className="featured-card" key={blog.id}>

                <Link to="/blogs" className="featured-image-link">
                  <img src={blog.image} alt={blog.title} />
                  <span className="featured-category">
                    {blog.category}
                  </span>
                </Link>

                <div className="featured-content">
                  <div className="featured-meta">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3>
                    <Link to="/blogs">{blog.title}</Link>
                  </h3>

                  <p>{blog.description}</p>

                  <div className="featured-bottom">
                    <span>
                      <Clock3 size={14} />
                      {blog.read}
                    </span>

                    <Link to="/blogs" aria-label="Read story">
                      <ArrowUpRight size={19} />
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="latest-section">
        <div className="container">

          <div className="home-section-header">
            <div>
              <span className="section-eyebrow">FRESHLY PUBLISHED</span>
              <h2>Latest articles</h2>
              <p>Discover what's new in our community.</p>
            </div>

            <Link to="/blogs" className="text-link">
              Explore more <ArrowRight size={17} />
            </Link>
          </div>

          <div className="latest-grid">
            {latestBlogs.map((blog) => (
              <article className="latest-card" key={blog.id}>
                <Link to="/blogs" className="latest-image">
                  <img src={blog.image} alt={blog.title} />
                </Link>

                <div className="latest-content">
                  <span className="latest-category">
                    {blog.category}
                  </span>

                  <h3>
                    <Link to="/blogs">{blog.title}</Link>
                  </h3>

                  <div className="latest-meta">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="home-cta-section">
        <div className="home-cta">
          <div className="cta-icon">
            <PenLine size={26} />
          </div>

          <span className="section-eyebrow">YOUR VOICE MATTERS</span>

          <h2>
            Have a story
            <br />
            worth sharing?
          </h2>

          <p>
            Turn your thoughts into stories. Join our community
            and inspire readers with your unique perspective.
          </p>

          <Link to="/register" className="cta-button">
            Start Your Journey <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
