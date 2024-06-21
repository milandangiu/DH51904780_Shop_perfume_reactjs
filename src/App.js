import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AdminLayout from "components/layouts/admin";
import UserLayout from "components/layouts/user";

// for normal user
import HomePage from "pages/user/homePage";
import ProductDetail from "pages/user/products/detail";

// for admin
import AdminDashboard from "pages/admin/dashboard";
import AdminProductList from "pages/admin/dashboard/product/view";
import AdminProductCreate from "pages/admin/dashboard/product/add";

import Login from "pages/Login";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate to="/home" />,
    },
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/san-pham/:id",
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "home",
          element: <AdminDashboard />,
        },
        {
          path: "products",
          element: <AdminProductList />,
        },
        {
          path: "admin/add-product",
          element: <AdminProductCreate />,
        },
        {
          path: "products/update/:id",
          element: <AdminProductList />,
        },
      ],
    },
  ]);
  return routes;
};

export default App;
