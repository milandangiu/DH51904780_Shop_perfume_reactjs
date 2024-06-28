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
      <div className="footer">
        <div className="wthree-copyright">
          <p>
            © 2017 Visitors. All rights reserved | Design by{" "}
            <a href="http://w3layouts.com">W3layouts</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
