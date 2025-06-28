import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (authToken && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    }
  }, [navigate]);
  const authToken = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!authToken || !user) {
    return children;
  }
  return null;
};

export default AuthRedirect;