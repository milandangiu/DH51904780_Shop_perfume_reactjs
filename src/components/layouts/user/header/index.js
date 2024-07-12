import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom"; // Đúng thư viện
import './style.scss';

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
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            <NavDropdown title="Danh mục" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/product">Sản Phẩm</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/type-product">Loại sản phẩm</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/brand">Thương hiệu</NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item as={Link} to="#">Một thứ khác ở đây</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link as={Link} to="/about">Liên hệ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <nav>
          <Link to="/cart" className="btn btn-outline-dark">
            <i className="bi-cart-fill me-1"></i>
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">*</span>
          </Link>
        </nav>
      </Container>

      {!props.isLogin ? (
        <Nav.Link as={Link} to="/login">
          <h5>Đăng nhập</h5>
        </Nav.Link>
      ) : (
        <NavDropdown title={`Xin chào ${props.user?.name}`} id="user-dropdown">
          <NavDropdown.Item as={Link} to="/profile">Thông tin cá nhân</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/history_orders">Đơn hàng</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
        </NavDropdown>
      )}
    </Navbar>
  );
};

export default Header;