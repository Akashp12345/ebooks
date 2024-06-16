import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Home from "../pages/Home";
import ErrorElement from "../components/ErrorElement";
import ProtectedRoute from "../components/ProtectedRoute";
import Registration from "../components/Registration";
import Favourite from "../pages/Favourite";

// Defined routes
const RouteWrapper = () => {
  return (
    <>
      <NavBar />
      <Registration/>
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
         <Favourite/>
        </ProtectedRoute>
      }
    ],
  },
]);

export default routes;
