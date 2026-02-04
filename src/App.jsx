import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {/* FOOTER ONLY WHEN LOGGED OUT */}
      {!user && (
        <footer className="app-footer">
          <div className="footer-links">
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/dewan-mahmud-a579a0265/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <span className="dot">|</span>

            <a
              className="footer-link"
              href="https://github.com/DewanTechUS"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <span className="dot">|</span>

            <a
              className="footer-link"
              href="https://dewantech.com"
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} Dewan Mahmud. All rights reserved.
          </p>
        </footer>
      )}
    </div>
  );
}
