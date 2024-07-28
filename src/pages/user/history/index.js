import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [cancelReasons, setCancelReasons] = useState({});
  const [cancelingOrderId, setCancelingOrderId] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const fetchOrders = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData || !userData.id) {
        throw new Error("User information not found.");
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/history_orders/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setOrders(response.data.orders); // Assuming response.data contains an 'orders' array
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/history_orders/order_detail/${orderId}`);
  };

  const handleCancelOrder = async (orderId, reason) => {
    try {
      // Lấy thông tin người dùng từ localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData || !userData.id || !userData.token) {
        throw new Error("Thông tin người dùng không được tìm thấy.");
      }

      // Gọi API để hủy đơn hàng
      const response = await axios.post(
        `http://127.0.0.1:8000/api/order/cancel/${orderId}`,
        { reason: reason },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      // Nếu thành công, làm mới danh sách đơn hàng
      fetchOrders();

      // Hiển thị thông báo thành công
      setSuccessMessage(response.data.message);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage("");
      }, 5000);
      // Đặt lại trạng thái sau khi hủy đơn hàng
      setCancelingOrderId(null);
      setCancelReasons({});
    } catch (err) {
      // Xử lý lỗi và hiển thị thông báo lỗi
      console.error(
        "Lỗi khi hủy đơn hàng:",
        err.response ? err.response.data.error : err.message
      );
      setError(
        err.response ? err.response.data.error : "Không thể hủy đơn hàng."
      );
    }
  };

  const handleCancelClick = (orderId) => {
    setCancelingOrderId(orderId);
    setError(null); // Xóa lỗi trước đó nếu có
  };

  const handleConfirmCancel = (orderId) => {
    const reason = cancelReasons[orderId];
    if (!reason) {
      setError("Vui lòng nhập lý do hủy.");
      return;
    }
    handleCancelOrder(orderId, reason);
  };

  const handleReasonChange = (orderId, value) => {
    setCancelReasons({ ...cancelReasons, [orderId]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="order-history-container">
      <h1>Lịch sử đơn hàng</h1>
      {showSuccessMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h2>Đơn hàng số {order.id}</h2>
              <p>Trạng thái: {order.status}</p>
              <p>Tổng giá: {formatCurrency(order.total_price)}</p>
              <p>Hình thức thanh toán: {order.payment_method}</p>
              <p>
                Ngày đặt: {new Date(order.created_at).toLocaleDateString()}
              </p>
              {cancelingOrderId === order.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Nhập lý do hủy"
                    value={cancelReasons[order.id] || ""}
                    onChange={(e) =>
                      handleReasonChange(order.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleConfirmCancel(order.id)}>
                    Xác nhận hủy
                  </button>
                </div>
              ) : (
                <div className="order-item-actions">
                  <button onClick={() => handleViewOrder(order.id)}>
                    Xem đơn hàng
                  </button>
                  {order.status !== "Đã hủy" && order.status !== "Đang xử lý" && order.status !== "Đang giao hàng" && order.status !== "Đã nhận hàng" &&(
                    <button onClick={() => handleCancelClick(order.id)}>
                      Hủy đơn hàng
                    </button>                   
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default OrderHistory;
