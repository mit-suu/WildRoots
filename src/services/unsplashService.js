import axios from 'axios';
import { API_URL, ACCESS_KEY, PAGE_SIZE, DEFAULT_QUERY } from '../constants/index';

export const searchImages = async (query = DEFAULT_QUERY, page = 1) => {
  const url = `${API_URL}?query=${query}&page=${page}&per_page=${PAGE_SIZE}&client_id=${ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    // console.log(response.data); // Có thể bỏ log này khi chạy thật

    if (response.data && Array.isArray(response.data.results)) {
      return response.data; // Trả về toàn bộ object để component dùng .results
    } else {
      throw new Error("Không có dữ liệu trả về từ API");
    }
  } catch (error) {
    console.error("Error searching images:", error.message);
    throw new Error("Không thể tìm kiếm hình ảnh từ Unsplash.");
  }
};
