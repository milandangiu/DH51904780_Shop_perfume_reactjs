import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có muốn đăng xuất không?');
    if (confirmLogout) {
        navigate('/login');
      }
  };

  return (
    // <div className="top-nav clearfix">
    //   <ul className="nav pull-right top-menu">
    //     <li className="dropdown">
    //       <span className="username">John Doe</span>
    //       <a data-toggle="dropdown" className="dropdown-toggle" href="#">
    //             <span className="username">John Doe</span>
    //             <b className="caret"> </b>
    //         </a>
    //       <ul className="dropdown-menu extended logout">
    //             <li><a href="#"><i className="fa fa-suitcase"></i>Profile</a></li>
    //             <li><a href="#"><i className="fa fa-cog"></i> Settings</a></li>
    //             <li><a href="login.html"><i className="fa fa-key"></i> Log Out</a></li>
    //         </ul>
    //     </li>
    //   </ul>
    // </div>
    <div className="top-nav clearfix">
      <ul className="nav pull-right top-menu">
        <span className="username">Xin chào</span>
        <button onClick={handleLogout} className="logout-button">
          Đăng xuất
        </button>
      </ul>
    </div>
  );
}

export default Header;
