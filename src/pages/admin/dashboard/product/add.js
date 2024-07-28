import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../../../assets/style/AddProductForm.scss"; // Import file CSS để áp dụng style

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    sex: "",
    smell: "",
    origin: "",
    capacity: "",
    brand_id: "",
    quantity: "",
    price: "",
    des: "",
    image: "",
  });

  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi từ server
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState(""); // State để lưu trữ thông báo

  useEffect(() => {
    // Lấy danh sách thương hiệu từ API
    const fetchBrands = async () => {
      try {
        const brandRes = await axios.get("http://127.0.0.1:8000/api/brands");
        console.log("Brands response:", brandRes.data); // Kiểm tra dữ liệu trả về từ API
        setBrands(brandRes.data.data); // Truy cập mảng data từ API
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchBrands();
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
      formData.append("sex", productData.sex);
      formData.append("smell", productData.smell);
      formData.append("origin", productData.origin);
      formData.append("capacity", productData.capacity);
      formData.append("brand_id", productData.brand_id);
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
      window.alert("thêm sản phẩm thành công");

      // Đặt lại form về trạng thái ban đầu sau khi thêm thành công
      setProductData({
        product_name: "",
        sex: "",
        smell: "",
        origin: "",
        capacity: "",
        brand_id: "",
        quantity: "",
        price: "",
        des: "",
        image: "",
      });
      setMessage("");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      setMessage("");
      window.alert("thêm sản phẩm thất bại, kiểm tra tên sản phẩm bị trùng!");
    }
    // Xóa thông báo sau 3 giây
    // setTimeout(() => {
    //   setMessage("");
    // }, 3000);
  };

  return (
    <div className="add-product-form-container">
      <h2>Thêm sản phẩm mới</h2>
      {message && <div className="message">{message}</div>}{" "}
      {/* Hiển thị thông báo */}
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
          <label htmlFor="brand_id">Thương hiệu:</label>
          <select
            id="brand_id"
            name="brand_id"
            value={productData.brand_id}
            onChange={handleChange}
            required
          >
            <option value="">Chọn thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sex">Giới tính:</label>
          <select
            id="sex"
            name="sex"
            value={productData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="origin">Xuất xứ:</label>
          <select
            id="origin"
            name="origin"
            value={productData.origin}
            onChange={handleChange}
            required
          >
            <option value="">Chọn xuất xứ</option>
            <option value="Việt Nam">Việt Nam</option>
            <option value="Pháp">Pháp</option>
            <option value="Ý">Ý</option>
            
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Dung tích:</label>
          <select
            id="capacity"
            name="capacity"
            value={productData.capacity}
            onChange={handleChange}
            required
          >
            <option value="">Chọn dung tích</option>
            <option value="50ml">50ml</option>
            <option value="100ml">100ml</option>
            <option value="150ml">150ml</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="smell">Mùi hương:</label>
          <input
            type="text"
            id="smell"
            name="smell"
            value={productData.smell}
            onChange={handleChange}
            required
          />
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
          <textarea
            id="des"
            name="des"
            value={productData.des}
            onChange={handleChange}
            required
            className="resizeable-textarea"
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
          {errors.image && <p className="error">{errors.image}</p>}{" "}
          {/* Hiển thị lỗi liên quan đến ảnh nếu có */}
        </div>
        <button type="submit" className="btn-submit">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
