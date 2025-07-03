// constants/index.js

export const API_URL = "https://api.unsplash.com/search/photos";  // URL của API Unsplash
export const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;  // Access Key từ biến môi trường
export const PAGE_SIZE = 100;  // Số lượng ảnh mỗi trang
export const DEFAULT_QUERY = "nature forest trees";  // Truy vấn mặc định
export const ERROR_MESSAGES = {
  FETCH_ERROR: "Không thể tải hình ảnh từ Unsplash. Vui lòng thử lại sau.",
  NO_RESULTS: "Không tìm thấy kết quả nào với từ khóa này.",
};