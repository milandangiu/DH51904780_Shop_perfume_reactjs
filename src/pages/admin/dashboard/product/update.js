import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./../../../../assets/style/UpdateProduct.scss"; // Import file CSS để áp dụng style
import { get_product_detail_async } from "../../../../api/product";

const UpdateProductForm = () => {
  let { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [productImage, setProductImage] = useState(null);

  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi từ server
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState(""); // State để lưu trữ thông báo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _response = await get_product_detail_async(id);
        setProductData(_response.data);
        console.log(_response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
    // Function to fetch brands and types
    const fetchOptions = async () => {
      try {
        const [brandRes, typeRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/brands"),
          axios.get("http://127.0.0.1:8000/api/types"),
        ]);
        setBrands(brandRes.data.data);
        setTypes(typeRes.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [id]);

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
      setProductImage(file);
      setErrors((prevErrors) => ({ ...prevErrors, image: null }));
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
      formData.append("id", productData.id);
      formData.append("product_name", productData.product_name);
      formData.append("type_name", productData.type_name);
      formData.append("brand_name", productData.brand_name);
      formData.append("quantity", productData.quantity);
      formData.append("price", productData.price);
      formData.append("des", productData.des);
      if (productImage) {
        formData.append("image", productImage);
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/update-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);

      setMessage("Cập nhật sản phẩm thành công!");
      window.alert("Cập nhật sản phẩm thành công!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
      window.alert("Lỗi khi cập nhật sản phẩm. Vui lòng thử lại.");
      window.location.reload();
    }
  };

  return (
    <div className="update-product-box">
      <div className="update-product-form-container">
        <h2>Cập nhật sản phẩm</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit} className="update-product-form">
          <div className="form-group">
            <label htmlFor="product_name">Tên sản phẩm:</label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={productData?.product_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type_name">Loại sản phẩm:</label>
            <select
              id="type_name"
              name="type_name"
              value={productData?.type_name}
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
              value={productData?.brand_name}
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
              value={productData?.quantity}
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
              value={productData?.price}
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
              value={productData?.des}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Hình ảnh:</label>
            <img src={productData?.image} alt={productData?.product_name}></img>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            {errors.image && <div className="error">{errors.image}</div>}
          </div>
          <button type="submit" className="btn-submit">
            Cập nhật sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateProductForm;
