import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();


  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/history_orders/order_detail/${orderId}`);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || !userData.id) {
        throw new Error('User information not found.');
      }

      // Call API to cancel order
      const response = await axios.delete(`http://127.0.0.1:8000/api/order/cancel/${orderId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      });
      // If successful, fetch orders again to update the list
      fetchOrders();
      console.log(response.data.message); // Log success message


      setSuccessMessage(response.data.message);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage('');
        window.location.reload();
      }, 5000);


    } catch (err) {
      console.error('Error cancelling order:', err.message || err);
      setError('Failed to cancel order.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-history-container">
      <h1>Lịch sử đơn hàng</h1>
      {showSuccessMessage && <div className="success-message">{successMessage}</div>}

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
              <div className="order-item-actions">
                <button onClick={() => handleViewOrder(order.id)}>Xem đơn hàng</button>
                <button onClick={() => handleCancelOrder(order.id)}>Hủy đơn hàng</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
