import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin, apiRegister } from "../api/auth";

const AuthContext = createContext(null);
// AuthProvider component // provides authentication context to its children
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);
// Sync token and user state with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);
// Sync user state with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);
// Login function // calls apiLogin and updates state
  async function login(email, password) {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      setToken(data.token || "");
      setUser(data.user || null);
      return { ok: true };
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  }
// Register function // calls apiRegister and updates state
// similar to login
  async function register(name, email, password) {
    setLoading(true);
    try {
      const data = await apiRegister(name, email, password);
      setToken(data.token || "");
      setUser(data.user || null);
      return { ok: true };
    } catch (err) {
      const message = err?.response?.data?.message || "Register failed";
      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  }
// Logout function // clears token and user state
  function logout() {
    setToken("");
    setUser(null);
  }
// Memoize context value to optimize performance // only changes when dependencies change
  const value = useMemo(
    () => ({ token, user, loading, isAuthed: Boolean(token), login, register, logout }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// Custom hook to use AuthContext
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
