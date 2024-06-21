import React, { useState } from "react";
import axios from "axios";
import "./../../../../assets/style/AddProductForm.scss"; // Import file CSS để áp dụng style

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    type_name: "",
    brand_name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi từ server

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif")
    ) {
      setProductData({
        ...productData,
        image: file,
      });
      setErrors((prevErrors) => ({ ...prevErrors, image: null })); // Xóa lỗi liên quan đến ảnh nếu có
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image:
          "File không hợp lệ. Vui lòng chọn tệp ảnh (jpeg, png, jpg, gif).",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product_name", productData.product_name);
      formData.append("type_name", productData.type_name);
      formData.append("brand_name", productData.brand_name);
      formData.append("quantity", productData.quantity);
      formData.append("price", productData.price);
      formData.append("image", productData.image); // Thêm file vào FormData
      // Gọi API POST để thêm sản phẩm mới
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt header Content-Type cho multipart/form-data
          },
        }
      );
      console.log("Thêm sản phẩm thành công:", response.data);
      // Đặt lại form về trạng thái ban đầu sau khi thêm thành công
      setProductData({
        product_name: "",
        type_name: "",
        brand_name: "",
        quantity: "",
        price: "",
        des: "",
        image: "",
      });
      // Thực hiện các hành động khác sau khi thêm thành công nếu cần
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="add-product-form-container">
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="product_name">Tên sản phẩm:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type_name">Loại sản phẩm:</label>
          <input
            type="text"
            id="type_name"
            name="type_name"
            value={productData.type_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand_name">Thương hiệu:</label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            value={productData.brand_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Mô tả:</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Mô tả:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="des">Mô tả:</label>
          <input
            type="text"
            id="des"
            name="des"
            value={productData.des}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Hình ảnh:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
