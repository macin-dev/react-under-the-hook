import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};
