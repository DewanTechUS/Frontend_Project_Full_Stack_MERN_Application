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
    const result = await register(name, email, password);
    if (!result.ok) return setError(result.message);
    navigate("/dashboard");
  }

  return (
    <section className="auth-card">
      <h2>Register</h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-label">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="auth-input"
          />
        </label>

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
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      <p className="auth-footer">
        Have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
