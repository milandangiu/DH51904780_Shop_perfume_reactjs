import React, { useState } from "react";
import axios from "axios";
import "./../../../../assets/style/AddProductForm.scss"; // Import file CSS để áp dụng style

const CreateTypeForm = () => {
  const [typeData, setTypeData] = useState({
    type_name: "",
  });

  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi từ server

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTypeData({
      ...typeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("type_name", typeData.type_name);
      // Gọi API POST để thêm sản phẩm mới
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-type",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt header Content-Type cho multipart/form-data
          },
        }
      );
      console.log("Thêm sản phẩm thành công:", response.data);
      setTypeData({
        type_name: "",
      });

      window.alert("Thêm loại sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      window.alert("Lỗi khi thêm loại sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <div className="add-product-form-container">
      <h2>Thêm Loại mới</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="type_name">Loại:</label>
          <input
            type="text"
            id="type_name"
            name="type_name"
            value={typeData.type_name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Thêm loại sản phẩm
        </button>
      </form>
    </div>
  );
};

export default CreateTypeForm;
