import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const get_cart_async = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };