// import { Navigate } from "react-router-dom";
// import { getToken } from "../api/api";
// import type { ReactNode } from "react";
// export default function ProtectedRoute({ children }: { children: ReactNode }) {
//   const token = getToken();

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }



// src/components/ProtectedRoutes.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    // Redirect based on role if not allowed
    if (userRole === "admin") return <Navigate to="/admin/dashboard" />;
    if (userRole === "user") return <Navigate to="/user/dashboard" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;