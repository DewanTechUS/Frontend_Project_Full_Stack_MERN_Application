import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getMe as apiGetMe,
} from "../api/auth";
// Create AuthContext
const AuthContext = createContext(null);
// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
// On mount, check for existing auth token and fetch user data
  useEffect(() => {
    let alive = true;
// Boot function to fetch user data
    async function boot() {
      const token = localStorage.getItem("token");
      if (!token) {
        if (alive) setBooting(false);
        return;
      }

      try {
        const data = await apiGetMe();
        const u = data?.user ?? data;
        if (alive) setUser(u || null);
      } catch {
        apiLogout();
        if (alive) setUser(null);
      } finally {
        if (alive) setBooting(false);
      }
    }

    boot();
    return () => {
      alive = false;
    };
  }, []);
// Login function
  async function login(payload) {
    setLoading(true);
    try {
      const data = await apiLogin(payload);
      setUser(data?.user || null);
      return data;
    } finally {
      setLoading(false);
    }
  }
// Register function
  async function register(payload) {
    setLoading(true);
    try {
      const data = await apiRegister(payload);
      setUser(data?.user || null);
      return data;
    } finally {
      setLoading(false);
    }
  }
// Logout function
  function logout() {
    apiLogout();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      booting,
      isAuthed: !!user,
      login,
      register,
      logout,
      setUser,
    }),
    [user, loading, booting]
  );
// Provide AuthContext to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
