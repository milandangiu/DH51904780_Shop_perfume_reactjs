import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.scss';

const OrderDetail = () => {
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

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!order) return <div>Không tìm thấy đơn hàng.</div>;

  if (!order || !order.order_details) {
    return <div>Không có chi tiết đơn hàng.</div>;
  }
  
  return (
    <div className="order-detail-container">
      <h1>Chi tiết đơn hàng #{order.id}</h1>
      <p>Trạng thái: {order.status}</p>
      <p>Tổng giá: {order.total_price}</p>
      <p>Hình thức thanh toán: {order.payment_method}</p>
      <p>Ngày đặt: {new Date(order.created_at).toLocaleDateString()}</p>
      <h2>Sản phẩm</h2>
      <ul>
        {order.order_details.map(detail => (
          <li key={detail.id}>
            <p>Tên sản phẩm: {detail.product.product_name}</p>
            <p>Số lượng: {detail.quantity}</p>
            <p>Giá: {detail.price}</p>
            {/* <p>Mô tả: {detail.product.des}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetail;
