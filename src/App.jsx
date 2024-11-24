import React, { useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import routesConfig from "./routes/routes.config";
import BackTop from "./components/backtop";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const user = localStorage.getItem("user"); // Lấy thông tin user từ localStorage (hoặc từ API/Context)
    if (!user && location.pathname !== "/login") {
      navigate("/login"); // Điều hướng đến trang login nếu không có user
    }

    // Scroll to top on path change
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, navigate]);

  const renderRoutes = (routes) => {
    return routes?.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children && renderRoutes(route.children)}
        </Route>
    ));
  };

  return (
      <>
        <Routes>{renderRoutes(routesConfig)}</Routes>
        <BackTop />
      </>
  );
}

export default App;
