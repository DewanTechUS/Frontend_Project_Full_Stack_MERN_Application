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

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login-video-wrapper">
      {/* Video background */}
      <video className="login-video" autoPlay muted loop playsInline>
        <source src="/login-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div className="login-video-overlay" />

      {/* YOUR EXISTING LOGIN  */}
      <section className="auth-split">
        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-panel">
            <h2 className="auth-title">Sign in</h2>

            {error && <p className="auth-error">{error}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
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
                {loading ? "Signing in..." : "Signin"}
              </button>
            </form>

            {/* <p className="auth-or">or signin with</p> */}

            {/* <div className="auth-social">
              <button type="button" className="social-btn">f</button>
              <button type="button" className="social-btn">G+</button>
              <button type="button" className="social-btn">in</button>
            </div> */}
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-right-inner">
            <h3 className="auth-welcome">Welcome</h3>

            <p className="auth-desc">
              With this app, you can create projects, add tasks, update progress,
              and manage everything securely with your own account.
            </p>

            <Link to="/register" className="auth-cta">
              No account yet? Signup.
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
