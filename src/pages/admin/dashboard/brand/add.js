import React, { useState } from "react";
import axios from "axios";
import "./../../../../assets/style/AddProductForm.scss"; // Import file CSS để áp dụng style

const CreateBrandForm = () => {
  const [brandData, setBrandData] = useState({
    brand_name: "",
  });

  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi từ server

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandData({
      ...brandData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("brand_name", brandData.brand_name);
      // Gọi API POST để thêm thương hiệu mới
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-brand",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt header Content-Type cho multipart/form-data
          },
        }
      );
      console.log("Thêm thương hiệu thành công:", response.data);
      // Đặt lại form về trạng thái ban đầu sau khi thêm thành công
      setBrandData({
        brand_name: "",
      });

      window.alert("Thêm thương hiệu thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm thương hiệu:", error);
window.alert("Lỗi khi thêm thương hiệu. Vui lòng thử lại.");

    }
  };

  return (
    <div className="add-product-form-container">
      <h2>Thêm thương hiệu mới</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="brand_name">Thương hiệu:</label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            value={brandData.brand_name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Thêm thương hiệu
        </button>
      </form>
    </div>
  );
};

export default CreateBrandForm;
