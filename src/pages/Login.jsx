import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (!result.ok) return setError(result.message);
    navigate("/dashboard");
  }

  return (
    <section className="auth-card">
      <h2>Login</h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
        </label>

        <label className="auth-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
        </label>

        <button disabled={loading} className="auth-btn">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="auth-footer">
        No account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}
