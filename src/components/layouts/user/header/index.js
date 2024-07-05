// import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom"; // Đúng thư viện

import "bootstrap/dist/css/bootstrap.min.css";

const Header = (props) => {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.clear();
    props.setLogin(false);
    navigate("/home");
  };
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <h1>PERFUME</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <NavDropdown title="Danh mục" id="basic-nav-dropdown">
              <NavDropdown.Item href="/product">Sản Phẩm</NavDropdown.Item>
              <NavDropdown.Item href="/type-product">
                Loại sản phẩm
              </NavDropdown.Item>
              <NavDropdown.Item href="/brand">Thương hiệu</NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item href="#">Một thứ khác ở đây</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="/about">Liên hệ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <nav>
                {/* Các liên kết khác */}
                <Link to="/cart" className="btn btn-outline-dark">
                    <i className="bi-cart-fill me-1"></i>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">*</span>
                </Link>
            </nav>
      </Container>

      {!props.isLogin && (
        <Nav.Link href="/login">
          <h5>Đăng nhập</h5>
        </Nav.Link>
      )}

      {props.isLogin && (
        <Nav.Link>
          <h5>Xin chào {props.user?.name}</h5>
          <button onClick={handleLogout}>Đăng xuất</button>
        </Nav.Link>
      )}
    </Navbar>
  );
};
export default Header;
