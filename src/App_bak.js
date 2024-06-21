import React from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "pages/user/homePage";
import Login from "components/Login";
import Dashboard from "components/Dashboard";
import Register from "pages/Register";
import ListProduct from "pages/admin/dashboard/product/view";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/dashboard/list-product" component={ListProduct} />
        {/* <Route path="/add-product" component={AddProduct} />
        <Route path="/all-product" component={AllProducts} />
        <Route path="/add-category-product" component={AddCategory} />
        <Route path="/all-category-product" component={AllCategories} />
        <Route path="/add-brand-product" component={AddBrand} />
        <Route path="/all-brand-product" component={AllBrands} /> */}
      </Routes>
    </div>
  );
};

export default App;
