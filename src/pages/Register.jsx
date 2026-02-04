import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await register({ name, email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <section className="auth-split">
      <div className="auth-left">
        <div className="auth-panel">
          <h2 className="auth-title">Create account</h2>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="auth-input"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />

            <button type="submit" disabled={loading} className="auth-submit">
              {loading ? "Creating..." : "Signup"}
            </button>
          </form>

          <p className="auth-or">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-right-inner">
          <h3 className="auth-welcome">Welcome!</h3>

          <p className="auth-desc">
            Create your account to manage projects and tasks securely. Your data is
            private and protected with JWT authentication.
          </p>

          <Link to="/login" className="auth-cta">
            Have an account? Signin.
          </Link>
        </div>
      </div>
    </section>
  );
}
