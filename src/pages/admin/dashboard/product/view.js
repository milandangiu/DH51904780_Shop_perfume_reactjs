import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // Import useHistory từ React Router

import "../../../../assets/style/ListProduct.scss";

import { get_products_async } from "../../../../api/product";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // State để lưu trữ thông báo
  const [currentPage, setCurrentPage] = useState(1); // State để lưu trữ trang hiện tại
  const productsPerPage = 10;

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

      setMessage("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleEdit = (productId) => {
    console.log(`Chỉnh sửa sản phẩm có id: ${productId}`);
    // Điều hướng đến trang chỉnh sửa sản phẩm với productId
    navigate(`update/${productId}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="table-agile-info">
          <div className="panel panel-default">
            {message && <div className="message">{message}</div>}
            <div className="panel-heading">Danh sách sản phẩm</div>
            <div className="table-responsive">
              <table className="table table-striped b-t b-light">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Thương hiệu</th>
                    <th>Loại</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.product_name}</td>
                      <td>{item.brand_name}</td>
                      <td>{item.type_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-default"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  &larr; Trước
                </button>
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`btn ${
                        currentPage === index + 1
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Sau &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
export default ListProduct;
