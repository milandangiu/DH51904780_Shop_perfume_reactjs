import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../assets/style/ListProduct.scss";
import SelectBox from "../../../../components/share/selectbox";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState(""); // State để lưu trữ thông báo
  const [currentPage, setCurrentPage] = useState(1); // State để lưu trữ trang hiện tại
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/view-orders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleEdit = (orderId) => {
    console.log(`Chỉnh sửa đơn hàng có id: ${orderId}`);
  };

  const handleChangeStatus = async (id, value) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/orders/update-orders-status",
      {
        orderId: id,
        status: value,
      }
    );
    console.log(`${id} - ${value}`);
  };

  const orderElements = currentOrders.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.user_name}</td>
      <td>
        <SelectBox
          itemId={item.id}
          selectedFirst={item.status}
          onOptionChange={handleChangeStatus}
        />
      </td>
      <td>{formatCurrency(item.total_price)}</td>
      <td>{item.payment_method}</td>
      <td>{item.notes}</td>
      <td>{new Date(item.created_at).toLocaleDateString()}</td>
      <td>
        {/* <button
          className="btn btn-sm btn-default"
          onClick={() => handleEdit(item.id)}
        >
          Cập nhật
        </button> */}
      </td>
    </tr>
  ));

  return (
    <section id="main-content">
      <section className="wrapper">
        <div className="table-agile-info">
          <div className="panel panel-default">
            {message && <div className="message">{message}</div>}
            <div className="panel-heading">Danh sách đơn hàng</div>
            <div className="table-responsive">
              <table className="table table-striped b-t b-light">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Trạng thái</th>
                    <th>Tổng giá</th>
                    <th>Hình thức thanh toán</th>
                    <th>Ghi chú</th>
                    <th>Ngày giao dịch</th>
                    {/* <th>Thao tác</th> */}
                  </tr>
                </thead>
                <tbody>{orderElements}</tbody>
              </table>
            </div>
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
      </section>
    </section>
  );
};

export default OrderList;
