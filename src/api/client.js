import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Add token to every request automatically
// This ensures that authenticated routes can be accessed seamlessly 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// console.log ("API Client initialized with baseURL:", api.defaults.baseURL);
// You can add response interceptors here if needed
export default api;
