import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../../assets/style/ListProduct.scss";

import { get_types_async } from "../../../../api/type";

const ListType = () => {
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState(""); // State để lưu trữ thông báo


  useEffect(() => {
    const fetchData = async () => {
      try {
        const _response = await get_types_async();
        setTypes(_response.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa loại này?");
    if (!confirmDelete) {
      return; // Nếu người dùng hủy xác nhận
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-type?id=${id}`);
      // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm bằng cách gọi API hoặc cập nhật local state
      const updatedTypes = types.filter((type) => type.id !== id);
      setTypes(updatedTypes);

      setMessage("Xóa loại sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // const handleEdit = (typeId) => {
  //   // Điều hướng đến trang chỉnh sửa sản phẩm (thay thế bằng routing trong React Router hoặc các phương thức điều hướng khác)
  //   console.log(`Chỉnh sửa sản phẩm có id: ${typeId}`);
  // };

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="table-agile-info">
          <div className="panel panel-default">
          {message && <div className="message">{message}</div>}
            <div className="panel-heading">Danh sách loại sản phẩm</div>
            <div className="table-responsive">
              <table className="table table-striped b-t b-light">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên loại</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.type_name}</td>
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
export default ListType;
