import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.scss';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.token) {
          throw new Error('User information or token not found.');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/order/details/${id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        });
        setOrder(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  if (!order) return <div className="error">Không tìm thấy đơn hàng.</div>;

  if (!order || !order.order_details) {
    return <div className="error">Không có chi tiết đơn hàng.</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="order-detail-container">
      <h1>Chi tiết đơn hàng số {order.id}</h1>
      <div className="order-summary">
        <p><strong>Trạng thái:</strong> {order.status}</p>
        <p><strong>Tổng giá:</strong> {formatCurrency(order.total_price)}</p>
        <p><strong>Hình thức thanh toán:</strong> {order.payment_method}</p>
        <p><strong>Ngày đặt:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
      </div>

      <h2>Sản phẩm</h2>
      <ul className="product-list">
        {order.order_details.map(detail => (
          <li key={detail.id}>
            <img src={detail.product.image} alt={detail.product.product_name} />
            <div className="product-info">
              <p><strong>Tên sản phẩm:</strong> {detail.product.product_name}</p>
              <p><strong>Số lượng:</strong> {detail.quantity}</p>
              <p><strong>Giá:</strong> {formatCurrency(detail.price)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrderDetail;