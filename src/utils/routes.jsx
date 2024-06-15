import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Home from "../pages/Home";
import ErrorElement from "../components/ErrorElement";

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
    ],
  },
]);

export default routes;
