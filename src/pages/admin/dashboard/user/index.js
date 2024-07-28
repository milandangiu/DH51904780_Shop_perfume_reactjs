import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users');
                if (response.data.status) {
                    setUsers(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Có lỗi xảy ra khi lấy danh sách người dùng.');
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-list">
            <h2>Danh sách người dùng</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <div className="user-id">ID: #{user.id}</div>
                        <div className="user-name">Tên: {user.name}</div>
                        <div className="user-email">Email: {user.email}</div>
                        <div className="user-role">Quyền: {user.role}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;