import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss'; // Import file CSS

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/orders');
            setOrders(response.data.orders); // Assuming API returns { orders: [...] }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/updateStatus`, { status: newStatus });
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
                        {/* Example of updating status */}
                        <div className="status-update-form">
                            <label htmlFor={`status-${order.id}`}>Update Status:</label>
                            <select id={`status-${order.id}`} onChange={(e) => handleUpdateStatus(order.id, e.target.value)}>
                                <option value="Đang xử lý">Đang xử lý</option>
                                <option value="Đã giao hàng">Đã giao hàng</option>
                                <option value="Đã nhận hàng">Đã nhận hàng</option>
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
