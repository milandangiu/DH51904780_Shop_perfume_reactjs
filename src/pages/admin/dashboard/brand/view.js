import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../../assets/style/ListProduct.scss";

import { get_brands_async } from "../../../../api/brand";

const ListBrand = () => {
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState(""); // State để lưu trữ thông báo


  useEffect(() => {
    const fetchData = async () => {
      try {
        const _response = await get_brands_async();
        setBrands(_response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa thương hiệu này này?"
    );
    if (!confirmDelete) {
      return; // Nếu người dùng hủy xác nhận
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-brand?id=${id}`);
      // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm bằng cách gọi API hoặc cập nhật local state
      const updatedBrands = brands.filter((brand) => brand.id !== id);
      setBrands(updatedBrands);

      setMessage("Xóa thương hiệu thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa thương hiệu:", error);
    }
  };

  // const handleEdit = (brandId) => {
  //   console.log(`Chỉnh sửa sản phẩm có id: ${brandId}`);
  // };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="table-agile-info">
          <div className="panel panel-default">
          {message && <div className="message">{message}</div>}

            <div className="panel-heading">Danh sách thương hiệu</div>
            <div className="table-responsive">
              <table className="table table-striped b-t b-light">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên thương hiệu</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.brand_name}</td>
                      <td>
                        {/* <button
                          className="btn btn-sm btn-default"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button> */}
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
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
export default ListBrand;
