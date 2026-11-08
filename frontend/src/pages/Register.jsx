import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  UserRound,
  Mail,
  Lock,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = await register(name.trim(), email.trim(), password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-left register-left">
          <div className="auth-left-content">
            <span className="auth-eyebrow">JOIN OUR COMMUNITY</span>

            <h1>
              Every voice
              <span> deserves a story.</span>
            </h1>

            <p>
              Create your account and become part of a community
              where ideas, experiences, and creativity come together.
            </p>

            <div className="auth-quote">
              <span>“</span>
              <p>
                Start writing. Start sharing. Make your ideas matter.
              </p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrapper">

            <div className="auth-mobile-logo">
              <Link to="/">BlogSpace.</Link>
            </div>

            <span className="auth-form-label">GET STARTED</span>

            <h2>Create account</h2>

            <p className="auth-description">
              Join BlogSpace and start sharing your stories.
            </p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="auth-input-group">
                <label htmlFor="register-name">Full name</label>

                <div className="auth-input-wrapper">
                  <UserRound size={18} />

                  <input
                    id="register-name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="register-email">Email address</label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="register-password">Password</label>

                <div className="auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              <div className="auth-input-group">
                <label htmlFor="confirm-password">Confirm password</label>

                <div className="auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
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
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight size={18} />}
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?
              <Link to="/login"> Sign in</Link>
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

export default Register;