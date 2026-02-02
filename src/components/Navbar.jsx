import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthed, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar-header">
      <Link to="/" className="navbar-brand">
        Pro-Tasker
      </Link>

      <nav className="navbar-nav">
        {isAuthed ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              Dashboard
            </NavLink>

            <button onClick={handleLogout} className="navbar-btn">
              Logout
            </button>

            <span className="navbar-user">
              {user?.name || user?.email || "User"}
            </span>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
