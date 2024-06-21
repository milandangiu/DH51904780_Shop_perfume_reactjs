import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

import './style/Register.scss';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu không trùng khớp!');
            return;
        }
        setError('');
        setSuccessMessage('');
        

        try {
            const data = await register(username, email, password);
            setSuccessMessage('Đăng ký thành công!');

            // Reset form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/login');

        } catch (err) {
            setError('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
            console.error('Register Error:', err);
        }
    };

    return (
        <div className="register-w3">
            <div className="w3layouts-main">
                <h2>Đăng Ký</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Họ và tên"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input type="submit" value="Đăng Ký" />
                </form>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
            </div>
        </div>
    );
};
export default Register