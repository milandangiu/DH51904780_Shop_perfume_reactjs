import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss'; // Import file CSS

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData || !userData.token) {
                throw new Error('User information or token not found.');
            }

            const response = await axios.get(`http://127.0.0.1:8000/api/orders/user/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });
            setOrders(response.data.orders); // Assuming API returns { orders: [...] }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []); // Empty dependency array means fetchOrders runs once on component mount

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData || !userData.token) {
                throw new Error('User information or token not found.');
            }

            const response = await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/updateStatus`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });
            console.log('Status updated:', response.data);
            // Refresh order list after successful update
            fetchOrders(); // Re-fetch orders to update the list
        } catch (error) {
            console.error('Error updating status:', error);
            // Handle error, e.g., show error message
        }
    };

    return (
        <div>
            <h2>Order List</h2>
            <ul className="order-list">
                {orders.map(order => (
                    <li key={order.id} className="order-item">
                        <h3>Order #{order.id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total Price: ${order.total_price}</p>
                        <div className="status-update-form">
                            <label htmlFor={`status-${order.id}`}>Update Status:</label>
                            <select id={`status-${order.id}`} onChange={(e) => handleUpdateStatus(order.id, e.target.value)}>
                                <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                                <option value="Đang giao hàng">Đang giao hàng</option>
                                <option value="Thành công">Thành công</option>
                                <option value="Đã hủy">Đã hủy</option>
                            </select>
                            <button>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
