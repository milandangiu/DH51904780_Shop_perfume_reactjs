import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <aside>
      <div id="sidebar" className="nav-collapse">
        <div className="leftside-navigation">
          <ul className="sidebar-menu" id="nav-accordion">
            <li>
              <a className="active" href="/admin">
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <Link to="#" onClick={() => toggleSubMenu("products")}>
                Sản Phẩm
              </Link>
              {openSubMenu === "products" && (
                <ul className="sub-menu">
                  <li>
                    <Link to="add-product">Thêm sản phẩm </Link>
                  </li>
                  <li>
                    <Link to="/admin/products">Danh sách sản phẩm</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="#" onClick={() => toggleSubMenu("types")}>
                Loại sản phẩm
              </Link>
              {openSubMenu === "types" && (
                <ul className="sub-menu">
                  <li>
                    <Link to="add-type">Thêm loại sản phẩm</Link>
                  </li>
                  <li>
                    <Link to="/admin/types">Danh sách loại sản phẩm</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="#" onClick={() => toggleSubMenu("brands")}>
                Thương hiệu
              </Link>
              {openSubMenu === "brands" && (
                <ul className="sub-menu">
                  <li>
                    <Link to="add-brand">Thêm loại thương hiệu</Link>
                  </li>
                  <li>
                    <Link to="/admin/brands">Danh sách thương hiệu</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a href="/login">
                <i className="fa fa-user"></i>
                <span>Login Page</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
