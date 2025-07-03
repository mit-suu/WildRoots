import axios from 'axios';
import { API_URL, ACCESS_KEY, PAGE_SIZE, DEFAULT_QUERY } from '../constants/index';

export const searchImages = async (query = DEFAULT_QUERY, page = 1) => {
  const url = `${API_URL}?query=${query}&page=${page}&per_page=${PAGE_SIZE}&client_id=${ACCESS_KEY}`;

  try {
    const response = await axios.get(url); // Gọi API
    return response.data.results;
  } catch (error) {
    console.error("Error searching images:", error);
    throw new Error("Không thể tìm kiếm hình ảnh từ Unsplash.");
  }
};
