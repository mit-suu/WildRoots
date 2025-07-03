import React, { useState, useEffect, useRef } from "react";
import ImgCard from "./ImgCard"; // Import ImgCard component
import { searchImages } from "../services/unsplashService"; // Import searchImages from UnsplashService

function ImgList({ query = "nature" }) {  // Dùng "nature" làm mặc định nếu không có query
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Quản lý trang
  const [error, setError] = useState(null);

  // Reference for the loader element
  const loader = useRef(null);

  // Hàm lấy ảnh từ API Unsplash
  const fetchImages = async (pageNum) => {
    setLoading(true);
    try {
      const data = await searchImages(query, pageNum); // Lấy ảnh từ API với query và pageNum

      // Thêm ảnh mới vào danh sách mà không xóa ảnh cũ
      setImages((prevImages) => [...prevImages, ...data]);

      setLoading(false);
    } catch (err) {
      setError("Không thể tải ảnh.");
      setLoading(false);
    }
  };

  // Gọi fetchImages mỗi khi query hoặc page thay đổi
  useEffect(() => {
    setImages([]); // Reset ảnh khi query thay đổi
    setPage(1); // Reset page khi query thay đổi
    fetchImages(1);
  }, [query]);  // Khi query thay đổi, tải lại ảnh từ trang 1

  // Sử dụng Intersection Observer để trigger việc tải thêm ảnh khi cuộn gần tới bottom
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          fetchImages(nextPage); // Tải thêm ảnh khi gần hết trang
          return nextPage;
        });
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading]);

  // Nếu đang tải, hiển thị loading
  if (loading && images.length === 0) {
    return <div>Loading...</div>;
  }

  // Nếu có lỗi, hiển thị lỗi
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5 ">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 ">
        {images.map((image) => (
          <div className="break-inside-avoid mb-6" key={image.id}>
            <ImgCard image={image} />
          </div>
        ))}
      </div>

      {/* Loader element để tải thêm ảnh */}
      <div ref={loader} className="text-center py-4">
        {loading ? <div>Loading more images...</div> : <div>No more images</div>}
      </div>
    </div>
  );
}

export default ImgList;
