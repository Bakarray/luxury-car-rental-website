import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import CarDetails from "./pages/CarDetails.tsx";
import Cars from "./pages/Cars.tsx";
import MyBookings from "./pages/MyBookings.tsx";
import Layout from "./pages/owner/Layout.tsx";
import Dashboard from "./pages/owner/Dashboard.tsx";
import AddCar from "./pages/owner/AddCar.tsx";
import ManageCars from "./pages/owner/ManageCars.tsx";
import ManageBookings from "./pages/owner/ManageBookings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, element: <Home /> },
      { path: "/car-details/:id", element: <CarDetails /> },
      { path: "/cars", element: <Cars /> },
      { path: "/my-bookings", element: <MyBookings /> },

      // OWNER
      {
        path: "/owner",
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "add-car", element: <AddCar /> },
          { path: "manage-cars", element: <ManageCars /> },
          { path: "manage-bookings", element: <ManageBookings /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
