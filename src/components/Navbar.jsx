import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

// audio file //  
import musicFile from "../assets/music.mp3";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // dark mode (persist)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("protasker_dark");
    return saved ? saved === "true" : false;
  });

  // sound (persist)
  const [soundOn, setSoundOn] = useState(() => {
    const saved = localStorage.getItem("protasker_sound");
    return saved ? saved === "true" : false;
  });

  // audio (single instance)
  const audioRef = useRef(null);

  function openLogoutModal() {
    setShowLogoutModal(true);
  }
  function closeLogoutModal() {
    setShowLogoutModal(false);
  }
  function confirmLogout() {
    closeLogoutModal();
    logout();
    navigate("/login");
  }

  // apply dark mode class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("protasker_dark", String(dark));
  }, [dark]);

  // initialize audio once
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicFile);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25; // adjust volume
    }
  }, []);

  // play / pause based on soundOn
  useEffect(() => {
    localStorage.setItem("protasker_sound", String(soundOn));

    if (!audioRef.current) return;

    if (soundOn) {
      audioRef.current.play().catch(() => {
        // autoplay may be blocked until user clicks
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [soundOn]);

  return (
    <nav className="navbar">
      {/* HEADER CONTENT STACKED */}
      {!user && (
        <>
          <div className="navbar-subrow">
            <Link to="/" className="navbar-title">
              Pro-Tasker Project - Full-Stack MERN Application
            </Link>

            <div className="navbar-meta">
              <span>
                <strong>Author:</strong> Dewan Mahmud
              </span>
              <span className="dot">•</span>
              <span>
                <strong>Project:</strong> Full-Stack MERN Application
              </span>
              <span className="dot">•</span>
              <span>
                <strong>Tech:</strong> React, Node.js, Express, MongoDB (MERN)
              </span>
            </div>

            <p className="navbar-subtext">
              Repositories: Frontend &amp; Backend maintained separately for clarity.
            </p>

            <div className="navbar-note">
              <strong>Note:</strong> This application stores data in my database for
              learning purposes. <br />
              Feel free to leave an inspiring, learning, or motivational message, or
              any feedback. Thank you!
            </div>
          </div>
        </>
      )}

      {/*  CONTROLS ROW */}
      <div className="navbar-inner navbar-controls">
        <div className="navbar-controls-right">
          {/* dark mode */}
          <button
            type="button"
            className="pill-btn"
            onClick={() => setDark((v) => !v)}
            title="Toggle dark mode"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* music toggle */}
          <button
            type="button"
            className="pill-btn"
            onClick={() => setSoundOn((v) => !v)}
            title="Toggle music"
          >
            {soundOn ? "🔊 Sound On" : "🔇 Sound Off"}
          </button>

          {user && (
            <>
              <button type="button" className="navbar-btn" onClick={openLogoutModal}>
                Logout
              </button>

              <span className="navbar-user">
                Logged in as <strong>{user.name || "Rocky"}</strong>
              </span>
            </>
          )}
        </div>
      </div>

      {/* logout modal */}
      {showLogoutModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) closeLogoutModal();
          }}
        >
          <div className="modal-card">
            <h3 className="modal-title">Log Out?</h3>
            <p className="modal-text">Are you sure you want to log out?</p>

            <div className="modal-actions">
              <button type="button" className="task-delete" onClick={closeLogoutModal}>
                No
              </button>
              <button type="button" className="task-btn" onClick={confirmLogout}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
