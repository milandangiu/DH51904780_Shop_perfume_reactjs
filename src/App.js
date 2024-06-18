import React from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "pages/user/homePage";
import Login from "components/Login";
import Dashboard from "components/Dashboard";
import Register from "components/Register";


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Register" element={<Register />} />

      </Routes>
    </div>
  );
};

export default App;
