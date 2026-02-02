import axios from "axios";

const client = axios.create({
  baseURL: "", // I have set baseURL to empty string to use relative paths // for development and production // backend URL will be prepended automatically // IMPORTANT: use Vite proxy (/api -> backend)
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
