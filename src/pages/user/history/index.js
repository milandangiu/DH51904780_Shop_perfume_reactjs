import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.id) {
          throw new Error('User information not found.');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/user/history_orders/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        });
        setOrders(response.data.orders); // Assuming response.data contains an 'orders' array

      } catch (err) {
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-history-container">
      <h1>Lịch sử đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <h2>Đơn hàng # {order.id}</h2>
              <p>Trạng thái: {order.status}</p>
              <p>Tổng giá: {order.total_price} VNĐ</p>
              <p>Hình thức thanh toán: {order.payment_method}</p>
              <p>Ngày đặt: {new Date(order.created_at).toLocaleDateString()}</p>
              <div>
                <h3>Chi tiết sản phẩm</h3>
                <ul>
                  {order.order_items && order.order_items.map(item => (
                    <li key={item.id}>
                      {item.product.name} - Số lượng: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
