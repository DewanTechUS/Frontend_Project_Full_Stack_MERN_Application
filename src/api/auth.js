import api from "./client";
// Authentication API functions
export async function register(payload) {
  const res = await api.post("/api/auth/register", payload);
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  return res.data;
}
// Authentication API functions
export async function login(payload) {
  const res = await api.post("/api/auth/login", payload);
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  return res.data;
}
// Fetch current user details
export async function getMe() {
  const res = await api.get("/api/auth/me");
  return res.data;
}
// Logout user
export function logout() {
  localStorage.removeItem("token");
}
// Delete current user account
export async function deleteMe() {
  const res = await api.delete("/api/auth/me");
  localStorage.removeItem("token");
  return res.data;
}
