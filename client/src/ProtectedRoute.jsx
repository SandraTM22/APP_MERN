import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user, isAuthenticated } = useAuth();
  console.log("isAuthenticated en ProtectedRoute:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  return <Outlet/>;
}

export default ProtectedRoute;
