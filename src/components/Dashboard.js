import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { get_profile_async } from "../api/auth";

const Dashboard = () => {
  // get profile
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const _response = await get_profile_async();
      console.log(_response.data);
      if (_response.data == null || _response.data.role === "user") {
        navigate("/");
      }
      setUser(_response.data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h2>Dashboard {user?.name}</h2>
      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : "Loading..."}
    </div>
  );
};

export default Dashboard;
