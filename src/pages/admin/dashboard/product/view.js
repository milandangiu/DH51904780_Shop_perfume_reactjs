import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../../assets/style/ListProduct.scss";

import { get_products_async } from "../../../../api/product";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _response = await get_products_async();
        setProducts(_response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?"
    );
    if (!confirmDelete) {
      return; // Nếu người dùng hủy xác nhận
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-product?id=${id}`);
      // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm bằng cách gọi API hoặc cập nhật local state
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleEdit = (productId) => {
    // Điều hướng đến trang chỉnh sửa sản phẩm (thay thế bằng routing trong React Router hoặc các phương thức điều hướng khác)
    console.log(`Chỉnh sửa sản phẩm có id: ${productId}`);
  };

  return (
    <div className="product-list-container">
      <h1>Danh sách sản phẩm</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li className="product-item">
            <div className="product-image">
              <img src={product.image} alt={product.id} />
            </div>
            <div className="product-details">
              <div>
                <strong>ID:</strong> {product.id}
              </div>
              <div>
                <strong>Tên sản phẩm:</strong> {product.product_name}
              </div>
              <div>
                <strong>Loại sản phẩm:</strong> {product.type_name}
              </div>
              <div>
                <strong>Thương hiệu:</strong> {product.brand_name}
              </div>
              <div>
                <strong>Số lượng:</strong> {product.quantity}
              </div>
              <div>
                <strong>Giá:</strong> {product.price}
              </div>
              <div>
                <strong>Mô tả:</strong> {product.des}
              </div>
              <div className="product-actions">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="btn-edit"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn-delete"
                >
                  Xóa
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListProduct;
