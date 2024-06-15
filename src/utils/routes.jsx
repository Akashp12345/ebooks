import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Home from "../pages/Home";
import ErrorElement from "../components/ErrorElement";
import ProtectedRoute from "../components/ProtectedRoute";

// Defined routes
const RouteWrapper = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RouteWrapper />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/favourite",
        element:<ProtectedRoute>
          <label>Hello</label>
        </ProtectedRoute>
      }
    ],
  },
]);

export default routes;
