import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../assets/style/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
  
      // Lưu thông tin người dùng vào localStorage theo vai trò
      if (data.role === "admin") {
        localStorage.setItem("adminData", JSON.stringify(data));
        navigate("/admin");
      } else {
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/home");
        window.location.reload();
      }
  
      // Chuyển hướng đến dashboard sau khi đăng nhập thành công
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  };
  return (
    <div className="log-w3">
      <div className="w3layouts-main">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="ggg"
            name="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="ggg"
            name="Password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="clearfix"></div>
          {error && <p className="error">{error}</p>}
          <input type="submit" value="Đăng nhập" name="login" />
        </form>
        <p>
          Bạn chưa có tài khoản ?<a href="/register">Đăng kí ngay bây giờ</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
