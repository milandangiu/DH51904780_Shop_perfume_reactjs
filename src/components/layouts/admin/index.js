import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./side_bar";
import Header from "./header";
import "../../../assets/style/AdminLayout.scss"; // Import CSS file

const AdminLayout = () => {
  return (
    <div>
      <div>
        <Header />
        <div>
          <Sidebar />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
