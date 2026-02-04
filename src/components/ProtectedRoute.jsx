import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthed, booting } = useAuth();

  if (booting) return null;

  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}
