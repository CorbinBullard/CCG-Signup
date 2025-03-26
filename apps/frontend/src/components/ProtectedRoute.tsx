import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../utils/axiosApi";

export default function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await api.get("/api/auth");
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("ERROR: ", error);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
