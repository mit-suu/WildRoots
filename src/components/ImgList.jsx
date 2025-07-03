import React, { useState, useEffect, useRef } from "react";
import ImgCard from "./ImgCard";
import { searchImages } from "../services/unsplashService";

function ImgList({ query = "nature" }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const loader = useRef(null);

  // Khi query đổi, reset ảnh và page
  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  // Gọi fetchImages mỗi khi page hoặc query đổi
  useEffect(() => {
    let ignore = false;
    const fetchImages = async () => {
      setLoading(true);
      try {
        const searchQuery = query.trim() === "" ? "nature" : query;
        const data = await searchImages(searchQuery, page);
        if (!ignore && data && data.results) {
          setImages((prevImages) => {
            // Nếu page === 1 thì reset, nếu page > 1 thì nối thêm
            if (page === 1) return data.results;
            const newImages = data.results.filter(
              (newImage) => !prevImages.some((img) => img.id === newImage.id)
            );
            return [...prevImages, ...newImages];
          });
        }
      } catch (err) {
        if (!ignore) setError("Không thể tải ảnh.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchImages();
    return () => { ignore = true; };
  }, [query, page]);

  // Intersection Observer: chỉ tăng page, không gọi fetchImages trực tiếp
  useEffect(() => {
    if (loading) return;
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
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

  if (loading && images.length === 0) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {images.map((image) => (
          <div className="break-inside-avoid mb-6" key={image.id}>
            <ImgCard image={image} />
          </div>
        ))}
      </div>
      <div ref={loader} className="text-center py-4">
        {loading ? <div>Loading more images...</div> : <div>No more images</div>}
      </div>
    </div>
  );
}

export default ImgList;
