import client from "./client";
// Authentication API functions // for login and registration
// Login API function // sends email and password to backend
export async function apiLogin(email, password) {
  const res = await client.post("/api/auth/login", { email, password });
  return res.data;
}
// Registration API function // sends user details to backend
export async function apiRegister(name, email, password) {
  const res = await client.post("/api/auth/register", { name, email, password });
  return res.data;
}
