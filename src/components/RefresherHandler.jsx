import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const RefresherHandler = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/", { replace: true });
      }
    }
  }, [location, navigate, isAuthenticated]);
};

export default RefresherHandler;
