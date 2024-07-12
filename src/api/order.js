import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const get_orders_async = async () => {
    try {
      const response = await axios.post(`${API_URL}/orders`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };