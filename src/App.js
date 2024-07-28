import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AdminLayout from "components/layouts/admin";
import UserLayout from "components/layouts/user";

// for normal user
import HomePage from "pages/user/homePage";
import ProductDetail from "pages/user/products/detail";
import Cart from "pages/user/cart";



// for admin
import AdminDashboard from "pages/admin/dashboard";
//product
import AdminProductList from "pages/admin/dashboard/product/view";
import AdminProductCreate from "pages/admin/dashboard/product/add";
import AdminProductUpdate from "pages/admin/dashboard/product/update";


//brand
import AdminBrandList from "pages/admin/dashboard/brand/view";
import AdminBrandCreate from "pages/admin/dashboard/brand/add";

//type
import AdminTypeList from "pages/admin/dashboard/type/view";
import AdminTypeCreate from "pages/admin/dashboard/type/add";
//order


//user






import Login from "pages/Login";
import Register from "pages/Register";
import OrderHistory from "pages/user/history";
import OrderList from "pages/admin/dashboard/order/view";
import OrderDetail from "pages/user/order_detail";
import UserProfile from "pages/user/profile";
import AdminOrderDetail from "pages/admin/dashboard/order/update";
import UserList from "pages/admin/dashboard/user";

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
          path: "/register",
          element: <Register />,
        },
        {
          path: "/san-pham/:id",
          element: <ProductDetail />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/history_orders",
          element: <OrderHistory />,
        },
        {
          path: "/history_orders/order_detail/:id",
          element: <OrderDetail />,
        },
        {
          path: "/profile",
          element: <UserProfile />,
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
          path: "add-product",
          element: <AdminProductCreate />,
        },
        {
          path: "products/update/:id",
          element: <AdminProductUpdate />,
        },
        {
          path: "brands",
          element: <AdminBrandList />,
        },
        {
          path: "add-brand",
          element: <AdminBrandCreate />,
        },
        {
          path: "types",
          element: <AdminTypeList />,
        },
        {
          path: "add-type",
          element: <AdminTypeCreate />,
        },
        {
          path: "view-orders",
          element: <OrderList />,
        },
        {
          path: "view-orders/order_detail/:id",
          element: <AdminOrderDetail />,
        },
        {
          path: "view-users",
          element: <UserList />,
        },
      ],
    },
  ]);
  return routes;
};

export default App;
