import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.scss'; // Ensure you have the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CheckoutForm = ({ onSubmit, userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'tiền mặt',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({  
      ...formData,
      userId: userId, // Add userId to the order data
    });
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div>
        <label htmlFor="name">Tên:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Số điện thoại:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="paymentMethod">Hình thức thanh toán:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="tm">Thanh toán khi nhận hàng</option>
          <option value="ck">Thanh toán online</option>
        </select>
      </div>
      <button type="submit">Xác nhận</button>
    </form>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // State to hold user_id
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.id) {
          throw new Error('User information not found.');
        }

        const userId = userData.id; // Extract user_id from userData
        setUserId(userId); // Set user_id state
        const response = await axios.get(`http://127.0.0.1:8000/api/cart/${userId}`);
        setCartItems(response.data.cartItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) { // Prevent quantity from being set to 0
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
      handleUpdateItemQuantity(id, newQuantity);
    }
  };

  const handleUpdateItemQuantity = async (id, newQuantity) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/cart/update/${id}`, {
        quantity: newQuantity,
      });
      console.log('Cập nhật số lượng thành công:', response.data);
    } catch (err) {
      setError(err.message);
      console.error('Lỗi khi cập nhật số lượng:', err);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/delete/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = async (formData) => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const orderData = {
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      userId: userId,
      total_price: totalPrice,
    };

    console.log('Dữ liệu gửi lên API:', orderData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/orders', orderData);
      console.log('Checkout thành công:', response.data);
      navigate('/history_orders'); // Chuyển sang trang lịch sử đơn hàng
    } catch (error) {
      console.error('Lỗi khi checkout:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cart-container">
      <h1>Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống</p>
      ) : (
        <div className="cart">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.product.image} alt={item.product.product_name} />
                <div className="cart-item-details">
                  <p>{item.product.product_name}</p>
                  <div className="quantity">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                      disabled={item.quantity <= 1} // Disable decrease button if quantity is 1
                    >-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p>Đơn giá: {formatMoney(item.product.price)}</p>
                  <p>Tổng tiền: {formatMoney(item.product.price * item.quantity)}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Xóa</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Tổng tiền phải thanh toán: {formatMoney(cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0))}</p>
            <CheckoutForm onSubmit={handleCheckout} userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

// Function to format money with dot as thousand separator
const formatMoney = (amount) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export default Cart;
