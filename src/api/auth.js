// src/api/auth.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (response != null && response.data != null) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name: username,
      email,
      password,
      password_confirmation: password, //
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const get_profile_async = async () => {
  try {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await axios.get(`${API_URL}/profile`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
