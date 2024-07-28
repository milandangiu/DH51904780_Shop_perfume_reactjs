import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './style.scss';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateMessage, setUpdateMessage] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [messageClass, setMessageClass] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://127.0.0.1:8000/api/profile/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setProfile(response.data.data);
            setName(response.data.data.name);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        axios.post('http://127.0.0.1:8000/api/update-profile', { name }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setProfile(response.data.data);
            setUpdateMessage('Cập nhật thông tin thành công');
            setMessageClass('message success');
            setShowUpdateForm(false);
            setTimeout(() => setUpdateMessage(null), 3000);
        })
        .catch(error => {
            setUpdateError(error.response.data.message);
            setMessageClass('message error');
            setTimeout(() => setUpdateError(null), 3000);
        });
    };

    const handleChangePassword = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setUpdateError('Mật khẩu mới và nhập lại mật khẩu không trùng khớp');
            setMessageClass('message error');
            setTimeout(() => setUpdateError(null), 3000);
            return;
        }

        const token = localStorage.getItem('token');

        axios.post('http://127.0.0.1:8000/api/change-password', {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUpdateMessage('Cập nhật mật khẩu thành công');
            setMessageClass('message success');
            setShowPasswordForm(false);
            setTimeout(() => setUpdateMessage(null), 3000);
        })
        .catch(error => {
            setUpdateError(error.response.data.message);
            setMessageClass('message error');
            setTimeout(() => setUpdateError(null), 3000);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching profile: {error.message}</div>;
    }

    return (
        <div>
            <h1>Thông tin cá nhân</h1>
            {profile && (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>

                    <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
                        {showUpdateForm ? 'Hủy' : 'Thay đổi thông tin'}
                    </button>
                    <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
                        {showPasswordForm ? 'Hủy' : 'Thay đổi mật khẩu'}
                    </button>

                    {showUpdateForm && (
                        <form onSubmit={handleUpdateProfile}>
                            <div>
                                <label>Họ và tên:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button type="submit">Cập nhật thông tin</button>
                        </form>
                    )}

                    {showPasswordForm && (
                        <form onSubmit={handleChangePassword}>
                            <div>
                                <label>Nhập mật khẩu hiện tại:</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Nhập mật khẩu mới:</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Xác nhận lại mật khẩu:</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit">Thay đổi mật khẩu</button>
                        </form>
                    )}

                    {updateMessage && <p className={`${messageClass} fade-out`}>{updateMessage}</p>}
                    {updateError && <p className={`${messageClass} fade-out`}>Lỗi khi cập nhật: {updateError}</p>}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
