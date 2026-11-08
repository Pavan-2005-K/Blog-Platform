import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const result = await login(email.trim(), password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-left">
          <div className="auth-left-content">
            <span className="auth-eyebrow">WELCOME BACK</span>

            <h1>
              Your next great
              <span> idea starts here.</span>
            </h1>

            <p>
              Sign in to continue sharing your thoughts,
              discovering stories, and connecting with writers.
            </p>

            <div className="auth-quote">
              <span>“</span>
              <p>
                A blog is a conversation, not a code.
              </p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrapper">

            <div className="auth-mobile-logo">
              <Link to="/">BlogSpace.</Link>
            </div>

            <span className="auth-form-label">YOUR ACCOUNT</span>

            <h2>Welcome back</h2>

            <p className="auth-description">
              Enter your details to access your account.
            </p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="auth-input-group">
                <label htmlFor="login-email">Email address</label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="login-password">Password</label>

                <div className="auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight size={18} />}
              </button>

            </form>

            <p className="auth-switch">
              Don't have an account?
              <Link to="/register"> Create account</Link>
            </p>

            <Link to="/" className="auth-back-home">
              ← Back to homepage
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;