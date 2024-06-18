import React, { useState, useEffect } from "react";

import Header from "../theme/header";
import Footer from "../theme/footer";
import Content from "../theme/content";

import { get_profile_async } from "../../../api/auth";

const HomePage = () => {
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
      <Header isLogin={isLogin} user={user} />
      <Content />
      <Footer />
    </div>
  );
};
export default HomePage;
