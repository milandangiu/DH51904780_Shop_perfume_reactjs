import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có muốn đăng xuất không?');
    if (confirmLogout) {
      localStorage.clear();
      navigate('/home');
    }
  };

  return (
    <div className="top-nav clearfix">
      <ul className="nav pull-right top-menu">
        <span className="username">Xin chào ADMIN</span>
        <button onClick={handleLogout} className="logout-button">
          Đăng xuất
        </button>
      </ul>
    </div>
  );
}

export default Header;