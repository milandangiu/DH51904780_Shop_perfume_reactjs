import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../../../assets/style/AddProductForm.scss"; // Import file CSS để áp dụng style

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    type_name: "",
    brand_name: "",
    quantity: "",
    price: "",
    des: "",
    image: "",
  });

  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi từ server
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState(""); // State để lưu trữ thông báo

  useEffect(() => {
    // Lấy danh sách thương hiệu và loại sản phẩm từ API
    const fetchOptions = async () => {
      try {
        const [brandRes, typeRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/brands"),
          axios.get("http://127.0.0.1:8000/api/types"),
        ]);
        console.log("Brands response:", brandRes.data); // Kiểm tra dữ liệu trả về từ API
        console.log("Types response:", typeRes.data); // Kiểm tra dữ liệu trả về từ API
        setBrands(brandRes.data.data); // Truy cập mảng data từ API
        setTypes(typeRes.data.data); // Truy cập mảng data từ API
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchOptions();
  }, []);

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
        image: "File không hợp lệ. Vui lòng chọn tệp ảnh (jpeg, png, jpg, gif).",
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
      formData.append("des", productData.des);
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
      window.alert("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      window.alert("Lỗi khi thêm sản phẩm. Vui lòng thử lại.");
    }

    // Xóa thông báo sau 3 giây
    // setTimeout(() => {
    //   setMessage("");
    // }, 3000);
  };

  return (
    <div className="add-product-form-container">
      <h2>Thêm sản phẩm mới</h2>
      {message && <div className="message">{message}</div>} {/* Hiển thị thông báo */}
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
          <select
            id="type_name"
            name="type_name"
            value={productData.type_name}
            onChange={handleChange}
            required
          >
            <option value="">Chọn loại sản phẩm</option>
            {types.map((type) => (
              <option key={type.id} value={type.type_name}>
                {type.type_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand_name">Thương hiệu:</label>
          <select
            id="brand_name"
            name="brand_name"
            value={productData.brand_name}
            onChange={handleChange}
            required
          >
            <option value="">Chọn thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.brand_name}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Số lượng:</label>
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
          <label htmlFor="price">Giá:</label>
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
