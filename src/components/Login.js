import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./style/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  localStorage.removeItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data.role == "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      // Chuyển hướng đến dashboard sau khi đăng nhập thành công
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  };

  return (
    <div className="log-w3">
      <div className="w3layouts-main">
        <h2>Sign In Now</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="ggg"
            name="Email"
            placeholder="E-MAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="ggg"
            name="Password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <h6>
            <a href="#">Forgot Password?</a>
          </h6> */}
          <div className="clearfix"></div>
          {error && <p className="error">{error}</p>}
          <input type="submit" value="Sign In" name="login" />
        </form>
        <p>
          Don't Have an Account ?<a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
