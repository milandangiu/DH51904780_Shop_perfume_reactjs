import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

import { get_profile_async } from "../../../api/auth";

const AnonymousLayout = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    var _token = localStorage.getItem("token");
    if (_token) {
      setIsLogin(true);
      fetchData();
    } else {
      setIsLogin(false);
    }
    async function fetchData() {
      const _response = await get_profile_async();
      setUser(_response.data);
    }
  }, []);
  return (
    <div>
      <Header isLogin={isLogin} user={user}></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default AnonymousLayout;
