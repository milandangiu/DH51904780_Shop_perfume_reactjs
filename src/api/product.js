import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const get_products_async = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const get_product_detail_async = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/product/detail/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
