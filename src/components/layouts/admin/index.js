import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./side_bar";
import Header from "./header";

const AdminLayout = () => {

  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
