import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// ProtectedRoute component to guard routes that require authentication
// If user is authenticated, render child routes via Outlet
// If not authenticated, redirect to /login
export default function ProtectedRoute() {
  const { isAuthed } = useAuth();
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}
