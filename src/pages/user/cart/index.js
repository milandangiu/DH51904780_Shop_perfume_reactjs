import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.scss'; // Ensure you have the CSS file for styling

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'tm', // mac dinh
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.id) {
          throw new Error('User information not found.');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/cart/${userData.id}`);
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
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = (formData) => {
    // Logic to handle checkout with form data
    console.log('Checkout with form data:', formData);
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
                  <button onClick={() => handleRemoveItem(item.id)}>Xóa</button>
                  <div className="quantity">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p>Đơn giá: {item.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  <p>Tổng tiền: {formatMoney(item.product.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Tổng cộng: {formatMoney(cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0))}</p>
            <CheckoutForm onSubmit={handleCheckout} />
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
